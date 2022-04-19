import { Button, FormInstance, Steps } from 'antd';
import React, { useRef, useState } from 'react';

import DescForm from './DescForm';
import NewsActions from './NewsActions';
import NewsBody from './NewsBody';

const { Step } = Steps;

export default function NewsAdd() {
  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef<FormInstance>(null);

  const handleNextStep = async () => {
    if (currentStep === 0) {
      const validateRes = await formRef.current?.validateFields();
      if (validateRes) {
        setCurrentStep(1);
      }
    }
    setCurrentStep(currentStep + 1);
  };
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const dispComponents = [
    <DescForm
      key={0}
      ref={formRef}
      className={currentStep !== 0 ? 'hidden' : ''}
    ></DescForm>,
    <NewsBody key={1} className={currentStep !== 1 ? 'hidden' : ''}></NewsBody>,
    <NewsActions key={2} className={currentStep !== 2 ? 'hidden' : ''}></NewsActions>,
  ];
  return (
    <div>
      <div className="flex justify-start">
        <Steps size="small" direction="vertical" current={currentStep} className="!w-30">
          <Step title="基本信息" />
          <Step title="新闻内容" />
          <Step title="新闻提交" />
        </Steps>
        {dispComponents.map((item) => item)}
      </div>
      {currentStep === 0 ? (
        ''
      ) : (
        <Button
          size="small"
          onClick={() => {
            handlePrevStep();
          }}
          className="mr-2"
        >
          上一步
        </Button>
      )}
      {currentStep === 2 ? (
        ''
      ) : (
        <Button
          size="small"
          type="primary"
          onClick={() => {
            handleNextStep();
          }}
        >
          下一步
        </Button>
      )}
    </div>
  );
}

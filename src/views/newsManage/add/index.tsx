import { Button, Steps } from 'antd';
import React, { useState } from 'react';

import DescForm from './DescForm';

const { Step } = Steps;

export default function NewsAdd() {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div>
      <div className="flex justify-start">
        <Steps size="small" direction="vertical" current={currentStep} className="!w-30">
          <Step title="基本信息" />
          <Step title="新闻内容" />
          <Step title="新闻提交" />
        </Steps>
        <DescForm></DescForm>
      </div>
      <Button type="primary" className="w-25">
        下一步
      </Button>
    </div>
  );
}

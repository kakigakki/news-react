import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

import axios from '@/utils/axios';

export const getRights = () => {
  return axios.get('/rights?_embed=children');
};

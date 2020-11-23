import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as variables from '../RBOW_UAT_API3_Games/Holdem/Variables';

export function Withdrawal(body: string, headers: string | { [name: string]: string; }): Promise<AxiosResponse> {
  return axios.put(`http://${variables.rbowDomain}:${variables.rbowPort}/onewallet/api3/withdrawal`, body, { headers }
  );
};

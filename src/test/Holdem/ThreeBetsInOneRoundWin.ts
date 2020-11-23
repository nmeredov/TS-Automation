/**
 * @jest-environment node
 */

import * as variable from '../../RBOW_UAT_API3_Games/Holdem/Variables';
import * as body from '../../RBOW_UAT_API3_Games/Holdem/ThreeBetsInOneRoundWin/Body';
import { GetBalance } from '../../API3MethodsTemplate/get_balance';
import { Withdrawal } from '../../API3MethodsTemplate/withdrawal';
import { FinalSettlement } from '../../API3MethodsTemplate/final_settlement';

describe("Get balance", () => {
  let testResponse: any;
  let currentBalance: number;
  let data: any;

  beforeEach(async () => {
    testResponse = await GetBalance(body.getBalanceBody, body.headers);
    data = testResponse.data;
    currentBalance = data.balances[0].amount;
    console.log('Balance:', currentBalance);
    console.log('get_balance_request', body.getBalanceBody);
  });

  afterEach(() => {
    console.log('get_balance_response', data);
  });

  test('Current balance matches the response', () => {
    //impossible to display amount inside 'it' since currentBalance in field 'it' is undefined.
    expect(currentBalance);
  });

  test('Assert status code is 200', () => {
    expect(testResponse.status).toEqual(200);
  });

  test('Assert no error in response', () => {
    expect(testResponse.text).not.toEqual('error');
  });
});

describe("Get balance_for_table - Checks balance for table and if response status is successful balance", async () => {
  let testResponse: any;
  let currentBalance: number;
  let data: any;

  beforeEach(async () => {
    testResponse = await GetBalance(body.getBalanceForTableBody, body.headers);
    data = testResponse.data;
    currentBalance = data.balances[0].amount;
    console.log('Balance:', currentBalance);
    console.log('get_balance_for_table_request', body.getBalanceForTableBody);
  });

  afterEach(() => {
    console.log('get_balance_for_table_response', data);
  });

  test('Current balance for table matches the response', async () => {
    //impossible to display amount inside 'it' since currentBalance in field 'it' is undefined.
    expect(currentBalance);
  });

  test('Assert status code is 200', () => {
    expect(testResponse.status).toEqual(200);
  });

  test('Assert no error in response', () => {
    expect(testResponse.text).not.toEqual('error');
  });
});

describe("Withdrawal 1 - Checks withdrawal and no error in response", async () => {
  let testResponse: any;
  let currentBalance: number;
  let previousBalance: number;
  let expectedBalance: number;
  let data: any;

  beforeEach(async () => {
    testResponse = await Withdrawal(body.withdrawalBody1, body.headers);
    data = testResponse.data;
    currentBalance = data.balances[0].amount;
    previousBalance = currentBalance + variable.bet1;
    expectedBalance = previousBalance - variable.bet1;
    console.log('Previous balance:', previousBalance);
    console.log('Bet is:', variable.bet1);
    console.log('Current balance:', currentBalance);
    console.log('Expected balance:', expectedBalance);
    console.log('withdrawal_request_1', body.withdrawalBody1);
  });

  afterEach(() => {
    console.log('withdrawal_response_1', data);
  });

  test('Assert no error in response', () => {
    expect(testResponse.text).not.toEqual('error');
  });

  test('Current balance is equal to Expected balance', () => {
    expect(currentBalance).toEqual(expectedBalance);
  });
});

describe("Withdrawal 2 - Checks withdrawal and no error in response", async () => {
  let testResponse: any;
  let currentBalance: number;
  let previousBalance: number;
  let expectedBalance: number;
  let data: any;

  beforeEach(async () => {
    testResponse = await Withdrawal(body.withdrawalBody2, body.headers);
    data = testResponse.data;
    currentBalance = data.balances[0].amount;
    previousBalance = currentBalance + variable.bet;
    expectedBalance = previousBalance - variable.bet;
    console.log('Previous balance:', previousBalance);
    console.log('Bet is:', variable.bet);
    console.log('Current balance:', currentBalance);
    console.log('Expected balance:', expectedBalance);
    console.log('withdrawal_response_2', body.withdrawalBody2);
  });

  afterEach(() => {
    console.log('withdrawal_response_2', data);
  });

  test('Assert no error in response', () => {
    expect(testResponse.text).not.toEqual('error');
  });

  test('Current balance is equal to Expected balance', () => {
    expect(currentBalance).toEqual(expectedBalance);
  });
});

describe("Final Settlement - Checks if response status is successful", async () => {
  let testResponse: any;
  let data: any;

  beforeEach(async () => {
    testResponse = await FinalSettlement(body.finalSettlementBody, body.headers);
    data = testResponse.data;
    console.log('Resolution is: Winninig the game ');
    console.log('Payout is:', variable.payyof1);
    console.log('final_settlement_request', body.finalSettlementBody);
  });

  afterEach(() => {
    console.log('final_settlement_response', data);
  });

  test('Assert status code is 202', () => {
    expect(testResponse.status).toEqual(202);
  });
});

describe("Get balance", () => {
  let testResponse: any;
  let currentBalance: number;
  let initialBalance: number;
  let expectedBalance: number;
  let data: any;

  beforeEach(async () => {
    testResponse = await GetBalance(body.getBalanceBody, body.headers);
    data = await testResponse.data;
    currentBalance = data.balances[0].amount;
    initialBalance = currentBalance - variable.payyof1 + variable.bet1 + variable.bet;
    expectedBalance = initialBalance - variable.bet1 - variable.bet + variable.payyof1;
    console.log('Initial balance:', initialBalance);
    console.log('Current balance:', currentBalance);
    console.log('Expected balance:', expectedBalance);
    console.log('get_balance_request', body.getBalanceBody);
  });

  afterEach(() => {
    console.log('get_balance_response', data);
  });

  test('Current balance matches the response', () => {
    expect(currentBalance).toEqual(expectedBalance);
  });

  test('Assert status code is 200', () => {
    expect(testResponse.status).toEqual(200);
  });

  test('Assert no error in response', () => {
    expect(testResponse.text).not.toEqual('error');
  });
});
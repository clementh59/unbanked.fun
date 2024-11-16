import {
  ACTIONS,
  Action,
  TRIGGERS,
  Trigger,
  Workflow,
  CHAINS,
  getTokenFromSymbol,
  Edge,
  apiServices,
  convertToTokenUnitsFromSymbol,
  LOGIC_OPERATORS,
  ConditionGroup,
} from 'otomato-sdk';

import axios from 'axios';


const API_URL = 'https://staging-api.otomato.xyz';
const AUTH_TOKEN = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIweDdjRUI4ZDgxNDdBYWE5ZEI4MUFjQkRGRTVjMzA1MERGQ2ZGMTg1MzciLCJzdWIiOiIweDc1N0EwMDRiRTc2NmY3NDVmZDRDRDc1OTY2Q0Y2QzhCYjg0RkQ3YzEiLCJhdWQiOiJvdG9tYXRvLXRlc3QubmV0bGlmeS5hcHAiLCJleHAiOjE3MzI0NTE3ODksIm5iZiI6MTcyOTg1Nzk4NCwiaWF0IjoxNzI5ODU5Nzg5LCJqdGkiOiIweDc3OTJkYjQxNzU4OWUyNjFiN2U4ZGVhOGUwOTQxZWMzOTIxNjdkY2M2NmU0ZjA4NjlhMGRjOWFhNDQ2ZjdiZTAiLCJjdHgiOnt9fQ.MHhkYWYzYmMxMGMzOTkzZTk3NzhkMDBiYzVmZjUwYjk1NTk4NzliMTU3ZGIzYTJlYzAyNzgxODk4ZjQ2NWVjODAwMDg0YzBmNjcyM2E2YmZjODkyYjdhNzA2ZjU1NGUwMmI2MzU1MjA2N2MwZTBhNjI2NTM0NTc1NTRhYzIyM2M4YjFj';

/**
* Function to create and run a yield comparison automation workflow.
*/
export async function triggerYieldComparator() {
  /*apiServices.setUrl(API_URL);
  apiServices.setAuth(AUTH_TOKEN);

  try {
      const chain = CHAINS.BASE;
      const asset = getTokenFromSymbol(chain, 'USDC').contractAddress;

      // todo: change this to store's address
      const erc4337Address = '0x757A004bE766f745fd4CD75966CF6C8Bb84FD7c1';

      // Trigger definition
      const trigger = new Trigger(TRIGGERS.TOKENS.ON_CHAIN_PRICE_MOVEMENT.PRICE_MOVEMENT_AGAINST_CURRENCY);
      trigger.setChainId(CHAINS.MODE);
      trigger.setComparisonValue(1000);
      trigger.setCondition('gte');
      trigger.setParams('currency', 'USD');
      trigger.setContractAddress(getTokenFromSymbol(CHAINS.MODE, 'WETH').contractAddress);
      trigger.setPosition(400, 120);

      // Condition group with external variables
      const conditionGroup1 = new ConditionGroup(LOGIC_OPERATORS.OR);
      const variable1 = "{{external.functions.ionicLendingRate(8453,0x833589fcd6edb6e08f4c7c32d4f71b54bda02913)}}";
      const variable2 = "{{external.functions.aaveLendingRate(0xA238Dd80C259a72e81d7e4664a9801593F98d1c5,8453,0x833589fcd6edb6e08f4c7c32d4f71b54bda02913)}}";
      conditionGroup1.addConditionCheck(variable1, 'gt', variable2);

      // Create condition action
      const condition = new Action(ACTIONS.CORE.CONDITION.IF);
      condition.setParams('logic', LOGIC_OPERATORS.OR);
      condition.setParams('groups', [conditionGroup1]);

      // Ionic Deposit and Withdraw actions
      const ionicDepositAction = new Action(ACTIONS.LENDING.IONIC.DEPOSIT);
      ionicDepositAction.setChainId(chain);
      ionicDepositAction.setParams('tokenToDeposit', asset);
      ionicDepositAction.setParams('amount', "{{external.functions.erc20Balance(8453,0x757A004bE766f745fd4CD75966CF6C8Bb84FD7c1,0x833589fcd6edb6e08f4c7c32d4f71b54bda02913,,)}}");

      const ionicWithdrawAction = new Action(ACTIONS.LENDING.IONIC.WITHDRAW);
      ionicWithdrawAction.setChainId(chain);
      ionicWithdrawAction.setParams('tokenToWithdraw', asset);
      ionicWithdrawAction.setParams('amount', '115792089237316195423570985008687907853269984665640564039457584007913129639935n');

      // AAVE Deposit and Withdraw actions
      const aaveDepositAction = new Action(ACTIONS.LENDING.AAVE.SUPPLY);
      aaveDepositAction.setChainId(chain);
      aaveDepositAction.setParams('asset', asset);
      aaveDepositAction.setParams('contractAddress', '0xA238Dd80C259a72e81d7e4664a9801593F98d1c5');
      aaveDepositAction.setParams('onBehalfOf', erc4337Address);
      aaveDepositAction.setParams('referralCode', 0);
      aaveDepositAction.setParams('amount', "{{external.functions.erc20Balance(8453,0x757A004bE766f745fd4CD75966CF6C8Bb84FD7c1,0x833589fcd6edb6e08f4c7c32d4f71b54bda02913,,)}}");

      const aaveWithdrawAction = new Action(ACTIONS.LENDING.AAVE.WITHDRAW);
      aaveWithdrawAction.setChainId(chain);
      aaveWithdrawAction.setParams('asset', asset);
      aaveWithdrawAction.setParams('to', erc4337Address);
      aaveWithdrawAction.setParams('amount', '115792089237316195423570985008687907853269984665640564039457584007913129639935n');

      // Workflow and Edges
      const workflow = new Workflow("Unbanked savings", [trigger, condition, ionicDepositAction, ionicWithdrawAction, aaveDepositAction, aaveWithdrawAction]);

      workflow.addEdge(new Edge({ source: trigger, target: condition }));
      workflow.addEdge(new Edge({ source: condition, target: ionicWithdrawAction, label: "true", value: "true" }));
      workflow.addEdge(new Edge({ source: ionicWithdrawAction, target: aaveDepositAction }));
      workflow.addEdge(new Edge({ source: condition, target: aaveWithdrawAction, label: "false", value: "false" }));
      workflow.addEdge(new Edge({ source: aaveWithdrawAction, target: ionicDepositAction }));

      // Create the workflow
      const creationResult = await workflow.create();
      console.log(workflow.getState());

      if (!creationResult.success) {
          throw new Error("An error occurred when publishing the workflow");
      }

      console.log(`Workflow created with ID: ${workflow.id}`);

      // Run the workflow
      const runResult = await workflow.run();
      console.log(workflow.getState());

      if (!runResult.success) {
          throw new Error("An error occurred when running the workflow");
      } else {
          console.log('Workflow is running successfully');
      }

      // Load the workflow state
      await workflow.load(workflow.id || '');
      console.log(`Workflow execution ID: ${workflow.executionId}`);

      // await getExecutionStatus(workflow.executionId);

  } catch (error) {
      console.error("Error in triggerYieldComparator:", error);
  }*/

  apiServices.setUrl(API_URL);
  apiServices.setAuth(AUTH_TOKEN);

  const id = await createAutomation();
  console.log('Automation created successfully:', id);
  /*const workflow = new Workflow();
  await workflow.load(id);
  await workflow.run();*/
  const detail = await getWorkflowDetails(id)
  console.log('Workflow details:', detail);
}

const createAutomation = async () => {
  const automationData = {
    "name": "Ionic Trigger Lending",
    "nodes": [
      {
        "ref": "2",
        "blockId": 100021,
        "type": "action",
        "position": {
          "x": 0,
          "y": 200
        },
        "parameters": {
          "abi": {
            "parameters": {
              "to": "0x8e379aD0090f45a53A08007536cE2fa0a3F9F93d",
              "asset": "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
              "amount": "12n"
            }
          },
          "chainId": 8453,
          "contractAddress": null
        },
        "dateCreated": "2024-11-15T02:32:00.078814+00:00",
        "dateModified": "2024-11-15T02:32:00.078814+00:00",
        "state": "inactive"
      },
      {
        "id": "f6c610bd-c22d-4ea4-b45a-a31339dfdd2c",
        "ref": "1",
        "blockId": 15,
        "executionId": "89f4d620-4c47-4f24-9c6d-45ac776235aa",
        "type": "trigger",
        "position": null,
        "parameters": {
          "token": "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
          "chainId": 8453,
          "condition": "gt",
          "comparisonValue": 0.1
        },
        "dateCreated": "2024-11-15T02:32:00.078814+00:00",
        "dateModified": "2024-11-15T02:32:00.078814+00:00",
        "state": "inactive"
      }
    ],
    "edges": [
      {
        "id": "d2a3c222-fcfe-4cb8-824e-09d7091d8b12",
        "source": "1",
        "target": "2",
        "value": null,
        "label": null
      }
    ],
  }

  const url = API_URL + '/api/workflows/';

  try {
    const response = await axios.post(url, automationData, {
      headers: {
        Authorization: AUTH_TOKEN,
        'Content-Type': 'application/json',
      },
    });

    return response.data.id;
  } catch (error) {
    console.error('Error creating automation:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
}

export async function getWorkflowDetails(workflowId: String) {
  const url = `https://staging-api.otomato.xyz/api/workflows/${workflowId}`;
  const headers = {
      'Authorization': AUTH_TOKEN,
      'Content-Type': 'application/json',
  };

  try {
      const response = await fetch(url, {
          method: 'GET',
          headers: headers,
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error: ${errorData.message || 'Failed to fetch workflow details'}`);
      }

      const result = await response.json();
      console.log('Workflow details retrieved successfully:', result);
      return result;
  } catch (error) {
      console.error('Error fetching workflow details:', error);
      throw error;
  }
}
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
import { N } from 'vitest/dist/chunks/reporters.anwo7Y6a.js';


const API_URL = 'https://staging-api.otomato.xyz';
const AUTH_TOKEN = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIweDdjRUI4ZDgxNDdBYWE5ZEI4MUFjQkRGRTVjMzA1MERGQ2ZGMTg1MzciLCJzdWIiOiIweDU4NmIzOEI3YUFlZEI5OUFDZjI1ODgwN2RhMjQ0NDU2QUU3Njc3YTgiLCJhdWQiOiJvdG9tYXRvLXRlc3QubmV0bGlmeS5hcHAiLCJleHAiOjE3MzQzNjc5NTksIm5iZiI6MTczMTc3NDE0MiwiaWF0IjoxNzMxNzc1OTU5LCJqdGkiOiIweDY0ZmJhMjgzZWM2YjAyNGI3OGE4YzEwNDhmYTdiZmE2Mzc5N2E0YWE4YWFkOTAwMzg1MGU3ZjBkMWVjNjQyMzQiLCJjdHgiOnt9fQ.MHhhNGExYjgzNDBiZGQ3NzU5OGVlZGE5NDUyMzJhNWI5OGMzMTJhMjhjNzkyN2E3ZTY4OGQyYTIwNTgxN2NhYzkzMzkzMGU1YTAyMzdkOTg4YzZmOTg5MDBlODUxNTc0MGZlODVhOTFhYWIwOTFkNzliYTkwYWFkOGY0ZjNjYWEzYTFj';
const erc4337ddress = '0x586b38B7aAedB99ACf258807da244456AE7677a8';

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

  const id = await createSmartYieldAutomation();
  console.log('Automation created successfully:', id);
  /*const workflow = new Workflow();
  await workflow.load(id);
  await workflow.run();*/
  const detail = await runWorkflow(id);
  console.log('Run details:', detail);
}

const createSmartYieldAutomation = async () => {
  const automationData = {
    "id": "ac0cfc1a-9ff4-4c5c-b773-ff519870dded",
    "name": "Unbanked savings",
    "executionId": "9e4d3bdb-aa6f-4f76-aff7-6959f00d3a70",
    "dateCreated": "2024-11-16T07:33:59.456Z",
    "dateModified": "2024-11-16T07:33:59.455Z",
    "nodes": [
      {
        "type": "trigger",
        "ref": "1",
        "blockId": 18,
        "position": {
          "x": 1,
          "y": 2
        },
        "parameters": {
          "period": "15000"
        }
      },
      {
        "id": "6e525414-966d-4448-bd8f-5d1d070a7843",
        "ref": "2",
        "blockId": 100016,
        "executionId": "ecb4034c-6b16-4af4-8adb-d62d526508af",
        "type": "action",
        "position": null,
        "parameters": {
          "logic": "or",
          "groups": [
            {
              "logic": "or",
              "checks": [
                {
                  "value1": "{{external.functions.ionicLendingRate(8453,0x833589fcd6edb6e08f4c7c32d4f71b54bda02913)}}",
                  "value2": "{{external.functions.aaveLendingRate(0xA238Dd80C259a72e81d7e4664a9801593F98d1c5,8453,0x833589fcd6edb6e08f4c7c32d4f71b54bda02913)}}",
                  "condition": "gt"
                }
              ]
            }
          ]
        },
        "dateCreated": "2024-11-16T07:33:59.460494+00:00",
        "dateModified": "2024-11-16T07:33:59.460494+00:00",
        "state": "inactive"
      },
      {
        "id": "f4623ee1-b7cb-4038-af4c-4d9389f6c93d",
        "ref": "3",
        "blockId": 100006,
        "executionId": "9b3527ea-dac3-41f3-8935-24624ca5e072",
        "type": "action",
        "position": null,
        "parameters": {
          "abi": {
            "parameters": {
              "amount": `{{external.functions.erc20Balance(8453,${erc4337ddress},0x833589fcd6edb6e08f4c7c32d4f71b54bda02913,,)}}`
            }
          },
          "chainId": 8453,
          "tokenToDeposit": "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"
        },
        "dateCreated": "2024-11-16T07:33:59.460494+00:00",
        "dateModified": "2024-11-16T07:33:59.460494+00:00",
        "state": "inactive"
      },
      {
        "id": "8f8460e1-2cb1-4129-a0f6-7ee103febf83",
        "ref": "4",
        "blockId": 100007,
        "executionId": "7d0b074a-089e-48bb-9399-abedb85fb2a7",
        "type": "action",
        "position": null,
        "parameters": {
          "abi": {
            "parameters": {
              "amount": "115792089237316195423570985008687907853269984665640564039457584007913129639935n"
            }
          },
          "chainId": 8453,
          "tokenToWithdraw": "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"
        },
        "dateCreated": "2024-11-16T07:33:59.460494+00:00",
        "dateModified": "2024-11-16T07:33:59.460494+00:00",
        "state": "inactive"
      },
      {
        "id": "a3b45d46-b6fc-4be7-abe5-2b62705b6c26",
        "ref": "5",
        "blockId": 100020,
        "executionId": "40bb0e85-697b-48b5-966f-bce45246d3fc",
        "type": "action",
        "position": null,
        "parameters": {
          "abi": {
            "parameters": {
              "asset": "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
              "amount": `{{external.functions.erc20Balance(8453,${erc4337ddress},0x833589fcd6edb6e08f4c7c32d4f71b54bda02913,,)}}`,
              "onBehalfOf": erc4337ddress,
              "referralCode": 0
            }
          },
          "chainId": 8453,
          "contractAddress": "0xA238Dd80C259a72e81d7e4664a9801593F98d1c5"
        },
        "dateCreated": "2024-11-16T07:33:59.460494+00:00",
        "dateModified": "2024-11-16T07:33:59.460494+00:00",
        "state": "inactive"
      },
      {
        "id": "12a87a18-dc15-496c-8982-6850befe69c6",
        "ref": "6",
        "blockId": 100021,
        "executionId": "e81dcb45-e7ba-40cb-95ee-9481421e236b",
        "type": "action",
        "position": null,
        "parameters": {
          "abi": {
            "parameters": {
              "to": erc4337ddress,
              "asset": "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
              "amount": "115792089237316195423570985008687907853269984665640564039457584007913129639935n"
            }
          },
          "chainId": 8453,
          "contractAddress": null
        },
        "dateCreated": "2024-11-16T07:33:59.460494+00:00",
        "dateModified": "2024-11-16T07:33:59.460494+00:00",
        "state": "inactive"
      }
    ],
    "edges": [
      {
        "id": "0f067307-e5fa-40de-8efe-8fd66b386510",
        "source": "2",
        "target": "6",
        "value": "false",
        "label": "false"
      },
      {
        "id": "55f78493-ae89-47c4-992b-b42bbb05e1a1",
        "source": "6",
        "target": "3",
        "value": null,
        "label": null
      },
      {
        "id": "83540fb2-32de-4862-900b-faa6443fde78",
        "source": "4",
        "target": "5",
        "value": null,
        "label": null
      },
      {
        "id": "ed970d2b-d15e-42c6-b571-4ca0a276c1fb",
        "source": "1",
        "target": "2",
        "value": null,
        "label": null
      },
      {
        "id": "f3e52889-4a70-4737-a21d-8d1730eb06ce",
        "source": "2",
        "target": "4",
        "value": "true",
        "label": "true"
      }
    ],
    "state": "failed"
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

const runWorkflow = async (id: String) => {
  const url = `${API_URL}/api/workflows/${id}/run`;

  const headers = {
    Authorization: AUTH_TOKEN,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error running workflow: ${errorData.message || 'Unknown error'}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error running workflow:', error);
    throw error;
  }
};

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
    return result;
  } catch (error) {
    console.error('Error fetching workflow details:', error);
    throw error;
  }
}

export async function getLastExecution() {
  const url = `${API_URL}/api/executions`;

  const headers = {
    Authorization: AUTH_TOKEN,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error fetching executions: ${errorData.message || 'Unknown error'}`);
    }

    const result = await response.json();

    if (result && result.length > 0) {
      return result[0]; // Return the most recent execution
    } else {
      throw new Error('No executions found');
    }
  } catch (error) {
    console.error('Error fetching last execution:', error);
    throw error;
  }
}

export const isTheSmartYieldAlreadySetUpForThisWallet = async () => {
  try {
    const lastExecution = await getLastExecution();
    const workflow = await getWorkflowDetails(lastExecution.workflow.id);
    if (workflow.name !== 'Unbanked savings')
      return false;
    return true;
  } catch (e) {
    return false;
  }
}

export const generateLoginPayload = async (address, chainId) => {
  const accessCodes = [
    '111111',
    'skJGVe',
    'PkUEzn',
    'N5yeRB',
    '6R5NQs',
    '6wPlOE',
    'GUt4Io',
    'fXEQma',
    'S88avQ',
    'wq2h5O',
  ];

  const url = `${API_URL}/api/auth/generate-payload`;

  for (const accessCode of accessCodes) {
    const payload = {
      address: address,
      chainId: chainId,
      accessCode: accessCode,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Error with accessCode "${accessCode}":`, errorData);
        throw new Error(errorData.message || 'Unknown error');
      }

      const result = await response.json();
      console.log(`Payload generated successfully with accessCode "${accessCode}":`, result);
      return result;
    } catch (error) {
      console.error(`Failed attempt with accessCode "${accessCode}":`, error.message);
      // Continue to the next access code
    }
  }

  throw new Error('All access codes failed to generate a payload.');
};
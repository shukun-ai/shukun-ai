import { ThreadRetrieveOutput } from '@ailake/apitype';

export const threadMock: ThreadRetrieveOutput = {
  threadId: 'th1',
  title: '实付佣金计算表',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  messages: [
    {
      messageId: 'm1',
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: {
        type: 'userTemplate',
        text: '实付佣金计算表',
      },
    },
    {
      messageId: 'm2',
      role: 'assistant',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: {
        type: 'assistantText',
        text: '请输入姓名？',
      },
    },
    {
      messageId: 'm3',
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: {
        type: 'userInput',
        text: '张旭',
      },
    },
    {
      messageId: 'm4',
      role: 'assistant',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: {
        type: 'assistantDbQuery',
        data: {
          type: 'Collection',
          command: 'select',
          fields: [
            {
              name: 'name',
              type: 'text',
            },
            {
              name: 'money',
              type: 'float',
            },
          ],
          rows: [
            {
              name: '张旭',
              money: 1000,
            },
          ],
        },
        sqlParameters: {},
        sql: '',
      },
    },
  ],
};

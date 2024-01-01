import { Comment, Conversation, DataResult } from '../lib/conversation.type';

export const conversations: Conversation[] = [
  {
    id: '1',
    createdAt: '2020-01-01T00:00:00.000Z',
  },
];

export const comments: Comment[] = [
  {
    id: '1',
    conversationId: '1',
    belongUserId: '1',
    sentByRobot: false,
    commentType: 'text',
    commentText: '机场代码下总共有多少个任务？',
    commentSQL: null,
    createdAt: '2020-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    conversationId: '1',
    belongUserId: '1',
    sentByRobot: true,
    commentType: 'text',
    commentText: null,
    commentSQL:
      'SELECT arrivaltasks.airportcode, COUNT(arrivaltasks.id) AS total_tasks FROM arrivaltasks GROUP BY arrivaltasks.airportcode ORDER BY total_tasks DESC NULLS LAST;',
    createdAt: '2020-01-01T00:00:01.000Z',
  },
];

export const dataResults: DataResult[] = [
  {
    id: '1',
    commentId: '2',
    belongUserId: '1',
    sql: 'SELECT arrivaltasks.airportcode, COUNT(arrivaltasks.id) AS total_tasks FROM arrivaltasks GROUP BY arrivaltasks.airportcode ORDER BY total_tasks DESC NULLS LAST;',
    data: [
      {
        airportcode: 'PEK',
        total_tasks: 100,
      },
      {
        airportcode: 'PVG',
        total_tasks: 90,
      },
      {
        airportcode: 'CAN',
        total_tasks: 80,
      },
      {
        airportcode: 'SZX',
        total_tasks: 70,
      },
      {
        airportcode: 'CTU',
        total_tasks: 60,
      },
      {
        airportcode: 'HGH',
        total_tasks: 50,
      },
      {
        airportcode: 'XIY',
        total_tasks: 40,
      },
      {
        airportcode: 'CKG',
        total_tasks: 30,
      },
      {
        airportcode: 'KMG',
        total_tasks: 20,
      },
      {
        airportcode: 'XMN',
        total_tasks: 10,
      },
    ],
    createdAt: '2020-01-01T00:00:02.000Z',
  },
];

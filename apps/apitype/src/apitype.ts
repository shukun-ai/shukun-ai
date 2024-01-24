export const apiPath = {
  templates: {
    retrieve: 'templates/retrieve',
    list: 'templates/list',
    create: 'templates/create',
    update: 'templates/update',
    generate: 'templates/generate', // TODO beta api
  },
  threads: {
    retrieve: 'threads/retrieve',
    create: 'threads/create',
  },
  messages: {
    create: 'messages/create',
  },
  schema: {
    retrieve: 'schemas/retrieve',
    list: 'schemas/list',
    create: 'schemas/create',
    update: 'schemas/update',
    remove: 'schemas/remove',
    sync: 'schemas/sync',
  },
  queries: {
    retrieve: 'queries/retrieve',
    list: 'queries/list',
    create: 'queries/create',
    update: 'queries/update',
    remove: 'queries/remove',
  },
  queryGenerators: {
    create: 'query-generators/create',
  },
  queryExecutions: {
    create: 'query-executions/create',
  },
};

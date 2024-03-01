export default {
  translation: {
    navbar: {
      explore: 'Explore',
      thread: 'Assistant',
      reports: 'Reports',
      schema: 'Schema Configurations',
      template: 'Assistant Templates',
      query: 'Complex Queries',
    },
    conversation: {
      placeholder:
        'Ask me about the data you want to check, such as what is the distribution of airport codes for the top ten tasks?',
      tipTitle: 'You can use the following question template',
      saveFavorite: 'Save in favorite',
      explore: 'Explore',
      debug: 'Debug SQL',
      exportChartPdf: 'Export to pdf',
      exportChartImage: 'Export to Image',
      exportTableExcel: 'Export to excel',
      robotLoading: 'Your Assistant is working, takes',
      robotSeconds: 'seconds',
      question1:
        'What is the distribution of airport codes for the first ten tasks?',
      question2:
        'Which vehicle has been assigned the most tasks in the past month?',
      question3:
        'Tasks with a departure time from the previous station but no scheduled arrival time are grouped by airline. The airline company is the first two digits of the flight number.',
      question4:
        'List the latest ten tasks, sorted by flight date from nearest to farthest. There must be a departure time from the previous station but no arrival time, and the task status is synchronized. All task fields are listed.',
      question5:
        'All tasks in October 2023 are grouped by airline, which is the first two string of the flight number',
    },
    schema: {
      listTitle: 'Query Databases',
      detailTitle: 'Database Details',
      editDbUrl: 'Edit Database Connection',
      syncDb: 'Sync Database',
      tableName: 'Table Name',
      columnName: 'Column Name',
      alias: 'Labeled Alias',
      type: 'Data Type',
      foreignTable: 'Foreign Table',
      foreignColumn: 'Foreign Column',
      comments: 'Comments',
      name: 'Name',
      connection: {
        type: 'DB Type',
        database: 'DB name',
        user: 'DB Username',
        password: 'DB Password',
        port: 'DB Port',
        host: 'DB Host',
        schema: 'Postgres Schema',
      },
      submit: 'Submit',
      createTitle: 'Create Database Connection',
      editTitle: 'Edit Database Connection',
      hidden: 'Hidden',
      saveTables: 'Save',
      uploadMetadata: 'Upload SHUKUN Metadata',
      prefix: 'Table Name Prefix',
    },
    template: {
      create: 'Create a new template',
      createTitle: 'Create a new template',
      name: 'Template name',
      submit: 'Submit',
    },
    query: {
      name: 'Name',
      namePlaceholder: 'Input a name to remember',
      submit: 'Submit',
      createModalTitle: 'Create a new query orchestrate',
      saveNotificationTitle: 'Please generate all steps before saving.',
      saveNotificationMessage:
        'Please generate all steps before you save them. If you would not like to generate all steps, you can delete them.',
      updateModalTitle: 'Edit a new query orchestrate',
      removeModalTitle: 'Please confirm to delete it?',
      confirm: 'Confirm',
      cancel: 'Cancel',
      execute: 'Execute',
      executeAi: 'Execute AI Only',
      executeSql: 'Execute SQL Only',
      edit: 'Edit',
      setting: 'Setting',
      delete: 'Delete',
      selectSchemaLabel: 'Select Database',
      selectSchemaPlaceholder: 'Select a Database to ask',
      tasks: 'Tasks',
      beforeQuerySchema: 'Before Query Table Structures',
      generatedQuerySql: 'Generated Query SQL',
      generatedQuerySchema: 'Generated Query Table Structures',
      stepPassTip: 'The step is generated, you can check your data results.',
      stepNotPassTip:
        'The step is not generated, please edit your task for prompt and execute the data results.',
      step: 'Step',
      addStep: 'Add new step',
      detailTitle: 'Query Orchestrate',
      save: 'Save',
      chooseSchema: 'Select the tables to be queried',
      maxTablesTip:
        'You can select up to five tables for each query. You can use multiple combinations of queries.',
    },
    sharedUi: {
      languageSwitch: {
        tip: "We will automatically set Language by your browser's language, if you want to switch language, you can choose other language, we will remember.",
      },
    },
  },
};

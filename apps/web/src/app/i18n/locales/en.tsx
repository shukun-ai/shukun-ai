export default {
  translation: {
    navbar: {
      explore: 'Explore',
      thread: 'Assistant',
      reports: 'Reports',
      schema: 'Schema Configurations',
      template: 'Assistant Templates',
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
      dbType: 'DB Type',
      dbUrl: 'DB URL',
      submit: 'Submit',
      createTitle: 'Create Database Connection',
      editTitle: 'Edit Database Connection',
    },
    template: {
      create: 'Create a new template',
      createTitle: 'Create a new template',
      name: 'Template name',
      submit: 'Submit',
    },
    sharedUi: {
      languageSwitch: {
        tip: "We will automatically set Language by your browser's language, if you want to switch language, you can choose other language, we will remember.",
      },
    },
  },
};

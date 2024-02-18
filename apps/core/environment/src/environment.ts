export const environment = {
  LLM_TYPE: process.env?.['LLM_TYPE'] ? process.env?.['LLM_TYPE'] : 'openai',
  LLM_MODEL: process.env?.['LLM_MODEL']
    ? process.env?.['LLM_MODEL']
    : 'gpt-3.5-turbo',
  LLM_API: process.env?.['LLM_API'] ?? '',
  LLM_API_KEY: process.env?.['LLM_API_KEY'] ?? '',
  APP_DATABASE_URL: process.env?.['APP_DATABASE_URL'] ?? '',
};

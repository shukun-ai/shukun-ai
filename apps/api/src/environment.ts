export const environment = {
  LLM_ENABLE: process.env?.['LLM_ENABLE'] ? true : false,
  LLM_API: process.env?.['LLM_API'] ?? '',
  PG_USER: process.env?.['PG_USER'] ?? '',
  PG_HOST: process.env?.['PG_HOST'] ?? '',
  PG_DATABASE: process.env?.['PG_DATABASE'] ?? '',
  PG_PASSWORD: process.env?.['PG_PASSWORD'] ?? undefined,
  PG_PORT: parseInt(process.env?.['PG_PORT'] ?? '5432'),
  PG_MAX: parseInt(process.env?.['PG_MAX'] ?? '3'),
};

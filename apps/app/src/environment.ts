export const environment = {
  LLM_API: process.env?.['LLM_API'] ?? '',
  LLM_API_KEY: process.env?.['LLM_API_KEY'] ?? '',
  EMBEDDING_API: process.env?.['EMBEDDING_API'] ?? '',
  PG_USER: process.env?.['PG_USER'] ?? '',
  PG_HOST: process.env?.['PG_HOST'] ?? '',
  PG_DATABASE: process.env?.['PG_DATABASE'] ?? '',
  PG_PASSWORD: process.env?.['PG_PASSWORD'] ?? undefined,
  PG_PORT: parseInt(process.env?.['PG_PORT'] ?? '5432'),
  PG_MAX: parseInt(process.env?.['PG_MAX'] ?? '3'),
  AUTH_PASSWORD_SALT: process.env?.['AUTH_PASSWORD_SALT'] ?? '',
  AUTH_PRIVATE_KEY: process.env?.['AUTH_PRIVATE_KEY'] ?? '',
};

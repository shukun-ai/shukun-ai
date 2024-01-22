# SHUKUN AI

# Contribute

### installation in development environment

```bash
git clone https://github.com/shukun-ai/ailake.git
# Please use node 18+
npm install

# Copy env file and change environment value here
cp .env .env.local
# For example: add APP_DATABASE_URL=postgresql://postgres@localhost:5432/shukun_ai

# We've test in PostgreSQL 14
npm run db:migrate
npm run db:seed
npm start
```

### Use Database studio to view and manage data

```bash
npm run db:studio
```

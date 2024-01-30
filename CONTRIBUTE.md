# Contribute

### installation in development environment

```bash
git clone https://github.com/shukun-ai/ailake.git
# Please use node 18+
npm install

# Start postgreSQL for development
docker-compose -f docker-compose.development.yml up

# Copy env file and change environment value here
touch .env.local

# We've test in PostgreSQL 14
npm run db:migrate
npm run db:seed
npm start
```

### Use Database studio to view and manage data

```bash
npm run db:studio
```

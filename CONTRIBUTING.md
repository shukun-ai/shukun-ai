# Contribute

### installation in development environment

```bash
git clone https://github.com/shukun-ai/ailake.git
# Please use node 18+
npm install

# Start postgreSQL for development
docker compose -f docker-compose.development.yml up

# Change environment value here
# More environments please see .env file
echo "LLM_API_KEY=<replace_your_open_ai_key>" >> .env.local

npm start
```

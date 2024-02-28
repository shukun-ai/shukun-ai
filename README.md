<p align="center">
    <img src="https://raw.githubusercontent.com/shukun-ai/vi/master/banner-white.png#gh-light-mode-only">
    <img src="https://raw.githubusercontent.com/shukun-ai/vi/master/banner-black.png#gh-dark-mode-only">
</p>

# SHUKUN AI

SHUKUN AI is an AI-native database search application that helps companies explore and analyze data. SHUKUN AI provides a feature that helps you split complex natural language tasks into smaller parts then combines them into the results. This is designed to solve the AI accuracy problems in enterprise-level use cases.

![query-steps](https://raw.githubusercontent.com/shukun-ai/vi/master/v0.1.0-screenshoot-1.png)

## Features

1. LLM Support: Integration with OpenAI's GPT-3.5 or CodeLlama aims to use smaller models to accomplish tasks more quickly and affordably.
2. SQL Assistants: Split complex natural language tasks into smaller parts then combines them into the results.
3. Database Configurations: Works with your exist database, retrieves the structure automatically, and labels the structure effectively.
4. Insight Dashboard: Explore, observe, analyze your data with multiple levels of detail on Dashboard.

## Before You Start

Star us on GitHub, and be instantly notified for new releases!

## Install the Community Edition

### System Requirements

Make sure your machine meets the following minimum system requirements:

- CPU >= 2 Core
- RAM >= 4GB

### Quick Start

The easiest way to start the SHUKUN AI is to run our docker-compose.yml file. Before running the installation command, make sure that Docker and Docker Compose are installed on your machine:

```
git clone https://github.com/shukun-ai/shukun-ai.git
cd shukun-ai/docker
cp ../.env .env
# Update LLM_TYPE, LLM_MODEL, LLM_API, LLM_API_KEY with yours
docker compose up -d
```

After running, you can access the SHUKUN AI in your browser at http://localhost:8877.

## Contributing

For those who'd like to contribute code, see our [Contribution Guide](./CONTRIBUTING.md).

At the same time, please consider supporting SHUKUN AI by sharing it on social media and at events and conferences.

## License

This repository is available under [Apache-2.0](./LICENSE) License.

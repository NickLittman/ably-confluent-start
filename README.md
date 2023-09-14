# Ably-Confluent Kafka Connector with Next.js

## Overview

This repository is a Next.js application that showcases the integration of Ably and Confluent through Ably's Kafka Connector and Confluent Custom Connectors. Features include:

- Ably's React Hooks for real-time updates in the front end
- Confluent Custom Connectors for Kafka streams
- A comprehensive step-by-step guide for setting up and running the application
- Terraform scripts for configuring the Confluent Cloud resources

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Step 1: Create Ably Account](#step-1-create-ably-account)
  - [Step 2: Create Confluent Account](#step-2-create-confluent-account)
  - [Step 3: Set Environment Variables](#step-3-set-environment-variables)
  - [Step 4: Run Terraform Script 1](#step-4-run-terraform-script-1)
  - [Step 5: Upload Connector in UI](#step-5-upload-connector-in-ui)
  - [Step 6: Manually Deploy Connector in UI](#step-6-run-terraform-script-2-or-manually-deploy-in-ui)
  - [Step 7: Run Next.js Development Server](#step-7-run-nextjs-development-server)
- [Architecture](#architecture)
- [Built With](#built-with)
- [Learn More About Next.js](#learn-more-about-nextjs)
- [Deploy on Vercel](#deploy-on-vercel)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- Ably Account
- Confluent Account
- Terraform installed
- Node.js and npm installed
- Basic understanding of React, Next.js, and Kafka

## Getting Started

Follow these steps to get the application up and running.

### Step 1: Create Ably Account

- Navigate to [Ably](https://ably.com/sign-up) and sign up for an account.

### Step 2: Create Confluent Account

- Navigate to [Confluent](https://www.confluent.io/get-started/) and sign up for an account.

### Step 3: Set Environment Variables

- Make a copy of the `.env.example` file and rename it to `.env.local` then populate it with your Ably and Confluent API keys.

#### How to find Ably Key
1. Navigate to the [Ably Dashboard](https://ably.com/).
2. Click on the key you want to use.
3. Copy the API key.
4. Paste the API key value in the `.env.local` file for the key `ABLY_API_KEY`

#### How to find Confluent Key
1. Navigate to the [Confluent Dashboard](https://confluent.cloud/).
2. Click on the key you want to use.
3. Copy the API key.
4. Paste the API Key in the variables.tf file for the key `CONFLUENT_API_KEY`

### Step 4: Run Terraform Script 1

- Initialize and apply the first Terraform script.
    
    ```bash
    terraform init
    terraform apply
    ```
- This script will create the following resources in Confluent Cloud:

### Step 5: Upload Connector in UI

- Go to the Confluent UI and upload the Kafka Connector.

### Step 6: Manually Deploy Connector in UI

- Manually deploy resources in the Confluent UI.

### Step 7: Run Next.js Development Server

```bash
npm run dev
```

## Architecture

Describe the architecture of the application.

## Built With

- Next.js
- Ably React Hooks
- Confluent Custom Connectors
- Terraform

## Learn More About Next.js

For more information about Next.js, check:

- [Next.js Documentation](https://nextjs.org/docs)

## Deploy on Vercel

For deploying on Vercel, see:

- [Vercel Deployment Guide](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

## Contributing

For guidelines on how to contribute, see:

- [CONTRIBUTING.md](CONTRIBUTING.md)

## License

This project is licensed under the MIT License - see:

- [LICENSE.md](LICENSE.md)

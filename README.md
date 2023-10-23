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

#### How to create a Confluent Cloud API Key
1. Create you Cloud API Key on Confluent Cloud by following the steps [here]([https://www.confluent.io/get-started/](https://docs.confluent.io/cloud/current/access-management/authenticate/api-keys/api-keys.html#create-a-cloud-api-key)).
2. Download and store your API keys safely as we will be using this while creating and destroying resources with Terraform in the upcoming steps.

### Step 4: Run Terraform Script

- Initialize and apply the Terraform script.
    
    ```bash
    terraform init
    terraform apply
    ```  
- Enter you Cloud API Key and Secret as prompted
- Type `yes` to confirm that you would like to run the Terraform script
    
- This script will create the following resources in Confluent Cloud:
  - A Confluent Cloud Environment
  - A Basic Cluster
  - A Schema Registry Instance
  - A Service Account
  - A topic called Orders
  - A Datagen Source Connector

### Step 5: Upload Connector in Confluent Cloud UI

1. Obtain the .zip of the connector as per Ably's [manual installation guide](https://github.com/ably/kafka-connect-ably#manual-installation).
2. Log in to your Confluent Cloud account and inside the cluster on your Confluent Cloud account go to the Connectors tab and click on `Add Connector`
3. Instead of selecting Ably Kafka Connector from the Hub, instead click `Add Plugin`
4. Give the plugin a name, and set the class to com.ably.kafka.connect.ChannelSinkConnector
5. Select `Sink Connector`
6. Upload the .zip file you obtained in step 1 by clicking on `Select connector archive`
7. Click on `Apply` to upload the connector plugin

### Step 6: Deploy Connector in Confluent Cloud UI

1. Navigate back to the Connectors tab and select the plugin name you uploaded in the previous step to luanch the connector configuration and deployment
2. Select `Generate API key & download` to create a Global API key for the connector
3. Select the option to configure your connector via JSON and insert the following, replacing the placeholder with your Ably API key:
  ```json
  {
  "connector.class": "com.ably.kafka.connect.ChannelSinkConnector",
  "tasks.max": "1",
  "group.id": "ably-connect-cluster",
  "topics": "orders",
  "client.id": "Ably-Kafka-Connector",
  "channel": "#{topic}",
  "message.name": "#{topic}_message",
  "client.key": "<YOUR_ABLY_API_KEY>",
  "key.converter": "org.apache.kafka.connect.converters.ByteArrayConverter",
  "value.converter": "org.apache.kafka.connect.converters.ByteArrayConverter",
  "value.converter.schemas.enable": "false"
  }
  ```
4. When asked for an endpoint, enter `rest.ably.io:443:TCP`
5. Continue with the remaining steps of the connector configurations with the default selections and launch the connector
   
### Step 7: Run Next.js Development Server

```bash
npm run dev
```

## Cleaning up

- To delete the custom connector:

Go back to the Connectors tab on your Confluent Cloud cluster, select the custom connector, navigate to it's Settings tab and select `Delete Connector`. Note: The Datagen Connector will be deleted with the rest of the Confluent Cloud environment in the next step.

- To tear down the Confluent Cloud environment:

Run the following command on your terminal and confirm by typing "yes" when prompted. You will once again need to provide your Cloud API key and secret:

```
terraform destroy
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

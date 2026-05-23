# Solana Blink Action API

A professional-grade backend for building **Solana Actions**. This project enables "Blinks" (Blockchain Links), allowing transactions—such as token transfers or NFT mints—to be executed directly from social media feeds or browser bars without navigating to a separate dApp.

## Features
- **Action-Spec Compliant:** Fully supports the Solana Actions and Blinks specification.
- **Dynamic Metadata:** Returns professional UI metadata (titles, icons, descriptions) to the client.
- **CORS Pre-configured:** Essential for cross-origin Action discovery by wallets.
- **Express.js Base:** Lightweight and high-performance Node.js framework.

## How to Use
1. Install dependencies: `npm install`
2. Run the server: `node index.js`
3. Use a Blink-compatible wallet (like Phantom or Backpack) to test the `http://localhost:3000/api/actions/transfer` endpoint.

## Tech Stack
- Node.js & Express
- @solana/web3.js
- @solana/actions

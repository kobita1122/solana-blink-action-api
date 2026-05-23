const express = require('express');
const cors = require('cors');
const { 
  Connection, 
  PublicKey, 
  SystemProgram, 
  Transaction, 
  clusterApiUrl, 
  LAMPORTS_PER_SOL 
} = require('@solana/web3.js');

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept-Encoding"]
}));

// Action Metadata Endpoint (GET)
app.get('/api/actions/transfer', (req, res) => {
  const payload = {
    icon: "https://cryptologos.cc/logos/solana-sol-logo.png",
    title: "Support NAZRUUL's Development",
    description: "Send 0.1 SOL to support the creation of open-source Web3 repositories.",
    label: "Send 0.1 SOL",
    links: {
      actions: [
        {
          label: "Send 0.1 SOL",
          href: "/api/actions/transfer"
        }
      ]
    }
  };
  res.json(payload);
});

// Action Execution Endpoint (POST)
app.post('/api/actions/transfer', async (req, res) => {
  try {
    const { account } = req.body; // Wallet address of the user clicking the blink
    if (!account) return res.status(400).json({ error: "No account provided" });

    const userPubKey = new PublicKey(account);
    const connection = new Connection(clusterApiUrl("mainnet-beta"));
    
    // Create a simple transfer transaction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: userPubKey,
        toPubkey: new PublicKey("6v6yYQj7X7X7X7X7X7X7X7X7X7X7X7X7X7X7X7X7"), // Example Dev Address
        lamports: 0.1 * LAMPORTS_PER_SOL,
      })
    );

    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = userPubKey;

    // Serialize and return the transaction
    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    });

    res.json({
      transaction: serializedTransaction.toString("base64"),
      message: "Thanks for your support!"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Blink API running on port ${PORT}`));

# Shopify Webhook HMAC Verification Example

A minimal Node.js Express server that demonstrates how to securely receive and verify Shopify webhooks using HMAC SHA256 validation.

## Features

- Receives Shopify webhooks at `/`
- Validates webhook authenticity using HMAC SHA256 and your Shopify app secret
- Logs the webhook payload if validation passes

## Requirements

- Node.js v18 or higher
- A Shopify app secret (replace `SHOPIFY_SECRET` in `index.js`)

## Installation

```bash
git clone https://github.com/your-username/webhook-test-verify.git
cd webhook-test-verify
npm install
```

## Usage

1. **Set your Shopify app secret**  
   Edit `index.js` and set the `SHOPIFY_SECRET` variable to your app's secret key.

2. **Start the server**

   ```bash
   node index.js
   ```

   The server will run on [http://localhost:8880](http://localhost:8880).

3. **Configure your Shopify webhook**  
   - Set the webhook URL to your server's address (e.g., `http://your-server:8880/`)
   - Set the webhook format to JSON

## How it works

- The server uses `body-parser` to access the raw request body for HMAC validation.
- It compares the HMAC from Shopify (`x-shopify-hmac-sha256` header) with a locally generated HMAC.
- If the HMACs match, the webhook is considered authentic.

## Example

```bash
curl -X POST http://localhost:8880/ \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Hmac-Sha256: <calculated-hmac>" \
  -d '{"example":"payload"}'
```

## License

MIT
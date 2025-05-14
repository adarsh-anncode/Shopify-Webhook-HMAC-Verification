const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = 8880;
const SHOPIFY_SECRET = 'd4fa585e7cf19447a8b69b4ebedf27eb'; // found in Partners Dashboard

// To get raw body for HMAC validation
app.use(bodyParser.raw({ type: 'application/json' }));

// Webhook endpoint
app.post('/', (req, res) => {
  const hmac = req.headers['x-shopify-hmac-sha256'];
  const generatedHmac = crypto
    .createHmac('sha256', SHOPIFY_SECRET)
    .update(req.body, 'utf8')
    .digest('base64');

  if (hmac !== generatedHmac) {
    console.log('🔒 HMAC validation failed');
    return res.status(403).send('Unauthorized');
  }

  const payload = JSON.parse(req.body.toString('utf8'));
  console.log('✅ CART CREATED:', payload);

  res.status(200).send('Webhook received');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

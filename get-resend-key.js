// Quick script to create a Resend API key and save it
// Usage: node get-resend-key.js YOUR_EXISTING_KEY

const https = require('https');
const fs = require('fs');

const existingKey = process.argv[2];

if (!existingKey) {
  console.error('❌ Please provide your existing Resend API key');
  console.error('Usage: node get-resend-key.js re_your_existing_key');
  process.exit(1);
}

const data = JSON.stringify({
  name: 'cal.com-booking',
  permission: 'sending_access',
  domain_id: null // Will use all domains
});

const options = {
  hostname: 'api.resend.com',
  port: 443,
  path: '/api-keys',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${existingKey}`,
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('🔑 Creating new Resend API key...\n');

const req = https.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 201) {
      const result = JSON.parse(responseData);

      console.log('✅ API Key created successfully!\n');
      console.log('📋 Your new API key:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(result.token);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      // Save to file
      fs.writeFileSync('.env.resend', `RESEND_API_KEY=${result.token}\n`);
      console.log('💾 Saved to .env.resend file\n');
      console.log('🎯 Next step: Add this key to Cal.com');
    } else {
      console.error('❌ Error:', res.statusCode);
      console.error(responseData);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error);
});

req.write(data);
req.end();

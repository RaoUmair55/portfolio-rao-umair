# EmailJS Setup Guide

Your contact form is now fully functional! Follow these steps to enable email sending:

## Step 1: Create EmailJS Account
1. Go to [emailjs.com](https://emailjs.com)
2. Sign up for a free account

## Step 2: Set Up Email Service
1. Navigate to **Email Services** in the dashboard
2. Click **Add Service**
3. Select **Gmail** (or your preferred email provider)
4. Follow the steps to connect your email
   - Use your Gmail account: `raoumair554@gmail.com`
   - Allow EmailJS to access your account
5. Save and note your **Service ID** (format: `service_xxxxx`)

## Step 3: Create Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Set up the template with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{message}}` - Message content
4. Save and note your **Template ID** (format: `template_xxxxx`)

Example template body:
```
New message from {{from_name}} ({{from_email}}):

{{message}}
```

## Step 4: Get Your Public Key
1. Go to **Account** → **API Keys**
2. Copy your **Public Key**

## Step 5: Update Contact.tsx
Replace the values in `src/components/Contact.tsx` (line with `emailjs.init`):

```typescript
// Find this line:
emailjs.init('YOUR_PUBLIC_KEY_HERE');

// Replace with your actual public key
emailjs.init('TG_rwEj9qJFJXqzxL');

// Update the emailjs.send call (around line 50):
await emailjs.send(
  'YOUR_SERVICE_ID',     // Replace with your Service ID
  'YOUR_TEMPLATE_ID',    // Replace with your Template ID
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_email: 'raoumair554@gmail.com'
  }
);
```

## Example Configuration
```typescript
// In Contact.tsx:
emailjs.init('YOUR_PUBLIC_KEY_HERE');

await emailjs.send(
  'service_xxxxx',       // Your Service ID
  'template_xxxxx',      // Your Template ID
  { ... }
);
```

## That's It!
Your contact form will now send emails successfully. Test it by filling out the form and clicking "Send Message".

## Troubleshooting
- **"Service ID not found"**: Check your Service ID is correct
- **"Template ID not found"**: Check your Template ID is correct
- **"Unauthorized"**: Check your Public Key is correct
- **Emails not arriving**: Check Gmail spam folder and verify template is set up correctly

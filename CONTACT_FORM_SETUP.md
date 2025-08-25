# Contact Form Email Setup Guide

This guide will help you set up your contact form to send emails using Resend.

## Prerequisites

1. **Resend Account**: Sign up at [resend.com](https://resend.com)
2. **API Key**: Get your API key from the Resend dashboard

## Setup Steps

### 1. Update Email Configuration

Edit `src/config/email.ts` and replace the placeholder values:

```typescript
export const emailConfig = {
  // Replace with your actual Resend API key
  apiKey: 're_1234567890...',
  
  // Replace with your email address where you want to receive messages
  contactEmail: 'your-email@example.com',
  
  // Keep this as is for now (you can update later with your domain)
  fromEmail: 'Contact Form <onboarding@resend.dev>',
  
  subjectTemplate: 'New Contact Form Submission from {name}'
};
```

### 2. Test the Form

1. Start your development server: `npm run dev`
2. Navigate to your contact page
3. Fill out and submit the form
4. Check your email for the message

## How It Works

### Frontend (Form.astro)
- The form collects user input (name, email, message, etc.)
- JavaScript handles form submission and sends data to `/api/contact`
- Shows loading states and success/error messages
- Automatically clears the form on successful submission

### Backend (contact.ts)
- Receives form data via POST request
- Validates required fields and email format
- Uses Resend API to send emails
- Returns success/error responses to the frontend

### Email Configuration (email.ts)
- Centralized configuration for API keys and email addresses
- Easy to update without modifying the main code
- Can be extended to use environment variables in production

## Customization Options

### Add More Form Fields
1. Update the form inputs in your Contact component
2. Add the new field names to the API endpoint
3. Include them in the email template

### Change Email Template
Modify the HTML and text templates in `src/pages/api/contact.ts`:

```typescript
html: `
  <h2>Custom Email Template</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Message:</strong> ${message}</p>
  // Add your custom HTML here
`,
```

### Use Environment Variables (Production)
For production, you can modify `src/config/email.ts` to use environment variables:

```typescript
export const emailConfig = {
  apiKey: import.meta.env.RESEND_API_KEY || 'fallback_key',
  contactEmail: import.meta.env.CONTACT_EMAIL || 'default@email.com',
  // ... other config
};
```

## Troubleshooting

### Common Issues

1. **"Failed to send email" error**
   - Check your Resend API key is correct
   - Verify your Resend account is active
   - Check the browser console for detailed error messages

2. **Form not submitting**
   - Ensure all required fields are filled
   - Check browser console for JavaScript errors
   - Verify the API endpoint is accessible

3. **Emails not received**
   - Check your spam folder
   - Verify the `contactEmail` address is correct
   - Check Resend dashboard for delivery status

### Debug Mode

Add console logs to the API endpoint for debugging:

```typescript
console.log('Form data received:', { name, email, message, service });
console.log('Sending email to:', emailConfig.contactEmail);
```

## Security Considerations

- Never commit API keys to version control
- Use environment variables in production
- Implement rate limiting for production use
- Consider adding CAPTCHA for spam prevention
- Validate and sanitize all form inputs

## Next Steps

1. Test the form thoroughly
2. Customize the email template to match your brand
3. Set up a custom domain in Resend for professional emails
4. Add additional form validation as needed
5. Consider implementing email templates for different use cases

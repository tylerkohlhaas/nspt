// Email Configuration
// Update these values with your actual email and Resend settings

export const emailConfig = {
  // Your Resend API key - get this from https://resend.com/api-keys
  // In production, this should be set as an environment variable
  apiKey: process.env.RESEND_API_KEY,
  
  // The email address where you want to receive contact form messages
  // Replace this with your actual email address
  contactEmail: 'tyler@nspt.ca',
  
  // The "from" email address for your contact form
  // In production, this should be your verified domain
  // For now, you can use the Resend onboarding email
  fromEmail: 'Contact Form <contact@nspt.ca>',
  
  // Email subject template
  subjectTemplate: 'New Contact Form Submission from {name}'
};

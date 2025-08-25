
export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { emailConfig } from '~/config/email';


// Initialize Resend with your API key
// In production, this should come from environment variables
const resend = new Resend(emailConfig.apiKey);

// This is an API endpoint that handles POST requests
// APIRoute is Astro's way of creating server-side API endpoints
export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('API endpoint hit');
    // Parse the form data from the request
    // FormData is a built-in web API for handling form submissions
    const formData = await request.formData();
    console.log('formData received:', formData);
    
    // Extract form fields - these should match the names in your form
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const service = formData.get('service') as string; // Optional service field
    console.log('Fields extracted:', { name, email, message, service });
    
    // Basic validation - ensure required fields are present
    if (!name || !email || !message || !service) {
      return new Response(
        JSON.stringify({
          message: 'Missing required fields: name, email, and message are required'
        }),
        { status: 400 }
      );
    }
    
    // Validate email format using a simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          message: 'Invalid email format'
        }),
        { status: 400 }
      );
    }
    
    // Send email using Resend
    // The email will be sent to the address specified in emailConfig.contactEmail
    const { data, error } = await resend.emails.send({
      from: emailConfig.fromEmail,
      to: [emailConfig.contactEmail],
      subject: emailConfig.subjectTemplate.replace('{name}', name),
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      // You can also send a text version for email clients that don't support HTML
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        ${service ? `Service: ${service}` : ''}
        Message: ${message}
      `
    });
    
    if (error) {
      console.error('Resend error:', error);
      return new Response(
        JSON.stringify({
          message: 'Failed to send email. Please try again later.'
        }),
        { status: 500 }
      );
    }
    
    // Success response
    return new Response(
      JSON.stringify({
        message: 'Email sent successfully!',
        id: data?.id
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
  } catch (error) {
    // Handle any unexpected errors
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({
        message: 'An unexpected error occurred. Please try again later.'
      }),
      { status: 500 }
    );
  }
};

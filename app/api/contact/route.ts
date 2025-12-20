import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      service,
      vehicleYear,
      vehicleMake,
      vehicleModel,
      vehicleColor,
      message,
    } = body;

    // Send notification email to business owner
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Use your verified domain later
      to: process.env.BUSINESS_EMAIL || 'your-email@example.com', // Replace with your email
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address || 'Not provided'}</p>
        <p><strong>Service:</strong> ${service}</p>
        ${vehicleYear ? `<p><strong>Vehicle:</strong> ${vehicleYear} ${vehicleMake} ${vehicleModel} (${vehicleColor || 'N/A'})</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Send auto-reply to customer
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Use your verified domain later
      to: email,
      subject: 'Thank you for contacting us!',
      html: `
        <h2>Thank you for your message!</h2>
        <p>Hi ${firstName},</p>
        <p>We've received your inquiry about ${service}. We'll get back to you within 24 hours.</p>
        <p>Here's a summary of your submission:</p>
        <ul>
          <li><strong>Service:</strong> ${service}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        <p>Best regards,<br>Your Auto Detailing Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
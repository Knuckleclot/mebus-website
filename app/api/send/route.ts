import EmailTemplate from '@/components/email-template';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY! || "");

export async function POST(request: NextRequest) {
  console.log("API route called");
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY environment variable");
  }
  try {
    const body = await request.json();
    console.log("Received body:", body);
    const { email, companyName, contactName } = body;

    console.log("Attempting to send email...");
    const data = await resend.emails.send({
      from: 'Busly <noreply@portal.insylink.com>', 
      to: email,
      subject: 'Application Received',
      react: EmailTemplate({ companyName, contactName }),
    });
    console.log("Resend API response:", data);

    console.log("Sending notification to team...");
    const teamNotification = await resend.emails.send({
      from: 'Partner Applications <applications@portal.insylink.com>', 
      to: '007lazi@gmail.com', 
      subject: 'New Partner Application',
      react: EmailTemplate({ companyName, contactName }),
    });
    console.log("Team notification response:", teamNotification);

    return NextResponse.json({ message: "Emails sent successfully", data }, { status: 200 });
  } catch (error) {
    console.error('Error processing application:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return NextResponse.json({ error: 'Error processing application' }, { status: 500 });
  }
}
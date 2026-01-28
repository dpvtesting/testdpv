import { Resend } from 'resend'

export async function POST(req) {
  const body = await req.json()
  const { name, company, email, message } = body

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TARGET,
      subject: 'Web Contact Form Notification',
      text: `New form submitted:
Name: ${name}
Company: ${company}
Email: ${email}
Message: ${message}`
    });

    return new Response(JSON.stringify({ message: 'Email sent' }), {
      status: 200,
    })
  } catch (err) {
    console.error('Email error:', err)
    return new Response(JSON.stringify({ message: 'Failed to send email' }), {
      status: 500,
    })
  }
}
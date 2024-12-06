import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type EmailRequestBody = {
  title: string;
  email: string;
  message: string;
};

export async function POST(req: Request) {
  try {
    const { EMAIL_TO, EMAIL_FROM, SMTP_USER, SMTP_PASS } = process.env;

    if (!EMAIL_TO || !EMAIL_FROM || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json({ status: 'Environment variables missing' }, { status: 500 });
    }

    const postData: EmailRequestBody = await req.json();

    if (!postData) {
      return NextResponse.json({ status: 'No data received' }, { status: 400 });
    }

    const { title, email, message } = postData;

    const mailOptions = {
      from: `"${EMAIL_FROM}" <${EMAIL_FROM}>`,
      to: `${email},${EMAIL_TO}`,
      subject: 'お問い合わせありがとうございます',
      html: `
        <p>以下の内容でお問い合わせを承りました。</p>
        <p style='padding: 12px; border-left: 4px solid #d0d0d0;'>メールアドレス: ${email}</p>
        <p style='padding: 12px; border-left: 4px solid #d0d0d0;'>題名: ${title}</p>
        <p style='padding: 12px; border-left: 4px solid #d0d0d0;'>お問い合わせ内容: ${message}</p>
      `,
    };

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ status: 'success', info }, { status: 200 });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ status: 'fail', error: error.message }, { status: 500 });
  }
}

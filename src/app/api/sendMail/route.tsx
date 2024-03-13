import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'


export async function POST(request: any) {
    try {
        const { message } = await request.json();
        console.log(message);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 456,
            secure: true,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });


        const composeMail = {
            from: process.env.SMTP_EMAIL,
            to: process.env.SMTP_EMAIL,
            subject: 'From Website User',
            html: `<div>Message:${message}</div>`

        }

        await transporter.sendMail(composeMail)

        return NextResponse.json({ message: 'email sent successfully' }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ message: 'Failed to send email' }, { status: 500 })
    }

}



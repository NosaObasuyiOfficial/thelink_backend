import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const { DEV_GMAIL_USER, DEV_GMAIL_PASSWORD } = process.env
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: DEV_GMAIL_USER,
        pass: DEV_GMAIL_PASSWORD
    },
    tls:{
        rejectUnauthorized: false
    }
})

export const sendmail = async(from:string, to:string, subject:string, html:string)=>{
    try{
         await transporter.sendMail({
            from: DEV_GMAIL_USER,
            to,
            subject,
            html,
        })
    }catch(err){
        console.log(err)
    
    }
}

export const emailHtmlForUser = ()=>{
    const mail = `
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #275C5E;
            color: white;
            text-align: center;
            padding: 20px 10px;
        }
        .header img {
            max-width: 150px;
            height: auto;
        }
        .content {
            padding: 20px;
            text-align: justify;
        }
        .button {
            display: inline-block;
            background-color: #275C5E;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin: 10px 0;
            font-size: 16px;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            padding: 15px;
            background-color: #f9f9f9;
            color: #888;
        }
        .footer span {
            color: #275C5E;
            font-weight: bold;
        }
        a {
            color: #275C5E;
            text-decoration: none;
        }
        .note {
            font-size: 12px;
            color: #666;
            text-align: center;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="https://i.imgur.com/DYnK8Qi.png" alt="Pr and Marketing Solutions Logo">
            <h1>Thank You for Subscribing!</h1>
        </div>
        <div class="content">
            <h4>Welcome,</h4>
            <p>We’re thrilled to have you as part of our growing community at <strong>The Link PR and Marketing Solutions</strong>! Thank you for subscribing to stay connected with us.</p>
            <p>We’ll be sure to keep you updated and will alert you the moment our site goes live. Exciting things are coming, and we can’t wait for you to see them!</p>
            <p>In the meantime, if you have any questions or suggestions, feel free to reach out to us. Your feedback helps us grow and improve!</p>
            <a href="mailto:thelinkprandmarketingsolutions@gmail.com" class="button">Contact Us</a>
        </div>
        <div class="footer">
            <p>Thank you for your support! We’re excited to take this journey with you.</p>
            <p>Powered by <span>The Link PR and Marketing Solutions</span></p>
        </div>
        <div class="note">
            <p>Please do not reply to this email, as it is a system-generated message.</p>
        </div>
    </div>
</body>`
  return mail
}
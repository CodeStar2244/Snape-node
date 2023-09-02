import nodemailer from 'nodemailer'
import * as fs from 'fs';
import * as path from 'path'
import * as ejs from 'ejs';

export class Mailer {

    public static async renderTemplate(templateName, templateData) {
        const templatePath = path.join(__dirname, `../templates/${templateName}.ejs`);
        const mailTemplate = ejs.renderFile(templatePath, templateData)
        return mailTemplate

    }

    public static sendMail(userEmail: any, subject: any, body: string) {
        const transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: +process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
        let mailOptions = {
            from: process.env.MAIL_USER,
            to: userEmail,
            subject: subject,
            html: body
        };
        transport.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log("Error " + err);
            } else {
                console.log(data, "Email sent successfully");
            }
        });
    }
}
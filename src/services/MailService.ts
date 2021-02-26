import nodemailer, { Transporter } from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'

class MailService {

    private portSmtp = process.env.PORT_SMTP || '0';
    private client: Transporter

    constructor() {
        const transporter =  nodemailer.createTransport({
            host: process.env.HOST_SMTP || '',
            port: parseInt(this.portSmtp),
            auth: {
                user: process.env.USER_SMTP || '',
                pass: process.env.PASSWORD_SMTP || ''
            }
        })
        this.client = transporter
    }

    async send(to: string, subject: string, variables: object, path: string) {
        const template = fs.readFileSync(path, 'utf8')
        const mailTemplateParse = handlebars.compile(template)
        const html = mailTemplateParse(variables)

        await this.client.sendMail({
            to,
            subject,
            html,
            from: 'NPS <noreplay@andersoninfonet.com>'
        })
    }
}

export default new MailService()
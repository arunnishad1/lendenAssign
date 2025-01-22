const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()

const sendEmail = async function(email, subject,message){
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            });
            
        await transporter.sendMail({
                from: process.env.SMTP_FROM_EMAIL, // sender address
                to: email, // list of receivers
                subject:subject, // Subject line
                html: message, // html body
            });
            }
            catch (error) {
                console.log("ERROR:",error)
            }
    } 
    
module.exports = sendEmail;

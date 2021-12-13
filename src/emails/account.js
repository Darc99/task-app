const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'lennyyhugoh@gmail.com',
        subject: 'Welcome to Task App',
        text: `${name}, welcome to the app. Let me know how you get along with the app`,
    })
}

const sendDeleteEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'lennyyhugoh@gmail.com',
        subject: 'Profile Deletion',
        text: `Good Bye ${name}. Was there anything that could have been done to keep you?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendDeleteEmail
}
import nodemailer from 'nodemailer';



// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


/**
 * Send an email
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - Email body (HTML)
 */
export const sendEmail = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"${process.env.APP_NAME || 'JumaTrek'}" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
        console.log("Email sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

/**
 * Send Booking Confirmation Email
 * @param {object} bookingData - The booking details
 * @param {object} user - User details (if available, otherwise use booking contact info)
 */
export const sendBookingConfirmationEmail = async (booking) => {
    const { email, name, trekName, preferredDate, groupSize } = booking;

    const subject = `Booking Confirmation: ${trekName}`;

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            .header { background-color: #4CAF50; color: white; padding: 10px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { padding: 20px; }
            .details { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
            .footer { text-align: center; font-size: 12px; color: #777; margin-top: 20px; }
            .button { display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Booking Received!</h1>
            </div>
            <div class="content">
                <p>Dear ${name},</p>
                <p>Thank you for choosing JumaTrek! We have received your booking request for <strong>${trekName}</strong>.</p>
                
                <div class="details">
                    <h3>Please verify your booking details:</h3>
                    <p><strong>Trek:</strong> ${trekName}</p>
                    <p><strong>Start Date:</strong> ${new Date(preferredDate).toLocaleDateString()}</p>
                    <p><strong>Group Size:</strong> ${groupSize}</p>
                    <p><strong>Contact Email:</strong> ${email}</p>
                </div>

                <p>Our staff will review your request and contact you shortly to finalize the arrangements.</p>
                
                <p><strong>Is something incorrect?</strong></p>
                <p>If any of the details above are wrong, please reply to this email or contact our support team immediately.</p>
                
                <p>Support Contact: <a href="mailto:support@jumatrek.com">support@jumatrek.com</a></p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} JumaTrek. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;

    return sendEmail(email, subject, html);
};

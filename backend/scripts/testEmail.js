import 'dotenv/config'; // Load env vars before other imports
import { sendBookingConfirmationEmail } from '../utils/emailService.js';

const testBookingData = {
    email: 'test@example.com', // Change this to your email to verify receipt
    fullName: 'Test User',
    trekName: 'Everest Base Camp',
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 14)),
    guests: 2
};

console.log('Attempting to send test email...');
try {
    const info = await sendBookingConfirmationEmail(testBookingData);
    console.log('Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    if (info.messageId) {
        console.log('Verification Passed: Email functionality is working (assuming credentials are correct).');
    }
} catch (error) {
    console.error('Test email failed:', error.message);
    console.log('Verification Failed: Please check your .env credentials.');
}

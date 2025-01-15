import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { sender, transport } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipent = [email];
    
    try {
        const response = await transport.sendMail({
            from: sender,
            to: recipent,
            subject: "Verify Your Email!",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        });

        console.log("Email sent successfully", response);

    } catch(error) {
        console.error(`Error sending verification ${error}`);

        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    const recipent = [email];

    try {
        const response = await transport.sendMail({
            from: sender,
            to: recipent,
            subject: "Welcome to Auth Company",
            template_uuid: "c14f8bf0-1643-4d2d-9917-aae81ac0c9b6",
            template_variables : {
                "company_info_name": "Auth Company",
                "name": name,
            },
            text: `Welcome to Auth Company, ${name}! We're thrilled to have you onboard.`,
        });

        console.log("Welcome email sent successfully", response);

    } catch (error) {
        console.error(`Error sending welcome email ${error}`);

        throw new Error(`Error sending email email: ${error}`);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipent = [email];

    try {
        const response = await transport.sendMail({
            from: sender,
            to: recipent,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password reset"
        });

        console.log("Password reset email sent successfully ", response);

    } catch (error) {
        console.error(`Error sending password reset email `, error);

        throw new Error(`Error sending password reset email: ${error}`);
    }


};

export const sendResetSuccessEmail = async (email) => {
    const recipent = [email];

    try {
        const response = await transport.sendMail({
            from: sender,
            to: recipent,
            subject: "Password reset successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        });

        console.log("Password reset email sent successfully ", response);
    } catch (error) {
        console.error(`Error sending password reset success email `, error);
        throw new Error(`Error sending password reset success email: ${error}`);
    }
};  
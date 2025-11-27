import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (user, verificationToken) => {
    const verificationUrl = `${process.env.BACKEND_URL}/api/auth/verify-email?token=${verificationToken}`;

    const htmlContent = `
        <h2>Hola ${user.name},</h2>
        <p>Gracias por registrarte en la Agenda de Tareas. Para completar el proceso, haz clic en el siguiente enlace:</p>
        <p><a href="${verificationUrl}" style="background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verificar mi Cuenta</a></p>
        <p>Si no solicitaste esto, ignora este correo.</p>
    `;

    try {
        const data = await resend.emails.send({
            from: "onboarding@resend.dev", // o un dominio tuyo si querés
            to: user.email,
            subject: "Verificación de Correo Electrónico para Agenda de Tareas",
            html: htmlContent,
        });

        console.log("Email enviado:", data);
    } catch (error) {
        console.error("Error enviando email:", error);
    }
};

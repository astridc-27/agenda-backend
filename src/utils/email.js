import { Resend } from 'resend';

const resend = new Resend(); 

export const sendVerificationEmail = async (user, verificationToken) => {
    
    const verificationUrl = `${process.env.BACKEND_URL}/api/auth/verify-email?token=${verificationToken}`;

    const htmlContent = `
        <h2>Hola ${user.name},</h2>
        <p>Gracias por registrarte en la Agenda de Tareas. Para completar el proceso, haz clic en el siguiente enlace:</p>
        <p><a href="${verificationUrl}" style="background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verificar mi Cuenta</a></p>
        <p>Si no solicitaste esto, ignora este correo.</p>
    `;

    try {
        const { data, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM, 
            to: user.email,
            subject: 'Verificación de Correo Electrónico para Agenda de Tareas',
            html: htmlContent,
        });

        if (error) {
            console.error(`Error al enviar email a ${user.email} con Resend:`, error);
            throw new Error(`Fallo al enviar correo: ${error.message}`); 
        } else {
            console.log(`Email de verificación enviado a ${user.email}. ID de Resend: ${data.id}`);
        }

    } catch (error) {
        console.error(`Error de Resend (Try/Catch) al enviar email a ${user.email}:`, error);
        throw error; 
    }
};
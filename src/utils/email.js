import { Resend } from 'resend';

// Inicializa Resend. Utilizará automáticamente la variable RESEND_API_KEY.
const resend = new Resend(); 

export const sendVerificationEmail = async (user, verificationToken) => {
    
    // BACKEND_URL ya está configurada en Render
    const verificationUrl = `${process.env.BACKEND_URL}/api/auth/verify-email?token=${verificationToken}`;

    const htmlContent = `
        <h2>Hola ${user.name},</h2>
        <p>Gracias por registrarte en la Agenda de Tareas. Para completar el proceso, haz clic en el siguiente enlace:</p>
        <p><a href="${verificationUrl}" style="background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verificar mi Cuenta</a></p>
        <p>Si no solicitaste esto, ignora este correo.</p>
    `;

    try {
        const { data, error } = await resend.emails.send({
            // Usará el valor de la variable EMAIL_FROM de Render: 'Agenda de Tareas <caceres.astrid27@gmail.com>'
            from: process.env.EMAIL_FROM, 
            to: user.email,
            subject: 'Verificación de Correo Electrónico para Agenda de Tareas',
            html: htmlContent,
        });

        if (error) {
            console.error(`Error al enviar email a ${user.email} con Resend:`, error);
            // Esto es crucial para que el registro falle si el correo no se envía
            throw new Error(`Fallo al enviar correo: ${error.message}`); 
        } else {
            console.log(`Email de verificación enviado a ${user.email}. ID de Resend: ${data.id}`);
        }

    } catch (error) {
        console.error(`Error de Resend (Try/Catch) al enviar email a ${user.email}:`, error);
        throw error; // Propagar el error para que el endpoint de registro pueda manejarlo
    }
};

// Se elimina la función getTransporter, ya que no se usa Nodemailer.
import nodemailer from 'nodemailer';

let transporter = null; 

const getTransporter = () => {
    if (transporter) {
        return transporter;
    }
    
    transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVICE_HOST,
        port: process.env.EMAIL_SERVICE_PORT,
        secure: false, 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    return transporter;
};


export const sendVerificationEmail = async (user, verificationToken) => {
    const mailTransporter = getTransporter(); 

    const verificationUrl = `${process.env.BACKEND_URL}/api/auth/verify-email?token=${verificationToken}`;

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: 'Verificación de Correo Electrónico para Agenda de Tareas',
        html: `
            <h2>Hola ${user.name},</h2>
            <p>Gracias por registrarte en la Agenda de Tareas. Para completar el proceso, haz clic en el siguiente enlace:</p>
            <p><a href="${verificationUrl}" style="background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verificar mi Cuenta</a></p>
            <p>Si no solicitaste esto, ignora este correo.</p>
        `,
    };

    try {
        await mailTransporter.sendMail(mailOptions);
        console.log(`Email de verificación enviado a ${user.email}`);
    } catch (error) {
        console.error(`Error al enviar email a ${user.email}:`, error);
    }
};
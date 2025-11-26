import mongoose from 'mongoose'; 
import bcrypt from 'bcryptjs';


const UserSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
        select: false, 
    },
    verificationToken: String, 
    verificationTokenExpiry: Date, 
    isVerified: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    collection: 'users'
});


UserSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return; 
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
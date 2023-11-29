import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    nickname: { type: String, required: true, },
    prefix: { type: String, required: true, },
    phone: { type: Number, required: true, },
    gender: { type: String, required: true, },
    folderPassword: { type: String, required: false, }
})

userSchema.pre('save', async function (next) {
    const user = this;
    //Encrypt password
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
    }
    next()
})

userSchema.methods.comparePassword = async function (candidatePassword: any) {
    return await bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
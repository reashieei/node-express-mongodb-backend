import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            lowercase: true,
            trim: true,
            minlength: [1, "Username must be at least 1 character long"],
            maxlength: [30, "Username cannot exceed 30 characters"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            validate: {
                validator: function (value) {
                    // Allow already hashed bcrypt string
                    if (typeof value === "string" && /^\$2[aby]?\$\d{2}\$[./A-Za-z0-9]{53}$/.test(value)) {
                        return true;
                    }
                    return typeof value === "string" && value.length >= 6 && value.length <= 50;
                },
                message: "Password must be between 6 and 50 characters"
            }
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
export default User;

import User from "../models/user.model.js";

// @desc    Register a new user
// @route   POST /api/v1/users/register
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields (username, email, password) are required"
            });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email"
            });
        }

        const user = await User.create({
            username: username.trim(),
            email: normalizedEmail,
            password
        });

        return res.status(201).json({
            message: "User registered successfully",
            _id: user._id,
            email: user.email,
            username: user.username,
            user: {
                _id: user._id,
                email: user.email,
                username: user.username
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error registering user",
            error: error.message
        });
    }
};

// @desc    Login existing user
// @route   POST /api/v1/users/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        return res.status(200).json({
            message: "User logged in",
            _id: user._id,
            email: user.email,
            username: user.username,
            user: {
                _id: user._id,
                email: user.email,
                username: user.username
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error logging in",
            error: error.message
        });
    }
};

// @desc    Logout user
// @route   POST /api/v1/users/logout
export const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required to logout"
            });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error logging out",
            error: error.message
        });
    }
};

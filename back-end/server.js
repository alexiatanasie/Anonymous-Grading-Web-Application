import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as models from "./models/index.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const { sequelize, User } = models;
const JWT_SECRET = "your_jwt_secret";

// Sync database
sequelize
    .sync({ alter: true })
    .then(() => console.log("Database synchronized!"))
    .catch((error) => console.error("Error synchronizing database:", error));


const generateToken = (user) => {
        return jwt.sign(
            {
                userId: user.UserId,
                userType: user.UserType,
            },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
};
// Middleware for Authentication
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
};
// Middleware for Role-based Access
const restrictAccess = (allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.userType)) {
            return res.status(403).json({ message: "Access forbidden: insufficient permissions" });
        }
        next();
    };
};

// Register User
app.post("/api/register", async (req, res) => {
    const { username, password, email, userType } = req.body;
    if (!username || !password || !email || !userType) {
        console.error("Missing fields in request body:", req.body);
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ where: { Email: email } });
        if (existingUser) {
            console.log("Email already exists:", email);
            return res.status(409).json({ message: "An account with this email already exists. Please login." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            Username: username,
            Password: hashedPassword,
            Email: email,
            UserType: userType,
        });

        console.log("User created successfully:", user);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



// Login User
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ where: { Email: email } });
        if (!user) {
            return res.status(404).json({ message: "Email does not exist" }); // Mesaj specific
        }

        const isPasswordValid = await bcrypt.compare(password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = generateToken(user);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                userId: user.UserId,
                username: user.Username,
                userType: user.UserType,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Forgot Password
app.post("/api/forgot-password", async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const user = await User.findOne({ where: { Email: email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = generateToken(user);
        console.log(`Reset link: http://localhost:3000/reset-password?token=${resetToken}`);

        res.status(200).json({ message: "Password reset link sent" });
    } catch (error) {
        console.error("Error during forgot password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Reset Password
app.post("/api/reset-password", async (req, res) => {
    const { username, newPassword } = req.body;

    if (!username || !newPassword) {
        return res.status(400).json({ message: "Username and new password are required." });
    }

    try {
        const user = await User.findOne({ where: { Username: username } });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10); 
        user.Password = hashedPassword; 
        await user.save();

        res.status(200).json({ message: "Password reset successfully." });
    } catch (error) {
        console.error("Error during password reset:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});



// Example: Professor Workspace Route
app.get("/api/professor-workspace", restrictAccess(["professor"]), (req, res) => {
    res.status(200).json({ message: "Welcome to the Professor Workspace" });
});

// Example: Student Workspace Route
app.get("/api/student-workspace", restrictAccess(["student"]), (req, res) => {
    res.status(200).json({ message: "Welcome to the Student Workspace" });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
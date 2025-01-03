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

// // Sync database
// sequelize
//     .sync({ alter: true })
//     .then(() => console.log("Database synchronized!"))
//     .catch((error) => console.error("Error synchronizing database:", error));

sequelize
    .sync({ alter: false }) // Avoid altering tables if not necessary
    .then(async () => {
        console.log("Database synchronized!");
        // Ensure Users_backup is clean
        await sequelize.query("DROP TABLE IF EXISTS Users_backup;");
    })
    .catch((error) => {
        console.error("Error synchronizing database:", error);
    });


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
app.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Verifică dacă există deja un utilizator cu acest email
        const existingUser = await User.findOne({ where: { Email: email } });

        if (existingUser) {
            return res.status(400).json({ message: 'An account with this email already exists. Please login.' });
        }

        // Hash-ul parolei și crearea utilizatorului
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ Email: email, Password: hashedPassword, Username: name, UserType: "student" });

        return res.status(201).json({ message: 'Account created successfully', user: newUser });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
});

// Login User
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await User.findOne({ where: { Email: email } });
        if (!user) {
            return res.status(404).json({ message: "Email does not exist." }); 
        }

        const isPasswordValid = await bcrypt.compare(password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password." }); 
        }

        const token = generateToken(user);

        res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                userId: user.UserId,
                username: user.Username,
                userType: user.UserType,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error." });
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



// Professor Workspace Route
app.get(
    "/api/professor-workspace",
    authenticateToken,
    restrictAccess(["professor"]),
    async (req, res) => {
        try {
            const professor = await models.Professor.findOne({ where: { UserId: req.user.userId } });
            if (!professor) {
                return res.status(404).json({ message: "Professor not found" });
            }
            const projects = await models.Project.findAll({ where: { ProfessorId: professor.ProfessorId } });
            res.status(200).json({ message: "Welcome to the Professor Workspace", projects });
        } catch (error) {
            console.error("Error fetching professor workspace data:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
);

// Student Workspace Route
app.get(
    "/api/student-workspace",
    authenticateToken,
    restrictAccess(["student"]),
    async (req, res) => {
        try {
            const student = await models.Student.findOne({ where: { UserId: req.user.userId } });
            if (!student) {
                return res.status(404).json({ message: "Student not found" });
            }
            const projects = await models.Project.findAll({ where: { StudentId: student.StudentId } });
            res.status(200).json({ message: "Welcome to the Student Workspace", projects });
        } catch (error) {
            console.error("Error fetching student workspace data:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
);


//Jury Workspace Route
app.get(
    "/api/jury-projects",
    authenticateToken,
    restrictAccess(["student", "jury"]),
    async (req, res) => {
        try {
            const juryAssignments = await models.Jury.findAll({ where: { UserId: req.user.userId } });
            const projectIds = juryAssignments.map((assignment) => assignment.ProjectId);
            const projects = await models.Project.findAll({ where: { ProjectId: projectIds } });
            res.status(200).json({ message: "Welcome to the Jury Workspace", projects });
        } catch (error) {
            console.error("Error fetching jury projects:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
);

// Middleware to check the user's role for workspace routes
const checkRole = (requiredRole) => {
    return (req, res, next) => {
        if (req.user.userType !== requiredRole) {
            return res.status(403).json({ message: "Access forbidden: insufficient permissions" });
        }
        next();
    };
};
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please use a different port.`);
    } else {
        console.error('Server error:', err);
    }
});

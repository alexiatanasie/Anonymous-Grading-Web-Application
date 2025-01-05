import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sequelize, User, Student, Professor, Team } from "./models/index.js";

const app = express();
const port = 8000;

// JWT Secret
const JWT_SECRET = "your_jwt_secret";

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Database Initialization
sequelize
    .authenticate()
    .then(() => {
        console.log("✅ Database connection established successfully.");
        return sequelize.sync({ alter: false });
    })
    .then(async () => {
        console.log("✅ Database synchronized!");
        await sequelize.query("DROP TABLE IF EXISTS Users_backup;");
        console.log("✅ Users_backup table cleaned.");
    })
    .catch((error) => {
        console.error("❌ Database initialization failed:", error);
        process.exit(1);
    });

// ✅ Generate JWT Token
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

// ✅ Middleware: Authenticate Token
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

// ✅ Middleware: Restrict Access by Role
const restrictAccess = (allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.userType)) {
            return res.status(403).json({ message: "Access forbidden: insufficient permissions" });
        }
        next();
    };
};

// ✅ Register User
app.post("/api/register", async (req, res) => {
    const { username, password, email, userType } = req.body;

    if (!username || !password || !email || !userType) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ where: { Email: email } });
        if (existingUser) {
            return res.status(409).json({ message: "An account with this email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            Username: username,
            Password: hashedPassword,
            Email: email,
            UserType: userType,
        });

        if (userType === "student") {
            await Student.create({ UserId: user.UserId, teamId: null });
        } else if (userType === "professor") {
            await Professor.create({ UserId: user.UserId });
        }

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("❌ Error during user registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ✅ Login User
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await User.findOne({ where: { Email: email } });
        if (!user || !(await bcrypt.compare(password, user.Password))) {
            return res.status(401).json({ message: "Invalid email or password." });
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
        console.error("❌ Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Fetch Available Students

app.get('/students/available', async (req, res) => {
    try {
        const availableStudents = await Student.findAll({
            where: { 
                TeamId: null, 
                UserId: { [Sequelize.Op.ne]: null } 
            },
            include: [
                {
                    model: User,
                    attributes: ['Username'],
                }
            ],
            attributes: ['StudentId', 'UserId'],
        });

        res.status(200).json(availableStudents);
    } catch (error) {
        console.error('❌ Error fetching available students:', error);
        res.status(500).json({ message: 'Failed to fetch available students' });
    }
});



// ✅ Create Team
app.post('/api/teams', async (req, res) => {
    try {
        const { name, members } = req.body;

        if (!name || members.length === 0) {
            return res.status(400).json({ message: 'Team name and members are required' });
        }

        const existingTeam = await Team.findOne({ where: { name } });
        if (existingTeam) {
            return res.status(400).json({ message: 'Team name already exists' });
        }

        const newTeam = await Team.create({ name });

        await Student.update(
            { TeamId: newTeam.TeamId }, 
            { where: { StudentId: members } }
        );

        res.status(201).json({ message: 'Team created successfully', teamId: newTeam.TeamId });
    } catch (error) {
        console.error('❌ Error creating team:', error);
        res.status(500).json({ message: 'Failed to create team' });
    }
});

// ✅ Start the Server
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${port} is already in use.`);
    } else {
        console.error('❌ Server error:', err);
    }
});

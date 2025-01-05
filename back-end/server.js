import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sequelize, Sequelize, User, Student, Professor, Team } from "./models/index.js";

const app = express();
const port = 8000;

// JWT Secret
const JWT_SECRET = "your_jwt_secret";

// Middleware
app.use(cors());
app.use(express.json());

// Database Initialization
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
                TeamId: null, // Doar studenții care nu au deja o echipă
            },
            include: [
                {
                    model: User, // Include informațiile din tabela Users
                    attributes: ['Username'], // Returnează doar Username
                },
            ],
            attributes: ['StudentId', 'UserId'], // Alege ce câmpuri să returnezi din Students
        });

        res.status(200).json(availableStudents);
    } catch (error) {
        console.error('❌ Error fetching available students:', error);
        res.status(500).json({ message: 'Failed to fetch available students' });
    }
});


//create Team
app.post('/api/teams', async (req, res) => {
    const { name, members } = req.body;

    if (!name || !members || members.length !== 3) {
        console.error("Invalid team creation data:", { name, members });
        return res.status(400).json({ message: "Team name is required, and exactly 3 members must be selected." });
    }

    try {
        const newTeam = await Team.create({ name });

        await Student.update(
            { TeamId: newTeam.id }, 
            { where: { StudentId: members } }
        );

        console.log("Team created successfully:", newTeam);
        res.status(201).json({ message: "Team created successfully", teamId: newTeam.id });
    } catch (error) {
        console.error("Error creating team:", error);
        res.status(500).json({ message: "Failed to create team" });
    }
});

app.post("/api/createproject", async (req, res) => {
    const { title, description, teamName, link } = req.body;

    if (!title || !description || !teamName) {
        return res.status(400).json({ message: "Title, Description, and Team Name are required" });
    }

    try {
        const team = await Team.findOne({ where: { name: teamName } });

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        const project = await Project.create({
            Title: title,
            Description: description,
            TeamId: team.id,
            Link: link,
        });

        res.status(201).json({ message: "Project created successfully", project });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: "Failed to create project." });
    }
});


app.post('/api/projects', async (req, res) => {
    const { title, teamId } = req.body;

    if (!title || !teamId) {
        return res.status(400).json({ message: "Title and team ID are required" });
    }

    const project = await Project.create({ Title: title, TeamId: teamId });

    res.status(201).json({ message: "Project created successfully", project });
});

app.post('/api/projects/:projectId/jury', async (req, res) => {
    const { projectId } = req.params;

    const students = await Student.findAll({ where: { TeamId: null } });
    const juryMembers = students.sort(() => 0.5 - Math.random()).slice(0, 3);

    for (const student of juryMembers) {
        await Jury.create({ UserId: student.UserId, ProjectId: projectId });
    }

    res.status(200).json({ message: "Jury assigned successfully", jury: juryMembers });
});
app.get("/api/jury-projects", authenticateToken, restrictAccess(["jury"]), async (req, res) => {
    try {
        const juryAssignments = await Jury.findAll({
            where: { UserId: req.user.userId },
            include: [
                {
                    model: Project,
                    include: [
                        {
                            model: Team,
                            attributes: ["name"],
                        },
                    ],
                },
            ],
        });

        const projects = juryAssignments.map((assignment) => ({
            id: assignment.Project.ProjectId,
            title: assignment.Project.Title,
            teamName: assignment.Project.Team.name,
        }));

        res.status(200).json({ projects });
    } catch (error) {
        console.error("Error fetching jury projects:", error);
        res.status(500).json({ message: "Failed to fetch jury projects." });
    }
});

app.post("/api/grade/:projectId", authenticateToken, restrictAccess(["jury"]), async (req, res) => {
    const { projectId } = req.params;
    const { gradeValue } = req.body;

    if (!gradeValue || gradeValue < 1 || gradeValue > 10) {
        return res.status(400).json({ message: "Grade must be between 1 and 10." });
    }

    try {
        const jury = await Jury.findOne({
            where: {
                UserId: req.user.userId,
                ProjectId: projectId,
            },
        });

        if (!jury) {
            return res.status(404).json({ message: "Jury assignment not found for this project." });
        }

        await Grade.create({ JuryId: jury.JuryId, ProjectId: projectId, GradeValue: gradeValue });
        res.status(201).json({ message: "Grade submitted successfully." });
    } catch (error) {
        console.error("Error submitting grade:", error);
        res.status(500).json({ message: "Failed to submit grade." });
    }
});

app.post('/api/grades', async (req, res) => {
    const { juryId, projectId, gradeValue } = req.body;

    await Grade.create({ JuryId: juryId, ProjectId: projectId, GradeValue: gradeValue });

    res.status(201).json({ message: "Grade submitted successfully" });
});
app.get('/api/projects/:projectId/final-grade', async (req, res) => {
    const { projectId } = req.params;

    const grades = await Grade.findAll({ where: { ProjectId: projectId } });
    const average = grades.reduce((sum, grade) => sum + grade.GradeValue, 0) / grades.length;

    await Project.update({ FinalGrade: average }, { where: { ProjectId: projectId } });

    res.status(200).json({ message: "Final grade calculated", finalGrade: average });
});

app.post("/api/assign-jury", async (req, res) => {
    const { projectId } = req.body;

    try {
        const project = await Project.findByPk(projectId, {
            include: [{ model: Team, include: [Student] }],
        });

        const excludedStudentIds = project.Team.Students.map((student) => student.StudentId);

        const availableStudents = await Student.findAll({
            where: {
                StudentId: { [Op.notIn]: excludedStudentIds },
            },
        });

        if (availableStudents.length < 3) {
            return res.status(400).json({ message: "Not enough students available for jury." });
        }

        const selectedJury = availableStudents.sort(() => 0.5 - Math.random()).slice(0, 3);

        for (const juryMember of selectedJury) {
            await Jury.create({ UserId: juryMember.UserId, ProjectId: projectId });
        }

        res.status(201).json({ message: "Jury assigned successfully.", jury: selectedJury });
    } catch (error) {
        console.error("Error assigning jury:", error);
        res.status(500).json({ message: "Failed to assign jury." });
    }
});

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use.`);
    } else {
        console.error('Server error:', err);
    }
});

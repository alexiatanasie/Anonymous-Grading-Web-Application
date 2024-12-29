import express from "express";
import cors from "cors";
import * as models from "./models/index.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const { sequelize, User, Student, Professor, Jury, Grade, Team, Project, Notification, Deliverable } = models;

// Sync database
sequelize
    .sync({ alter: true })
    .then(() => console.log("Database synchronized!"))
    .catch((error) => console.error("Error synchronizing database:", error));

// Middleware for permission verification
const isJuryMember = async (juryId, userId) => {
    const jury = await Jury.findOne({ where: { JuryId: juryId, UserId: userId } });
    return !!jury;
};

// Routes

// Register User
app.post("/api/register", async (req, res) => {
    const { username, password, email, userType } = req.body;
    if (!username || !password || !email || !userType) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.create({ Username: username, Password: password, Email: email, UserType: userType });
        if (userType === "professor") await Professor.create({ UserId: user.UserId });
        else if (userType === "student") await Student.create({ UserId: user.UserId });

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
});

// Create Project and Add Partial Deliverables
app.post("/api/createproject", async (req, res) => {
    const { title, teamId, deliverables } = req.body;
    if (!title || !teamId) {
        return res.status(400).json({ message: "Title and Team ID are required" });
    }

    try {
        const project = await Project.create({ Title: title, TeamId: teamId });

        if (deliverables) {
            for (const deliverable of deliverables) {
                await Deliverable.create({
                    ProjectId: project.ProjectId,
                    Title: deliverable.title,
                    Description: deliverable.description || null,
                });
            }
        }

        res.status(201).json({ message: "Project and deliverables created successfully", project });
    } catch (error) {
        res.status(500).json({ message: "Error creating project", error });
    }
});

// Add Link or Video to Deliverable
app.post("/api/deliverables/:deliverableId/link", async (req, res) => {
    const { deliverableId } = req.params;
    const { link } = req.body;
    if (!link) {
        return res.status(400).json({ message: "Link is required" });
    }

    try {
        const deliverable = await Deliverable.findByPk(deliverableId);
        if (!deliverable) {
            return res.status(404).json({ message: "Deliverable not found" });
        }

        deliverable.Description = `${deliverable.Description || ''}\nLink: ${link}`;
        await deliverable.save();

        res.status(200).json({ message: "Link added to deliverable", deliverable });
    } catch (error) {
        res.status(500).json({ message: "Error adding link", error });
    }
});

// Random Jury Selection
app.post("/api/assignjury-random", async (req, res) => {
    const { projectId } = req.body;

    try {
        const project = await Project.findByPk(projectId);
        if (!project) return res.status(404).json({ message: "Project not found" });

        const nonPMStudents = await Student.findAll({
            where: { TeamId: { [sequelize.Op.ne]: project.TeamId } },
        });

        if (nonPMStudents.length === 0) {
            return res.status(400).json({ message: "No eligible students for jury selection" });
        }

        const selectedStudent = nonPMStudents[Math.floor(Math.random() * nonPMStudents.length)];
        await Jury.create({ UserId: selectedStudent.UserId, ProjectId: projectId });

        res.status(201).json({ message: "Random jury assigned", selectedStudent });
    } catch (error) {
        res.status(500).json({ message: "Error assigning jury", error });
    }
});

// Submit Grade by Jury Member
app.post("/api/grade", async (req, res) => {
    const { projectId, juryId, userId, value } = req.body;

    if (!projectId || !juryId || !value || value < 1 || value > 10) {
        return res.status(400).json({ message: "Invalid input" });
    }

    try {
        if (!(await isJuryMember(juryId, userId))) {
            return res.status(403).json({ message: "You are not authorized to grade this project" });
        }

        await Grade.create({ ProjectId: projectId, JuryId: juryId, Value: value });
        res.status(201).json({ message: "Grade submitted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error submitting grade", error });
    }
});

// Final Project Grade Calculation
app.get("/api/project-grade/:projectId", async (req, res) => {
    const { projectId } = req.params;

    try {
        const grades = await Grade.findAll({ where: { ProjectId: projectId } });
        if (grades.length < 3) {
            return res.status(400).json({ message: "Not enough grades to calculate final grade" });
        }

        const values = grades.map((g) => g.Value).sort((a, b) => a - b);
        const finalGrade = values.slice(1, -1).reduce((a, b) => a + b, 0) / (values.length - 2);

        res.status(200).json({ finalGrade });
    } catch (error) {
        res.status(500).json({ message: "Error calculating final grade", error });
    }
});

// Professor View Results (Anonymized)
app.get("/api/professor/project-results/:projectId", async (req, res) => {
    const { projectId } = req.params;

    try {
        const grades = await Grade.findAll({
            where: { ProjectId: projectId },
            attributes: ["Value"],
        });
        res.status(200).json({ grades });
    } catch (error) {
        res.status(500).json({ message: "Error fetching results", error });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


import express from "express";
import cors from "cors";
import * as models from "./models/index.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const { sequelize, User, Student, Professor, Jury, Grade, Team, Project, Notification, Deliverable } = models;

sequelize
    .sync({ alter: true })
    .then(() => {
        console.log("Database synchronized!");
    })
    .catch((error) => {
        console.error("Error synchronizing database:", error);
    });

app.post("/api/register", async (req, res) => {
    const { username, password, email, userType } = req.body;
    if (!username || !password || !email || !userType) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.create({ Username: username, Password: password, Email: email, UserType: userType });
        if (userType === "professor") {
            await Professor.create({ UserId: user.UserId });
        } else if (userType === "student") {
            await Student.create({ UserId: user.UserId });
        }

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
});

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ where: { Email: email } });
        if (!user || user.Password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
});

app.post("/api/createteam", async (req, res) => {
    const { teamName, userIds } = req.body;
    if (!teamName || !userIds || !userIds.length) {
        return res.status(400).json({ message: "Team name and user IDs are required" });
    }

    try {
        const team = await Team.create({ TeamName: teamName });
        await Student.update({ TeamId: team.TeamId }, { where: { UserId: userIds } });

        res.status(201).json({ message: "Team created successfully", team });
    } catch (error) {
        res.status(500).json({ message: "Error creating team", error });
    }
});

app.post("/api/createproject", async (req, res) => {
    const { title, teamId } = req.body;
    if (!title || !teamId) {
        return res.status(400).json({ message: "Title and Team ID are required" });
    }

    try {
        const project = await Project.create({ Title: title, TeamId: teamId });
        res.status(201).json({ message: "Project created successfully", project });
    } catch (error) {
        res.status(500).json({ message: "Error creating project", error });
    }
});

app.get("/api/projects/:teamId", async (req, res) => {
    const { teamId } = req.params;

    try {
        const projects = await Project.findAll({ where: { TeamId: teamId } });
        if (!projects.length) {
            return res.status(404).json({ message: "No projects found for this team" });
        }

        res.status(200).json({ projects });
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects", error });
    }
});

app.post("/api/deliverables", async (req, res) => {
    const { projectId, title, description } = req.body;
    if (!projectId || !title) {
        return res.status(400).json({ message: "Project ID and Title are required" });
    }

    try {
        const deliverable = await Deliverable.create({ ProjectId: projectId, Title: title, Description: description || null });
        res.status(201).json({ message: "Deliverable created successfully", deliverable });
    } catch (error) {
        res.status(500).json({ message: "Error creating deliverable", error });
    }
});

app.post("/api/assignjury", async (req, res) => {
    const { userId, projectId } = req.body;
    if (!userId || !projectId) {
        return res.status(400).json({ message: "User ID and Project ID are required" });
    }

    try {
        const jury = await Jury.create({ UserId: userId, ProjectId: projectId });
        res.status(201).json({ message: "Jury assigned successfully", jury });
    } catch (error) {
        res.status(500).json({ message: "Error assigning jury", error });
    }
});

app.post("/api/grade", async (req, res) => {
    const { projectId, juryId, value } = req.body;
    if (!projectId || !juryId || value === undefined) {
        return res.status(400).json({ message: "Project ID, Jury ID, and Value are required" });
    }

    try {
        const grade = await Grade.create({ ProjectId: projectId, JuryId: juryId, Value: value });
        res.status(201).json({ message: "Grade submitted successfully", grade });
    } catch (error) {
        res.status(500).json({ message: "Error submitting grade", error });
    }
});

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

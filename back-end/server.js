
const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;


const Professor = require("./models/professor");
const Student = require("./models/student");
const Team = require("./models/team");
const Project = require("./models/project");
const User = require("./models/user");
const Grade = require("./models/grade");
const Jury = require("./models/jury");


app.use(cors());
app.use(express.json());


app.post("/api/register", async (req, res) => {
  const { username, password, email, userType } = req.body;
  if (!username || !password || !email || !userType) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.create({
      Username: username,
      Name: username,
      Password: password, 
      Email: email,
      UserType: userType,
    });

    if (userType === "professor") {
      await Professor.create({ UserId: user.UserId });
    } else if (userType === "student") {
      await Student.create({ UserId: user.UserId });
    }

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error registering user", error });
  }
});


app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email/ password are required" });
  }

  try {
    const user = await User.findOne({ where: { Email: email } });

    if (!user || user.Password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in", error });
  }
});


app.post("/api/create-team", async (req, res) => {
  const { teamName, userId } = req.body;
  if (!teamName || !userId) {
    return res.status(400).json({ message: "Team name and user ID are required" });
  }

  try {
    const team = await Team.create({
      TeamName: teamName,
    });

    await Student.update({ TeamId: team.TeamId }, { where: { UserId: userId } });

    return res.status(201).json({ message: "Team created successfully", team });
  } catch (error) {
    return res.status(500).json({ message: "Error creating team", error });
  }
});


app.post("/api/create-project", async (req, res) => {
  const { title, teamId, grade } = req.body;
  if (!title || !teamId) {
    return res.status(400).json({ message: "Title and team ID are required" });
  }

  try {
    const project = await Project.create({
      Title: title,
      TeamId: teamId,
      Grade: grade || null,
    });

    return res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    return res.status(500).json({ message: "Error creating project", error });
  }
});


app.get("/api/projects/:teamId", async (req, res) => {
  const { teamId } = req.params;

  try {
    const projects = await Project.findAll({ where: { TeamId: teamId } });

    if (!projects.length) {
      return res.status(404).json({ message: "No projects found for this team" });
    }

    return res.status(200).json({ projects });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching projects", error });
  }
});


app.get("/api/grades/:projectId", async (req, res) => {
  const { projectId } = req.params;

  try {
    const grades = await Grade.findAll({ where: { ProjectId: projectId } });

    if (!grades.length) {
      return res.status(404).json({ message: "No grades found for this project" });
    }

    return res.status(200).json({ grades });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching grades", error });
  }
});


app.listen(port, () => {
  console.log(`Anonymous Grading Web App Tenerife is running on port ${port}`);
});

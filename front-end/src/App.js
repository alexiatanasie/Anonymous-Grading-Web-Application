import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentWorkspace from "./components/StudentWorkspace";
import ProfessorWorkspace from "./components/ProfessorWorkspace";
import JuryAssignedProjects from "./components/JuryAssignedProjects";
import GradeProject from "./components/GradeProject"; 
import ProtectedRoute from "./components/ProtectedRoute";
import CreateTeam from "./components/CreateTeam";

function App() {
    return (
        <Router>
            {/* Navbar displayed on all pages */}
            <Navbar />

            {/* Application Routes */}
            <Routes>
                {/* Public Routes */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Student Workspace Route */}
                <Route
                    path="/student-workspace"
                    element={
                        <ProtectedRoute requiredRoles={["student"]}>
                            <StudentWorkspace />
                        </ProtectedRoute>
                    }
                />

                {/* Professor Workspace Route */}
                <Route
                    path="/professor-workspace"
                    element={
                        <ProtectedRoute requiredRoles={["professor"]}>
                            <ProfessorWorkspace />
                        </ProtectedRoute>
                    }
                />

                {/* Jury Projects Route */}
                <Route
                 path="/jury-projects"
                element={
                     <ProtectedRoute requiredRoles={["jury", "student"]}>
                     <JuryAssignedProjects />
                </ProtectedRoute>
    }
/>


                {/* Grade Project Route */}
                <Route
                    path="/grade/:projectId"
                    element={
                        <ProtectedRoute requiredRoles={["jury"]}>
                            <GradeProject />
                        </ProtectedRoute>
                    }
                />

                {/* Team Creation Route for Students */}
                <Route
                    path="/create-team"
                    element={
                        <ProtectedRoute requiredRoles={["student"]}>
                            <CreateTeam />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;

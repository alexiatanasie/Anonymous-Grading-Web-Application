import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentWorkspace from "./components/StudentWorkspace";
import ProfessorWorkspace from "./components/ProfessorWorkspace";
import JuryAssignedProjects from "./components/JuryAssignedProjects";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./components/ForgotPassword";
import CreateTeam from './components/CreateTeam';

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
                <Route path="/forgot-password" element={<ForgotPassword />} />

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
                        <ProtectedRoute requiredRoles={["student", "jury"]}>
                            <JuryAssignedProjects />
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

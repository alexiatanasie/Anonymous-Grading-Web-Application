import React from "react";
import AddProject from "./AddProject";
import ProjectList from "./ProjectList";

function StudentWorkspace() {
    return (
        <div>
            <h1>Student Workspace</h1>
            <AddProject />
            <ProjectList />
        </div>
    );
}

export default StudentWorkspace;
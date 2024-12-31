import React, { useState } from "react";

function DeliverableList({ projectId }) {
    const [deliverables, setDeliverables] = useState([]);
    const [newDeliverable, setNewDeliverable] = useState("");

    const addDeliverable = () => {
        if (newDeliverable.trim()) {
            setDeliverables([...deliverables, newDeliverable]);
            setNewDeliverable("");
        }
    };

    return (
        <div>
            <h3>Deliverables</h3>
            <ul>
                {deliverables.map((deliverable, index) => (
                    <li key={index}>{deliverable}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newDeliverable}
                onChange={(e) => setNewDeliverable(e.target.value)}
                placeholder="Add deliverable"
            />
            <button onClick={addDeliverable}>Add</button>
        </div>
    );
}

export default DeliverableList;
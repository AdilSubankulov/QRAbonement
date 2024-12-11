import React, { useEffect, useState } from "react";
import deleteIcon from "../assets/deleteIcon.svg";
import "../styles/Client.css";

function Client() {
    const [clients, setClients] = useState([]);
    const [errors, setErrors] = useState([]);

    const addError = (message) => setErrors((prev) => [...prev, message]);
    const clearErrors = () => setErrors([]);

    const fetchClients = () => {
        fetch("http://127.0.0.1:8000/clients/")
            .then((response) => response.json())
            .then(setClients)
            .catch(() => addError("Failed to load clients."));
    };

    useEffect(fetchClients, []);

    const handleDelete = async (clientId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/clients/${clientId}/`, {
                method: "DELETE",
            });
            if (response.ok) {
                setClients((prevClients) => prevClients.filter((client) => client.id !== clientId));
            } else {
                addError("Failed to delete client.");
            }
        } catch {
            addError("Network error while deleting client.");
        }
    };

    const handleAddVisit = async (membershipId) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/memberships/${membershipId}/add-visit/`,
                { method: "POST" }
            );
            if (response.ok) {
                setClients((prevClients) =>
                    prevClients.map((client) => {
                        const membership = client.memberships?.[0];
                        if (membership?.id === membershipId) {
                            return {
                                ...client,
                                memberships: [
                                    {
                                        ...membership,
                                        visit_count: membership.visit_count + 1,
                                    },
                                ],
                            };
                        }
                        return client;
                    })
                );
            } else {
                const errorData = await response.json();
                addError(errorData.detail || "Failed to add visit.");
            }
        } catch {
            addError("Network error while adding visit.");
        }
    };

    return (
        <div className="client-container">
            {errors.map((err, idx) => (
                <p key={idx} className="error">{err}</p>
            ))}
            {clients.map((client) => {
                const membership = client.memberships?.[0] || {};
                return (
                    <div className="client-list" key={client.id}>
                        <div className="client-info">
                            <h1 className="client-name">{client.full_name}</h1>
                            <h1 className="client-abonement">ab: {membership.tariff_name || "N/A"}</h1>
                            <h1 className="client-visitday">
                                vis: {membership.visit_count || 0}/{membership.tariff_max_visits || "N/A"}
                            </h1>
                            <div className="del-add-container">
                                <img
                                    src={deleteIcon}
                                    alt="Delete client"
                                    onClick={() => handleDelete(client.id)}
                                    aria-label="Delete client"
                                />
                                <button
                                    onClick={() => handleAddVisit(membership.id)}
                                    aria-label="Add Visit"
                                >
                                    Add Visit
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Client;

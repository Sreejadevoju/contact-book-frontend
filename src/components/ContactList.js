import React from 'react';

export default function ContactList({ contacts, onDelete }) {
    if (!contacts || contacts.length === 0) return <div>No contacts yet.</div>;

    return (
        <table className="contact-table">
            <thead>
                <tr>
                    <th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map(c => (
                    <tr key={c.id}>
                        <td>{c.name}</td>
                        <td>{c.email}</td>
                        <td>{c.phone}</td>
                        <td>
                            <button className="delete-btn" onClick={() => onDelete(c.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

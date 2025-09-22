import React, { useState } from 'react';

export default function ContactForm({ onAdd }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const validate = () => {
        const e = {};
        if (!name.trim()) e.name = 'Name is required';
        if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Invalid email';
        if (!/^\d{10}$/.test(phone)) e.phone = 'Phone must be 10 digits';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (!validate()) return;
        setSubmitting(true);
        try {
            await onAdd({ name: name.trim(), email: email.trim(), phone: phone.trim() });
            setName(''); setEmail(''); setPhone(''); setErrors({});
        } catch (err) {
            setErrors({ submit: err.response?.data?.error || 'Failed to add contact' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Add Contact</h2>

            <label>
                Name
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
                {errors.name && <div className="field-error">{errors.name}</div>}
            </label>

            <label>
                Email
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                {errors.email && <div className="field-error">{errors.email}</div>}
            </label>

            <label>
                Phone
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0123456789" />
                {errors.phone && <div className="field-error">{errors.phone}</div>}
            </label>

            <button type="submit" disabled={submitting}>{submitting ? 'Adding...' : 'Add Contact'}</button>
            {errors.submit && <div className="field-error">{errors.submit}</div>}
        </form>
    );
}

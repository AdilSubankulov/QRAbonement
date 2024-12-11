import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/ClientForm.css'; // Добавьте стили, если требуется

function ClientForm() {
    const [formData, setFormData] = useState({
        unique_id: '',
        full_name: '',
        email: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams(); 

    useEffect(() => {
        if (id) {
            setLoading(true);
            axios.get(`/clients/${id}/`)
                .then(response => {
                    setFormData(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError('Failed to load client data');
                    setLoading(false);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const request = id
            ? axios.put(`/clients/${id}/`, formData) // Обновление клиента
            : axios.post('/clients/', formData);   // Создание клиента

        request
            .then(() => {
                navigate('/'); // Переход на главную страницу после успешного сохранения
            })
            .catch(err => {
                setError('Failed to save client data');
                setLoading(false);
            });
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="client-form-container">
            <h1>{id ? 'Update Client' : 'Add Client'}</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="full_name">Full Name:</label>
                    <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                    {id ? 'Update Client' : 'Add Client'}
                </button>
            </form>
        </div>
    );
}

export default ClientForm;

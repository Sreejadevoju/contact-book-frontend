import React, { useEffect, useState } from 'react';
import api from './api';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Pagination from './components/Pagination';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContacts = async (p = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/contacts', { params: { page: p, limit } });
      setContacts(res.data.contacts);
      setTotal(res.data.total);
      setPage(res.data.page);
    } catch (err) {
      console.error(err);
      setError('Could not fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContacts(1); }, []);

  const handleAdd = async (data) => {
    try {
      await api.post('/contacts', data);
      // fetch first page to see newest
      await fetchContacts(1);
    } catch (err) {
      // bubble up to form to display error
      throw err;
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
      // recalculating page in case we deleted last item of last page
      const newTotal = Math.max(0, total - 1);
      const lastPage = Math.max(1, Math.ceil(newTotal / limit));
      const nextPage = page > lastPage ? lastPage : page;
      await fetchContacts(nextPage);
    } catch (err) {
      console.error(err);
      setError('Failed to delete contact');
    }
  };

  return (
    <div className="app">
      <h1>Contact Book</h1>
      <div className="layout">
        <div className="left">
          <ContactForm onAdd={handleAdd} />
        </div>
        <div className="right">
          {error && <div className="error">{error}</div>}
          {loading ? <div>Loading...</div> : (
            <>
              <ContactList contacts={contacts} onDelete={handleDelete} />
              <Pagination page={page} total={total} limit={limit} onPageChange={fetchContacts} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

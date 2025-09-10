import { useEffect, useState } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import LeadForm from '../components/LeadForm';
import LeadTable from '../components/LeadTable';
import { getAuth } from '../services/auth';

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [editing, setEditing] = useState(null);
  const auth = getAuth();

  const load = async ()=>{
    const res = await api.get('/leads');
    setLeads(res.data);
  }

  useEffect(()=>{ load(); }, []);

  const createOrUpdate = async (data) => {
    try {
      if (editing) {
        const res = await api.put(`/leads/${editing.id}`, data);
        setLeads(ls => ls.map(l => l.id === res.data.id ? res.data : l));
        setEditing(null);
      } else {
        const res = await api.post('/leads', data);
        setLeads(ls => [res.data, ...ls]);
      }
    } catch (e) { console.error(e); }
  }

  const deleteLead = async (id) => {
    if (!window.confirm('Delete lead?')) return;
    await api.delete(`/leads/${id}`);
    setLeads(ls => ls.filter(l=>l.id!==id));
  }

  const convert = async (id) => {
    const value = Number(window.prompt('Enter opportunity value', '0')) || 0;
    await api.post(`/leads/${id}/convert`, { value });
    await load();
  }

  return (
    <Layout>
      <h2>Leads</h2>
      <LeadForm onSave={createOrUpdate} initial={editing} />
      <LeadTable leads={leads} onEdit={(l)=>setEditing(l)} onDelete={deleteLead} onConvert={convert} canConvert={auth?.user?.role==='rep' || auth?.user?.role==='manager'} />
    </Layout>
  );
}

import { useEffect, useState } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import OpportunityTable from '../components/OpportunityTable';
import { getAuth } from '../services/auth';

export default function Opportunities() {
  const [opps, setOpps] = useState([]);
  const auth = getAuth();

  useEffect(()=>{ load(); }, []);

  const load = async ()=>{
    const res = await api.get('/opportunities');
    setOpps(res.data);
  }

  const updateStage = async (id, stage) => {
    try {
      const res = await api.put(`/opportunities/${id}`, { stage });
      setOpps(ls => ls.map(o => o.id === res.data.id ? res.data : o));
    } catch (e) { console.error(e); }
  }

  const updateValue = async (id, value) => {
    try {
      const res = await api.put(`/opportunities/${id}`, { value });
      setOpps(ls => ls.map(o => o.id === res.data.id ? res.data : o));
    } catch (e) { console.error(e); }
  }

  return (
    <Layout>
      <h2>Opportunities</h2>
      <OpportunityTable opps={opps} onUpdateStage={updateStage} onUpdateValue={updateValue} userRole={auth?.user?.role} />
    </Layout>
  );
}

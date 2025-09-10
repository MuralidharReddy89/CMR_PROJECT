import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`margin-bottom:16px;`;
const Row = styled.div`display:flex; gap:8px;`;
const Input = styled.input`padding:8px; border-radius:6px; border:1px solid #e2e8f0; flex:1;`;
const Select = styled.select`padding:8px; border-radius:6px; border:1px solid #e2e8f0;`;
const Button = styled.button`padding:8px 10px; border-radius:6px; border:none; background:#2563eb; color:white;`;

export default function LeadForm({ onSave, initial }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('New');

  useEffect(()=>{
    if (initial) {
      setName(initial.name||''); setEmail(initial.email||''); setPhone(initial.phone||''); setStatus(initial.status||'New');
    }
  },[initial]);

  const submit = (e)=>{
    e.preventDefault();
    onSave({ name, email, phone, status });
    setName(''); setEmail(''); setPhone(''); setStatus('New');
  }

  return (
    <Wrap>
      <form onSubmit={submit}>
        <Row>
          <Input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
          <Input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <Input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
          <Select value={status} onChange={e=>setStatus(e.target.value)}>
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
          </Select>
          <Button type="submit">Save</Button>
        </Row>
      </form>
    </Wrap>
  );
}

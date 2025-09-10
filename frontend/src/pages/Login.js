import { useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { saveAuth } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const Root = styled.div`display:flex; align-items:center; justify-content:center; height:80vh;`;
const Card = styled.div`width:380px; padding:24px; background:#fff; border-radius:8px; box-shadow:0 6px 18px rgba(20,20,50,0.06);`;
const Title = styled.h2`margin:0 0 12px 0;`;
const Form = styled.form`display:flex; flex-direction:column; gap:10px;`;
const Input = styled.input`padding:10px; border-radius:6px; border:1px solid #e2e8f0;`;
const Button = styled.button`padding:10px; border-radius:6px; border:none; background:#10b981; color:white;`;
const Small = styled.div`font-size:13px; color:#ef4444;`;

export default function Login() {
  const [email, setEmail] = useState('alice@company.com');
  const [password, setPassword] = useState('password123');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await api.post('/auth/login', { email, password });
      saveAuth(res.data.token);
      navigate('/leads');
    } catch (e) {
      setErr(e.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <Root>
      <Card>
        <Title>CRM Login</Title>
        <Form onSubmit={submit}>
          <Input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
          <Input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
          <Button type="submit">Login</Button>
          {err && <Small>{err}</Small>}
        </Form>
      </Card>
    </Root>
  );
}

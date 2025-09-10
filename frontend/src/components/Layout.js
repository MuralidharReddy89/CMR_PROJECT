
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuth, getAuth } from '../services/auth';

const Container = styled.div`
  padding: 20px; max-width: 1000px; margin: 24px auto; background: white; border-radius: 8px; box-shadow: 0 6px 18px rgba(20,20,50,0.06);
`;
const Nav = styled.nav`
  display:flex; gap:12px; margin-bottom: 16px; align-items:center;
`;
const Spacer = styled.div`flex:1`;
const Button = styled.button`
  padding:8px 12px; border-radius:6px; border: none; background:#2563eb; color:white;
`;

export default function Layout({ children }) {
  const navigate = useNavigate();
  const auth = getAuth();

  const logout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <Container>
      <Nav>
        <Link to="/leads">Leads</Link>
        <Link to="/opportunities">Opportunities</Link>
        <Spacer />
        {auth && (
          <>
            <div>{auth.user.role.toUpperCase()}</div>
            <Button onClick={logout}>Logout</Button>
          </>
        )}
      </Nav>
      {children}
    </Container>
  );
}

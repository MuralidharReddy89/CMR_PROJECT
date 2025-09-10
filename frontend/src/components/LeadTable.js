
import styled from 'styled-components';

const Table = styled.table`width:100%; border-collapse:collapse;`;
const Th = styled.th`text-align:left; padding:8px; border-bottom:1px solid #eef2f7;`;
const Td = styled.td`padding:8px; border-bottom:1px solid #f3f6fb;`;
const Button = styled.button`padding:6px 8px; border-radius:6px; border:none;`;

export default function LeadTable({ leads, onEdit, onDelete, onConvert, canConvert }) {
  return (
    <Table>
      <thead>
        <tr>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Phone</Th>
          <Th>Status</Th>
          <Th>Owner</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <tbody>
        {leads.map(l => (
          <tr key={l.id}>
            <Td>{l.id}</Td>
            <Td>{l.name}</Td>
            <Td>{l.email}</Td>
            <Td>{l.phone}</Td>
            <Td>{l.status}</Td>
            <Td>{l.ownerId}</Td>
            <Td>
              <Button onClick={()=>onEdit(l)}>Edit</Button>
              <Button onClick={()=>onDelete(l.id)}>Delete</Button>
              {canConvert && <Button onClick={()=>onConvert(l.id)}>Convert</Button>}
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

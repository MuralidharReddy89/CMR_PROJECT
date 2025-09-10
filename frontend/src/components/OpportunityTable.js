
import styled from 'styled-components';

const Table = styled.table`width:100%; border-collapse:collapse;`;
const Th = styled.th`text-align:left; padding:8px; border-bottom:1px solid #eef2f7;`;
const Td = styled.td`padding:8px; border-bottom:1px solid #f3f6fb;`;
const Select = styled.select`padding:6px; border-radius:6px;`;
const Input = styled.input`padding:6px; width:100px;`;

export default function OpportunityTable({ opps, onUpdateStage, onUpdateValue, userRole }) {
  return (
    <Table>
      <thead>
        <tr>
          <Th>ID</Th>
          <Th>Title</Th>
          <Th>Value</Th>
          <Th>Stage</Th>
          <Th>Owner</Th>
          <Th>Lead</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <tbody>
        {opps.map(o => (
          <tr key={o.id}>
            <Td>{o.id}</Td>
            <Td>{o.title}</Td>
            <Td>
              <Input type="number" defaultValue={o.value} onBlur={(e)=>onUpdateValue(o.id, Number(e.target.value))} />
            </Td>
            <Td>
              <Select value={o.stage} onChange={(e)=>onUpdateStage(o.id, e.target.value)}>
                <option>Discovery</option>
                <option>Proposal</option>
                <option>Won</option>
                <option>Lost</option>
              </Select>
            </Td>
            <Td>{o.ownerId}</Td>
            <Td>{o.leadId}</Td>
            <Td><div /></Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

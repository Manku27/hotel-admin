import { Container } from '@mui/material';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';

const Employees = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#e0e0e0',
      }}
    >
      <h1>User management</h1>
      <EmployeeForm />
      <EmployeeTable />
    </Container>
  );
};

export default Employees;

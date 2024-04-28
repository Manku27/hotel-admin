import { Button, Container, Grid, Typography } from '@mui/material';
import EmployeeTable from './EmployeeTable';
import { lazy, useState } from 'react';
import LazyComponentWrapper from '../routing/LazyComponentWrapper';

const EmployeeForm = lazy(() => import('./EmployeeForm'));

const Employees = () => {
  const [addUser, setAddUser] = useState(false);

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '85%',
        backgroundColor: '#e0e0e0',
      }}
    >
      <Grid container spacing={1} sx={{ m: 1 }} alignItems="center">
        <Grid item xs={10} sx={{ textAlign: 'left' }}>
          <Typography variant="h3">Manage Users</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={() => setAddUser(!addUser)}
            variant="contained"
            color="primary"
          >
            Add User
          </Button>
        </Grid>
      </Grid>
      {addUser ? (
        <LazyComponentWrapper>
          <EmployeeForm successCallback={() => setAddUser(false)} />
        </LazyComponentWrapper>
      ) : null}

      <EmployeeTable />
    </Container>
  );
};

export default Employees;

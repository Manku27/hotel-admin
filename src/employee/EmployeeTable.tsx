import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Card } from '@mui/material';
import useSWR from 'swr';
import { getFetcher } from '../services/fetcher';
import { RoleLabel } from '../auth/authTypes';

const columns: GridColDef[] = [
  {
    field: 'fullName',
    headerName: 'Full name',
    flex: 1,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 1,
    valueGetter: (value, row) =>
      row.roles.length > 0 ? `${RoleLabel[row.roles[0].name]}` : 'Unassigned',
  },
];

const EmployeeTable = () => {
  const { data, isLoading } = useSWR(
    `${import.meta.env.VITE_API}/users`,
    getFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const rows = data || [];

  return (
    <Card sx={{ m: 2 }}>
      <DataGrid rows={rows} columns={columns} loading={isLoading} />
    </Card>
  );
};
export default EmployeeTable;

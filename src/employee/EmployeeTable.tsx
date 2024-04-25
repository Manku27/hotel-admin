import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PageCenter } from '../common/PageCenter';
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
    valueGetter: (value, row) => `${RoleLabel[row.roles[0].name]}`,
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
    <PageCenter>
      <Card sx={{ width: '60vw' }}>
        <DataGrid rows={rows} columns={columns} loading={isLoading} />
      </Card>
    </PageCenter>
  );
};
export default EmployeeTable;

import { Grid, InputAdornment, TextField } from '@mui/material';

type Props = {
  type?: 'normal' | 'big';
  booking: number;
  service: number;
  total: number;
};
export const RevenueDisplay = ({
  booking,
  service,
  total,
  type = 'normal',
}: Props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField
          label="Booking"
          value={booking}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Service"
          value={service}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Total"
          value={total}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
        />
      </Grid>
    </Grid>
  );
};

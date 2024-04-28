import { Box, Button, Card, Grid, Typography } from '@mui/material';
import AddSingleGuestForm from './AddSingleGuestForm';
import { guestInitialValues } from './guestConstants';
import { GuestForm } from './guestsType';

import DeleteIcon from '@mui/icons-material/Delete';
interface Props {
  guestList: GuestForm[];
  handleAddGuest: (data: GuestForm) => void;
  handleRemoveGuest: (data: number) => void;
}

const AddGuestsForm = ({
  guestList,
  handleAddGuest,
  handleRemoveGuest,
}: Props) => {
  return (
    <Box>
      <AddSingleGuestForm
        initialValues={guestInitialValues}
        submitCallback={handleAddGuest}
      />
      {guestList.length > 0 ? (
        <Grid container spacing={2}>
          {guestList.map((item, index) => (
            <Grid item xs={3} key={index}>
              <Card sx={{ m: 2, p: 2, flex: 1, textAlign: 'left' }}>
                <Typography variant="h5">{`${item.firstName} ${item.lastName}`}</Typography>
                <Typography variant="body2">{`Age : ${item.age}`}</Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="end"
                >
                  <Typography
                    variant="body2"
                    sx={{ mb: 0.5 }}
                  >{`Phone : ${item.mobileNo}`}</Typography>
                  <Button onClick={() => handleRemoveGuest(index)}>
                    <DeleteIcon sx={{ display: 'flex', mr: 1 }} />
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Box>
  );
};

export default AddGuestsForm;

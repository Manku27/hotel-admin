import { Box, Card, Grid } from '@mui/material';
import AddSingleGuestForm from './AddSingleGuestForm';
import { guestInitialValues } from './guestConstants';
import { GuestForm } from './guestsType';

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
                <h3>{`${item.firstName} ${item.lastName}`}</h3>
                <h4>{`Age : ${item.age}`}</h4>
                <h4>{`${item.mobileNo}`}</h4>
                <button onClick={() => handleRemoveGuest(index)}>Delete</button>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Box>
  );
};

export default AddGuestsForm;

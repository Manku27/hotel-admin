import { Box } from '@mui/material';
import AddSingleGuestForm from './AddSingleGuestForm';
import { guestInitialValues } from './guestConstants';
import { GuestForm } from './guestsType';

interface Props {
  guestList: GuestForm[];
  handleAddGuest: (data: GuestForm) => void;
}

const AddGuestsForm = ({ guestList, handleAddGuest }: Props) => {
  return (
    <Box>
      {guestList.length > 0
        ? guestList.map((item, index) => (
            <AddSingleGuestForm
              initialValues={item}
              submitCallback={handleAddGuest}
              key={index}
              readOnly
            />
          ))
        : null}
      <AddSingleGuestForm
        initialValues={guestInitialValues}
        submitCallback={handleAddGuest}
        readOnly={false}
      />
    </Box>
  );
};

export default AddGuestsForm;

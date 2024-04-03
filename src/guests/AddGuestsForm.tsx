import { Box } from '@mui/material';
import { useState } from 'react';
import AddSingleGuestForm from './AddSingleGuestForm';
import { guestInitialValues } from './guestConstants';
import { GuestForm } from './guestsType';

const AddGuestsForm = () => {
  const [guestList, setGuestList] = useState<GuestForm[]>([]);

  const handleAddGuest = (newGuest: GuestForm) => {
    setGuestList((currentGuestList) => [...currentGuestList, newGuest]);
  };

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

import React, { useState } from 'react';
import { Stack } from 'react-native';

const CheckBox = () => {
  const [checked, setState] = useState(true);
  const toggleCheckbox = () => setState(!checked);

  return (
    <Stack row align="center">
    </Stack>
  );
};

export default CheckBox;
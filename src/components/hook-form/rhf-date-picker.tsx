import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
interface RHFDatePickerProps {
  name: string;
  label: string;
}

const RHFDatePicker: React.FC<RHFDatePickerProps> = ({ name, label }) => {
  const { control } = useFormContext();

  return (
    <DatePicker
      name={name}
      label={label}
    />
  );
};

export default RHFDatePicker;

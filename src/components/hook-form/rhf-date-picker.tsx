import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
;

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
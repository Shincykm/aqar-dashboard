import { useFormContext, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps, AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { useState } from 'react';
import { debounce } from 'lodash';

// ----------------------------------------------------------------------

interface Props<
  T,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
> extends Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'> {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  disableAutofill?: boolean;
  debounceTime?: number; // Add debounceTime property
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
}

export default function RHFAutocompleteOne<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  name,
  label,
  placeholder,
  helperText,
  disableAutofill = false,
  debounceTime = 300, // Default debounce time
  renderInput,
  ...other
}: Props<T, Multiple, DisableClearable, FreeSolo>) {
  const { control, setValue } = useFormContext();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = debounce((value: string) => {
    setInputValue(value);
  }, debounceTime);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          inputValue={inputValue}
          onInputChange={(event, newValue) => handleInputChange(newValue)}
          onChange={(event, newValue) => {
            setValue(name, newValue, { shouldValidate: true });
            setInputValue('');
          }}
          renderInput={(params) =>
            renderInput ? (
              renderInput(params)
            ) : (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                error={!!error}
                helperText={error ? error?.message : helperText}
                autoComplete={disableAutofill ? 'off' : 'on'}
              />
            )
          }
          {...other}
        />
      )}
    />
  );
}

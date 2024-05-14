import { useCallback } from 'react';
// @mui
import Stack from '@mui/material/Stack';
// import MenuItem from '@mui/material/MenuItem';
// import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
// import InputLabel from '@mui/material/InputLabel';
// import IconButton from '@mui/material/IconButton';
// import FormControl from '@mui/material/FormControl';
// import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// components
import Iconify from 'src/components/iconify';
// import CustomPopover, { usePopover } from 'src/components/custom-popover';
// types
import { IPropertyTypeTableFilters, IPropertyTypeTableFilterValue } from 'src/types/propertyType';

// ----------------------------------------------------------------------

type Props = {
  filters: IPropertyTypeTableFilters;
  onFilters: (name: string, value: IPropertyTypeTableFilterValue) => void;
  //
  // stockOptions: {
  //   value: string;
  //   label: string;
  // }[];
  // publishOptions: {
  //   value: string;
  //   label: string;
  // }[];
};

export default function PropertyTypeTableToolbar({
  filters,
  onFilters,
  //
  // stockOptions,
  // publishOptions,
}: Props) {
  // const popover = usePopover();

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('name_en', event.target.value);
    },
    [onFilters]
  );

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.5,
          pr: { xs: 2.5, md: 1 },
        }}
      >

        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <TextField
            fullWidth
            value={filters.name_en}
            onChange={handleFilterName}
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />

          {/* <IconButton onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton> */}
        </Stack>
      </Stack>

      {/* <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </CustomPopover> */}
    </>
  );
}

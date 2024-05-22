import sum from 'lodash/sum';
import { useCallback, useEffect, useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { inputBaseClasses } from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
// utils
import { fCurrency } from 'src/utils/format-number';
// _mock
import { INVOICE_SERVICE_OPTIONS } from 'src/_mock';
// types
import { IInvoiceItem } from 'src/types/invoice';
// components
import Iconify from 'src/components/iconify';
import { RHFSelect, RHFUpload, RHFUploadBox, RHFUploadCustom } from 'src/components/hook-form';
import { useGetAmenitiesList } from 'src/api/amenities';
import { LoadingButton } from '@mui/lab';


// ----------------------------------------------------------------------

export default function AmenityNewEditDetails() {
  const { control, setValue, watch, resetField } = useFormContext();

  const {amenities, amenitiesEmpty, amenitiesLoading} = useGetAmenitiesList();

  const [amenitiesList, setAmenitiesList] = useState<any>([...amenities]);
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'amenity_items',
  });

  const values = watch();

  const handleAdd = () => {
    append({
      amenity_id : 0,
      amenity_picture:[],
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  const handleClearAmenity = useCallback(
    (index: number) => {
      resetField(`amenity_items[${index}].amenity_id`);
      resetField(`amenity_items[${index}].amenity_picture`);
    },
    [resetField]
  );

  const handleSelectAmenity = useCallback(
    (index: number, option: any, name: string) => {      
      setValue(`amenity_items[${index}].amenity_id`, option);
      setAmenitiesList((prev:any) => prev = amenities.filter(amenity => amenity.id !== option));
    },
    [setValue, values.amenity_items]
  );

  const handleDrop = useCallback(
    ( acceptedFiles: File[], index:any) => {
      
      const files = values.amenity_items[index]?.amenity_picture || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue(`amenity_items[${index}].amenity_picture`, [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.amenity_items.amenity_picture]
  );

  const handleRemoveFile = useCallback(
    (inputFile: File | string, index:any) => {
      const filtered = values.amenity_items[index]?.amenity_picture && values.amenity_items[index]?.amenity_picture?.filter((file:any) => file !== inputFile);
      setValue(`amenity_items[${index}].amenity_picture`, filtered);
    },
    [setValue, values.amenity_items]
  );

  const handleRemoveAllFiles = useCallback((index :number) => {
    setValue(`amenity_items[${index}].amenity_picture`, []);
  }, [setValue]);

  return (
    <Box sx={{ p: 3 }}>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack spacing={2} sx={{ width: 1 }}>

            <Stack direction="row" spacing={1.5}>

              <RHFSelect
                name={`amenity_items[${index}]?.amenity_id` || ''}
                size="small"
                label="Amenities"
                InputLabelProps={{ shrink: true }}
                sx={{
                  maxWidth: { md: 160 },
                }}
              >
                <MenuItem
                  value=""
                  onClick={() => handleClearAmenity(index)}
                  sx={{ fontStyle: 'italic', color: 'text.secondary' }}
                >
                  None
                </MenuItem>

                <Divider sx={{ borderStyle: 'dashed' }} />

                {amenities?.map((amenity:any) => (
                  <MenuItem
                    key={amenity.id}
                    value={amenity.id}
                    onClick={() => handleSelectAmenity(index, amenity.id, amenity.name_en)}
                  >
                    {amenity.name_en}
                  </MenuItem>
                ))}
              </RHFSelect>

              {values.amenity_items[index]?.amenity_id !== 0 && <RHFUploadCustom
                key={index}
                multiple
                thumbnail
                name={`amenity_items[${index}].amenity_picture`}
                maxSize={3145728}
                onDrop={(files) => handleDrop(files, index)}
                onRemove={(file) => handleRemoveFile(file, index)}
                onRemoveAll={() => handleRemoveAllFiles(index)}
                onUpload={() => console.info('ON UPLOAD')}
              />}
              
            </Stack>

            </Stack>

            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={() => handleRemove(index)}
            >
              Remove
            </Button>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-end', md: 'center' }}
      >
        <Button
          size="small"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAdd}
          sx={{ flexShrink: 0 }}
        >
          Add Item
        </Button>

      </Stack>

      
    </Box>
  );
}

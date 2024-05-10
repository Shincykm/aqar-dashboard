import * as Yup from 'yup';
import { useCallback, useMemo, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Chip, Divider } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// _mock
import {
  PRODUCT_SIZE_OPTIONS,
  PRODUCT_GENDER_OPTIONS,
  PRODUCT_COLOR_NAME_OPTIONS,
  PRODUCT_CATEGORY_GROUP_OPTIONS,
} from 'src/_mock';
// components
import { useSnackbar } from 'src/components/snackbar';
import { useRouter } from 'src/routes/hooks';
import FormProvider, {
  RHFSelect,
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFDatePicker,
} from 'src/components/hook-form';
// types
import { IPropertyItem } from 'src/types/property';
import { IPropertyType } from 'src/types/propertyType';

// ----------------------------------------------------------------------

// Tempdata to be populated from database
const PROPERTY_TYPE: IPropertyType[] = [
  {
    id: 1,
    nameEn: 'Villa',
    nameAr: 'Villa',
  },
  {
    id: 2,
    nameEn: 'Apartment',
    nameAr: 'Apartment',
  },
  {
    id: 3,
    nameEn: 'Sub- Villa',
    nameAr: 'Sub- Villa',
    parentId: 1,
  },
];

const POPERTY_PURPOSE: IPropertyType[] = [
  {
    id: 1,
    nameEn: 'Rent',
    nameAr: 'Rent',
  },
  {
    id: 2,
    nameEn: 'Sale',
    nameAr: 'Sale',
  },
];

const PROPERTY_STYLE: IPropertyType[] = [
  {
    id: 1,
    nameEn: 'A frame',
    nameAr: 'A frame',
  },
  {
    id: 2,
    nameEn: 'Cottage',
    nameAr: 'Cottage',
  },
];

const ADDRESS = [
  {
    id: 1,
    name: 'place 1',
  },
  {
    id: 2,
    name: 'place 2',
  },
];

// ----------------------------------------------------------------------

type Props = {
  currentProperty?: IPropertyItem;
};

export default function PropertyNewEditForm({ currentProperty }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const NewPropertySchema = Yup.object().shape({
    nameAr: Yup.string().nullable(),
    nameEn: Yup.string().required('Title is required'),
    descriptionAr: Yup.string().nullable(),
    descriptionEn: Yup.string().nullable(),

    // boolean
    active: Yup.boolean().required(),
    isFeatured: Yup.boolean().required(),
    isFurnished: Yup.boolean().required(),
    countBathrooms: Yup.number().nullable(),
    countBedrooms: Yup.number().nullable(),
    countParking: Yup.number().nullable(),
    sizeSqm: Yup.number().nullable(),
    // sizeSqft: Yup.number().nullable(),

    //price
    maintenanceFee: Yup.number().nullable(),
    oldAmount: Yup.number().nullable(),
    amount: Yup.number().nullable(),

    // owner Details
    ownership: Yup.string().nullable(),
    referenceNumber: Yup.string().nullable(),
    // constructedDate: Yup.date().nullable(),
    constructedDate: Yup.mixed<any>().nullable().required('Expired date is required'),

    // populate data and select
    propertyTypeId: Yup.number().nullable(),
    // subType: Yup.string().nullable(),
    propertyPurposeId: Yup.number().nullable(),
    propertyStyleId: Yup.number().nullable(),

    // location - populate data and select
    addressId: Yup.number().nullable(),
    buildingId: Yup.number().nullable(),
    countryId: Yup.number().nullable(),
    stateProvinceId: Yup.number().nullable(),
    cityId: Yup.number().nullable(),
    // displayOrder: Yup.number().nullable(),

    // property image
    images: Yup.array().min(1, 'Images is required'),

    //auto populate to db
    // createdAt: Yup.date().required(),
    // updatedAt: Yup.date().required(),
    // deletedAt: Yup.date().nullable(),
  });

  const defaultValues = useMemo(
    () => ({
      nameAr: currentProperty?.nameAr || '',
      nameEn: currentProperty?.nameEn || '',
      descriptionAr: currentProperty?.descriptionAr || '',
      descriptionEn: currentProperty?.descriptionEn || '',
      active: currentProperty?.active || true,
      isFeatured: currentProperty?.isFeatured || false,
      isFurnished: currentProperty?.isFurnished || false,
      images: currentProperty?.images || [],
      countBathrooms: currentProperty?.countBathrooms || 0,
      countBedrooms: currentProperty?.countBedrooms || 0,
      countParking: currentProperty?.countParking || 0,
      sizeSqm: currentProperty?.sizeSqm || 0,
      // sizeSqft: currentProperty?.sizeSqft || 0,
      ownership: currentProperty?.ownership || '',
      referenceNumber: currentProperty?.referenceNumber || '',
      constructedDate: currentProperty?.constructedDate || null,
      maintenanceFee: currentProperty?.maintenanceFee || 0,
      oldAmount: currentProperty?.oldAmount || 0,
      amount: currentProperty?.amount || 0,
      propertyTypeId: currentProperty?.propertyTypeId || 0,
      // subType: currentProperty?.subType || '',
      propertyPurposeId: currentProperty?.propertyPurposeId || 0,
      propertyStyleId: currentProperty?.propertyStyleId || 0,
      addressId: currentProperty?.addressId || 0,
      buildingId: currentProperty?.buildingId || 0,
      countryId: currentProperty?.countryId || 0,
      stateProvinceId: currentProperty?.stateProvinceId || 0,
      cityId: currentProperty?.cityId || 0,
      displayOrder: currentProperty?.displayOrder || 0,
      //   createdAt: currentProperty?.createdAt || null,
      //   updatedAt: currentProperty?.updatedAt || null,
      //   deletedAt: currentProperty?.deletedAt || null,
    }),
    [currentProperty]
  );

  const methods = useForm({
    resolver: yupResolver(NewPropertySchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentProperty) {
      reset(defaultValues);
    }
  }, [currentProperty, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentProperty ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.property.root);
      console.info('DATA', data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const filtered = values.images && values.images?.filter((file) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', []);
  }, [setValue]);

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Title, short description, image...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Typography variant="subtitle2">Property Name (Arabic)</Typography>
            <RHFTextField name="nameAr" label="Name" />
            <Typography variant="subtitle2">Property Name</Typography>
            <RHFTextField name="nameEn" label="Name" />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Description (Arabic)</Typography>
              <RHFEditor simple name="descriptionAr" />
            </Stack>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Description</Typography>
              <RHFEditor simple name="descriptionEn" />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Additional Info</Typography>
              <Box
                columnGap={2}
                rowGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  md: 'repeat(3, 1fr)',
                }}
              >
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Active"
                  sx={{ flexGrow: 1, pl: 3 }}
                />
                <FormControlLabel
                  control={<Switch />}
                  label="Featured"
                  sx={{ flexGrow: 1, pl: 3 }}
                />
                <FormControlLabel
                  control={<Switch />}
                  label="Furnished"
                  sx={{ flexGrow: 1, pl: 3 }}
                />
              </Box>
            </Stack>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Stack spacing={1.5}>
              <Box
                columnGap={2}
                rowGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                }}
              >
                <RHFTextField
                  name="countBedrooms"
                  label="Bedrooms"
                  placeholder="0"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                />
                <RHFTextField
                  name="countBathrooms"
                  label="Bathrooms"
                  placeholder="0"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                />
                <RHFTextField
                  name="countParking"
                  label="Parking Slots"
                  placeholder="0"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                />
                <RHFTextField
                  name="sizeSqm"
                  label="Area in Sqm"
                  placeholder="0"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                />
                {/* <RHFTextField
                name="sizeSqft"
                label="Area in Sqm"
                placeholder="0"
                type="number"
                InputLabelProps={{ shrink: true }}
              /> */}
                {}
              </Box>
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Images</Typography>
              <RHFUpload
                multiple
                thumbnail
                name="images"
                maxSize={3145728}
                onDrop={handleDrop}
                onRemove={handleRemoveFile}
                onRemoveAll={handleRemoveAllFiles}
                onUpload={() => console.info('ON UPLOAD')}
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderProjectDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Project Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Ownership, Reference, Contruction Date...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Project Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Ownership</Typography>
              <RHFTextField name="ownership" label="Ownership" />
            </Stack>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Reference Number</Typography>
              <RHFTextField name="referenceNumber" label="Reference Number" />
            </Stack>
            {/* <RHFDatePicker name="constructedDate" label="Constructed Date" /> */}
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Constructed Date</Typography>
              <Controller
                name="constructedDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    {...field}
                    format="dd/MM/yyyy"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderPricing = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Pricing
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Amount, Old Amount, Maintanence price...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Project Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              columnGap={2}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField
                name="amount"
                label="Amount"
                placeholder="0"
                type="number"
                InputLabelProps={{ shrink: true }}
              />
              <RHFTextField
                name="oldAmount"
                label="Old Amount"
                placeholder="0"
                type="number"
                InputLabelProps={{ shrink: true }}
              />
              <RHFTextField
                name="maintenanceFee"
                label="Maintenance Fee"
                placeholder="0"
                type="number"
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderTypeDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Property Type
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Property Type, Sub Type, Purpose, Style...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Project Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              columnGap={2}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
            >
              {PROPERTY_TYPE && (
                <RHFSelect
                  native
                  name="propertyTypeId"
                  label="Property Type"
                  InputLabelProps={{ shrink: true }}
                >
                  {PROPERTY_TYPE?.map(
                    (type) =>
                      !type?.parentId && (
                        <option key={type?.id} value={type?.id}>
                          {type?.nameEn}
                        </option>
                      )
                  )}
                </RHFSelect>
              )}

              {/* <RHFSelect
                  native
                  name="propertySubType"
                  label="Property Sub-Type"
                  InputLabelProps={{ shrink: true }}
                  disabled={subTypeList.length < 1}
                >
                  {subTypeList?.map((subType) => (
                    <option key={subType?.id} value={subType?.nameEn}>
                      {subType?.nameEn}
                    </option>
                  ))}
                  <option value=""></option>
                </RHFSelect> */}

              {POPERTY_PURPOSE && (
                <RHFSelect
                  native
                  name="propertyPurposeId"
                  label="Property Purpose"
                  InputLabelProps={{ shrink: true }}
                >
                  {POPERTY_PURPOSE?.map((item) => (
                    <option key={item?.id} value={item?.id}>
                      {item?.nameEn}
                    </option>
                  ))}
                </RHFSelect>
              )}

              {PROPERTY_STYLE && (
                <RHFSelect
                  native
                  name="propertyStyleId"
                  label="Property Style"
                  InputLabelProps={{ shrink: true }}
                >
                  {PROPERTY_STYLE?.map((item) => (
                    <option key={item?.id} value={item?.id}>
                      {item?.nameEn}
                    </option>
                  ))}
                </RHFSelect>
              )}
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderAddress = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Address
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Address, Building, City, State...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Project Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              columnGap={2}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
            >
              {PROPERTY_TYPE && (
                <RHFSelect
                  native
                  name="addressId"
                  label="Address"
                  InputLabelProps={{ shrink: true }}
                >
                  {ADDRESS?.map((type) => (
                    <option key={type?.id} value={type?.id}>
                      {type?.name}
                    </option>
                  ))}
                </RHFSelect>
              )}

              {/* <RHFSelect
                  native
                  name="propertySubType"
                  label="Property Sub-Type"
                  InputLabelProps={{ shrink: true }}
                  disabled={subTypeList.length < 1}
                >
                  {subTypeList?.map((subType) => (
                    <option key={subType?.id} value={subType?.nameEn}>
                      {subType?.nameEn}
                    </option>
                  ))}
                  <option value=""></option>
                </RHFSelect> */}

              {PROPERTY_TYPE && (
                <RHFSelect
                  native
                  name="buildingId"
                  label="Building"
                  InputLabelProps={{ shrink: true }}
                >
                  {ADDRESS?.map((type) => (
                    <option key={type?.id} value={type?.id}>
                      {type?.name}
                    </option>
                  ))}
                </RHFSelect>
              )}

              {PROPERTY_TYPE && (
                <RHFSelect native name="cityId" label="City" InputLabelProps={{ shrink: true }}>
                  {ADDRESS?.map((type) => (
                    <option key={type?.id} value={type?.id}>
                      {type?.name}
                    </option>
                  ))}
                </RHFSelect>
              )}

              {PROPERTY_TYPE && (
                <RHFSelect
                  native
                  name="stateProvinceId"
                  label="State / Province"
                  InputLabelProps={{ shrink: true }}
                >
                  {ADDRESS?.map((type) => (
                    <option key={type?.id} value={type?.id}>
                      {type?.name}
                    </option>
                  ))}
                </RHFSelect>
              )}
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
          {!currentProperty ? 'Create Property' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {renderProjectDetails}

        {renderPricing}

        {renderTypeDetails}

        {renderAddress}

        {renderActions}
      </Grid>
    </FormProvider>
  );
}

import * as Yup from 'yup';
import { useCallback, useMemo, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import { useSnackbar } from 'src/components/snackbar';
import { useRouter } from 'src/routes/hooks';
import FormProvider, {
  RHFSelect,
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFSwitch,
} from 'src/components/hook-form';
// types
import { IPropertyItem } from 'src/types/property';
// api
import { useGetPropertyTypeList } from 'src/api/propertyType';
import { useGetPropertyPurposeList } from 'src/api/propertyPurpose';
import { useGetPropertyStyleList } from 'src/api/propertyStyle';
import { useCreateUpdateProperty } from 'src/api/property';
import { useGetAmenitiesList } from 'src/api/amenities';
import { useCreateUpdatePropertyPictureMapping } from 'src/api/propertyPictureMapping';
//
import { convertStringToBoolean } from 'src/utils/string-to-boolean';
import AmenityNewEditDetails from './amenity-new-edit-details';

// ----------------------------------------------------------------------

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

  const [subTypeList, setSubTypeList] = useState<any>(null);

  const { propertyTypes, propertyTypeEmpty, propertyTypeLoading } = useGetPropertyTypeList(1, 10);
  const { propertyPurposes, propertyPurposeEmpty, propertyPurposeLoading } =
    useGetPropertyPurposeList(1, 10);
  const { propertyStyles, propertyStyleEmpty, propertyStyleLoading } = useGetPropertyStyleList(
    1,
    10
  );

  const NewPropertySchema = Yup.object().shape({
    name_ar: Yup.string().nullable(),
    name_en: Yup.string().required('Title is required'),
    description_ar: Yup.string().nullable(),
    description_en: Yup.string().nullable(),
    active: Yup.boolean().required(),
    is_featured: Yup.boolean().required(),
    is_furnished: Yup.boolean().required(),
    count_bathrooms: Yup.number().nullable(),
    count_bedrooms: Yup.number().nullable(),
    count_parking: Yup.number().nullable(),
    size_sqm: Yup.number().nullable(),
    // sizeSqft: Yup.number().nullable(),
    maintenance_fee: Yup.number().nullable(),
    old_amount: Yup.number().nullable(),
    amount: Yup.number().nullable(),
    ownership: Yup.string().nullable(),
    reference_number: Yup.string().nullable(),
    constructed_date: Yup.mixed<any>().nullable(),
    property_type_id: Yup.number().nullable(),
    sub_type: Yup.string().nullable(),
    property_purpose_id: Yup.number().nullable(),
    property_style_id: Yup.number().nullable(),
    address_id: Yup.number().nullable(),
    building_id: Yup.number().nullable(),
    country_id: Yup.number().nullable(),
    state_province_id: Yup.number().nullable(),
    city_id: Yup.number().nullable(),
    display_order: Yup.number().nullable(),
    pictures: Yup.array().min(1, 'Images is required'),
    //auto populate to db
    // createdAt: Yup.date().required(),
    // updatedAt: Yup.date().required(),
    // deletedAt: Yup.date().nullable(),
  });

  const defaultValues = useMemo(
    () => ({
      name_ar: currentProperty?.name_ar || '',
      name_en: currentProperty?.name_en || '',
      description_ar: currentProperty?.description_ar || '',
      description_en: currentProperty?.description_en || '',
      active: convertStringToBoolean(currentProperty?.active) || true,
      is_featured: convertStringToBoolean(currentProperty?.is_featured) || false,
      is_furnished: convertStringToBoolean(currentProperty?.is_furnished) || false,
      pictures: currentProperty?.pictures || [],
      count_bathrooms: currentProperty?.count_bathrooms || 0,
      count_bedrooms: currentProperty?.count_bedrooms || 0,
      count_parking: currentProperty?.count_parking || 0,
      size_sqm: currentProperty?.size_sqm || 0,
      // sizeSqft: currentProperty?.sizeSqft || 0,
      ownership: currentProperty?.ownership || '',
      reference_number: currentProperty?.reference_number || '',
      constructed_date: currentProperty?.constructed_date || null,
      maintenance_fee: currentProperty?.maintenance_fee || 0,
      old_amount: currentProperty?.old_amount || 0,
      amount: currentProperty?.amount || 0,
      property_type_id: currentProperty?.property_type_id || 0,
      sub_type: currentProperty?.sub_type || '',
      property_purpose_id: currentProperty?.property_purpose_id || 0,
      property_style_id: currentProperty?.property_style_id || 0,
      address_id: currentProperty?.address_id || 0,
      building_id: currentProperty?.building_id || 0,
      country_id: currentProperty?.country_id || 0,
      state_province_id: currentProperty?.state_province_id || 0,
      city_id: currentProperty?.city_id || 0,
      display_order: currentProperty?.display_order || 0,
      amenity_items: currentProperty?.amenity_items || [],
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

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const formData = new FormData();
      const formDataAmenity = new FormData();
      Object.keys(data)?.forEach((key) => {
        if (typeof data[key] === 'boolean') {
          data[key] == true ? formData.append(key, '1') : formData.append(key, '0');
        }

        if (typeof data[key] === 'string' && data[key] != '') {
          formData.append(key, data[key]);
        }

        if (typeof data[key] === 'number' && data[key] !== 0) {
          formData.append(key, data[key].toString());
        }

        if (key === 'amenity_items') {
          formDataAmenity.append('amenity_picture', data[key].amenity_picture);
        }
      });

      // api - create property
      const response = await useCreateUpdateProperty(formData);
      console.log(response);
      console.log(formDataAmenity.get('amenity_picture'));

      if (response.status === 'success') {
        // const amenitiesResponse = await useCreateUpdatePropertyPictureMapping(formDataAmenity);
        // if(amenitiesResponse.status === "success"){
        //   reset();
        //   enqueueSnackbar(currentProperty ? 'Update success!' : 'Create success!');
        //   router.push(paths.dashboard.property.root);
        //   console.info('DATA', data);
        // }
      }
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = values.pictures || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('pictures', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.pictures]
  );

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const filtered = values.pictures && values.pictures?.filter((file) => file !== inputFile);
      setValue('pictures', filtered);
    },
    [setValue, values.pictures]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('pictures', []);
  }, [setValue]);

  const handleSelectPropertyType = useCallback(
    (e: any) => {
      const { value } = e.target;

      // setSubTypeList(propertyTypes.filter((type) => type?.parent_id === value));
      setValue('property_type_id', value);
    },
    [propertyTypes]
  );

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
            <Typography variant="subtitle2">Property Name (English)</Typography>
            <RHFTextField name="name_en" label="Name" />
            <Typography variant="subtitle2">Property Name (Arabic)</Typography>
            <RHFTextField name="name_ar" label="Name" />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Description (English)</Typography>
              {/* <RHFEditor simple name="description_en" /> */}
              <RHFTextField name="description_en" label="Description" multiline rows={4} />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Description (Arabic)</Typography>
              {/* <RHFEditor simple name="description_ar" /> */}
              <RHFTextField name="description_ar" label="Description" multiline rows={4} />
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
                <RHFSwitch name="active" label="Active" />
                <RHFSwitch label="Featured" name="is_featured" />
                <RHFSwitch label="Furnished" name="is_furnished" />
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
                  name="count_bedrooms"
                  label="Bedrooms"
                  placeholder="0"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                />
                <RHFTextField
                  name="count_bathrooms"
                  label="Bathrooms"
                  placeholder="0"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                />
                <RHFTextField
                  name="count_parking"
                  label="Parking Slots"
                  placeholder="0"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                />
                <RHFTextField
                  name="size_sqm"
                  label="Area in Sqm"
                  placeholder="0"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                />
                {/* <RHFTextField
                name="size_sqft"
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
                name="pictures"
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
              <RHFTextField name="reference_number" label="Reference Number" />
            </Stack>
            {/* <RHFDatePicker name="constructed_date" label="Constructed Date" /> */}
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Constructed Date</Typography>
              <Controller
                name="constructed_date"
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
                name="old_amount"
                label="Old Amount"
                placeholder="0"
                type="number"
                InputLabelProps={{ shrink: true }}
              />
              <RHFTextField
                name="maintenance_fee"
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
              {/* {!propertyTypeEmpty && (
              propertyTypeLoading 
              ? <LoadingButton />
              : (
                <>
                  <RHFSelect
                    native
                    name="property_type_id"
                    label="Property Type"
                    InputLabelProps={{ shrink: true }}
                    onChange = {handleSelectPropertyType}
                  >
                    <option value=""></option>
                    {propertyTypes?.map((type) =>
                      <option key={type?.id} value={type?.id}>
                        {type?.name_en.charAt(0).toUpperCase() + type?.name_en.slice(1)}
                      </option>
                    )}
                  </RHFSelect>

                  <RHFSelect
                    native
                    name="sub_type"
                    label="Property Sub-Type"
                    InputLabelProps={{ shrink: true }}
                    disabled={subTypeList?.length > 0 ? false : true}
                  >
                    <option value=""></option>
                    {subTypeList?.map((type:any) => 
                          <option key={type?.id} value={type?.id} >
                            {type?.name_en}
                          </option>
                    )}
                  </RHFSelect>
                </>
              )
                )} */}

              {!propertyTypeEmpty && (
                <RHFSelect
                  native
                  name="property_type_id"
                  label="Property Type"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleSelectPropertyType}
                >
                  {propertyTypeLoading ? (
                    <LoadingButton />
                  ) : (
                    <>
                      <option value=""></option>
                      {propertyTypes?.map((type) => (
                        <option key={type?.id} value={type?.id}>
                          {type?.name_en.charAt(0).toUpperCase() + type?.name_en.slice(1)}
                        </option>
                      ))}
                    </>
                  )}
                </RHFSelect>
              )}

              {!propertyPurposeEmpty && (
                <RHFSelect
                  native
                  name="property_purpose_id"
                  label="Property Purpose"
                  InputLabelProps={{ shrink: true }}
                >
                  {propertyPurposeLoading ? (
                    <LoadingButton />
                  ) : (
                    <>
                      <option value=""></option>
                      {propertyPurposes?.map((item) => (
                        <option key={item?.id} value={item?.id}>
                          {item?.name_en}
                        </option>
                      ))}
                    </>
                  )}
                </RHFSelect>
              )}

              {!propertyStyleEmpty && (
                <RHFSelect
                  native
                  name="property_style_id"
                  label="Property Style"
                  InputLabelProps={{ shrink: true }}
                >
                  {propertyStyleLoading ? (
                    <LoadingButton />
                  ) : (
                    <>
                      <option value=""></option>
                      {propertyStyles?.map((item) => (
                        <option key={item?.id} value={item?.id}>
                          {item?.name_en}
                        </option>
                      ))}
                    </>
                  )}
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
              {ADDRESS && (
                <RHFSelect
                  native
                  name="address_id"
                  label="Address"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleSelectPropertyType}
                >
                  <option value=""></option>
                  {ADDRESS?.map((type) => (
                    <option key={type?.id} value={type?.id}>
                      {type?.name}
                    </option>
                  ))}
                </RHFSelect>
              )}

              {ADDRESS && (
                <RHFSelect
                  native
                  name="building_id"
                  label="Building"
                  InputLabelProps={{ shrink: true }}
                >
                  <option value=""></option>
                  {ADDRESS?.map((type) => (
                    <option key={type?.id} value={type?.id}>
                      {type?.name}
                    </option>
                  ))}
                </RHFSelect>
              )}

              {ADDRESS && (
                <RHFSelect native name="city_id" label="City" InputLabelProps={{ shrink: true }}>
                  <option value=""></option>
                  {ADDRESS?.map((type) => (
                    <option key={type?.id} value={type?.id}>
                      {type?.name}
                    </option>
                  ))}
                </RHFSelect>
              )}

              {ADDRESS && (
                <RHFSelect
                  native
                  name="state_province_id"
                  label="State / Province"
                  InputLabelProps={{ shrink: true }}
                >
                  <option value=""></option>
                  {ADDRESS?.map((type) => (
                    <option key={type?.id} value={type?.id}>
                      {type?.name}
                    </option>
                  ))}
                </RHFSelect>
              )}
            </Box>
          </Stack>

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField
              name="display_order"
              label="Display Order"
              placeholder="0"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderAmenityDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Amenities
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Amenities, Images,...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          <AmenityNewEditDetails />
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

        {renderAmenityDetails}

        {renderActions}
      </Grid>
    </FormProvider>
  );
}

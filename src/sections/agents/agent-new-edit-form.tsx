import { useMemo, useEffect, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import { useSnackbar } from 'src/components/snackbar';
import { useRouter } from 'src/routes/hooks';
import FormProvider, {
  RHFAutocomplete,
  RHFSelect,
  // RHFEditor,
  RHFTextField,
  RHFUpload,
  RHFUploadAvatar,
  // RHFDatePicker,
} from 'src/components/hook-form';
// types
import { IAgentItem } from 'src/types/agents';
import { useCreateUpdateAmenities } from 'src/api/amenities';
import { Box } from '@mui/system';
import { fData } from 'src/utils/format-number';
import { useGetAgentList } from 'src/api/agent';
import { useCityList, useGetCountriesList, useStateProvincesList } from 'src/api/address';

// ----------------------------------------------------------------------

type Props = {
  currentAgent?: any;
};

export default function AgentNewEditForm({ currentAgent }: Props) {
  const router = useRouter();

  const { agents, agentsEmpty, agentsLoading } = useGetAgentList(1, 1000);

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const NewAgentSchema = Yup.object().shape({
    agent_id: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      agent_id: currentAgent?.agent_id || '',
      country_id: currentAgent?.country_id || null,
      city_id: currentAgent?.city_id || null,
      state_province_id: currentAgent?.state_province_id || null,
    }),
    [currentAgent]
  );

  const methods = useForm({
    resolver: yupResolver(NewAgentSchema) as any,
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

  const { countries, countriesEmpty, countriesLoading } = useGetCountriesList(1, 1000);
  const { stateProvinces, stateProvincesEmpty, stateProvincesLoading } = useStateProvincesList(
    1,
    1000,
    values.country_id ? values.country_id : ''
  );
  const { cities, citiesEmpty, citiesLoading } = useCityList(
    1,
    1000,
    values.state_province_id ? values.state_province_id : ''
  );

  // useEffect(() => {
  //   if (currentAgent) {
  //     console.log(currentAgent);
  //     reset(defaultValues);
  //   }
  // }, [currentAgent, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      let formData = new FormData();
      // formData.append('agent_id', data.agent_id);
      // formData.append('property_id', data?.property_id || '');
      // if(data?.icon){
      //   formData.append('icon', data.icon);
      // }

      if (currentAgent) {
        formData.append('id', currentAgent.id);
      }

      const response = await useCreateUpdateAmenities(formData);
      reset();
      if (response) {
        enqueueSnackbar(currentAgent ? 'Update success!' : 'Create success!');
      }
      router.push(paths.dashboard.amenities.root);
    } catch (error) {
      console.error(error);
    }
  });

  const handleRemoveFile = useCallback(
    async (inputFile: any) => {
      const filtered = (values.pictures &&
        values.pictures?.filter((file: any) => file?.id !== inputFile?.id)) || [inputFile];
      const response = await deleteSingleImage(inputFile);
      if (response) setValue('pictures', filtered);
    },
    [setValue, values.pictures]
  );

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('icon', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleAgentChange = useCallback(
    (newValue: any) => {
      setValue('agent_id', newValue, { shouldValidate: true });
    },
    [setValue]
  );

  const handleCountryChange = useCallback(
    (newValue: any) => {
      setValue('country_id', newValue, { shouldValidate: true });
      setValue('state_province_id', '', { shouldValidate: true }); // Reset state when country changes
    },
    [setValue]
  );

  const handleStateChange = useCallback(
    (newValue: any) => {
      setValue('state_province_id', newValue, { shouldValidate: true });
      setValue('city_id', '', { shouldValidate: true }); // Reset state when city changes
    },
    [setValue]
  );

  const handleCityChange = useCallback(
    (newValue: any) => {
      setValue('city_id', newValue, { shouldValidate: true });
    },
    [setValue]
  );

  const renderDetails = (
    <Grid xs={12} md={8}>
      <Card>
        {!mdUp && <CardHeader title="Create Agent" />}

        <Stack spacing={3} sx={{ p: 4 }}>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Agent</Typography>
            <RHFAutocomplete
              name="agent_id"
              label="Select Agent"
              options={agents.map((agent: any) => String(agent?.id))}
              getOptionLabel={(option) => {
                const selectedAgent = agents.find((agent: any) => agent?.id === Number(option));
                return selectedAgent ? selectedAgent.user?.last_name : '';
              }}
              isOptionEqualToValue={(option, value) => option === value}
              onChange={(event, newValue) => handleAgentChange(newValue)}
              loading={agentsLoading}
              renderOption={(props, option) => {
                const selectedAgent = agents.find((agent: any) => String(agent.id) === option);

                if (!selectedAgent) {
                  return null;
                }
                const { id, user } = selectedAgent;
                return (
                  <li {...props} key={id}>
                    {(user?.first_name || user?.last_name).trim()}
                  </li>
                );
              }}
            />
          </Stack>

          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Description (English)</Typography>
            {/* <RHFEditor simple name="description_en" /> */}
            <RHFTextField name="description_en" label="Description" multiline rows={4} />
          </Stack>

          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Designation</Typography>
            <RHFTextField name="designation" label="Designation" />
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );

  const renderCompany = (
    <Grid xs={12} md={8}>
      <Card>
        <Stack spacing={3} sx={{ p: 4 }}>
          
          <Box
            columnGap={2}
            rowGap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
            }}
          >
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Website</Typography>
              <RHFTextField name="website" label="Website" />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Company</Typography>
              <RHFTextField name="company" label="Company Name" />
            </Stack>
          </Box>

          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Office Address</Typography>
            <RHFTextField name="address_line_one" label="Building" />
            <RHFTextField name="address_line_one" label="Street / Zone" />
          </Stack>

          <Box
            columnGap={2}
            rowGap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
            }}
          >
             {!countriesEmpty && (
                <RHFAutocomplete
                  name="country_id"
                  label="Country"
                  options={countries.map((country) => String(country?.id))}
                  getOptionLabel={(option) => {
                    const selectedCountry = countries.find(
                      (country) => country.id === Number(option)
                    );
                    return selectedCountry ? selectedCountry.name : '';
                  }}
                  isOptionEqualToValue={(option, value) => option === value}
                  onChange={(event, newValue) => handleCountryChange(newValue)}
                  loading={countriesLoading}
                  renderOption={(props, option) => {
                    const selectedCountry = countries.find(
                      (country) => String(country.id) === option
                    );

                    if (!selectedCountry) {
                      return null;
                    }
                    const { id, name } = selectedCountry;
                    return (
                      <li {...props} key={name}>
                        {name}
                      </li>
                    );
                  }}
                />
              )}

              <RHFAutocomplete
                disabled={values.country_id ? false : true}
                name="state_province_id"
                label="State / Province"
                // value={currentProperty ? String(currentProperty.state_province_id) : ''}
                options={stateProvinces.map((state) => String(state.id))}
                getOptionLabel={(option) => {
                  const selectedSate = stateProvinces.find((state) => state.id === Number(option));
                  return selectedSate ? selectedSate.name : '';
                }}
                isOptionEqualToValue={(option, value) => option === value}
                onChange={(event, newValue) => handleStateChange(newValue)}
                loading={stateProvincesLoading}
                renderOption={(props, option) => {
                  const selectedSate = stateProvinces.find((state) => String(state.id) === option);

                  if (!selectedSate) {
                    return null;
                  }
                  const { id, name } = selectedSate;
                  return (
                    <li {...props} key={name}>
                      {name}
                    </li>
                  );
                }}
              />

              <RHFAutocomplete
                disabled={values.state_province_id ? false : true}
                name="city_id"
                label="City"
                // value={currentProperty?.city_id ? String(currentProperty?.city_id) : ''}
                options={cities.map((city) => String(city.id))}
                getOptionLabel={(option) => {
                  const selectedCity = cities.find((city) => city.id === Number(option));
                  return selectedCity ? selectedCity.name_en : '';
                }}
                isOptionEqualToValue={(option, value) => option === value}
                onChange={(event, newValue) => handleCityChange(newValue)}
                loading={citiesLoading}
                renderOption={(props, option) => {
                  const selectedCity = cities.find((city) => String(city.id) === option);

                  if (!selectedCity) {
                    return null;
                  }
                  const { id, name_en } = selectedCity;
                  return (
                    <li {...props} key={name_en}>
                      {name_en}
                    </li>
                  );
                }}
              />

              <RHFTextField name="zip_postal_code" label="Postal Code" />
          </Box>

          <Stack spacing={1.5}>
            <RHFTextField name="fax_number" label="Fax Number" />
          </Stack>

        </Stack>

      </Card>
    </Grid>
  );

  const renderLicenseDetails = (
    <Grid xs={12} md={8}>
      <Card>
        <Stack spacing={3} sx={{ p: 4 }}>
          <Stack spacing={1.5}>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">License Details</Typography>
              </Stack>
              <Box
                columnGap={2}
                rowGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                }}
              >
                
                <RHFTextField name="license_number" label="License Number" />
                <RHFTextField name="license_expiry_date" label="License Expiry Date" />
                

                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">License Image</Typography>
                  <RHFUpload
                    // multiple
                    thumbnail
                    name="license_picture"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    onRemove={handleRemoveFile}
                  />
                </Stack>
              </Box>
            </Stack>

          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Tax Number</Typography>
            <RHFTextField name="tax_number" label="Tax Number" />
          </Stack>

          <Box sx={{ mb: 5 }}>
            <Typography variant="subtitle2">Profile Image</Typography>

            <RHFUploadAvatar
              name="profile_picture"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif *.svg
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Box>
        </Stack>
      </Card>
    </Grid>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
          {!currentAgent ? 'Create Amenity' : 'Save Changes Amenity'}
        </LoadingButton>
      </Grid>
    </>
  );

  return !agentsEmpty ? (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {renderCompany}

        {renderLicenseDetails}

        {renderActions}
      </Grid>
    </FormProvider>
  ) : (
    'No Agents. Add User First!'
  );
}

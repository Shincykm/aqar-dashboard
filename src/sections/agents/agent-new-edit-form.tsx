import { useMemo, useEffect, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import { parseISO } from 'date-fns';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify';

// routes
import { paths } from 'src/routes/paths';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
// components
import { useSnackbar } from 'src/components/snackbar';
import { useRouter } from 'src/routes/hooks';
import FormProvider, {
  RHFAutocomplete,
  RHFMultiSelect,
  RHFSelect,
  RHFTextField,
  RHFUpload,
  RHFUploadAvatar,
} from 'src/components/hook-form';
// types
import { Box } from '@mui/system';
import { fData } from 'src/utils/format-number';
import { useCreateUpdateAgents, useGetAgentList, useGetLanguages } from 'src/api/agent';
import { useCityList, useGetCountriesList, useStateProvincesList } from 'src/api/address';



// ----------------------------------------------------------------------

type Props = {
  currentAgent?: any;
};

export default function AgentNewEditForm({ currentAgent }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const password = useBoolean();
  const disabled = currentAgent?.user_id ? true : false;

  const NewAgentSchema = Yup.object().shape({
    // user details
    first_name: Yup.string().nullable(),
    last_name: Yup.string().required('Last name required'),
    username: Yup.string().required('Username required'),
    gender: Yup.string(),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone_number: Yup.number(),
    whatsapp_number: Yup.number(),
    password: Yup.string(),
    //agent details
    id: Yup.string(),
    designation: Yup.string(),
    description: Yup.string(),
    website: Yup.string(),
    company_name: Yup.string(),
    address_line_1: Yup.string(),
    address_line_2: Yup.string(),
    licence_picture: Yup.mixed<any>().nullable(),
    licence_expiry_date: Yup.mixed<any>(),
    profile_picture: Yup.mixed<any>().nullable(),
    language_ids: Yup.array().nullable() || [],
  });

  const defaultValues = useMemo(
    () => ({
      // user details
      first_name: currentAgent?.user?.first_name || "",
      last_name: currentAgent?.user?.last_name || "",
      username: currentAgent?.user?.username || "",
      gender: currentAgent?.user?.gender || "",
      email: currentAgent?.user?.email || "",
      phone_number: currentAgent?.user?.phone_number || 0,
      whatsapp_number: currentAgent?.user?.whatsapp_number || 0,
      password: currentAgent?.user?.password || "",
      //agent details
      id: currentAgent?.id || null,
      designation: currentAgent?.designation || '',
      website: currentAgent?.website || '',
      description: currentAgent?.description || '',
      company_name: currentAgent?.company_name || '',
      address_line_1 : currentAgent?.address_line_1 || '',
      address_line_2 : currentAgent?.address_line_2 || '',
      country_id: currentAgent?.country_id || null,
      city_id: currentAgent?.city_id || null,
      state_province_id: currentAgent?.state_province_id || null,
      licence_picture: currentAgent?.licence_picture?.virtual_path || null,
      licence_number: currentAgent?.licence_number || '',
      licence_expiry_date : currentAgent?.licence_expiry_date ? parseISO(currentAgent?.licence_expiry_date) : null,
      profile_picture: currentAgent?.profile_picture?.virtual_path || null,
      language_ids: currentAgent?.languages?.map((lang: any) => lang?.id) || [],
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
    formState: { isSubmitting, isValid },
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
  const { languages, languagesEmpty, languagesLoading } = useGetLanguages(1, 100);

  const [languagesList, setLanguagesList] = useState<{ value: any; label: any }[]>([]);

  useEffect(() => {
    if (currentAgent) {
      password.setValue(true); 
      reset(defaultValues);
    }
  }, [currentAgent, defaultValues, reset]);

  useEffect(() => {
    if (languages) {
      const transformedLanguages = languages?.map((lang: any) => ({
        value: lang?.id,
        label: lang?.name,
      }));
      setLanguagesList(transformedLanguages);
    }
  }, [languages]);

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      if(currentAgent){
        data.id = currentAgent?.id;
        data.email = "";
      }
      const response = await useCreateUpdateAgents(data);

      if (!response) throw new Error('Something went wrong!');

      if (response) {
        reset();
        enqueueSnackbar(currentAgent ? 'Update success!' : 'Create success!');
        router.push(paths.dashboard.agents.root);
      }
    } catch (error) {
      enqueueSnackbar(error?.message || 'api error', { variant: 'error' });
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[], name: any) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue(name, newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFileLicense = useCallback(() => {
    setValue('licence_picture', null);
  }, [setValue]);
  
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

  const handleSelectGender = useCallback(
    (e: any) => {
      setValue('gender', e.target.value, { shouldValidate: true });
    },
    [setValue]
  );

  const renderDetails = (
    <Grid xs={12} md={8}>
      <Card>
        {!mdUp && <CardHeader title="Create Agent" />}

        <Stack spacing={3} sx={{ p: 4 }}>
          <Typography variant="subtitle2">Agent Details</Typography>
          <Stack spacing={1.5}>
            {/* <RHFAutocomplete
              name="id"
              label="Select Agent *"
              options={agents?.map((agent: any) => String(agent?.id) || [])}
              getOptionLabel={(option) => {
                const selectedAgent = agents.find((agent: any) => agent?.id === Number(option));
                return selectedAgent ? selectedAgent.user?.last_name : '';
              }}
              isOptionEqualToValue={(option, value) => option === String(value) }
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
            /> */}
            <Box
              columnGap={2}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="username" label="Username *" disabled={disabled} />
              <RHFTextField name="email" label="email" disabled={disabled}/>
              <RHFTextField name="first_name" label="First Name" disabled={disabled}/>
              <RHFTextField name="last_name" label="Last Name *" disabled={disabled}/>
              <RHFSelect
                native
                name="gender"
                label="Gender"
                InputLabelProps={{ shrink: true }}
                onChange={handleSelectGender}
                value={values.gender}
                disabled={disabled}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </RHFSelect>
              <RHFTextField
                name="password"
                label="Password *"
                type={password.value ? 'text' : 'password'}
                disabled={disabled}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={password.onToggle} edge="end">
                        <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Stack>

          <Stack spacing={1.5}>
            {/* <RHFEditor simple name="description_en" /> */}
            <RHFTextField name="description" placeholder="Description" multiline rows={4} />
          </Stack>

          <Stack spacing={1.5}>
            <RHFTextField name="designation" label="Designation" />
          </Stack>

          {!languagesEmpty && !languagesLoading && (
            <Stack spacing={1.5}>
              <Stack spacing={3}>
                {!languagesEmpty && !languagesLoading && (
                  <RHFMultiSelect
                    checkbox
                    name="language_ids"
                    label="Languages"
                    options={languagesList}
                  />
                )}
              </Stack>
            </Stack>
          )}
        </Stack>
      </Card>
    </Grid>
  );

  const renderCompany = (
    <Grid xs={12} md={8}>
      <Card>
        <Stack spacing={3} sx={{ p: 4 }}>
          <Typography variant="subtitle2">Company Details</Typography>

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
              <RHFTextField name="website" placeholder="Website" />
            </Stack>

            <Stack spacing={1.5}>
              <RHFTextField name="company_name" placeholder="Company Name" />
            </Stack>
          </Box>

          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Office Address</Typography>
            <RHFTextField name="address_line_1" label="Building" />
            <RHFTextField name="address_line_2" label="Street / Zone" />
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
                isOptionEqualToValue={(option, value) => option === String(value)}
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
              options={stateProvinces.map((state) => String(state.id))}
              getOptionLabel={(option) => {
                const selectedSate = stateProvinces.find((state) => state.id === Number(option));
                return selectedSate ? selectedSate.name : '';
              }}
              isOptionEqualToValue={(option, value) => option === String(value) }
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
              options={cities.map((city) => String(city.id))}
              getOptionLabel={(option) => {
                const selectedCity = cities.find((city) => city.id === Number(option));
                return selectedCity ? selectedCity.name_en : '';
              }}
              isOptionEqualToValue={(option, value) => option === String(value) }
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
              <RHFTextField name="licence_number" placeholder="License Number" />
              {/* <RHFDatePicker name="licence_expiry_date" label="License Expiry Date" /> */}
              <Controller
                name="licence_expiry_date"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Licence Expiry Date"
                    {...field}
                    // value={values?.licence_expiry_date ? parseISO(values?.licence_expiry_date) : null}
                    format="yyyy-MM-dd"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!error,
                        helperText:
                          error?.message ||
                          'The licence expiry date field must match the format Y-m-d.',
                      },
                    }}
                  />
                )}
              />

            </Box>
          </Stack>
          <Stack spacing={1.5}>
            <RHFTextField name="tax_number" label="Tax Number" />
          </Stack>

          <Stack spacing={1.5}>
            <Typography variant="subtitle2">License Picture</Typography>
            <RHFUpload
              name="licence_picture"
              maxSize={3145728}
              onDrop={(file) => handleDrop(file, 'licence_picture')}
              onDelete={handleRemoveFileLicense}
            />
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );

  const renderProfilePic = (
    <Grid xs={12} md={8}>
      <Card>
        <Stack spacing={3} sx={{ p: 4 }}>
          <Typography variant="subtitle2">Profile Image</Typography>

          <RHFUploadAvatar
            name="profile_picture"
            maxSize={3145728}
            onDrop={(file) => handleDrop(file, 'profile_picture')}
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
        </Stack>
      </Card>
    </Grid>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
          {!currentAgent ? 'Create Agent' : 'Update Agent'}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {renderCompany}

        {renderLicenseDetails}

        {renderProfilePic}

        {renderActions} 
      </Grid>
    </FormProvider>
  );
}

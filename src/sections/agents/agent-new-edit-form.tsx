import * as Yup from 'yup';
import { useMemo, useEffect, useCallback, useState } from 'react';
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
  RHFSelect,
  // RHFEditor,
  RHFTextField,
  RHFUploadAvatar,
  // RHFDatePicker,
} from 'src/components/hook-form';
// types
import { IAmenityItem } from 'src/types/amenities';
import { useCreateUpdateAmenities } from 'src/api/amenities';
import { Box } from '@mui/system';
import { fData } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type Props = {
  currentAgent?: any;
};

export default function AmenityNewEditForm({ currentAgent }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const NewAgentSchema = Yup.object().shape({
    agent: Yup.string().required('Agent is required'),
    properties: Yup.array().min(1, 'Choose at least one option'),
  });

  const defaultValues = useMemo(
    () => ({
      agent: currentAgent?.id || '',
      property_id: currentAgent?.properties || '',
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

  useEffect(() => {
    if (currentAgent) {
      console.log(currentAgent);
      reset(defaultValues);
    }
  }, [currentAgent, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      let formData = new FormData();
      formData.append('agent_id', data.agent_id);
      formData.append('property_id', data?.property_id || '');
      if(data?.icon){
        formData.append('icon', data.icon);
      }

      if(currentAgent){
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

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Name, Icon...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Typography variant="subtitle2">Amenity Name</Typography>
            <RHFTextField name="name_en" label="Name" />
            <Typography variant="subtitle2">Amenity Name (Arabic)</Typography>
            <RHFTextField name="name_ar" label="Name" />

            <Box sx={{ mb: 5 }}>
              <Typography variant="subtitle2">Upload Icon</Typography>

              <RHFUploadAvatar
                name="icon"
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
    </>
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

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {renderActions}
      </Grid>
    </FormProvider>
  );
}

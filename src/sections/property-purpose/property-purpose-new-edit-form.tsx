import * as Yup from 'yup';
import { useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
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
  // RHFDatePicker,
} from 'src/components/hook-form';
// types
import { IPropertyPurposeItem } from 'src/types/propertyPurpose';
//api
import { useCreateUpdatePropertyPurpose } from 'src/api/propertyPurpose';

// ----------------------------------------------------------------------

type Props = {
  currentPropertyPurpose?: IPropertyPurposeItem;
};

export default function PropertyPurposeNewEditForm({ currentPropertyPurpose }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const NewPropertyStyleSchema = Yup.object().shape({
    name_en: Yup.string().required('Name is required'),
    name_ar: Yup.string().nullable(),
    //auto populate to db
    // created_at: Yup.date().required(),
    // updated_at: Yup.date().required(),
  });

  const defaultValues = useMemo(
    () => ({
      name_en: currentPropertyPurpose?.name_en || '',
      name_ar: currentPropertyPurpose?.name_ar || '',
      //   created_at: currentPropertyPurpose?.createdAt || null,
      //   updated_at: currentPropertyPurpose?.updatedAt || null,
    }),
    [currentPropertyPurpose]
  );

  const methods = useForm({
    resolver: yupResolver(NewPropertyStyleSchema),
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
    if (currentPropertyPurpose) {
      reset(defaultValues);
    }
  }, [currentPropertyPurpose, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const tempData = {
        ...currentPropertyPurpose,
        ...data,
      }
      const response = await useCreateUpdatePropertyPurpose(tempData);
      reset();
      if (response) {
        enqueueSnackbar(currentPropertyPurpose ? 'Update success!' : 'Create success!');
      }
      router.push(paths.dashboard.propertyPurpose.root);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error?.message || 'api error', { variant: 'error' });
    }
  });

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Name, short description...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Typography variant="subtitle2">Property Purpose Name</Typography>
            <RHFTextField name="name_en" label="Name" />
            <Typography variant="subtitle2">Property Purpose Name (Arabic)</Typography>
            <RHFTextField name="name_ar" label="Name" />
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
          {!currentPropertyPurpose ? 'Create Property Purpose' : 'Save Changes Purpose'}
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

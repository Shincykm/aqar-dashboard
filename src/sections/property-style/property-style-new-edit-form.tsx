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
  // RHFDatePicker,
} from 'src/components/hook-form';
// types
import { IPropertyStyleItem } from 'src/types/propertyStyle';
//api
import { useCreateUpdatePropertyStyle } from 'src/api/propertyStyle';

// ----------------------------------------------------------------------

type Props = {
  currentPropertyStyle?: IPropertyStyleItem;
};

export default function PropertyStyleNewEditForm({ currentPropertyStyle }: Props) {
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
      name_en: currentPropertyStyle?.name_en || '',
      name_ar: currentPropertyStyle?.name_ar || '',
      //   created_at: currentPropertyStyle?.createdAt || null,
      //   updated_at: currentPropertyStyle?.updatedAt || null,
    }),
    [currentPropertyStyle]
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
    if (currentPropertyStyle) {
      reset(defaultValues);
    }
  }, [currentPropertyStyle, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await useCreateUpdatePropertyStyle(data);
      reset();
      if (response) {
        enqueueSnackbar(currentPropertyStyle ? 'Update success!' : 'Create success!');
      }
      router.push(paths.dashboard.propertyStyle.root);
    } catch (error) {
      console.error(error);
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
            <Typography variant="subtitle2">Property Style Name</Typography>
            <RHFTextField name="name_en" label="Name" />
            <Typography variant="subtitle2">Property Style Name (Arabic)</Typography>
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
          {!currentPropertyStyle ? 'Create Property Style' : 'Save Changes Style'}
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

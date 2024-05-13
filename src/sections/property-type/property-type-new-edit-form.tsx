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
  // RHFDatePicker,
} from 'src/components/hook-form';
// types
import { IPropertyTypeItem } from 'src/types/propertyType';
// import { useCreateUpdateProperty } from 'src/api/property';
import { useCreateUpdatePropertyType, useGetPropertyTypeList } from 'src/api/propertyType';
import { useCreateUpdateProperty } from 'src/api/property';

// ----------------------------------------------------------------------

type Props = {
  currentPropertyType?: IPropertyTypeItem;
};

export default function PropertyTypeNewEditForm({ currentPropertyType }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const { propertyTypes, propertyTypeEmpty, propertyTypeLoading } = useGetPropertyTypeList();

  const NewPropertyTypeSchema = Yup.object().shape({
    name_en: Yup.string().required('Title is required'),
    name_ar: Yup.string().nullable(),
    description_en: Yup.string().nullable(),
    description_ar: Yup.string().nullable(),
    parent_id: Yup.number().nullable(),
    //auto populate to db
    // created_at: Yup.date().required(),
    // updated_at: Yup.date().required(),
  });

  const defaultValues = useMemo(
    () => ({
      name_en: currentPropertyType?.name_en || '',
      name_ar: currentPropertyType?.name_ar || '',
      description_en: currentPropertyType?.description_en || '',
      description_ar: currentPropertyType?.description_ar || '',
      parent_id: currentPropertyType?.parent_id || 0,
      //   created_at: currentPropertyType?.createdAt || null,
      //   updated_at: currentPropertyType?.updatedAt || null,
    }),
    [currentPropertyType]
  );

  const methods = useForm({
    resolver: yupResolver(NewPropertyTypeSchema),
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
    if (currentPropertyType) {
      reset(defaultValues);
    }
  }, [currentPropertyType, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await useCreateUpdatePropertyType(data);
      console.log(response, '==response from server');
      reset();
      enqueueSnackbar(currentPropertyType ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.propertyType.root);
      console.info('DATA', data);
      console.log(data);
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
            <Typography variant="subtitle2">Property Type Name</Typography>
            <RHFTextField name="name_en" label="Name" />
            <Typography variant="subtitle2">Property Type Name (Arabic)</Typography>
            <RHFTextField name="name_ar" label="Name" />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Description</Typography>
              <RHFEditor simple name="description_en" />
            </Stack>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Description (Arabic)</Typography>
              <RHFEditor simple name="description_ar" />
            </Stack>

            {!propertyTypeEmpty && (
              <Stack spacing={1.5}>
                <Divider sx={{ borderStyle: 'dashed' }} />
                <Typography variant="subtitle2">Parent Type (If Type is a Sub-type)</Typography>
                {propertyTypeLoading ? <LoadingButton /> :
                (<RHFSelect
                  native
                  name="parent_id"
                  label="Parent Type"
                  InputLabelProps={{ shrink: true }}
                >
                  <option value="">Property Type</option> {/* Default option */}
                  {propertyTypes?.map((type) => (
                    <option key={type?.id} value={type?.id}>
                      {type?.name_en}
                    </option>
                  ))}
                </RHFSelect>)
                }
              </Stack>
            )}
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
          {!currentPropertyType ? 'Create Property Type' : 'Save Changes Type'}
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

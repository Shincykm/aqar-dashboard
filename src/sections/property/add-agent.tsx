import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Unstable_Grid2';

// _mock
import { USER_STATUS_OPTIONS } from 'src/_mock';
// types
import { IUserItem } from 'src/types/user';

// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { IPropertyItem } from 'src/types/property';
import { useGetAgentList } from 'src/api/agent';
import { Stack, Typography } from '@mui/material';
import { values } from 'lodash';
import { useAgentPropertyMapping, useGetProperties } from 'src/api/property';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  // currentProperty?: IPropertyItem ;
  currentProperty?: any;
};

export default function AddAgent({ currentProperty, open, onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const { agents, agentsEmpty, agentsLoading } = useGetAgentList(1, 1000);
  const { property, propertyEmpty, propertyLoading } = useGetProperties(1, 1000);

  const NewUserSchema = Yup.object().shape({
    agent_id: Yup.number(),
    property_id: Yup.number(),
    // agent_id : Yup.number.min(1, 'Choose at least one agent'),
  });

  const defaultValues = useMemo(
    () => ({
      agent_id: agents?.find((agent: any) => agent.id === currentProperty.agents[0]?.id) || null,
      property_id: currentProperty.id,
      // agent_id: currentProperty?.id || null,
    }),
    [agents]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema) as any,
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

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const response = await useAgentPropertyMapping(currentProperty.id, data.agent_id);

      if (!response) throw new Error('Something went wrong!');

      if (response) {
        reset();
        onClose();
        enqueueSnackbar(defaultValues.agent_id ? 'Updated agent mapping!' : 'Created agent mapping!');
      }
    } catch (error) {
      enqueueSnackbar(error?.message || 'api error', { variant: 'error' });
    }
  });

  const handleAgentChange = useCallback(
    (newValue: any) => {
      setValue('agent_id', newValue, { shouldValidate: true });
    },
    [setValue]
  );

  const renderAgentDropDown = (
    <>
      <Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {currentProperty.name_en}
          </Typography>
      </Stack>

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
          {!agentsEmpty && (
            <RHFAutocomplete
              name="agent_id"
              label="Select agent"
              value={values?.agent_id}
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
          )}
        </Box>
      </Stack>
    </>
  );

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720},
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit} >
        <DialogTitle>Agent - Property Mapping</DialogTitle>
            <Box
          height={200}
          width={"100%"}
          display="flex"
          alignItems="start"
          gap={4}
          p={2}
          sx={{ height : 350 }}
        >
      <DialogContent>{renderAgentDropDown}</DialogContent>
    </Box>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {currentProperty.agents[0]?.id ? 'Update' : 'create'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

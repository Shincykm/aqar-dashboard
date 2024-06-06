// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// utils
import { fDateTime } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';
// types
import { ITourItem } from 'src/types/tour';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { shortDateLabel } from 'src/components/custom-date-range-picker';
import { useBoolean } from 'src/hooks/use-boolean';
import AddAgent from './add-agent';
import { Avatar, Button, Grid, Tooltip, Typography, alpha } from '@mui/material';
import { AvatarShape } from 'src/assets/illustrations';
import { wrap } from 'module';

// ----------------------------------------------------------------------

type Props = {
  properties: any;
  // onView: VoidFunction;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
};

export default function PropertyItemNew({ property, onView, onEdit, onDelete }: any) {
  const popover = usePopover();

  const quickEdit = useBoolean();

  const {
    id,
    name_en,
    address,
    amount,
    size_sqm,
    pictures,
    count_bedrooms,
    count_bathrooms,
    agents,
  } = property;

  const renderImages = (
    <Stack
      spacing={0.5}
      direction="row"
      sx={{
        p: (theme) => theme.spacing(1, 1, 0, 1),
      }}
    >
      <Stack flexGrow={1} sx={{ position: 'relative' }}>
        {/* {renderPrice}
        {renderRating} */}
        <Image
          alt={pictures[0].alt_attribute || ''}
          src={pictures[0].virtual_path}
          sx={{ borderRadius: 1, height: 164, width: 1 }}
        />
      </Stack>
      <Stack spacing={0.5}>
        {pictures.length > 0 &&
          pictures.map(
            (pic: any, index: any) =>
              index !== 0 && (
                <Image
                  key={pic.id}
                  alt={pic.alt_attribute || ''}
                  src={pic.virtual_path}
                  ratio="1/1"
                  sx={{ borderRadius: 1, width: 40 }}
                />
              )
          )}
      </Stack>
    </Stack>
  );

  const renderTexts = (
    <ListItemText
      sx={{
        p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
      }}
      //   primary={`Posted date: ${fDateTime(createdAt)}`}
      secondary={
        <Link component={RouterLink} href={paths.dashboard.property.edit(id)} color="inherit">
          {name_en}
        </Link>
      }
      primaryTypographyProps={{
        typography: 'caption',
        color: 'text.disabled',
      }}
      secondaryTypographyProps={{
        mt: 1,
        noWrap: true,
        component: 'span',
        color: 'text.primary',
        typography: 'subtitle1',
      }}
    />
  );

  const renderInfo = (
    <>
      <Stack
        spacing={1.5}
        sx={{
          position: 'relative',
          p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
        }}
      >
        <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', bottom: 20, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        {[
          {
            label: address?.city?.name_en || 'Location not available',
            icon: <Iconify icon="mingcute:location-fill" sx={{ color: 'error.main' }} />,
          },
          {
            label: count_bedrooms ? `${count_bedrooms} Beds` : 'Bed info not available',
            icon: <Iconify icon="tabler:bed-filled" sx={{ color: 'gray' }} />,
          },
          {
            label: count_bathrooms ? `${count_bathrooms} Baths` : 'Bath info not availble',
            icon: <Iconify icon="solar:bath-line-duotone" sx={{ color: 'gray' }} />,
          },
          {
            label: size_sqm ? `${size_sqm} sqm` : 'Area not available',
            icon: <Iconify icon="bx:area" sx={{ color: 'orange' }} />,
          },
          {
            label: amount ? `${amount} AED` : 'Price not available',
            icon: <Iconify icon="solar:tag-price-bold" sx={{ color: 'green' }} />,
          },
        ].map((item) => (
          <Stack
            key={item.label}
            spacing={1}
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2' }}
          >
            {item.label !== '' && item.icon}
            {item.label}
          </Stack>
        ))}
      </Stack>
    </>
  );

  const renderAgentInfo = (
    <>
      <Box sx={{ height: '50px', paddingInline: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={7.8}>
            <Box
              sx={{ width: '100%', height: '100%' }}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              {agents.length > 0 && (
                <Stack
                  direction="row"
                  alignItems="center"
                  flexWrap={'wrap'}
                  sx={{ typography: 'body2', width: '100%' }}
                >
                  {/* Need a method to identify high priority agent -- after change agents[0] */}
                  <Avatar
                    alt={`${agents[0].user?.first_name || ''} ${agents[0].user?.last_name || ''}`.trim()}
                    src={agents[0].profile_picture || ''}
                    sx={{ mr: 2, mb: 1, width: 48, height: 48 }}
                  />

                  <Typography variant="subtitle2" noWrap>
                    {`${agents[0].user?.first_name || ''} ${agents[0].user?.last_name || ''}`.trim()}
                  </Typography>
                </Stack>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={4.2}>
            <Box
              sx={{ width: '100%', height: '100%' }}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Tooltip
                title={`${agents.length > 0 ? 'Change Agent' : 'Add Agent'}`}
                sx={{ width: '100%' }}
                placement="top"
                arrow
              >
                <Button
                  variant="outlined"
                  onClick={quickEdit.onTrue}
                  sx={{
                    width: '100%',
                  }}
                >
                  {agents.length > 0 ? 'Edit Agent' : 'Add Agent'}
                </Button>
              </Tooltip>

              <AddAgent
                currentProperty={property}
                open={quickEdit.value}
                onClose={quickEdit.onFalse}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );

  return (
    <>
      <Card>
        <Stack
          spacing={1}
          sx={{
            position: 'relative',
            p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
          }}
        >
          {renderImages}

          {renderTexts}

          {renderInfo}

          {renderAgentInfo}
        </Stack>
      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        {/* <MenuItem
          onClick={() => {
            popover.onClose();
            onView();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem> */}

        <MenuItem
          onClick={() => {
            popover.onClose();
            onEdit();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onDelete();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}

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
import { Tooltip } from '@mui/material';

// ----------------------------------------------------------------------

// type Props = {
// //   tour: ITourItem;
//   properties: any;
//   onView: VoidFunction;
//   onEdit: VoidFunction;
//   onDelete: VoidFunction;
// };

export default function PropertyItemNew({ property, onView, onEdit, onDelete }: any) {
  const popover = usePopover();

  const quickEdit = useBoolean();

  const {
    id,
    name_en,
    name_ar,
    address,
    amount,
    size_sqm,
    pictures,
  } = property;
  

//   const shortLabel = shortDateLabel(available.startDate, available.endDate);

//   const renderRating = (
//     <Stack
//       direction="row"
//       alignItems="center"
//       sx={{
//         top: 8,
//         right: 8,
//         zIndex: 9,
//         borderRadius: 1,
//         position: 'absolute',
//         p: '2px 6px 2px 4px',
//         typography: 'subtitle2',
//         bgcolor: 'warning.lighter',
//       }}
//     >
//       <Iconify icon="eva:star-fill" sx={{ color: 'warning.main', mr: 0.25 }} /> {ratingNumber}
//     </Stack>
//   );

//   const renderPrice = (
//     <Stack
//       direction="row"
//       alignItems="center"
//       sx={{
//         top: 8,
//         left: 8,
//         zIndex: 9,
//         borderRadius: 1,
//         bgcolor: 'grey.800',
//         position: 'absolute',
//         p: '2px 6px 2px 4px',
//         color: 'common.white',
//         typography: 'subtitle2',
//       }}
//     >
//       {!!priceSale && (
//         <Box component="span" sx={{ color: 'grey.500', mr: 0.25, textDecoration: 'line-through' }}>
//           {fCurrency(priceSale)}
//         </Box>
//       )}
//       {fCurrency(price)}
//     </Stack>
//   );

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
        <Image alt={pictures[0].alt_attribute || "" } src={pictures[0].virtual_path} sx={{ borderRadius: 1, height: 164, width: 1 }} />
      </Stack>
      <Stack spacing={0.5}>
        {pictures.length > 0 && 
            pictures.map((pic:any, index:any)=>(
               (index !== 0) && <Image key={pic.id} alt={pic.alt_attribute || "" } src={pic.virtual_path} ratio="1/1" sx={{ borderRadius: 1, width: 40 }} />
            ))
        }
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
          label: address?.city?.name_en || "Location not available",
          icon: <Iconify icon="mingcute:location-fill" sx={{ color: 'error.main' }} />,
        },
        {
            label: name_ar || "",
        },
        {
            label: size_sqm || "",
        },
        {
          label: amount ? `${amount} AED` : 'Price not available',
        },
      ].map((item) => (
        <Stack
          key={item.label}
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2' }}
        >
          {item.icon}
          {item.label}
        </Stack>
      ))}

        {/* <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        sx={{ typography: 'body2' }}
        >
          Add Agent
        <Tooltip title="Add Agent" placement="top" arrow>
          <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
          <Iconify icon="mingcute:add-line" />
          </IconButton>
        </Tooltip>
        
        </Stack>

        <AddAgent currentProperty={property} open={quickEdit.value} onClose={quickEdit.onFalse} /> */}
    
    </Stack>

  );

  return (
    <>
      <Card>
        {renderImages}

        {renderTexts}

        {renderInfo}
        
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

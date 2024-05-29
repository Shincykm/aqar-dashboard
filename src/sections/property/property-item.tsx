// @mui
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// utils
import { fCurrency } from 'src/utils/format-number';
// components
import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { ColorPreview } from 'src/components/color-utils';
// types
import { IPropertyItem } from 'src/types/property';
//
import { useCheckoutContext } from '../checkout/context';

// ----------------------------------------------------------------------

type Props = {
  property: IPropertyItem;
};

export default function PropertyItem({ property }: Props) {
  // const { onAddToCart } = useCheckoutContext();

  const { id, name_en,description_en, description_ar, pictures, name_ar, constructed_date, city_id, size_sqm, active } =
    property;

  const linkTo = paths.dashboard.property.edit(id);

  // const handleAddCart = async () => {
  //   const newProperty = {
  //     id,
  //     name_en,
  //     name_ar,
  //     pictures,
  //     // coverUrl,
  //     active,
  //     // price,
  //     // colors: [colors[0]],
  //     // size: sizes[0],
  //     // quantity: 1,
  //   };
  //   // try {
  //   //   onAddToCart(newProperty);
  //   // } catch (error) {
  //   //   console.error(error);
  //   // }
  // };

  // const renderLabels = (newLabel.enabled || saleLabel.enabled) && (
  //   <Stack
  //     direction="row"
  //     alignItems="center"
  //     spacing={1}
  //     sx={{ position: 'absolute', zIndex: 9, top: 16, right: 16 }}
  //   >
  //     {newLabel.enabled && (
  //       <Label variant="filled" color="info">
  //         {newLabel.content}
  //       </Label>
  //     )}
  //     {saleLabel.enabled && (
  //       <Label variant="filled" color="error">
  //         {saleLabel.content}
  //       </Label>
  //     )}
  //   </Stack>
  // );

  // const renderImg = (
  //   <Box sx={{ position: 'relative', p: 1 }}>
  //     {!!active && (
  //       <Fab
  //         color="warning"
  //         size="medium"
  //         className="add-cart-btn"
  //         // onClick={handleAddCart}
  //         sx={{
  //           right: 16,
  //           bottom: 16,
  //           zIndex: 9,
  //           opacity: 0,
  //           position: 'absolute',
  //           transition: (theme) =>
  //             theme.transitions.create('all', {
  //               easing: theme.transitions.easing.easeInOut,
  //               duration: theme.transitions.duration.shorter,
  //             }),
  //         }}
  //       >
  //         <Iconify icon="solar:cart-plus-bold" width={24} />
  //       </Fab>
  //     )}

  //     <Tooltip title={!active} placement="bottom-end">
  //       <Image
  //         alt={name_en}
  //         src={pictures[0]}
  //         ratio="1/1"
  //         sx={{
  //           borderRadius: 1.5,
  //           ...(!active && {
  //             opacity: 0.48,
  //             filter: 'grayscale(1)',
  //           }),
  //         }}
  //       />
  //     </Tooltip>
  //   </Box>
  // );

  const renderContent = (
    <Stack spacing={2.5} sx={{ p: 3, pt: 2 }}>
      <Link component={RouterLink} href={linkTo} color="inherit" variant="subtitle2" noWrap>
        {name_en}
      </Link>

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between">
        <ColorPreview colors={colors} />

        <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
          {priceSale && (
            <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
              {fCurrency(priceSale)}
            </Box>
          )}

          <Box component="span">{fCurrency(price)}</Box>
        </Stack>
      </Stack> */}
    </Stack>
  );

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      {/* {renderLabels} */}

      {/* {renderImg} */}

      {renderContent}
    </Card>
  );
}

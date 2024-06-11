// @mui
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// types
import { IAgentItem } from 'src/types/agents';
// components
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
//
import { format, parseISO } from 'date-fns';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: IAgentItem;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function AgentTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const {
    user,
    licence_expiry_date = '',
    profile_picture,
    company_name,
    website,
  } = row;

  const { first_name, last_name, email, phone_number, whatsapp_number = '' } = user;

  const confirm = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell> */}

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt={first_name || last_name}
            src={profile_picture?.virtual_path}
            sx={{ mr: 2 }}
          />

          <ListItemText
            primary={`${first_name || ''} ${last_name || ''}`}
            secondary={email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              fontSize:'12px'
            }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{phone_number}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{whatsapp_number}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {company_name ? (
            <ListItemText primary={company_name} primaryTypographyProps={{ typography: 'body2' }} />
          ) : (
            <ListItemText
              secondary={"Not Available"}
              secondaryTypographyProps={{
                component: 'span',
                color: 'text.disabled',
              }}
            />
          )}
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
        {website ? (
            <ListItemText primary={website} primaryTypographyProps={{ typography: 'body2' }} />
          ) : (
            <ListItemText
              secondary={"Not Available"}
              secondaryTypographyProps={{
                component: 'span',
                color: 'text.disabled',
              }}
            />
          )}
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {(licence_expiry_date && format(parseISO(licence_expiry_date), 'yyyy-MM-dd')) ||
            'Not Available'}
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}

import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// @mui
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
// routes
import { useRouter } from 'src/routes/hooks';
// types
import { IPropertyItem } from 'src/types/property';
// components
import Iconify from 'src/components/iconify';
import SearchNotFound from 'src/components/search-not-found';

// ----------------------------------------------------------------------

type Props = {
  query: string;
  results: IPropertyItem[];
  onSearch: (inputValue: string) => void;
  hrefItem: (id: string) => string;
};

export default function PropertySearch({ query, results, onSearch, hrefItem }: Props) {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(hrefItem(id));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (query) {
      if (event.key === 'Enter') {
        const selectProperty = results.filter((property) => property.name_en === query)[0];

        handleClick(selectProperty.id);
      }
    }
  };

  return (
    <Autocomplete
      sx={{ width: { xs: 1, sm: 260 } }}
      autoHighlight
      popupIcon={null}
      options={results}
      onInputChange={(event, newValue) => onSearch(newValue)}
      getOptionLabel={(option) => option.name_en}
      noOptionsText={<SearchNotFound query={query} sx={{ bgcolor: 'unset' }} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      slotProps={{
        popper: {
          placement: 'bottom-start',
          sx: {
            minWidth: 320,
          },
        },
        paper: {
          sx: {
            [` .${autocompleteClasses.option}`]: {
              pl: 0.75,
            },
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, property, { inputValue }) => {
        const matches = match(property.name_en, inputValue);
        const parts = parse(property.name_en, matches);
        console.log(property?.pictures[0].virtual_path);
        

        return (
          <Box component="li" {...props} onClick={() => handleClick(property.id)} key={property.id}>
            <Avatar
              key={property.id}
              alt={property.name_en}
              src={property.pictures && property.pictures[0].virtual_path}
              variant="rounded"
              sx={{
                width: 48,
                height: 48,
                flexShrink: 0,
                mr: 1.5,
                borderRadius: 1,
              }}
            />

            <div key={inputValue}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                  sx={{
                    typography: 'body2',
                    fontWeight: part.highlight ? 'fontWeightSemiBold' : 'fontWeightMedium',
                  }}
                >
                  {part.text}
                </Typography>
              ))}
            </div>
          </Box>
        );
      }}
    />
  );
}

import orderBy from 'lodash/orderBy';
import { useState, useCallback, useEffect } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// utils
import { fTimestamp } from 'src/utils/format-time';
// _mock
import { _tours, _tourGuides, TOUR_SERVICE_OPTIONS, TOUR_SORT_OPTIONS } from 'src/_mock';
// assets
import { countries } from 'src/assets/data';
// components
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// types
import { ITourItem, ITourFilters, ITourFilterValue } from 'src/types/tour';
import { IPropertyItem } from 'src/types/property';

//
import TourList from '../../tour/tour-list';
// import TourSort from '../../tour/tour-sort';
// import TourSearch from '../../tour/tour-search';
import TourFilters from '../../tour/tour-filters';
import TourFiltersResult from '../../tour/tour-filters-result';

import PropertyListNew from '../property-list-new';
import PropertySearch from '../property-search';

// api
import { useDeleteProperty, useGetProperties } from 'src/api/property';
import { TableHeadCustom, TablePaginationCustom, TableSelectedAction, TableSkeleton, useTable } from 'src/components/table';
import { Table, TableBody, TableContainer, Tooltip } from '@mui/material';
import { IconButton } from 'yet-another-react-lightbox';
import Scrollbar from 'src/components/scrollbar';
import { enqueueSnackbar } from 'notistack';
import { useSearchParams } from 'src/routes/hooks';

// ----------------------------------------------------------------------

const defaultFilters: ITourFilters = {
  destination: [],
  tourGuides: [],
  services: [],
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

export default function PropertyListViewNew() {
  const settings = useSettingsContext();

  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState('latest');
  const [deletedId, setdeletedId] = useState<any>(null);

  const [search, setSearch] = useState<{ query: string; results: IPropertyItem[] }>({
    query: '',
    results: [],
  });

  const [filters, setFilters] = useState(defaultFilters);

  const searchParams = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('page') || 1));

  // ----------------------------------------------------------------------
  // Fetch Porperty Data 
  const { property: properties, total, countPerPage, propertyEmpty, propertyLoading } = useGetProperties(page);

  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
      : false;

  const dataFiltered = applyFilter({
    inputData: deletedId ? properties.filter((item: any) => item.id !== deletedId) : properties as any,
    filters,
    sortBy,
    dateError,
  });

  const canReset =
    !!filters.destination.length ||
    !!filters.tourGuides.length ||
    !!filters.services.length ||
    (!!filters.startDate && !!filters.endDate);

  const notFound = !dataFiltered.length && canReset;

  const handleFilters = useCallback((name: string, value: ITourFilterValue) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback(
    (inputValue: string) => {

      setSearch((prevState) => ({
        ...prevState,
        query: inputValue,
      }));

      if (inputValue) {
        const results = properties.filter(
          (property) => property.name_en.toLowerCase().indexOf(search.query.toLowerCase()) !== -1
        );

        setSearch((prevState) => ({
          ...prevState,
          results,
        }));
      }
    },
    [search.query]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    try {
      const response = await useDeleteProperty(id);
      if (response) {
        enqueueSnackbar("Property Deleted.");
        setdeletedId(id);
      }
    } catch (error) {
      enqueueSnackbar('Unable to Delete!', { variant: 'error' });
    }
  }, []);

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >

      <PropertySearch
        query={search.query}
        results={search.results}
        onSearch={handleSearch}
        hrefItem={(id: string) => paths.dashboard.property.details(id)}
      />

      <Stack direction="row" spacing={1} flexShrink={0}>
        <TourFilters
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          //
          filters={filters}
          onFilters={handleFilters}
          //
          canReset={canReset}
          onResetFilters={handleResetFilters}
          //
          serviceOptions={TOUR_SERVICE_OPTIONS.map((option) => option.label)}
          tourGuideOptions={_tourGuides}
          destinationOptions={countries}
          //
          dateError={dateError}
        />

        {/* <TourSort sort={sortBy} onSort={handleSortBy} sortOptions={TOUR_SORT_OPTIONS} /> */}
      </Stack>
    </Stack>
  );

  const renderResults = (
    <TourFiltersResult
      filters={filters}
      onResetFilters={handleResetFilters}
      //
      canReset={canReset}
      onFilters={handleFilters}
      //
      results={dataFiltered.length}
    />
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Property',
            href: paths.dashboard.property.root,
          },
          { name: 'List' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.property.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Property
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {renderFilters}

        {canReset && renderResults}
      </Stack>

      {notFound && <EmptyContent title="No Data" filled sx={{ py: 10 }} />}

      <PropertyListNew
        properties={dataFiltered}
        totalProperties={total}
        countPerPage={countPerPage}
        setPage={setPage}
        page={page}
        handleDelete={handleDelete}
      />

    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({
  inputData,
  filters,
  sortBy,
  dateError,
}: {
  //   inputData: any | ITourItem[];
  inputData: any;
  filters: ITourFilters;
  sortBy: string;
  dateError: boolean;
}) => {
  // const { services, destination, startDate, endDate, tourGuides } = filters;

  // const tourGuideIds = tourGuides.map((tourGuide) => tourGuide.id);

  // SORT BY
  // if (sortBy === 'latest') {
  //   inputData = orderBy(inputData, ['createdAt'], ['desc']);
  // }

  // if (sortBy === 'oldest') {
  //   inputData = orderBy(inputData, ['createdAt'], ['asc']);
  // }

  // if (sortBy === 'popular') {
  //   inputData = orderBy(inputData, ['totalViews'], ['desc']);
  // }

  // // FILTERS

  //   if (!dateError) {
  //     if (startDate && endDate) {
  //       inputData = inputData.filter(
  //         (tour) =>
  //           fTimestamp(tour.available.startDate) >= fTimestamp(startDate) &&
  //           fTimestamp(tour.available.endDate) <= fTimestamp(endDate)
  //       );
  //     }
  //   }

  //   if (destination.length) {
  //     inputData = inputData.filter((tour) => destination.includes(tour.destination));
  //   }

  //   if (tourGuideIds.length) {
  //     inputData = inputData.filter((tour) =>
  //       tour.tourGuides.some((filterItem) => tourGuideIds.includes(filterItem.id))
  //     );
  //   }

  //   if (services.length) {
  //     inputData = inputData.filter((tour) => tour.services.some((item) => services.includes(item)));
  //   }
  return inputData;
};

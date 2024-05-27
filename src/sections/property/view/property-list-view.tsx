import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';
// @mui
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// _mock
import { PRODUCT_STOCK_OPTIONS } from 'src/_mock';
// api
import { useGetProducts } from 'src/api/product';
// components
import { useSettingsContext } from 'src/components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// types
// import { IProductItem, IProductTableFilters, IProductTableFilterValue } from 'src/types/product';
import { IPropertyItem, IPropertyTableFilters, IPropertyTableFilterValue } from 'src/types/property';
//
import PropertyTableRow from '../../property/property-table-row';
import PropertyTableToolbar from '../../property/property-table-toolbar';
import PropertyTableFiltersResult from '../../property/property-table-filters-result';
import { useGetProperties } from 'src/api/property';
import { property } from 'lodash';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name_en', label: 'Property (English)' },
  { id: 'name_ar', label: 'Property (Arabic)' },
  { id: 'createdAt', label: 'Create at', width: 160 },
  // { id: 'inventoryType', label: 'Stock', width: 160 },
];

const PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

const defaultFilters: IPropertyTableFilters = {
  name_en: '',
  name_ar: '',
};

// ----------------------------------------------------------------------

export default function PropertyListView() {
  const router = useRouter();

  const table = useTable();

  const settings = useSettingsContext();

  const [tableData, setTableData] = useState<IPropertyItem[]>([]);

  const [filters, setFilters] = useState(defaultFilters);

  // const { products, productsLoading, productsEmpty } = useGetProducts();
  const { property, propertyLoading, propertyEmpty } = useGetProperties();

  const confirm = useBoolean();

  useEffect(() => {
    console.log(property);
    
    if (property.length) {
      setTableData(property);
    }
  }, [property]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 60 : 80;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || propertyEmpty;

  const handleFilters = useCallback(
    (name: string, value: IPropertyTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleFiltersAr = useCallback(
    (name_ar: string, value: IPropertyTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name_ar]: value,
      }));
    },
    [table]
  );


  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.property.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.property.details(id));
    },
    [router]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <>
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
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <PropertyTableToolbar
            filters={filters}
            onFilters={handleFilters} 
            onFiltersArabic={function (name_ar: string, value: IPropertyTableFilterValue): void {
              throw new Error('Function not implemented.');
            } }            //
            // stockOptions={PRODUCT_STOCK_OPTIONS}
            // publishOptions={PUBLISH_OPTIONS}
          />

          {canReset && (
            <PropertyTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              onFiltersAr={handleFiltersAr}

              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {propertyLoading ? (
                    [...Array(table.rowsPerPage)].map((i, index) => (
                      <TableSkeleton key={index} sx={{ height: denseHeight }} />
                    ))
                  ) : (
                    <>
                      {dataFiltered
                        .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        .map((row) => (
                          <PropertyTableRow
                            key={row.id}
                            row={row}
                            selected={table.selected.includes(row.id)}
                            onSelectRow={() => table.onSelectRow(row.id)}
                            onDeleteRow={() => handleDeleteRow(row.id)}
                            onEditRow={() => handleEditRow(row.id)}
                            onViewRow={() => handleViewRow(row.id)}
                          />
                        ))}
                    </>
                  )}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: IPropertyItem[];
  comparator: (a: any, b: any) => number;
  filters: IPropertyTableFilters;
}) {
  const { name_en, name_ar } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name_en) {
    inputData = inputData.filter(
      (property) => property?.name_en.toLowerCase().indexOf(name_en.toLowerCase()) !== -1
    );
  }

  if (name_ar) {
    inputData = inputData.filter(
      (property) => (property?.name_ar && property?.name_ar.indexOf(name_ar)) !== -1
    );
  }


  // if (stock.length) {
  //   inputData = inputData.filter((product) => stock.includes(product.inventoryType));
  // }

  // if (publish.length) {
  //   inputData = inputData.filter((product) => publish.includes(product.publish));
  // }

  return inputData;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import {
  Column,
  ColumnInstance,
  HeaderGroup,
  Row,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';

import { InputBase } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import TablePaginationActions from './MuiTablePaginationActions';
import TableToolbar from './MuiTableToolbar';

interface EditableCellProps<D> {
  cell: { value: any };
  row: { index: number };
  column: { id: number };
  data: D[];
  setData: React.Dispatch<React.SetStateAction<D[]>>;
}

const EditableCell = <D extends {}>({
  cell: { value: initialValue },
  row: { index },
  column: { id },
  data,
  setData,
}: EditableCellProps<D>): React.ReactElement => {
  const inputStyle = {
    padding: 0,
    margin: 0,
    border: 0,
    background: 'transparent',
  };

  const [value, setValue] = React.useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    setData(
      data.map((row, i) =>
        i === index ? { ...row, [id]: e.target.value } : row,
      ),
    );
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <InputBase
      style={inputStyle}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputProps={{ size: value ? value.length : null }}
    />
  );
};

interface MuiTableProps<D> {
  title: string;
  columns: Array<Column>;
  data: D[];
  setData: React.Dispatch<React.SetStateAction<D[]>>;
  editableCell?: boolean;
}

const MuiTable = <D extends {}>({
  title,
  columns,
  data,
  setData,
  editableCell,
}: MuiTableProps<D>): React.ReactElement => {
  const defaultColumn: Column = {};
  if (editableCell) {
    defaultColumn.Cell = EditableCell;
  }

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      setData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
  );

  const {
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
    headerGroups,
    getTableProps,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
    gotoPage,
    setPageSize,
    getToggleAllRowsSelectedProps,
  } = tableInstance;

  const deleteSelectedRowsHandler = (): void => {
    const indexes = Object.keys(selectedRowIds).map((n) => parseInt(n, 10));
    const newData = data.filter((_, i) => !indexes.includes(i));
    setData(newData);
  };

  return (
    <TableContainer>
      <TableToolbar
        title={title}
        allColumns={tableInstance.columns}
        numSelected={Object.keys(selectedRowIds).length}
        deleteSelectedRowsHandler={deleteSelectedRowsHandler}
        globalFilter={globalFilter}
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
      />
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup: HeaderGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              <TableCell>
                <Checkbox {...getToggleAllRowsSelectedProps()} />
              </TableCell>
              {headerGroup.headers.map((column: ColumnInstance) => (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <TableSortLabel
                    active={column.isSorted}
                    direction={column.isSortedDesc ? 'desc' : 'asc'}
                  >
                    {column.render('Header')}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {page.map((row: Row) => {
            prepareRow(row);
            return (
              <TableRow hover {...row.getRowProps()}>
                <TableCell>
                  <Checkbox {...row.getToggleRowSelectedProps()} />
                </TableCell>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              count={data.length}
              page={pageIndex}
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              rowsPerPage={pageSize}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={(e, newPage): void => {
                gotoPage(newPage);
              }}
              onChangeRowsPerPage={(e): void => {
                setPageSize(Number(e.target.value));
              }}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default MuiTable;

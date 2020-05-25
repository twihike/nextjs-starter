/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */

import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import {
  Column,
  ColumnInstance,
  HeaderGroup,
  Row,
  TableOptions,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';

function IndeterminateCheckbox({
  indeterminate,
  ...rest
}: {
  indeterminate?: boolean;
  [key: string]: unknown;
}): React.ReactElement {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref?.current && indeterminate !== undefined) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return <input type="checkbox" ref={ref} {...rest} />;
}

interface EditableCellProps<D extends {}> {
  column: { id: number };
  row: { index: number };
  value: string;
  data: D[];
  setData: React.Dispatch<React.SetStateAction<D[]>>;
}

function EditableCell<D extends {}>({
  column: { id },
  row: { index },
  value: initialValue,
  data,
  setData,
}: EditableCellProps<D>): React.ReactElement {
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
    <input
      className="w-full  bg-transparent text-on-surface"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      size={value ? value.length : undefined}
    />
  );
}

interface MuiTableProps<D extends {}> {
  title: string;
  columns: Column<D>[];
  data: D[];
  setData: React.Dispatch<React.SetStateAction<D[]>>;
  editableCell?: boolean;
}

function Table<D extends {}>({
  title,
  columns,
  data,
  setData,
  editableCell,
}: MuiTableProps<D>): React.ReactElement {
  const tableOptions: TableOptions<D> = {
    columns,
    data,
    setData,
  };

  if (editableCell) {
    tableOptions.defaultColumn = {
      Cell: EditableCell,
    };
  }

  const tableInstance = useTable(
    tableOptions,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
  );

  const {
    state: { globalFilter, pageIndex, pageSize, selectedRowIds },
    headerGroups,
    getTableProps,
    getTableBodyProps,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
    pageCount,
    canPreviousPage,
    canNextPage,
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    getToggleAllRowsSelectedProps,
  } = tableInstance;

  const numSelected = Object.keys(selectedRowIds).length;

  const deleteSelectedRowsHandler = (): void => {
    const indexes = new Set(
      Object.keys(selectedRowIds).map((n) => Number.parseInt(n, 10)),
    );
    const newData = data.filter((_, i) => !indexes.has(i));
    setData(newData);
  };

  return (
    <div className="w-full">
      <div className="flex items-center  py-1">
        <h1 className="pl-1  text-xl text-on-surface">{title}</h1>
        {numSelected > 0 && (
          <>
            <button
              type="button"
              className="tk-button tk-button-circle tk-button-ripple ml-2 px-1 py-1"
              onClick={deleteSelectedRowsHandler}
            >
              <DeleteIcon style={{ color: 'rgb(var(--color-on-surface))' }} />
            </button>
            <span className="pl-2  text-on-surface">{`${numSelected} selected`}</span>
          </>
        )}
        <div className="flex-grow" />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="pl-1  text-on-surface">
          Search
          <input
            type="text"
            className="tk-form-text tk-form-text-primary ml-1"
            value={globalFilter}
            onChange={(e): void => {
              setGlobalFilter(e.target.value || undefined);
            }}
            placeholder={`${preGlobalFilteredRows.length} records...`}
          />
        </label>
      </div>

      <div className="w-full p-1  border border-on-surface-border rounded-md">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup: HeaderGroup<D>) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                <th>
                  <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                </th>
                {headerGroup.headers.map((column: ColumnInstance<D>) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="p-1  text-left text-on-surface font-normal"
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted && column.isSortedDesc ? ' ↓' : ''}
                      {column.isSorted && !column.isSortedDesc ? ' ↑' : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row: Row<D>) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="border-t border-on-surface-border transition-colors duration-500 hover:bg-on-surface-state-enabled"
                >
                  <td className="p-1">
                    <IndeterminateCheckbox
                      {...row.getToggleRowSelectedProps()}
                    />
                  </td>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="p-1  text-on-surface"
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>

          <tfoot />
        </table>
      </div>

      <div className="flex items-center justify-end  py-1">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="pl-1 text-on-surface">
          Show
          <select
            className="ml-1  bg-transparent text-on-surface"
            value={pageSize}
            onBlur={(e): void => {
              setPageSize(Number(e.target.value));
            }}
            onChange={(e): void => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 30, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <span className="pl-1  text-on-surface">
          {` page ${pageIndex + 1} of ${pageCount} `}
        </span>
        <button
          type="button"
          className="tk-button tk-button-contained tk-button-ripple ml-1"
          onClick={(): void => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {'<<'}
        </button>
        <button
          type="button"
          className="tk-button tk-button-contained tk-button-ripple ml-1"
          onClick={(): void => previousPage()}
          disabled={!canPreviousPage}
        >
          {'<'}
        </button>
        <button
          type="button"
          className="tk-button tk-button-contained tk-button-ripple ml-1"
          onClick={(): void => nextPage()}
          disabled={!canNextPage}
        >
          {'>'}
        </button>
        <button
          type="button"
          className="tk-button tk-button-contained tk-button-ripple ml-1"
          onClick={(): void => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
}

export default Table;

/* eslint-enable @typescript-eslint/ban-types */
/* eslint-enable react/jsx-key */
/* eslint-enable react/jsx-props-no-spreading */

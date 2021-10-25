import DeleteIcon from '@mui/icons-material/Delete';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { Checkbox, FormControlLabel, FormGroup, Popover } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Column, Row } from 'react-table';

import MuiTableSearch from './MuiTableSearch';

/* eslint-disable @typescript-eslint/ban-types */
interface MuiTableToolbarProps<D extends {}> {
  title: string;
  allColumns: Column<D>[];
  numSelected: number;
  deleteSelectedRowsHandler: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
  globalFilter: string;
  preGlobalFilteredRows: Row<D>[];
  setGlobalFilter: (filterValue: unknown) => void;
}

/* eslint-disable react/jsx-props-no-spreading */
function MuiTableToolbar<D extends {}>(
  props: MuiTableToolbarProps<D>,
): React.ReactElement {
  const {
    title,
    allColumns,
    numSelected,
    deleteSelectedRowsHandler,
    globalFilter,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = props;

  const [columnToggleAnchorEl, setColumnToggleAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const handleColumnToggleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    setColumnToggleAnchorEl(event.currentTarget);
  };
  const handleColumnToggleClose = (): void => {
    setColumnToggleAnchorEl(null);
  };

  const columnTogglePopoverOpen = Boolean(columnToggleAnchorEl);
  const columnTogglePopoverId = columnTogglePopoverOpen
    ? 'column-toggle-popover'
    : undefined;

  return (
    <Toolbar sx={{ pl: 2, pr: 1 }}>
      <Typography sx={{ flex: '1 1' }} component="h1" variant="h6">
        {title}
      </Typography>

      {numSelected > 0 && (
        <>
          <Typography>{`${numSelected} selected`}</Typography>
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={deleteSelectedRowsHandler}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}

      <Tooltip title="Toggle column">
        <IconButton
          aria-label="Toggle column"
          aria-describedby={columnTogglePopoverId}
          onClick={handleColumnToggleClick}
        >
          <ViewColumnIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id={columnTogglePopoverId}
        open={columnTogglePopoverOpen}
        anchorEl={columnToggleAnchorEl}
        onClose={handleColumnToggleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <FormGroup>
          {allColumns?.length &&
            allColumns.map((column) => (
              <FormControlLabel
                key={column.id}
                label={column.id}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                control={<Checkbox {...column.getToggleHiddenProps()} />}
              />
            ))}
        </FormGroup>
      </Popover>

      <MuiTableSearch
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </Toolbar>
  );
}
/* eslint-enable react/jsx-props-no-spreading */
/* eslint-enable @typescript-eslint/ban-types */

export default MuiTableToolbar;

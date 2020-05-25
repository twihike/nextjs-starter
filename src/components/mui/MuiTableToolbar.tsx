/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { Column, Row } from 'react-table';

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Popover,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';

import MuiTableSearch from './MuiTableSearch';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1',
  },
}));

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

function MuiTableToolbar<D extends {}>(
  props: MuiTableToolbarProps<D>,
): React.ReactElement {
  const classes = useToolbarStyles();
  const {
    title,
    allColumns,
    numSelected,
    deleteSelectedRowsHandler,
    globalFilter,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = props;

  const [
    columnToggleAnchorEl,
    setColumnToggleAnchorEl,
  ] = React.useState<HTMLButtonElement | null>(null);

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
    <Toolbar className={classes.root}>
      <Typography className={classes.title} component="h1" variant="h6">
        {title}
      </Typography>

      {numSelected > 0 && (
        <>
          <Typography>{`${numSelected} selected`}</Typography>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={deleteSelectedRowsHandler}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}

      <Tooltip title="Toggle column">
        <IconButton
          aria-label="toggle column"
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
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
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
};

export default MuiTableToolbar;

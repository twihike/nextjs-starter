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
import React from 'react';
import { Column, Row } from 'react-table';

import MuiTableSearch from './MuiTableSearch';

/* eslint-disable @typescript-eslint/ban-types */
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

/* eslint-disable react/jsx-props-no-spreading */
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

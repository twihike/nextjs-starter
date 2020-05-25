import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { Row } from 'react-table';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
}));

// eslint-disable-next-line @typescript-eslint/ban-types
interface MuiTableSearchProps<D extends {}> {
  globalFilter: string;
  preGlobalFilteredRows: Row<D>[];
  setGlobalFilter: (filterValue: unknown) => void;
}

// eslint-disable-next-line @typescript-eslint/ban-types
function MuiTableSearch<D extends {}>({
  globalFilter,
  preGlobalFilteredRows,
  setGlobalFilter,
}: MuiTableSearchProps<D>): React.ReactElement {
  const classes = useStyles();
  const count = preGlobalFilteredRows.length;

  // Global filter only works with pagination from the first page.
  // This may not be a problem for server side pagination when
  // only the current page is downloaded.

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        value={globalFilter || ''}
        onChange={(
          e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        ): void => {
          setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`${count} records...`}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'Search' }}
      />
    </div>
  );
}

export default MuiTableSearch;

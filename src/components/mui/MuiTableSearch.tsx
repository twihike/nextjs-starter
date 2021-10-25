import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { Theme, alpha } from '@mui/material/styles';
import React from 'react';
import { Row } from 'react-table';

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
  const count = preGlobalFilteredRows.length;

  // Global filter only works with pagination from the first page.
  // This may not be a problem for server side pagination when
  // only the current page is downloaded.

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: (theme: Theme) => theme.shape.borderRadius,
        backgroundColor: (theme: Theme) => alpha(theme.palette.grey[500], 0.15),
        '&:hover': {
          backgroundColor: (theme: Theme) =>
            alpha(theme.palette.grey[500], 0.25),
        },
        mr: 2,
        ml: { xs: 0, sm: 3 },
        width: { xs: '100%', sm: 'auto' },
      }}
    >
      <Box
        sx={{
          width: (theme: Theme) => theme.spacing(7),
          height: '100%',
          position: 'absolute',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SearchIcon />
      </Box>
      <InputBase
        value={globalFilter || ''}
        onChange={(
          e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        ): void => {
          setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`${count} records...`}
        sx={{ color: 'inherit' }}
        inputProps={{
          'aria-label': 'Search',
          sx: {
            p: (theme: Theme) => theme.spacing(1, 1, 1, 7),
            transition: (theme: Theme) => theme.transitions.create('width'),
            width: { xs: '100%', md: 200 },
          },
        }}
      />
    </Box>
  );
}

export default MuiTableSearch;

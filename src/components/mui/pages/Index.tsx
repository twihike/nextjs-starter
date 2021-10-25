import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

import Layout from '../Layout';

function Index(): React.ReactElement {
  return (
    <Layout>
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Paper sx={{ flexGrow: 1, mt: 2, p: 2 }}>
          <Typography component="p" variant="h3" align="center">
            Welcome to Next.js starter.
          </Typography>
          <p className="csstest">Style example.</p>
        </Paper>
      </Box>
      <style jsx>
        {`
          .csstest {
            font-size: 2em;
            text-align: center;
          }
        `}
      </style>
    </Layout>
  );
}

export default Index;

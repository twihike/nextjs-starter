import React from 'react';

import { makeStyles, Paper, Theme, Typography } from '@material-ui/core';

import Layout from '../Layout';

const useStyles = makeStyles((theme: Theme) => ({
  page: {
    flexGrow: 1,
    display: 'flex',
  },
  paper: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

const Index = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.page}>
        <Paper className={classes.paper}>
          <Typography component="p" variant="h3" align="center">
            Welcome to Next.js starter.
          </Typography>
          <p className="csstest">Style example.</p>
        </Paper>
      </div>
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
};

export default Index;

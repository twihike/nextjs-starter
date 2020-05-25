import { Paper, Theme, Typography, makeStyles } from '@material-ui/core';
import React from 'react';

import { useGetAllUsersQuery } from '../../../graphql/generated/graphql';
import { AuthContext } from '../../../lib/auth';
import Layout from '../Layout';
import MuiTable from '../MuiTable';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
}));

const userTableColumns = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Created At',
    accessor: 'createdAt',
  },
  {
    Header: 'Updated At',
    accessor: 'updatedAt',
  },
  {
    Header: 'Version',
    accessor: 'version',
  },
];

function Users(): React.ReactElement {
  const classes = useStyles();

  const result = useGetAllUsersQuery();
  const { loading, error, data } = result;
  const errorMessages = error
    ? error.graphQLErrors.map((v) => JSON.stringify(v.message))
    : '';

  const columns = React.useMemo(() => userTableColumns, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tableData, setTableData] = React.useState<any[]>([]);
  const [origTableDataStr, setOrigTableDataStr] = React.useState<string>('');
  const [auth] = React.useContext(AuthContext);
  React.useMemo(() => {
    if (!data || !auth.default.getToken()) {
      return [];
    }

    const origStr = JSON.stringify(data.users);
    setOrigTableDataStr(origStr);

    const origData = JSON.parse(origStr) as typeof data.users;
    const copiedData = JSON.parse(origStr) as typeof data.users;
    setTableData(copiedData);

    return origData;
  }, [auth.default, data]);
  const isEdited = React.useMemo(
    () => origTableDataStr !== JSON.stringify(tableData),
    [origTableDataStr, tableData],
  );

  return (
    <Layout>
      <div className={classes.container}>
        <Paper>
          <MuiTable
            title="Users"
            columns={columns}
            data={tableData}
            setData={setTableData}
          />
          {loading && <Typography>Loading...</Typography>}
          {error && <Typography color="error">{errorMessages}</Typography>}
          {isEdited && <Typography>Edited</Typography>}
        </Paper>
      </div>
    </Layout>
  );
}

export default Users;

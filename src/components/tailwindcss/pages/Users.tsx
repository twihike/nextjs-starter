import React from 'react';

import { useGetAllUsersQuery } from '../../../graphql/generated/graphql';
import { AuthContext } from '../../../lib/auth';
import Layout from '../Layout';
import Table from '../Table';

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
      <div className="px-4 py-2">
        <Table
          title="Users"
          columns={columns}
          data={tableData}
          setData={setTableData}
        />
        <p className="text-on-surface">
          {loading && 'Loading...'}
          {isEdited && 'Edited'}
          {errorMessages}
        </p>
      </div>
    </Layout>
  );
}

export default Users;

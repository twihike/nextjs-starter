import React from 'react';

import { AuthProvider } from '../../lib/auth';

const CommonProviders = ({
  children,
}: React.PropsWithChildren<{}>): React.ReactElement => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default CommonProviders;

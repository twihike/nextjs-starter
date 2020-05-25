import React from 'react';

import { AuthProvider } from '../../lib/auth';

function CommonProviders({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <AuthProvider>{children}</AuthProvider>;
}

export default CommonProviders;

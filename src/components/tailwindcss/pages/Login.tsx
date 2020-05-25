import Link from 'next/link';
import Router from 'next/router';
import React from 'react';

import { useSignInMutation } from '../../../graphql/generated/graphql';
import { AuthContext } from '../../../lib/auth';
import Layout from '../Layout';

function Login(): React.ReactElement {
  const [state, setState] = React.useState({
    name: '',
    password: '',
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const [signIn, result] = useSignInMutation();
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    signIn({
      variables: {
        input: {
          name: state.name,
          password: state.password,
        },
      },
    });
  };

  const { loading, error, data } = result;
  const [auth] = React.useContext(AuthContext);
  if (data) {
    const { token } = data.signIn;
    auth.default.setToken(token);
    Router.push('/');
  }
  const errorMessage = error ? error.message : '';
  const errorDetailMessages = error
    ? error.graphQLErrors.map((v) => JSON.stringify(v.message))
    : '';

  return (
    <Layout>
      <div className="flex justify-center items-center  flex-1">
        <div className="flex-grow max-w-sm p-4  border border-on-surface-border rounded">
          <h1 className="text-lg text-center text-on-surface">Log in</h1>
          <form onSubmit={handleOnSubmit}>
            <label
              htmlFor="tk-username"
              className="block py-2  text-on-surface"
            >
              name
              <input
                className="tk-form-text tk-form-text-primary w-full"
                type="text"
                id="tk-username"
                name="name"
                value={state.name}
                onChange={handleOnChange}
              />
            </label>
            <label
              htmlFor="tk-password"
              className="block py-2  text-on-surface"
            >
              password
              <input
                type="text"
                id="tk-password"
                name="password"
                className="tk-form-text tk-form-text-primary w-full"
                value={state.password}
                onChange={handleOnChange}
              />
            </label>
            <button
              type="submit"
              className="tk-button tk-button-contained-primary tk-button-ripple my-2 w-full"
            >
              Log in
            </button>
            <p className="py-2  text-on-surface">
              Don&apos;t have an account?&nbsp;
              <Link href="/signup">
                <a href="/signup" className="text-primary">
                  Create an account
                </a>
              </Link>
            </p>
            <p className="py-2  text-on-surface">
              {loading && 'Loading...'}
              <span className="text-on-error">
                {errorMessage}
                {errorDetailMessages}
              </span>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;

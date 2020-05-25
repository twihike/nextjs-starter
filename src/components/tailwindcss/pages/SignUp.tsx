import Link from 'next/link';
import Router from 'next/router';
import React from 'react';

import { useSignUpMutation } from '../../../graphql/generated/graphql';
import Layout from '../Layout';

function SignUp(): React.ReactElement {
  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const [signUp, result] = useSignUpMutation();
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    signUp({
      variables: {
        input: {
          name: state.name,
          email: state.email,
          password: state.password,
        },
      },
    });
  };

  const { loading, error, data } = result;
  if (data) {
    Router.push('/login');
  }
  const errorMessage = error ? error.message : '';
  const errorDetailMessages = error
    ? error.graphQLErrors.map((v) => JSON.stringify(v.message))
    : '';

  return (
    <Layout>
      <div className="flex justify-center items-center  flex-1">
        <div className="flex-grow max-w-sm p-4  border border-on-surface-border rounded">
          <h1 className="text-lg text-center text-on-surface">
            Create your account
          </h1>
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
              htmlFor="tk-username"
              className="block py-2  text-on-surface"
            >
              email
              <input
                className="tk-form-text tk-form-text-primary w-full"
                type="text"
                id="tk-email"
                name="email"
                value={state.email}
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
              Create account
            </button>
            <p className="py-2  text-on-surface">
              Already have an account?&nbsp;
              <Link href="/login">
                <a href="/login" className="text-primary">
                  Log in
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

export default SignUp;

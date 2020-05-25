import {
  Box,
  Button,
  Container,
  Link as MuiLink,
  Paper,
  Theme,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import * as yup from 'yup';

import { useSignInMutation } from '../../../graphql/generated/graphql';
import { AuthContext } from '../../../lib/auth';
import Layout from '../Layout';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(4),
  },
}));

function Login(): React.ReactElement {
  const classes = useStyles();

  const formSchema = yup
    .object({
      name: yup.string().required(),
      password: yup.string().required(),
    })
    .required();
  type FormValues = yup.InferType<typeof formSchema>;
  const initialFormValues: FormValues = {
    name: '',
    password: '',
  };

  const [signIn, result] = useSignInMutation();
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ): Promise<void> => {
    await signIn({
      variables: { input: { ...values } },
    });
    setSubmitting(false);
  };

  const { loading, error, data } = result;
  const [auth] = React.useContext(AuthContext);
  if (data) {
    const { token } = data.signIn;
    auth.default.setToken(token);
    Router.push('/');
  }
  const errorMessages = error
    ? error.graphQLErrors.map((v) => JSON.stringify(v.message))
    : '';

  return (
    <Layout>
      <Container className={classes.container} maxWidth="xs">
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Formik
            initialValues={initialFormValues}
            validationSchema={formSchema}
            validateOnChange={false}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }): React.ReactElement => (
              <Form>
                <Field
                  component={TextField}
                  id="name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  label="Name"
                  required
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <Field
                  component={TextField}
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  label="Password"
                  required
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <Box mt={1} mb={1}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                  >
                    Log in
                  </Button>
                </Box>
                <Box mt={2} mb={1} fontSize="body2.fontSize">
                  Don&apos;t have an account?&nbsp;
                  <Link href="/signup" passHref>
                    <MuiLink component="a" color="primary">
                      Create an account
                    </MuiLink>
                  </Link>
                </Box>
                <Typography variant="body2">
                  {loading && 'Loading...'}
                </Typography>
                <Typography variant="body2" color="error">
                  {error && errorMessages}
                </Typography>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </Layout>
  );
}

export default Login;

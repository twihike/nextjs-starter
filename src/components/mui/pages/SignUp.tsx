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

import { useSignUpMutation } from '../../../graphql/generated/graphql';
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

function SignUp(): React.ReactElement {
  const classes = useStyles();

  const formSchema = yup
    .object({
      name: yup
        .string()
        .required()
        .matches(/^[\w-]+$/)
        .min(6)
        .max(64),
      email: yup.string().required().email(),
      password: yup
        .string()
        .required()
        .matches(/^[\u0020-\u007E]+$/)
        .min(8)
        .max(64),
    })
    .required();
  type FormValues = yup.InferType<typeof formSchema>;
  const initialFormValues: FormValues = {
    name: '',
    email: '',
    password: '',
  };

  const [signUp, result] = useSignUpMutation({ errorPolicy: 'all' });
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ): Promise<void> => {
    await signUp({
      variables: { input: { ...values } },
    });
    setSubmitting(false);
  };

  const { loading, error, data } = result;
  if (data) {
    Router.push('/login');
  }
  const errorMessages = error
    ? error.graphQLErrors.map((v) => JSON.stringify(v.message))
    : '';

  return (
    <Layout>
      <Container className={classes.container} maxWidth="xs">
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Create your account
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
                  type="text"
                  id="name"
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
                  type="text"
                  id="email"
                  name="email"
                  autoComplete="email"
                  label="Email"
                  required
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <Field
                  component={TextField}
                  type="password"
                  id="password"
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
                    Create account
                  </Button>
                </Box>
                <Box mt={2} mb={1} fontSize="body2.fontSize">
                  Already have an account?&nbsp;
                  <Link href="/login" passHref>
                    <MuiLink component="a" color="primary">
                      Log in
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

export default SignUp;

# Next.js starter

## Description

Next.js framework starter repository.

## How would I set this up myself

Next.js

```shell
# Next
# https://nextjs.org/docs
yarn add next react react-dom
yarn add -D @next/bundle-analyzer

# Typescript
# https://nextjs.org/docs/basic-features/typescript
touch tsconfig.json
yarn add -D typescript @types/react @types/react-dom @types/node

# Telemetry
# https://nextjs.org/telemetry
yarn next telemetry disable

# Run dev mode
yarn run dev
```

Third party packages

```shell
# Isomorphic
yarn add isomorphic-unfetch

# Apollo Client
yarn add @apollo-client @apollo/link-context graphql
# Apollo SSR
yarn add @apollo/react-ssr

# Apollo Mock
yarn add -D \
  @apollo/link-schema \
  graphql-tools \
  graphql-iso-date \
  @types/graphql-iso-date

# Material-UI
yarn add @material-ui/core @material-ui/icons

# Material-UI Formik
yarn add formik formik-material-ui
yarn add formik-material-ui-pickers @date-io/date-fns@1.x date-fns
yarn add yup
yarn add -D @types/yup

# Tailwind CSS
yarn add -D \
  tailwindcss \
  @fullhuman/postcss-purgecss \
  tailwindcss-theming \
  postcss-preset-env

# React Table
yarn add react-table
yarn add -D @types/react-table
```

Dev tools

```shell
# Graphql code generator
# https://graphql-code-generator.com/docs/getting-started/
yarn add -D \
  @graphql-codegen/cli \
  @graphql-codegen/introspection \
  @graphql-codegen/typescript \
  @graphql-codegen/typescript-operations \
  @graphql-codegen/typescript-react-apollo

# Eslint
yarn add -D \
  eslint \
  eslint-plugin-import \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-plugin-jsx-a11y \
  eslint-config-airbnb \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin

# Prettier
yarn add -D \
  prettier \
  eslint-config-prettier \
  eslint-plugin-prettier

# Jest
# https://jestjs.io/docs/en/getting-started
# https://jestjs.io/docs/en/tutorial-react
# https://github.com/zeit/next.js/tree/canary/examples/with-jest
yarn add -D \
  jest \
  @types/jest \
  babel-jest \
  @babel/core
# Included in Next.js?
# yarn add -D \
#   @babel/preset-env \
#   @babel/preset-typescript \
#   @babel/preset-react \

# React test renderer
yarn add -D react-test-renderer

# Testing Library
# https://testing-library.com/docs/react-testing-library/intro
# https://testing-library.com/docs/ecosystem-user-event
# https://testing-library.com/docs/ecosystem-jest-dom
yarn add -D \
  @testing-library/react \
  @testing-library/user-event \
  @testing-library/jest-dom

# Enzyme
# https://airbnb.io/enzyme/docs/installation/
yarn add -D \
  enzyme \
  enzyme-adapter-react-16 \

# Cypress
# https://docs.cypress.io/guides/tooling/typescript-support.html
# https://github.com/cypress-io/cypress-webpack-preprocessor
yarn add -D cypress \
  @cypress/webpack-preprocessor \
  ts-loader \
  eslint-plugin-cypress \
  start-server-and-test
# webpack typescript

# Cypress image snapshot
yarn add -D \
  cypress-image-snapshot \
  @types/cypress-image-snapshot

# Storybook
# https://storybook.js.org/docs/guides/guide-react/
# https://storybook.js.org/docs/configurations/typescript-config/
# https://storybook.js.org/docs/addons/using-addons/
yarn add -D \
  @storybook/react \
  babel-loader @babel/core \
  babel-preset-react-app \
  @storybook/addons \
  storycap

# reg-viz
yarn add -D reg-cli
```

# Next.js starter

[![CI status](https://github.com/twihike/nextjs-starter/workflows/ci/badge.svg)](https://github.com/twihike/nextjs-starter/actions)

Next.js framework starter repository.

## Technologies

* JavaScript Library
  * Docs
    * Next.js: <https://nextjs.org/>
    * React: <https://reactjs.org/>
  * Packages
    * next: <https://github.com/zeit/next.js>
    * react: <https://github.com/facebook/react/>

* Language
  * Docs
    * TypeScript: <https://www.typescriptlang.org/docs/>
  * Packages
    * typescript: <https://github.com/microsoft/TypeScript>

* GraphQL
  * Docs
    * GraphQL: <https://graphql.org/learn/>
    * Apollo: <https://www.apollographql.com/docs/>
    * GraphQL Code Generator: <https://graphql-code-generator.com/>
  * Packages
    * graphql: <https://github.com/graphql/graphql-js>
    * @apollo/client: <https://github.com/apollographql/apollo-client>
    * graphql-tools: <https://github.com/apollographql/graphql-tools>
    * @graphql-codegen: <https://github.com/dotansimha/graphql-code-generator>

* UI Library
  * Docs
    * Material-UI: <https://material-ui.com/>
    * TailwindCSS: <https://tailwindcss.com/>
  * Packages
    * @material-ui: <https://github.com/mui-org/material-ui>
    * tailwindcss: <https://github.com/tailwindcss/tailwindcss>
    * tailwindcss-theming: <https://github.com/hawezo/tailwindcss-theming>

* Form Validation
  * Docs
    * Formik: <https://jaredpalmer.com/formik/>
    * Formik Material-UI: <https://stackworx.github.io/formik-material-ui/>
  * Packages
    * formik: <https://github.com/jaredpalmer/formik>
    * formik-material-ui: <https://github.com/stackworx/formik-material-ui>

* Table
  * Docs
    * React Table: <https://react-table.js.org/>
  * Packages
    * react-table: <https://github.com/tannerlinsley/react-table>

* UI development
  * Docs
    * Storybook: <https://storybook.js.org/>
  * Packages
    * @storybook: <https://github.com/storybookjs/storybook>

* Linter
  * Docs
    * ESLint: <https://eslint.org/>
  * Packages
    * eslint: <https://github.com/eslint/eslint>
    * eslint-config-airbnb: <https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb>
    * @typescript-eslint/parser: <https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/parser>
    * @typescript-eslint/eslint-plugin: <https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin>

* Formatter
  * Docs
    * Prettier: <https://prettier.io/>
  * Packages
    * prettier: <https://github.com/prettier/prettier>
    * eslint-plugin-prettier: <https://github.com/prettier/eslint-plugin-prettier>
    * eslint-config-prettier: <https://github.com/prettier/eslint-config-prettier>

* Testing
  * Docs
    * Jest: <https://jestjs.io/>
    * Testing Library: <https://testing-library.com/>
    * Cypress: <https://www.cypress.io/>
  * Packages
    * jest: <https://github.com/facebook/jest>
    * @testing-library/react: <https://github.com/testing-library/react-testing-library>
    * @testing-library/user-event: <https://github.com/testing-library/user-event>
    * @testing-library/jest-dom: <https://github.com/testing-library/react-testing-library>
    * cypress: <https://github.com/cypress-io/cypress>

* Visual regression testing
  * Packages
    * reg-cli: <https://github.com/reg-viz/reg-cli>
    * storycap: <https://github.com/reg-viz/storycap>
    * cypress-image-snapshot: <https://github.com/palmerhq/cypress-image-snapshot>

## How would I set this up myself

Next.js

```shell
# Next
# https://nextjs.org/docs
yarn add next react react-dom
yarn add -D \
  @next/bundle-analyzer \
  postcss-flexbugs-fixes \
  postcss-preset-env

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

GraphQL

```shell
# Isomorphic
yarn add isomorphic-unfetch

# Apollo Client
yarn add @apollo/client @apollo/link-context graphql
# Apollo SSR
yarn add @apollo/react-ssr

# Apollo Mock
yarn add -D \
  @apollo/link-schema \
  graphql-tools \
  graphql-iso-date \
  @types/graphql-iso-date

# Graphql code generator
# https://graphql-code-generator.com/docs/getting-started/
yarn add -D \
  @graphql-codegen/cli \
  @graphql-codegen/introspection \
  @graphql-codegen/typescript \
  @graphql-codegen/typescript-operations \
  @graphql-codegen/typescript-react-apollo
```

UI

```shell
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
  tailwindcss-theming

# React Table
yarn add react-table
yarn add -D @types/react-table
```

Linter and formatter

```shell
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
```

Testing

```shell
# Jest
# https://jestjs.io/docs/en/getting-started
# https://jestjs.io/docs/en/tutorial-react
# https://github.com/zeit/next.js/tree/canary/examples/with-jest
#
# Included in Next.js
# yarn add -D \
#   @babel/core \
#   @babel/preset-env \
#   @babel/preset-typescript \
#   @babel/preset-react
yarn add -D \
  jest \
  @types/jest \
  babel-jest

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
  enzyme-adapter-react-16

# Cypress
# https://docs.cypress.io/guides/tooling/typescript-support.html
# https://github.com/cypress-io/cypress-webpack-preprocessor
# https://github.com/cypress-io/cypress-and-jest-typescript-example
#
# Included in Next.js
# yarn add -D \
#   typescript \
#   webpack
#
# Not required since version 4.4.0
# yarn add -D \
#   @cypress/webpack-preprocessor \
#   ts-loader \
#   babel-loader @babel/core @babel/preset-env
yarn add -D cypress \
  eslint-plugin-cypress \
  start-server-and-test

# Cypress image snapshot
yarn add -D \
  cypress-image-snapshot \
  @types/cypress-image-snapshot

# Storybook
# https://storybook.js.org/docs/guides/guide-react/
# https://storybook.js.org/docs/configurations/typescript-config/
# https://storybook.js.org/docs/addons/using-addons/
# @babel/core is included in Next.js
yarn add -D \
  @storybook/react \
  babel-loader @babel/core \
  babel-preset-react-app \
  @storybook/addons \
  storycap

# reg-viz
yarn add -D reg-cli
```

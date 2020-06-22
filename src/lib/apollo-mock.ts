/* eslint-disable import/no-extraneous-dependencies */
import { ApolloLink } from '@apollo/client';
import { SchemaLink } from '@apollo/link-schema';
// import { addMocksToSchema } from '@graphql-tools/mock';
// import {
//   addResolversToSchema,
//   makeExecutableSchema,
// } from '@graphql-tools/schema';
import { buildClientSchema } from 'graphql';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GraphQLDate, GraphQLDateTime, GraphQLTime } from 'graphql-iso-date';
import {
  addMocksToSchema,
  addResolversToSchema,
  makeExecutableSchema,
} from 'graphql-tools';

import introspectionResult from '../graphql/generated/schema.json';
import typeDefs from '../graphql/generated/typedefs';
/* eslint-enable import/no-extraneous-dependencies */

export const defaultMocks = {
  Int: (): number => 1,
  DateTime: (): Date => new Date(Date.UTC(2017, 0, 10, 21, 33, 15, 233)),
  // Date: (): Date => new Date(Date.UTC(1991, 11, 24)),
  // Time: (): Date => new Date(Date.UTC(2017, 0, 10, 14, 30)),
};

export const defaultResolvers = {
  DateTime: GraphQLDateTime,
  // Date: GraphQLDate,
  // Time: GraphQLTime,
};

export function createMockLink(): ApolloLink {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schema = buildClientSchema(introspectionResult as any);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const schemaBk = makeExecutableSchema({ typeDefs });
  const resolvers = defaultResolvers;
  const mocks = defaultMocks;

  addResolversToSchema({
    schema,
    resolvers,
  });
  addMocksToSchema({ schema, mocks });

  return new SchemaLink({ schema });
}

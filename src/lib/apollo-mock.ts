/* eslint-disable import/no-extraneous-dependencies */

import { buildClientSchema } from 'graphql';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GraphQLDate, GraphQLDateTime, GraphQLTime } from 'graphql-iso-date';
import {
  addMockFunctionsToSchema,
  addResolveFunctionsToSchema,
  makeExecutableSchema,
} from 'graphql-tools';

import { ApolloLink } from '@apollo/client';
import { SchemaLink } from '@apollo/link-schema';

import introspectionResult from '../graphql/generated/schema.json';
import typeDefs from '../graphql/generated/typedefs';

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

  addResolveFunctionsToSchema({
    schema,
    resolvers,
  });
  addMockFunctionsToSchema({ schema, mocks });

  return new SchemaLink({ schema });
}

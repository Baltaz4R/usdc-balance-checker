import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = process.env.NEXT_PUBLIC_GRAPHQL_URI;

if (!uri) throw new Error('Missing NEXT_PUBLIC_GRAPHQL_URI');

const client = new ApolloClient({ uri, cache: new InMemoryCache() });

export default client;
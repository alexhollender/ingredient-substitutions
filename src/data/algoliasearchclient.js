import algoliasearch from 'algoliasearch';

export const searchClient = algoliasearch(
  'RZDMC5Q06Q',
  process.env.REACT_APP_ALGOLIA_API_KEY
);

export const searchIndex = searchClient.initIndex('ingredient substitutions');

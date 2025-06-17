import baseApis from '../../baseApis/baseApis';

baseApis.injectEndpoints({
  endpoints: (build) => ({
    getGroupes: build.query({
      query: () => ({
        url: '/groupes',
        method: 'GET',
      }),
    }),
  }),
});

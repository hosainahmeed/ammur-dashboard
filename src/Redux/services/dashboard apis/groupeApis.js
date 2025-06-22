import baseApis from '../../baseApis/baseApis';

const groupeApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    getGroupes: build.query({
      query: () => ({
        url: '/rooms',
        method: 'GET',
      }),
      providesTags: ['groupes', 'families'],
    }),
    deleteGroupe: build.mutation({
      query: ({ id }) => ({
        url: `/rooms/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['groupes', 'families'],
    }),
  }),
});

export const { useGetGroupesQuery, useDeleteGroupeMutation } = groupeApis;

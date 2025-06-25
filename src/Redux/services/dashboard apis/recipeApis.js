import baseApis from '../../baseApis/baseApis';

const recipeApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getRecipe: builder.query({
      query: () => ({
        url: `/recipes`,
        method: 'GET',
      }),
      providesTags: ['recipe'],
    }),
    createRecipe: builder.mutation({
      query: ({ data }) => ({
        url: `/recipes/create-recipe`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['recipe'],
    }),
    updateRecipe: builder.mutation({
      query: ({ id, data }) => ({
        url: `/recipes/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['recipe'],
    }),
    deleteRecipe: builder.mutation({
      query: ({ id }) => ({
        url: `/recipes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['recipe'],
    }),
    getSingleRecipe: builder.query({
      query: ({ id }) => ({
        url: `/recipes/${id}`,
        method: 'GET',
      }),
      providesTags: ['recipe'],
    }),
  }),
});

export const {
  useGetRecipeQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
  useGetSingleRecipeQuery,
} = recipeApis;

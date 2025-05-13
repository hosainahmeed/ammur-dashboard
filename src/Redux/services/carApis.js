import baseApis from '../baseApis/baseApis';

export const carApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: () => ({
        url: '/car/get-all-cars',
        method: 'GET',
      }),
      providesTags: ['car'],
    }),
    createNewCar: builder.mutation({
      query: ({ submitFormData }) => ({
        url: '/car/post-car',
        method: 'POST',
        body: submitFormData,
      }),
      invalidatesTags: ['car'],
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/car/delete-car`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['car'],
    }),
    getSingleCardData: builder.query({
      query: ({ id }) => ({
        url: `/car/get-car`,
        method: 'GET',
        params: { carId: id },
      }),
      invalidatesTags: ['car'],
    }),
    UpdateCar: builder.mutation({
      query: ({ submitFormData }) => ({
        url: '/car/update-car',
        method: 'PATCH',
        body: submitFormData,
      }),
      invalidatesTags: ['car'],
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useCreateNewCarMutation,
  useDeleteCarMutation,
  useGetSingleCardDataQuery,
  useUpdateCarMutation,
} = carApis;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, limitCarsPerPage } from '../../../shared/lib/const';
import { CAR_TAG } from '../../../shared/lib/types';
import {
  CarItemType, EngineDrive, EngineResponse, EngineStatus,
} from '../model/types';

export const carApi = createApi({
  tagTypes: [CAR_TAG],
  reducerPath: 'carApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: (page: number = 1, limit: number = limitCarsPerPage) => ({
        url: '/garage',
        params: {
          _limit: limit,
          _page: page,
        },
      }),
      transformResponse: (result: CarItemType[], meta) => {
        const count = Number(meta?.response?.headers.get('X-Total-Count'));
        return { result, count };
      },
      providesTags: [CAR_TAG],
    }),
    getCar: builder.query({
      query: (id: number) => ({
        url: `/garage/${id}`,
      }),
      providesTags: [CAR_TAG],
    }),
    createCar: builder.mutation({
      query: (car: Partial<CarItemType> | CarItemType) => ({
        url: '/garage',
        method: 'POST',
        body: { name: car.name, color: car.color },
        prepareHeaders: (headers: Headers) => {
          headers.set('Content-Type', 'application/json');
          return headers;
        },
      }),
      invalidatesTags: [CAR_TAG],
    }),
    updateCar: builder.mutation({
      query: (item: CarItemType) => ({
        url: `/garage/${item.id}`,
        method: 'PUT',
        body: item,
        prepareHeaders: (headers: Headers) => {
          headers.set('Content-Type', 'application/json');
          return headers;
        },
      }),
      invalidatesTags: [CAR_TAG],
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/garage/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [CAR_TAG],
    }),
    startEngine: builder.mutation<EngineResponse, number>({
      query: (id) => ({
        url: `/engine?id=${id}&status=${EngineStatus.start}`,
        method: 'PATCH',
      }),
    }),
    stopEngine: builder.mutation<EngineResponse, number>({
      query: (id) => ({
        url: `/engine?id=${id}&status=${EngineStatus.stop}`,
        method: 'PATCH',
      }),
    }),
    driveEngine: builder.mutation<EngineDrive, number>({
      query: (id) => ({
        url: `/engine?id=${id}&status=${EngineStatus.drive}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useGetCarQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useStartEngineMutation,
  useStopEngineMutation,
  useDriveEngineMutation,
} = carApi;

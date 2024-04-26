import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WINNER_TAG } from '../../../shared/lib/types';
import { baseUrl } from '../../../shared/lib/const';
import {
  Order, Sort, Winner, WinnerDTO,
} from '../model/types';
import { CarItemType } from '../../car/model/types';

type QueryProps = {
  page: number;
  limit: number;
  sort?: Sort | null;
  order?: Order | null;
};

type QueryResponse = {
  result: Winner[];
  count: number;
};
export const winnerApi = createApi({
  tagTypes: [WINNER_TAG],
  reducerPath: 'winnerApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllWinners: builder.query<QueryResponse, QueryProps>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const {
          page, limit, sort, order,
        } = _arg;
        const responseWinners = await fetchWithBQ({
          url: '/winners',
          params: {
            page,
            _limit: limit,
            _sort: sort,
            _order: order,
          },
        });
        if (responseWinners.error) return { error: responseWinners.error };
        const winners = responseWinners.data as Omit<Winner, 'name' | 'color'>[];
        const cars: CarItemType[] = [];
        const promises = [];
        const getCarsById = async (id: number) => {
          const response = await fetchWithBQ({
            url: `/garage/${winners[id].id}`,
          });
          const car = response.data as CarItemType;
          if (car) {
            cars.push(car);
          }
        };

        for (let i = 0; i < winners.length; i += 1) {
          promises.push(getCarsById(i));
        }
        await Promise.all(promises);
        const result = cars.map((item) => {
          const { id, name, color } = item;
          const { wins, time } = winners.reduce(
            (acc, data) => {
              if (data.id === id) {
                acc.wins += data.wins;
                acc.time += data.time;
              }
              return acc;
            },
            { wins: 0, time: 0 },
          );
          return {
            id,
            name,
            color,
            wins,
            time,
          };
        });
        const count = Number(responseWinners?.meta?.response?.headers.get('X-Total-Count'));
        return { data: { result, count } };
      },
      providesTags: [WINNER_TAG],
    }),
    getWinner: builder.query<WinnerDTO, number>({
      query: (id: number) => ({
        url: `/winners/${id}`,
      }),
      providesTags: [WINNER_TAG],
    }),
    createWinner: builder.mutation({
      query: (winner: WinnerDTO) => ({
        url: '/winners',
        method: 'POST',
        body: { id: winner.id, wins: winner.wins, time: winner.time },
        prepareHeaders: (headers: Headers) => {
          headers.set('Content-Type', 'application/json');
          return headers;
        },
      }),
      invalidatesTags: [WINNER_TAG],
    }),
    updateWinner: builder.mutation({
      query: (item: WinnerDTO) => ({
        url: `/winners/${item.id}`,
        method: 'PUT',
        body: { wins: item.wins, time: item.time },
        prepareHeaders: (headers: Headers) => {
          headers.set('Content-Type', 'application/json');
          return headers;
        },
      }),
      invalidatesTags: [WINNER_TAG],
    }),
    deleteWinner: builder.mutation({
      query: (id) => ({
        url: `/winners/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [WINNER_TAG],
    }),
  }),
});
export const {
  useGetAllWinnersQuery,
  useGetWinnerQuery,
  useUpdateWinnerMutation,
  useDeleteWinnerMutation,
  useCreateWinnerMutation,
} = winnerApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { WINNER_TAG } from '../../../shared/lib/types';
import { baseUrl, limitWinnersPerPage } from '../../../shared/lib/const';
import { Order, Sort, Winner } from '../model/types';

const winnerApi = createApi({
  tagTypes: [WINNER_TAG],
  reducerPath: 'winnerApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllWinners: builder.query({
      query: (
        page: number = 1,
        limit: number = limitWinnersPerPage,
        sort: Sort | null = null,
        order: Order | null = null,
      ) => ({
        url: '/winners',
        params: {
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
        },
      }),
      transformResponse: (result: Partial<Winner>[], meta) => {
        const count = Number(meta?.response?.headers.get('X-Total-Count'));
        return { result, count };
      },
      providesTags: [WINNER_TAG],
    }),
    getWinner: builder.query({
      query: (id: number) => ({
        url: `/winners/${id}`,
      }),
      providesTags: [WINNER_TAG],
    }),
    createWinner: builder.mutation({
      query: (winner: Partial<Winner>) => ({
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
      query: (item: Partial<Winner>) => ({
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
export default winnerApi;

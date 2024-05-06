import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BacktestConfig } from '../interface/myConfig.ts';

export const backTestApi = createApi({
    reducerPath : 'backTestApi',
    baseQuery: fetchBaseQuery({baseUrl:'http://127.0.0.1:5000'}),
    tagTypes:['all'],
    endpoints: (builder) => ({
        postConfig: builder.mutation<any, Partial<BacktestConfig>>({
            query: (config) => ({
                url: '/back-test/all',
                method: 'POST',
                body: config,
            }),
            invalidatesTags: ['all'],
        }),
})
})
export const { usePostConfigMutation} = backTestApi;
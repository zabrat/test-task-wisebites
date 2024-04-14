import { createApi } from "@reduxjs/toolkit/query/react";
import axiosInstance from "./forbiddenWordsMock";

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({
    url,
    method,
    data,
  }: {
    url: string;
    method: string;
    data?: any;
  }) => {
    try {
      const result = await axiosInstance({ url: baseUrl + url, method, data });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getForbiddenWords: builder.mutation<{ forbiddenWords: string[] }, string>({
      query: (text) => ({
        url: "forbidden-words",
        method: "POST",
        data: { text },
      }),
    }),
  }),
});

export const { useGetForbiddenWordsMutation } = api;

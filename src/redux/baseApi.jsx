import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const whatsAppApi = createApi({
  reducerPath: "whatsAppApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.greenapi.com/",
  }),

  endpoints: (builder) => ({
    getSettings: builder.query({
      query: ({ idInstance, apiTokenInstance }) =>
        `waInstance${idInstance}/getSettings/${apiTokenInstance}`,
    }),
    sendMessage: builder.mutation({
      query: ({ idInstance, apiTokenInstance, reciever, message }) => ({
        url: `waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        method: "POST",
        body: { chatId: `${reciever}@c.us`, message: message },
      }),
    }),
    recieveNotification: builder.query({
      query: ({ idInstance, apiTokenInstance }) => ({
        url: `waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
      }),
    }),
    deleteNotification: builder.mutation({
      query: ({ idInstance, apiTokenInstance, receiptId }) => ({
        url: `waInstance${idInstance}/deleteNotification/${apiTokenInstance}`,
        method: "DELETE",
        body: { receiptId: receiptId },
      }),
    }),
  }),
});

export const {
  useGetSettingsQuery,
  useSendMessageMutation,
  useRecieveNotificationQuery,
  useDeleteNotificationMutation,
} = whatsAppApi;

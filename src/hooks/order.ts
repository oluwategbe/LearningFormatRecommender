import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axios-Instance";
import { getLoginToken } from "../storage";
import { queryKeys } from "../react-query/constants";
import { errorAlert, successAlert } from "../utils";

const SERVER_ERROR = "There was an error contacting the server.";

const getOrder = async () => {
  const data = await axiosInstance({
    url: `/order`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`
    },
  });
  return data?.data;
};

async function createOrder(formData: any) {
  const data = await axiosInstance({
    url: `/order`,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data;
}

async function editOrder(formData: any) {
  const data = await axiosInstance({
    url: `/order/${formData["_id"]}`,
    method: "PATCH",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data;
}

async function deleteOrder(id: number) {
  const data = await axiosInstance({
    url: `/order/${id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data;
}

export function useGetOrder() {
  const fallback: Array<any> = [];
  const {
    data = fallback,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [queryKeys.order],
    queryFn: () => getOrder(),
    onError: (error: any) => {
      const err = error?.response?.data?.responseMessage
        ? error?.response?.data?.responseMessage
        : SERVER_ERROR;
      errorAlert(err);
    },
  });
  return { isSuccess, isLoading, data, isError,
    error, };
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (formData) => createOrder(formData),
    onSuccess: () => {
      successAlert("Order created successfully");
      queryClient.invalidateQueries([queryKeys.order]);
    },
    onError: (err) => {
      errorAlert(err);
    },
  });
  return { mutate, isSuccess, isError, error, reset };
}

export function useEditOrder() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (formData) => editOrder(formData),
    onSuccess: () => {
      successAlert("Order edited successfully");
      queryClient.invalidateQueries([queryKeys.order]);
    },
    onError: (err) => {
      errorAlert(err);
    },
  });
  return { mutate, isSuccess, isError, error, reset };
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (id: number) => deleteOrder(id),
    onSuccess: () => {
      successAlert("Order deleted successfully");
      queryClient.invalidateQueries([queryKeys.order]);
    },
    onError: (err) => {
      errorAlert(err);
    },
  });
  return { mutate, isSuccess, isError, error, reset };
}
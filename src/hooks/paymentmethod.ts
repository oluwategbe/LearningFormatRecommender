import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axios-Instance";
import { getLoginToken } from "../storage";
import { queryKeys } from "../react-query/constants";
import { errorAlert, successAlert } from "../utils";

const SERVER_ERROR = "There was an error contacting the server.";

const getPaymentMethod = async () => {
  const data = await axiosInstance({
    url: `/paymentmethod`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`
    },
  });
  return data?.data;
};

async function createPaymentMethod(formData: any) {
  const data = await axiosInstance({
    url: `/paymentmethod`,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data;
}

async function editPaymentMethod(formData: any) {
  const data = await axiosInstance({
    url: `/paymentmethod/${formData["_id"]}`,
    method: "PATCH",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data;
}

async function deletePaymentMethod(id: number) {
  const data = await axiosInstance({
    url: `/paymentmethod/${id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data;
}

export function useGetPaymentMethod() {
  const fallback: Array<any> = [];
  const {
    data = fallback,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [queryKeys.paymentmethod],
    queryFn: () => getPaymentMethod(),
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

export function useCreatePaymentMethod() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (formData) => createPaymentMethod(formData),
    onSuccess: () => {
      successAlert("Payment Method created successfully");
      queryClient.invalidateQueries([queryKeys.paymentmethod]);
    },
    onError: (err) => {
      errorAlert(err);
    },
  });
  return { mutate, isSuccess, isError, error, reset };
}

export function useEditPaymentMethod() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (formData) => editPaymentMethod(formData),
    onSuccess: () => {
      successAlert("Payment Method edited successfully");
      queryClient.invalidateQueries([queryKeys.paymentmethod]);
    },
    onError: (err) => {
      errorAlert(err);
    },
  });
  return { mutate, isSuccess, isError, error, reset };
}

export function useDeletePaymentMethod() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (id: number) => deletePaymentMethod(id),
    onSuccess: () => {
      successAlert("Payment Method deleted successfully");
      queryClient.invalidateQueries([queryKeys.paymentmethod]);
    },
    onError: (err) => {
      errorAlert(err);
    },
  });
  return { mutate, isSuccess, isError, error, reset };
}
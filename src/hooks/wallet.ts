import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axios-Instance";
import { getLoginToken } from "../storage";
import { queryKeys } from "../react-query/constants";
import { errorAlert, successAlert } from "../utils";

const SERVER_ERROR = "There was an error contacting the server.";

const getWallet = async () => {
  const data = await axiosInstance({
    url: `/wallet`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`
    },
  });
  return data?.data;
};

async function createWallet(formData: any) {
  const data = await axiosInstance({
    url: `/wallet`,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data;
}

async function editWallet(formData: any) {
  const data = await axiosInstance({
    url: `/wallet/${formData["_id"]}`,
    method: "PATCH",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data;
}

async function deleteWallet(id: number) {
  const data = await axiosInstance({
    url: `/wallet/${id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data;
}

export function useGetWallet() {
  const fallback: Array<any> = [];
  const {
    data = fallback,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [queryKeys.wallet],
    queryFn: () => getWallet(),
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

export function useCreateWallet() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (formData) => createWallet(formData),
    onSuccess: () => {
      successAlert("Wallet created successfully");
      queryClient.invalidateQueries([queryKeys.wallet]);
    },
    onError: (err) => {
      errorAlert(err);
    },
  });
  return { mutate, isSuccess, isError, error, reset };
}

export function useEditWallet() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (formData) => editWallet(formData),
    onSuccess: () => {
      successAlert("Wallet edited successfully");
      queryClient.invalidateQueries([queryKeys.wallet]);
    },
    onError: (err) => {
      errorAlert(err);
    },
  });
  return { mutate, isSuccess, isError, error, reset };
}

export function useDeleteWallet() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (id: number) => deleteWallet(id),
    onSuccess: () => {
      successAlert("Wallet deleted successfully");
      queryClient.invalidateQueries([queryKeys.wallet]);
    },
    onError: (err) => {
      errorAlert(err);
    },
  });
  return { mutate, isSuccess, isError, error, reset };
}
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axios-Instance";
import { getLoginToken } from "../storage";
import { queryKeys } from "../react-query/constants";
import { errorAlert, successAlert } from "../utils";

const SERVER_ERROR = "There was an error contacting the server.";

const getAddress = async () => {
  const data = await axiosInstance({
    url: `/address`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`
    },
  });
  return data?.data;
};

async function createAddress(formData: any) {
  const data = await axiosInstance({
    url: `/address`,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data;
}

async function editAddress(formData: any) {
  const data = await axiosInstance({
    url: `/address/${formData["_id"]}`,
    method: "PATCH",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data;
}

async function deleteAddress(id: number) {
  const data = await axiosInstance({
    url: `/address/${id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data;
}

export function useGetAddress() {
  const fallback: Array<any> = [];
  const {
    data = fallback,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [queryKeys.address],
    queryFn: () => getAddress(),
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

export function useCreateAddress() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (formData) => createAddress(formData),
    onSuccess: () => {
      successAlert("Address created successfully");
      queryClient.invalidateQueries([queryKeys.address]);
    },
    onError: (err) => {
      errorAlert(err);
    },
  });
  return { mutate, isSuccess, isError, error, reset };
}

export function useEditAddress() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (formData) => editAddress(formData),
    onSuccess: () => {
      successAlert("Address edited successfully");
      queryClient.invalidateQueries([queryKeys.address]);
    },
    onError: (err) => {
      errorAlert(err);
    },
  });
  return { mutate, isSuccess, isError, error, reset };
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (id: number) => deleteAddress(id),
    onSuccess: () => {
      successAlert("Address deleted successfully");
      queryClient.invalidateQueries([queryKeys.address]);
    },
    onError: (err) => {
      errorAlert(err);
    },
  });
  return { mutate, isSuccess, isError, error, reset };
}
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axios-Instance";
import { getLoginToken } from "../storage";
import { queryKeys } from "../react-query/constants";
import { errorAlert, successAlert } from "../utils";

const SERVER_ERROR = "There was an error contacting the server.";

const getProfile = async () => {
  const data = await axiosInstance({
    url: `/auth/me`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`
    },
  });
  return data?.data;
};

async function editProfile(formData: any) {
  const data = await axiosInstance({
    url: `/auth/${formData["Id"]}`,
    method: "PUT",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data;
}
async function changePassword(formData: any) {
  const data = await axiosInstance({
    url: `/auth/password/update`,
    method: "PUT",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data;
}

async function deleteProfile(id: number) {
  const data = await axiosInstance({
    url: `/profile/${id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data;
}

export function useGetProfile() {
  const fallback: Array<any> = [];
  const {
    data = fallback,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [queryKeys.user],
    queryFn: () => getProfile(),
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

export function useEditProfile() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (formData) => editProfile(formData),
    onSuccess: () => {
      // successAlert("Profile edited successfully");
      queryClient.invalidateQueries([queryKeys.user]);
    },
    onError: (err) => {
      errorAlert(err);
    },
  });
  return { mutate, isSuccess, isError, error, reset };
}
export function useChangePassword() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (formData) => changePassword(formData),
    onSuccess: () => {
      // successAlert("Profile edited successfully");
      queryClient.invalidateQueries([queryKeys.user]);
    },
    onError: (err) => {
      errorAlert(err);
    },
  });
  return { mutate, isSuccess, isError, error, reset };
}

export function useDeleteProfile() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (id: number) => deleteProfile(id),
    onSuccess: () => {
      successAlert("Profile deleted successfully");
      queryClient.invalidateQueries([queryKeys.user]);
    },
    onError: (err) => {
      errorAlert(err);
    },
  });
  return { mutate, isSuccess, isError, error, reset };
}
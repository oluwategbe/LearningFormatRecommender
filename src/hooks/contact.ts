import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axios-Instance";
import { getLoginToken } from "../storage";
import { queryKeys } from "../react-query/constants";
import { errorAlert, successAlert } from "../utils";

async function createContact(formData: any) {
  const data = await axiosInstance({
    url: `/contact`,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data;
}


export function useCreateContact() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (formData) => createContact(formData),
    onSuccess: () => {
      successAlert("Message sent successfully");
      queryClient.invalidateQueries([queryKeys.contact]);
    },
    onError: (err) => {
      errorAlert(err);
    },
  });
  return { mutate, isSuccess, isError, error, reset };
}
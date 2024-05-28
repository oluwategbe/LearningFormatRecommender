import { axiosInstance } from "../../axios-Instance";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils";
import { useContext } from "react";
import { AuthContext } from "../../context";
import { setLoginToken } from "../../storage";
import { useMutation } from "@tanstack/react-query";

const SERVER_ERROR = "There was an error contacting the server.";

async function userLogin(formData) {
  const data = await axiosInstance({
    url: "/auth/login",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data?.data;
}
async function userRegister(formData) {
  try {
    const response = await axiosInstance({
      url: "/auth/register",
      method: "POST",
      data: formData,
    });

    return response.data;
  } catch (error) {
    console.error("Error occurred during user registration:", error);
    throw error;
  }
}

export function useLogin() {
  const authCtx = useContext(AuthContext);
  const { mutate, isError, error, isSuccess, reset } = useMutation({
    mutationFn: (formData) => userLogin(formData),
    onSuccess: (data) => {
      setLoginToken(data.token);
      authCtx.authenticate(data.token);
    },
    onError: (error) => {
      const err = error?.response?.data?.error
        ? error?.response?.data?.error
        : SERVER_ERROR;
      toast.error(err, toastOptions);
    },
  });
  return { mutate, isError, error, isSuccess, reset };
}

export function useRegister() {
  const { mutate, isError, error, isSuccess, reset } = useMutation({
    mutationFn: (formData) => userRegister(formData),

    onError: (error) => {
      const err = error?.response?.data?.error
        ? error?.response?.data?.error
        : SERVER_ERROR;
      toast.error(err, toastOptions);
    },
  });
  return { mutate, isError, error, isSuccess, reset };
}

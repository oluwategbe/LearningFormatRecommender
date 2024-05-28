import { axiosInstance } from "../../axios-Instance";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils";
import { useContext } from "react";
import { AuthContext } from "../../context";
import { setLoginToken } from "../../storage";
import { useMutation } from "@tanstack/react-query";
import { LoginProps, RegisterProps } from "../../interface";
import { useAlert } from "../../context/AlertContext";

const SERVER_ERROR = "There was an error contacting the server.";

async function userLogin(formData: LoginProps) {
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
async function userRegister(formData: RegisterProps) {
  try {
    const response = await axiosInstance({
      url: "/auth/",
      method: "POST",
      data: {
        ...formData,
        role: "Supplier",
        requireApproval: true,
        status: "InActive",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error occurred during user registration:", error);
    throw error;
  }
}

export function useLogin() {
  const authCtx = useContext(AuthContext);
  const { showAlert } = useAlert();
  const { mutate, isError, error, isSuccess, reset } = useMutation({
    mutationFn: (formData) => userLogin(formData as any),
    onSuccess: (data) => {
      setLoginToken(data.token);
      authCtx.authenticate(data.token);
    },
    onError: (error: any) => {
      const err = error?.response?.data?.error
        ? error?.response?.data?.error
        : SERVER_ERROR;
      //   toast.error(err, toastOptions);
      showAlert({
        type: "error",
        title: "Ooops",
        text: err,
      });
    },
  });
  return { mutate, isError, error, isSuccess, reset };
}

export function useRegister() {
  const { mutate, isError, error, isSuccess, reset } = useMutation({
    mutationFn: (formData) => userRegister(formData as any),

    onError: (error: any) => {
      const err = error?.response?.data?.error
        ? error?.response?.data?.error
        : SERVER_ERROR;
      toast.error(err, toastOptions);
    },
  });
  return { mutate, isError, error, isSuccess, reset };
}

import { useLogin, useRegister } from "./auth";
import {
  useCreateInbox,
  useDeleteInbox,
  useEditInbox,
  useGetInbox,
} from "./inbox";

export const hooks = {
  useLogin,
  useRegister,
  useCreateInbox,
  useEditInbox,
  useGetInbox,
  useDeleteInbox,
};

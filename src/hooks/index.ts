import { useLogin, useRegister } from "./auth";
import { useCreateInbox, useDeleteInbox, useEditInbox, useGetInbox } from "./inbox";
import { useChangePassword, useEditProfile, useGetProfile } from "./profile";

export const hooks = {
  useLogin,
  useRegister,
  useCreateInbox,
  useEditInbox,
  useGetInbox,
  useDeleteInbox,
  useEditProfile,
  useGetProfile,
  useChangePassword
};

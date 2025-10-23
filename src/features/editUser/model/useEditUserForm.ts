import { useForm } from "@mantine/form";
import type { User } from "../../../shared/types/user";

export const useEditUserForm = (user: User) => {
  return useForm({
    initialValues: {
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
    },
    validate: {
      first_name: (value) => (value.trim().length === 0 ? "Имя обязательно" : null),
      last_name: (value) => (value.trim().length === 0 ? "Фамилия обязательна" : null),
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Введите корректный email"),
    },
  });
};

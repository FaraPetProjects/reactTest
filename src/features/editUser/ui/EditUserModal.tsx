import { Modal, TextInput, Button, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../../../shared";
import { useUserByIdQuery } from "../../../shared";
import { useEditUserForm } from "../model/useEditUserForm";
import type { User } from "../../../shared/types/user";

interface EditUserModalProps {
  opened: boolean;
  onClose: () => void;
  userId: string;
}

export const EditUserModal = ({ opened, onClose, userId }: EditUserModalProps) => {
  const { data: user } = useUserByIdQuery(userId);
  const queryClient = useQueryClient();

  const form = useEditUserForm(
    user ?? { id: 0, first_name: "", last_name: "", email: "", avatar: "" }
  );

  const mutation = useMutation({
    mutationFn: (values: typeof form.values) => usersApi.updateUser(String(userId), values),

    onSuccess: (_, newValues) => {
      queryClient.setQueryData(["user", String(userId)], (oldUser: User | undefined) =>
        oldUser
          ? { ...oldUser, ...newValues }
          : { id: Number(userId), avatar: user?.avatar ?? "", ...newValues }
      );

      notifications.show({
        title: "Успех",
        message: "Данные успешно обновлены!",
        color: "green",
      });

      onClose();
    },

    onError: () => {
      notifications.show({
        title: "Ошибка",
        message: "Не удалось обновить данные пользователя",
        color: "red",
      });
    },
  });

  if (!user) return null;

  return (
    <Modal opened={opened} onClose={onClose} title="Редактирование пользователя" centered>
      <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
        <TextInput
          label="Имя"
          placeholder="Введите имя"
          {...form.getInputProps("first_name")}
          required
        />
        <TextInput
          mt="sm"
          label="Фамилия"
          placeholder="Введите фамилию"
          {...form.getInputProps("last_name")}
          required
        />
        <TextInput
          mt="sm"
          label="Email"
          placeholder="Введите email"
          {...form.getInputProps("email")}
          required
        />

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onClose}>
            Отмена
          </Button>
          <Button type="submit" color="blue" loading={mutation.isPending}>
            Сохранить
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

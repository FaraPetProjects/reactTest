import { useParams, Link } from "react-router-dom";
import { useUserByIdQuery } from "../../shared";
import { Button, Loader } from "@mantine/core";
import { EditUserModal } from "../../features/editUser";
import { useState } from "react";
import styles from "./UserDetailsPage.module.css";

export const UserDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, isError } = useUserByIdQuery(String(id));
  const [opened, setOpened] = useState(false);

  if (isLoading)
    return (
      <div className={styles.center}>
        <Loader color="blue" />
      </div>
    );

  if (isError || !user)
    return <p className={styles.center}>Не удалось загрузить пользователя 😢</p>;

  return (
    <div className={styles.page}>
      <Link to="/users" className={styles.back}>
        ← Назад к списку
      </Link>

      <div className={styles.card}>
        <img src={user.avatar} alt={user.first_name} />
        <div>
          <h2>
            {user.first_name} {user.last_name}
          </h2>
          <p>Email: {user.email}</p>
          <p>ID: {user.id}</p>
          <Button mt="md" color="blue" onClick={() => setOpened(true)}>
            Редактировать
          </Button>
        </div>
      </div>

      <EditUserModal opened={opened} onClose={() => setOpened(false)} userId={String(id)} />
    </div>
  );
};

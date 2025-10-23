import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUsersQuery } from "../../shared";
import styles from "./UsersListPage.module.css";

export const UsersListPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useUsersQuery(page);
  const navigate = useNavigate();

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Не получилось загрузить</p>;

  return (
    <div className={styles.page}>
      <h1>Users List</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((user) => (
            <tr key={user.id} className={styles.row} onClick={() => navigate(`/users/${user.id}`)}>
              <td>{user.id}</td>
              <td>
                <img
                  src={user.avatar}
                  alt={user.first_name}
                  width={40}
                  height={40}
                  style={{ borderRadius: "50%" }}
                />
              </td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ← Prev
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next →</button>
      </div>
    </div>
  );
};

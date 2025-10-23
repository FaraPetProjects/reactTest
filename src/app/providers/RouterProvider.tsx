import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UsersListPage, UserDetailsPage } from "../../pages";

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<UsersListPage />} />
        <Route path="/users/:id" element={<UserDetailsPage />} />
        <Route path="*" element={<div>404 — Страница не найдена</div>} />
      </Routes>
    </BrowserRouter>
  );
};

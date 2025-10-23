import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryProvider } from "./providers/QueryProvider";
import { RouterProvider } from "./providers/RouterProvider";

export const App = () => {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Notifications />
      <QueryProvider>
        <RouterProvider />
      </QueryProvider>
    </MantineProvider>
  );
};

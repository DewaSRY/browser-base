import { PropsWithChildren } from "react";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <MantineProvider theme={theme}>
        {/* Your app here */}
        {children}
      </MantineProvider>
    </>
  );
}

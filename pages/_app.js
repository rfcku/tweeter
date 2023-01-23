import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
const lightTheme = createTheme({
  type: "light",
});

import { SSRProvider } from "@react-aria/ssr";

const darkTheme = createTheme({
  type: "dark",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SSRProvider>
      <SessionProvider session={session}>
        <NextThemesProvider
          defaultTheme="system"
          attribute="class"
          value={{
            light: lightTheme.className,
            dark: darkTheme.className,
          }}
        >
          <NextUIProvider>
            <Component {...pageProps} />
          </NextUIProvider>
        </NextThemesProvider>
      </SessionProvider>
    </SSRProvider>
  );
}

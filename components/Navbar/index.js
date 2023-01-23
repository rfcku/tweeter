import { useTheme as useNextTheme } from "next-themes";
import Link from "next/link";
import { Switch, useTheme, Navbar } from "@nextui-org/react";

export default function Component() {
  const { isDark } = useTheme();
  const { setTheme } = useNextTheme();

  const handleThemeChange = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Navbar shouldHideOnScroll isBordered={isDark} variant="sticky">
      <Navbar.Brand>
        <Link href="/">Sweetweet</Link>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="underline">
        <Navbar.Item>
          <Link href="/features">Features</Link>
        </Navbar.Item>
        <Navbar.Item>
          <Link href="/pricing">Pricing</Link>
        </Navbar.Item>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item color="inherit">Login</Navbar.Item>
        <Navbar.Item>
          <Switch checked={isDark} onChange={handleThemeChange} />
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}

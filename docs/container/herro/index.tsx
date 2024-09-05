import { Container, Text, Button, Group } from "@mantine/core";
import classes from "./HeroTitle.module.css";

export default function HeroTitle() {
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          A{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            Tool for save data ofline on browser
          </Text>{" "}
        </h1>

        <Text className={classes.description} color="dimmed">
          BrowserBase is a TypeScript-based tool designed to work with offline
          data in the browser. It provides an easy-to-use interface for storing
          and managing data in the browser's IndexedDB database, making it
          simple to handle offline storage efficiently.
        </Text>

        <Group className={classes.controls}>
          <Button
            component="a"
            size="xl"
            href="/docs"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
          >
            Read Docs
          </Button>

          <Button
            component="a"
            href="https://github.com/mantinedev/mantine"
            size="xl"
            variant="default"
            className={classes.control}
          >
            About Me (Dewa surya Ariesta)
          </Button>
        </Group>
      </Container>
    </div>
  );
}

// emails/layout.tsx
import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Tailwind,
  Body,
  Container,
  Text,
} from "@react-email/components";

export function EmailLayout({
  preview,
  children,
}: {
  preview?: string;
  children: React.ReactNode;
}) {
  return (
    <Html>
      <Head />
      {preview ? <Preview>{preview}</Preview> : null}
      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            {children}
            <Text style={footer}>
              RidePlus — Please don’t reply to this automated email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};
const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};
const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px",
};

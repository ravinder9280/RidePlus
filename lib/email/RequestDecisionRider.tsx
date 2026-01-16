// emails/RequestDecisionRider.tsx
import * as React from "react";
import { Button, Hr, Link, Section, Text } from "@react-email/components";
import { EmailLayout } from "./layout";

export function RequestDecisionRiderEmail(props: {
  riderName?: string | null;
  status: "ACCEPTED" | "DECLINED" | "CANCELLED";
  rideUrl: string;
}) {
  const { riderName, status, rideUrl } = props;
  const positive = status === "ACCEPTED";

  return (
    <EmailLayout
      preview={
        positive
          ? "Your request was accepted"
          : status === "DECLINED"
            ? "Your request was declined"
            : "Your request was cancelled"
      }
    >
      <Text style={title}>
        <strong>{riderName ?? ""}</strong>,{" "}
        {positive ? "Good news! 🎉" : "Update on your request"}
      </Text>

      <Section style={section}>
        <Text style={text}>
          Hey <strong>{riderName ?? "there"}</strong>, your ride request was{" "}
          <b className={positive ? "text-green-600" : "text-red-600"}>
            {status.toLowerCase()}
          </b>
          .
        </Text>

        <Button
          href={rideUrl}
          className="rounded-md bg-primary px-4 py-3 text-sm text-white no-underline"
        >
          Open ride
        </Button>
      </Section>

      <Hr className="my-6" />
      <Text className="text-sm">
        Or open this link: <Link href={rideUrl}>{rideUrl}</Link>
      </Text>
    </EmailLayout>
  );
}
const title = {
  fontSize: "24px",
  lineHeight: 1.25,
};
const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center" as const,
};
const text = {
  margin: "0 0 10px 0",
  textAlign: "left" as const,
};

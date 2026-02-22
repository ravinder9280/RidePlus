import * as React from "react";
import {
  Button,
  Heading,
  Hr,
  Link,
  Section,
  Text,
} from "@react-email/components";
import { EmailLayout } from "./layout";

export function NewRequestOwnerEmail(props: {
  ownerName?: string | null;
  riderName?: string | null;
  seats: number;
  rideUrl: string;
}) {
  const { ownerName, riderName, seats, rideUrl } = props;

  return (
    <EmailLayout preview="New ride request on your RidePlus trip">
      <Heading as="h2" className="text-xl font-semibold">
        New ride request
      </Heading>

      <Text className="mt-2">
        Hi {ownerName ?? "there"}, <b>{riderName ?? "A rider"}</b> requested{" "}
        <b>{seats}</b> seat{seats > 1 ? "s" : ""} on your ride.
      </Text>

      <Section className="mt-6">
        <Button
          href={rideUrl}
          className="rounded-md bg-primary px-4 py-3 text-sm text-white no-underline"
        >
          Review requests
        </Button>
      </Section>

      <Hr className="my-6" />
      <Text className="text-sm">
        Or open this link: <Link href={rideUrl}>{rideUrl}</Link>
      </Text>
    </EmailLayout>
  );
}

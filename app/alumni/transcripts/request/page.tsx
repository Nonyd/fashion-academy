import type { Metadata } from "next";
import {
  transcriptDelivery,
  transcriptProcessingFee,
  programmeOptions,
  purposeOptions,
} from "@/lib/data/alumni";
import Breadcrumb from "@/components/about/Breadcrumb";
import { TranscriptRequestForm } from "./TranscriptRequestForm";

export const metadata: Metadata = {
  title: "Transcript Request Form | Alumni | Prudential Fashion Academy",
  description: "Submit your official PFA transcript request.",
};

const deliveryOptions = transcriptDelivery.map((d) => d.method);

export default function TranscriptRequestPage() {
  return (
    <>
      <section
        className="relative flex min-h-[40vh] flex-col justify-end border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 pb-16 pt-28 lg:px-10 lg:pb-20 lg:pt-36"
        aria-labelledby="form-title"
      >
        <div className="mx-auto w-full max-w-6xl">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Alumni", href: "/alumni" },
              { label: "Transcript", href: "/alumni/transcript" },
              { label: "Request" },
            ]}
          />
          <h1
            id="form-title"
            className="mt-4 text-4xl uppercase leading-[1.1] text-[var(--color-ivory)] sm:text-5xl md:text-6xl"
          >
            Transcript Request Form
          </h1>
        </div>
      </section>

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-label="Request form"
      >
        <div className="mx-auto max-w-2xl">
          <TranscriptRequestForm
            processingFee={transcriptProcessingFee}
            deliveryOptions={deliveryOptions}
            programmeOptions={programmeOptions}
            purposeOptions={purposeOptions}
          />
        </div>
      </section>
    </>
  );
}

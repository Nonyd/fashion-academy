import type { Metadata } from "next";
import Link from "next/link";
import { transcriptDelivery, transcriptProcessingFee } from "@/lib/data/alumni";
import Breadcrumb from "@/components/about/Breadcrumb";

export const metadata: Metadata = {
  title: "Transcript Request | Alumni | Prudential Fashion Academy",
  description:
    "Request your official PFA academic transcript or certificate copy.",
};

export default function TranscriptInfoPage() {
  return (
    <>
      <section
        className="relative flex min-h-[40vh] flex-col justify-end border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 pb-16 pt-28 lg:px-10 lg:pb-20 lg:pt-36"
        aria-labelledby="transcript-title"
      >
        <div className="mx-auto w-full max-w-6xl">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Alumni", href: "/alumni" },
              { label: "Transcript" },
            ]}
          />
          <h1
            id="transcript-title"
            className="mt-4 text-4xl uppercase leading-[1.1] text-[var(--color-ivory)] sm:text-5xl md:text-6xl"
          >
            Transcript Request
          </h1>
          <p className="mt-4 text-lg text-[var(--color-ivory)]/80">
            Request your official PFA academic record.
          </p>
        </div>
      </section>

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="what-is-title"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="what-is-title"
            className="text-2xl uppercase leading-tight text-[var(--color-ivory)] sm:text-3xl"
          >
            What is an official transcript?
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--color-ivory)]/80">
            An official transcript is a certified record of your academic history at
            Prudential Fashion Academy, including courses completed, grades, and
            degree or certificate awarded. It carries the official PFA seal and is
            accepted by employers, institutions, and licensing bodies.
          </p>
        </div>
      </section>

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="who-can-title"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="who-can-title"
            className="text-2xl uppercase leading-tight text-[var(--color-ivory)] sm:text-3xl"
          >
            Who can request?
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--color-ivory)]/80">
            PFA alumni and former students may request a transcript. You will need
            your PFA REG number and graduation (or last attended) year to verify
            your identity.
          </p>
        </div>
      </section>

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="how-it-works-title"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="how-it-works-title"
            className="text-2xl uppercase leading-tight text-[var(--color-ivory)] sm:text-3xl"
          >
            How it works
          </h2>
          <ol className="mt-8 list-decimal space-y-6 pl-6 text-sm leading-relaxed text-[var(--color-ivory)]/80">
            <li>Submit the transcript request form online.</li>
            <li>Verify your identity with your PFA REG number and graduation year.</li>
            <li>Pay the processing fee.</li>
            <li>Receive confirmation and track your request status.</li>
            <li>Your transcript is processed and delivered via your chosen method.</li>
          </ol>
        </div>
      </section>

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="delivery-title"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="delivery-title"
            className="text-2xl uppercase leading-tight text-[var(--color-ivory)] sm:text-3xl"
          >
            Delivery options
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[400px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/15">
                  <th className="py-3 pr-4 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
                    Method
                  </th>
                  <th className="py-3 pr-4 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
                    Timeframe
                  </th>
                  <th className="py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
                    Fee
                  </th>
                </tr>
              </thead>
              <tbody className="text-[var(--color-ivory)]/90">
                {transcriptDelivery.map((row, i) => (
                  <tr key={i} className="border-b border-white/10">
                    <td className="py-4 pr-4">{row.method}</td>
                    <td className="py-4 pr-4">{row.timeframe}</td>
                    <td className="py-4">{row.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="fee-title"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="fee-title"
            className="text-2xl uppercase leading-tight text-[var(--color-ivory)] sm:text-3xl"
          >
            Processing fee
          </h2>
          <div className="mt-6 rounded-2xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 p-6 max-w-2xl">
            <p className="text-sm font-semibold text-[var(--color-ivory)]">
              Base processing fee per transcript: ₦{transcriptProcessingFee.toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="notes-title"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="notes-title"
            className="text-2xl uppercase leading-tight text-[var(--color-ivory)] sm:text-3xl"
          >
            Important notes
          </h2>
          <ul className="mt-8 list-disc space-y-3 pl-6 text-sm leading-relaxed text-[var(--color-ivory)]/80">
            <li>Allow enough time before your deadline.</li>
            <li>Ensure your PFA REG number is correct.</li>
            <li>Transcripts are issued in English; multiple copies are available.</li>
            <li>Transcripts carry the official PFA seal.</li>
          </ul>
        </div>
      </section>

      <section className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/alumni/transcripts/request"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-noir)] transition-colors hover:bg-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          >
            Request a Transcript
          </Link>
        </div>
      </section>
    </>
  );
}

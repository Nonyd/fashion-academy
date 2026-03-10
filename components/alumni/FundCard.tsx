import Link from "next/link";
import type { GivingFund } from "@/lib/data/alumni";
import ProgressBar from "./ProgressBar";

type Props = { fund: GivingFund };

function formatMoney(n: number): string {
  return "₦" + n.toLocaleString();
}

export default function FundCard({ fund }: Props) {
  const percent = Math.min(100, (fund.raised / fund.goal) * 100);

  return (
    <article className="flex flex-col rounded-2xl border border-white/10 bg-[var(--color-charcoal)]/80 p-6 transition-colors hover:border-[var(--color-gold)]/30">
      <h3 className="text-lg font-semibold text-[var(--color-ivory)]">{fund.name}</h3>
      <p className="mt-3 text-sm text-[var(--color-ivory)]/70">{fund.description}</p>
      <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
        {fund.donors} donors
      </p>
      <div className="mt-3">
        <ProgressBar percent={percent} />
        <p className="mt-2 text-xs text-[var(--color-ivory)]/80">
          {formatMoney(fund.raised)} / {formatMoney(fund.goal)}
        </p>
      </div>
      <Link
        href={`/alumni/give/${fund.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
      >
        Give to this Fund
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

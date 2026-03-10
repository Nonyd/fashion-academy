import type { RecentDonor } from "@/lib/data/alumni";

type Props = { donors: RecentDonor[]; title?: string };

export default function DonorFeed({ donors, title = "Recent Donors" }: Props) {
  return (
    <div>
      {title ? (
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-ivory)]">
          {title}
        </h3>
      ) : null}
      <ul className={title ? "mt-4 space-y-2" : "space-y-2"}>
        {donors.map((d, i) => (
          <li
            key={i}
            className="flex flex-wrap items-baseline gap-2 text-sm text-[var(--color-ivory)]/80"
          >
            <span className="font-medium text-[var(--color-ivory)]">{d.name}</span>
            {d.classYear && (
              <span className="text-[var(--color-muted)]">· Class of {d.classYear}</span>
            )}
            <span className="text-[var(--color-gold)]">{d.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

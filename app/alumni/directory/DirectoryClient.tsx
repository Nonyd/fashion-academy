"use client";

import { useState, useMemo } from "react";
import type { AlumniDirectoryEntry } from "@/lib/data/alumni";

type Props = { initialAlumni: AlumniDirectoryEntry[] };

export function DirectoryClient({ initialAlumni }: Props) {
  const [search, setSearch] = useState("");
  const [programme, setProgramme] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");

  const filtered = useMemo(() => {
    return initialAlumni.filter((a) => {
      const matchSearch =
        !search ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.company.toLowerCase().includes(search.toLowerCase()) ||
        a.city.toLowerCase().includes(search.toLowerCase()) ||
        a.country.toLowerCase().includes(search.toLowerCase());
      const matchProgramme = !programme || a.programme === programme;
      const matchYear = !year || a.classYear === year;
      const matchCountry = !country || a.country === country;
      return matchSearch && matchProgramme && matchYear && matchCountry;
    });
  }, [initialAlumni, search, programme, year, country]);

  const programmes = useMemo(
    () => [...new Set(initialAlumni.map((a) => a.programme))].sort(),
    [initialAlumni]
  );
  const years = useMemo(
    () => [...new Set(initialAlumni.map((a) => a.classYear))].sort((a, b) => Number(b) - Number(a)),
    [initialAlumni]
  );
  const countries = useMemo(
    () => [...new Set(initialAlumni.map((a) => a.country))].sort(),
    [initialAlumni]
  );

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-4">
        <input
          type="search"
          placeholder="Search by name, company, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="min-w-[200px] flex-1 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        />
        <select
          value={programme}
          onChange={(e) => setProgramme(e.target.value)}
          className="rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        >
          <option value="">Programme</option>
          {programmes.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        >
          <option value="">Graduation Year</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        >
          <option value="">Country</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((alum) => (
          <article
            key={alum.id}
            className="flex flex-col rounded-2xl border border-white/10 bg-[var(--color-charcoal)]/80 p-6 transition-colors hover:border-[var(--color-gold)]/30"
          >
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 shrink-0 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center text-lg font-semibold text-[var(--color-gold)]">
                {alum.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-[var(--color-ivory)]">{alum.name}</h3>
                <p className="mt-1 text-xs text-[var(--color-muted)]">
                  {alum.programme} · Class of {alum.classYear}
                </p>
                <p className="mt-2 text-sm text-[var(--color-ivory)]/80">
                  {alum.role}
                  {alum.company && `, ${alum.company}`}
                </p>
                <p className="mt-1 text-xs text-[var(--color-muted)]">
                  {alum.city}, {alum.country}
                </p>
                {alum.linkedIn && (
                  <a
                    href={alum.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)] hover:underline"
                  >
                    Connect
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-10 text-sm text-[var(--color-muted)]">
        Showing 1–{filtered.length} of 2,400+ alumni
      </p>
    </>
  );
}

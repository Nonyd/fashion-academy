"use client";

import { useState } from "react";
import PersonCard from "@/components/about/PersonCard";
import { FACULTY_INSTRUCTORS } from "@/lib/data/about";

const FILTER_TAGS = [
  "All",
  "Fashion Design",
  "Styling",
  "Business",
  "Technology",
  "Photography",
];

export default function FacultyFilterGrid() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? FACULTY_INSTRUCTORS
      : FACULTY_INSTRUCTORS.filter((f) => f.tag === filter);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTER_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setFilter(tag)}
            className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors ${
              filter === tag
                ? "border-[var(--color-gold)] bg-[var(--color-gold)]/20 text-[var(--color-gold)]"
                : "border-white/20 bg-white/5 text-[var(--color-ivory)]/80 hover:border-[var(--color-gold)]/50 hover:text-[var(--color-ivory)]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((person) => (
          <PersonCard
            key={person.id}
            person={person}
            showDepartment={false}
            showTag
            tag={person.tag}
          />
        ))}
      </div>
    </>
  );
}

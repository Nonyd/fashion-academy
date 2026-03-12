"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useManagement } from "@/context/ManagementContext";
import { StatCard } from "@/components/management/StatCard";
import { StatusBadge } from "@/components/management/StatusBadge";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  ClipboardList,
  CreditCard,
  BookOpen,
  FolderOpen,
  TrendingUp,
} from "lucide-react";

type DashboardStats = {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  pendingAdmissions: number;
  revenueThisMonth: number;
  projectsPendingReview: number;
  acceptanceRate: number;
  totalAlumni: number;
};

type DashboardData = {
  stats?: DashboardStats;
  admissionFunnel?: { stage: string; count: number }[];
  revenueByMonth?: { month: string; amount: number }[];
  recentAdmissions?: { id: string; firstName: string; lastName: string; program: string; status: string; createdAt: string }[];
  recentPayments?: { id: string; name: string; amount: number; purpose: string; status: string }[];
  systemAlerts?: { type: string; message: string; count: number }[];
};

const defaultStats: DashboardStats = {
  totalStudents: 0,
  totalTeachers: 0,
  totalCourses: 0,
  pendingAdmissions: 0,
  revenueThisMonth: 0,
  projectsPendingReview: 0,
  acceptanceRate: 0,
  totalAlumni: 0,
};

export default function ManagementDashboardPage() {
  const { apiFetch } = useManagement();
  const [data, setData] = useState<DashboardData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/management/dashboard")
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setData(d.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [apiFetch]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </motion.div>
    );
  }

  const stats = data.stats ?? defaultStats;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={stats.totalStudents ?? 0}
          icon={<Users className="w-6 h-6" />}
          color="purple"
        />
        <StatCard
          title="Total Teachers"
          value={stats.totalTeachers ?? 0}
          icon={<GraduationCap className="w-6 h-6" />}
          color="deep"
        />
        <StatCard
          title="Pending Admissions"
          value={stats.pendingAdmissions ?? 0}
          icon={<ClipboardList className="w-6 h-6" />}
          color="gold"
        />
        <StatCard
          title="Revenue This Month"
          value={stats.revenueThisMonth ?? 0}
          icon={<CreditCard className="w-6 h-6" />}
          color="green"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Courses Active"
          value={stats.totalCourses ?? 0}
          icon={<BookOpen className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="Projects Pending Review"
          value={stats.projectsPendingReview ?? 0}
          icon={<FolderOpen className="w-6 h-6" />}
          color="orange"
        />
        <StatCard
          title="Acceptance Rate"
          value={`${stats.acceptanceRate ?? 0}%`}
          icon={<TrendingUp className="w-6 h-6" />}
          color="teal"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-[#E5E1F5] p-5">
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-4">
            Recent Admissions
          </h2>
          {data.recentAdmissions?.length ? (
            <ul className="space-y-3">
              {data.recentAdmissions.slice(0, 5).map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between py-2 border-b border-[#E5E1F5] last:border-0"
                >
                  <span className="font-medium text-[#1A1A2E]">
                    {a.firstName} {a.lastName}
                  </span>
                  <span className="text-sm text-[#6B7280]">{a.program}</span>
                  <StatusBadge status={a.status} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[#6B7280]">No recent admissions</p>
          )}
          <Link
            href="/management/admissions"
            className="mt-4 inline-block text-sm font-medium text-[#7C5CBF] hover:underline"
          >
            View All →
          </Link>
        </div>
        <div className="bg-white rounded-xl border border-[#E5E1F5] p-5">
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-4">
            Recent Payments
          </h2>
          {data.recentPayments?.length ? (
            <ul className="space-y-3">
              {data.recentPayments.slice(0, 5).map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between py-2 border-b border-[#E5E1F5] last:border-0"
                >
                  <span className="font-medium text-[#1A1A2E]">{p.name}</span>
                  <span className="text-sm text-[#6B7280]">
                    {p.amount} – {p.purpose}
                  </span>
                  <StatusBadge status={p.status} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[#6B7280]">No recent payments</p>
          )}
          <Link
            href="/management/payments"
            className="mt-4 inline-block text-sm font-medium text-[#7C5CBF] hover:underline"
          >
            View All →
          </Link>
        </div>
      </div>
      {data.systemAlerts?.length ? (
        <div className="bg-white rounded-xl border border-[#E5E1F5] p-5">
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-4">
            System Alerts
          </h2>
          <div className="flex flex-wrap gap-3">
            {data.systemAlerts.map((a, i) => (
              <div
                key={i}
                className="px-4 py-2 rounded-lg bg-amber-50 text-amber-800 text-sm font-medium"
              >
                {a.message} ({a.count})
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}

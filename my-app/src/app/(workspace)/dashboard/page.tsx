import { ArrowUpRight, CircleCheck, Clock3, UserPlus, Users } from "lucide-react";

const stats = [
  { label: "Total users", value: "1,284", change: "+12.5%", icon: Users },
  { label: "Active today", value: "864", change: "+8.2%", icon: CircleCheck },
  { label: "New users", value: "126", change: "+4.7%", icon: UserPlus },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <p className="text-sm font-semibold text-emerald-600">OVERVIEW</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Dashboard</h2>
        <p className="mt-2 text-sm text-slate-500">Here is what is happening with your workspace today.</p>
      </div>

      <section className="grid gap-4 md:grid-cols-3" aria-label="Dashboard statistics">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Icon size={21} />
                </span>
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                  <ArrowUpRight size={13} /> {stat.change}
                </span>
              </div>
              <p className="mt-6 text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{stat.value}</p>
            </article>
          );
        })}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900">Recent activity</h3>
            <p className="mt-1 text-sm text-slate-500">Latest events from your account</p>
          </div>
          <Clock3 className="text-slate-400" size={20} />
        </div>
        <div className="mt-6 divide-y divide-slate-100">
          {["New user account created", "User permissions updated", "Weekly report generated"].map((event, index) => (
            <div key={event} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
              <span className="size-2 rounded-full bg-emerald-400 ring-4 ring-emerald-50" />
              <p className="flex-1 text-sm font-medium text-slate-700">{event}</p>
              <time className="text-xs text-slate-400">{index + 1}h ago</time>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

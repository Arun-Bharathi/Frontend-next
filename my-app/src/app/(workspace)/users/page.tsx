import { Search, UserPlus } from "lucide-react";

const users = [
  {
    name: "Ava Morgan",
    email: "ava@example.com",
    role: "Administrator",
    status: "Active",
    initials: "AM",
  },
  {
    name: "Noah Williams",
    email: "noah@example.com",
    role: "Editor",
    status: "Active",
    initials: "NW",
  },
  {
    name: "Mia Taylor",
    email: "mia@example.com",
    role: "Viewer",
    status: "Inactive",
    initials: "MT",
  },
];

export default function UsersPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {/* <p className="text-sm font-semibold text-emerald-600">MANAGEMENT</p> */}
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Users
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Manage team members and account access.
          </p>
        </div>
        <button className="flex w-fit items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
          <UserPlus size={18} /> Add user
        </button>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4 sm:p-5">
          <label className="relative block max-w-sm">
            <span className="sr-only">Search users</span>
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="search"
              placeholder="Search users..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:ring-3 focus:ring-emerald-100"
            />
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4 font-semibold">User</th>
                <th className="px-5 py-4 font-semibold">Role</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.email} className="hover:bg-slate-50/70">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                        {user.initials}
                      </span>
                      <span>
                        <span className="block font-semibold text-slate-800">
                          {user.name}
                        </span>
                        <span className="block text-xs text-slate-500">
                          {user.email}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{user.role}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${user.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="font-semibold text-emerald-700 hover:text-emerald-900">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

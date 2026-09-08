"use client";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import AddUserDialog from "../../../components/users/add-user-dialog";
import UserActions from "../../../components/users/user-actions";
import { useEffect, useState } from "react";
import { getAllUser } from "@/src/services/userService";
import { useRouter } from "next/navigation";

const avatarColors = [
  "bg-green-100 text-green-700",
  "bg-red-100 text-red-700",
  "bg-orange-100 text-orange-700",
  "bg-amber-100 text-amber-700",
  "bg-yellow-100 text-yellow-700",
  "bg-lime-100 text-lime-700",
  "bg-emerald-100 text-emerald-700",
  "bg-teal-100 text-teal-700",
  "bg-cyan-100 text-cyan-700",
  "bg-sky-100 text-sky-700",
  "bg-blue-100 text-blue-700",
  "bg-indigo-100 text-indigo-700",
  "bg-violet-100 text-violet-700",
  "bg-purple-100 text-purple-700",
  "bg-fuchsia-100 text-fuchsia-700",
  "bg-pink-100 text-pink-700",
  "bg-rose-100 text-rose-700",
];

const getAvatarColor = (id: string) => {
  const hash = Array.from(id).reduce(
    (value, character) => (value * 31 + character.charCodeAt(0)) | 0,
    0,
  );

  return avatarColors[(hash >>> 0) % avatarColors.length];
};

type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  mobile_number: string;
  role: "admin" | "viewer" | "learner";
  status: "active" | "inactive";
};

export default function UsersPage() {
  const router = useRouter();
  const pageSize = 10;
  const [users, setUsers] = useState<User[]>([]);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const refreshUsers = () => {
    setRefreshKey((currentKey) => currentKey + 1);
  };

  useEffect(() => {
    let ignore = false;
    const payload = {
      input: input,
      page: page,
      size: pageSize,
    };
    getAllUser(payload)
      .then((response) => {
        if (!ignore) {
          setUsers(Array.isArray(response?.data) ? response.data : []);
        }
      })
      .catch((error: unknown) => {
        console.error("Failed to load users", error);
      });

    return () => {
      ignore = true;
    };
  }, [input, page, refreshKey]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickUser = (user: any) => {
    router.push(`/users/${user?.id}`);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Users
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Manage team members and account access.
          </p>
        </div>
        <AddUserDialog
          onUserCreated={refreshUsers}
          editUser={userToEdit}
          onEditClose={() => setUserToEdit(null)}
        />
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
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setPage(1);
              }}
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
                <tr
                  onClick={() => handleClickUser(user)}
                  key={user.email}
                  className="hover:bg-slate-50/70 cursor-pointer"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid size-10 place-items-center rounded-full font-bold ${getAvatarColor(user.id)}`}
                      >
                        {user.first_name[0]}
                        {user.last_name[0]}
                      </span>
                      <span>
                        <span className="block font-semibold text-slate-800">
                          {user.first_name} {user.last_name}
                        </span>
                        <span className="block text-xs text-slate-500">
                          {user.email}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="px-5 capitalize py-4 text-slate-600">
                    {user.role}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full capitalize px-2.5 py-1 text-xs font-semibold ${user.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td
                    className="px-5 py-4 text-right"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <UserActions
                      user={user}
                      onUserDeleted={refreshUsers}
                      onUserEdited={() => setUserToEdit(user)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Page <span className="font-semibold text-slate-700">{page}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((currentPage) => currentPage - 1)}
              disabled={page === 1}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((currentPage) => currentPage + 1)}
              disabled={users.length < pageSize}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useRef } from "react";
import {
  IconAlertTriangle,
  IconEdit,
  IconTrash,
  IconX,
} from "@tabler/icons-react";

type UserActionsProps = {
  userName: string;
  userEmail: string;
};

export default function UserActions({ userName, userEmail }: UserActionsProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDeleteDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDeleteDialog = () => {
    dialogRef.current?.close();
  };

  const confirmDelete = () => {
    console.log("Delete user:", { name: userName, email: userEmail });
    closeDeleteDialog();
  };

  return (
    <>
      <div className="flex items-center justify-end gap-1">
        <button
          type="button"
          aria-label={`Edit ${userName}`}
          title="Edit user"
          className="rounded-lg p-2 text-emerald-700 transition hover:bg-emerald-50 hover:text-emerald-900 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-emerald-200"
        >
          <IconEdit size={19} stroke={1.8} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={openDeleteDialog}
          aria-label={`Delete ${userName}`}
          title="Delete user"
          className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 hover:text-red-800 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-red-200"
        >
          <IconTrash size={19} stroke={1.8} aria-hidden="true" />
        </button>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={`delete-user-${userEmail}`}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDeleteDialog();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/55"
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-red-50 text-red-600">
              <IconAlertTriangle size={23} stroke={1.8} aria-hidden="true" />
            </span>
            <button
              type="button"
              onClick={closeDeleteDialog}
              aria-label="Close delete confirmation"
              className="ml-auto rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-slate-200"
            >
              <IconX size={20} aria-hidden="true" />
            </button>
          </div>

          <h3
            id={`delete-user-${userEmail}`}
            className="mt-4 text-center text-lg font-bold text-slate-900"
          >
            Delete user?
          </h3>
          <p className="mt-2 text-center text-sm leading-6 text-slate-500">
            Are you sure you want to delete <strong>{userName}</strong>?
          </p>

          <p className="mt-1 text-center text-sm leading-6 text-slate-500">
            This action cannot be undone.
          </p>

          <div className="mt-6 flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={closeDeleteDialog}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-slate-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

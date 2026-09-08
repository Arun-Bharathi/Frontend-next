"use client";

import { useState } from "react";
import {
  IconAlertTriangle,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import CustomResponsiveModal from "../common/custom-responsive-modal";
import { deleteUser } from "@/src/services/userService";

type UserActionsProps = {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    mobile_number: string;
    email: string;
    role: "admin" | "viewer" | "learner";
    status: "active" | "inactive";
  };
  onUserDeleted?: () => void;
  onUserEdited?: () => void;
};

export default function UserActions({
  user,
  onUserDeleted,
  onUserEdited,
}: UserActionsProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openDeleteDialog = () => {
    setIsDeleteOpen(true);
  };

  const closeDeleteDialog = () => {
    if (isDeleting) return;
    setIsDeleteOpen(false);
  };

  const confirmDelete = async (id: string) => {
    setIsDeleting(true);

    try {
      const response = await deleteUser({ id });
      setIsDeleteOpen(false);
      onUserDeleted?.();
    } catch (error) {
      console.error("Failed to delete user", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-end gap-1">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onUserEdited?.();
          }}
          aria-label={`Edit ${user.id}`}
          title="Edit user"
          className="rounded-lg p-2 text-emerald-700 transition hover:bg-emerald-50 hover:text-emerald-900 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-emerald-200"
        >
          <IconEdit size={19} stroke={1.8} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            openDeleteDialog();
          }}
          aria-label={`Delete ${user.id}`}
          title="Delete user"
          className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 hover:text-red-800 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-red-200"
        >
          <IconTrash size={19} stroke={1.8} aria-hidden="true" />
        </button>
      </div>

      <CustomResponsiveModal
        isOpen={isDeleteOpen}
        onClose={closeDeleteDialog}
        title="Delete user?"
        description={
          <>
            <span className="block">
              Are you sure you want to delete{" "}
              <strong>{user.first_name}</strong>?
            </span>
            <span className="mt-1 block">This action cannot be undone.</span>
          </>
        }
        icon={
          <span className="grid size-11 place-items-center rounded-full bg-red-50 text-red-600">
            <IconAlertTriangle size={23} stroke={1.8} aria-hidden="true" />
          </span>
        }
        size="sm"
        align="center"
        showHeaderDivider={false}
        footer={
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                closeDeleteDialog();
              }}
              disabled={isDeleting}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-slate-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                void confirmDelete(user.id);
              }}
              disabled={isDeleting}
              className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-red-200"
            >
              {isDeleting ? (
                <span className="inline-flex items-center gap-2">
                  {/* <IconLoader2 size={18} className="animate-spin" /> */}
                  Deleting...
                </span>
              ) : (
                "Delete"
              )}
            </button>
          </>
        }
      />
    </>
  );
}

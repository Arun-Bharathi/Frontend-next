// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Accept any create-user payload shape.
export const createUser = async (user: any) => {
  const response = await fetch("http://localhost:7200/api/user/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  const data = await response.json();

  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Accept any update-user payload shape.
export const updateUser = async (user: any) => {
  const response = await fetch("http://localhost:7200/api/user/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Accept any create-user payload shape.
export const getAllUser = async (payload: any) => {
  const response = await fetch("http://localhost:7200/api/user/getAll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  const data = await response.json();

  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteUser = async (id: any) => {
  const response = await fetch("http://localhost:7200/api/user/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  const data = await response.json();

  return data;
};

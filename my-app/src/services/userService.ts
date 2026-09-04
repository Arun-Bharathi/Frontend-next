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

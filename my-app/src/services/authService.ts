type LoginData = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: LoginData) => {
  try {
    const response = await fetch("http://localhost:7200/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

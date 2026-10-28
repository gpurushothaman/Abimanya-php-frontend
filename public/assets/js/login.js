const form = document.getElementById("loginForm");
const errorElement = document.getElementById("error");

// Update this URL to your existing Node.js login endpoint.

const { basePath, apiBaseUrl, sessionLoginUrl, homeUrl } = window.APP_CONFIG;

const API_LOGIN_URL = `${apiBaseUrl}/auth/login`;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  errorElement.textContent = "";

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const response = await axios.post(API_LOGIN_URL, {
      email,
      password,
    });

    const token = response.data?.token;

    if (!response.data?.success || !token) {
      throw new Error("The API did not return a valid login token.");
    }

    // Create PHP session.
    const sessionResponse = await axios.post(
      sessionLoginUrl,
      { token },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!sessionResponse.data?.success) {
      throw new Error(
        sessionResponse.data?.message || "PHP session creation failed."
      );
    }

    // Redirect only after successful session creation.
    window.location.href = homeUrl;
  } catch (error) {
    console.error("Login error:", error);

    errorElement.textContent =
      error.response?.data?.message ||
      error.message ||
      "Login failed. Please try again.";
  }
});

async function logout() {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      });
  } catch (error) {
    console.error(error);
  }
}

async function checkAuth() {
  if (!localStorage.getItem("token")) {
    return {
      loggedIn: false,
    };
  }

  try {
    const response = await fetch("/api/user", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn) {
          return data;
        }
        return {
          loggedIn: false,
        };
      });
    return response;
  } catch (error) {
    return {
      loggedIn: false,
    };
  }
}

const authStatus = {
  loading: true,
  check: async () => {
    try {
      const response = await checkAuth();
      authStatus.loading = false;
      authStatus.loggedIn = response.loggedIn;
      authStatus.data = response.data;
    } catch (error) {
      console.error(error);
      authStatus.loading = false;
    }
  },
  loggedIn: false,
  data: undefined,
};

function executeSomethingAfterAuthLoad(callback) {
  if (!authStatus.loading) {
    callback();
  }
  new Promise((resolve, reject) => {
    authStatus.check().then(() => {
      callback();
      resolve();
    });
  });
}

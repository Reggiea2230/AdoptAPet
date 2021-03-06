import tokenService from "./tokenService";

const BASE_URL = "/api/users/";

function signup(user) {
  return (
    fetch(BASE_URL + "signup", {
      method: "POST",
      // headers: new Headers({'Content-Type': 'multipart/formData'}), < --- Browser sets this automatically
      // headers: new Headers({'Content-Type': 'application/json'}),  // If you are sending a file/photo over
      // Can remove the headers, and I browser will automatically apply the multipart/formData header for us
      body: user, // < user should be formData, signup page, userService.signup(formData)
    })
      .then((res) => {
        if (res.ok) return res.json();
        // Probably a duplicate email
        console.log(
          "if you have an error, you must check your server terminal!"
        );
        throw new Error("Email already taken!");
      })
      // Parameter destructuring!
      .then(({ token }) => tokenService.setToken(token))
  );
  // The above could have been written as
  //.then((token) => token.token);
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + "login", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(creds), // < taking a js object and turning into json to send to the server
  })
    .then((res) => {
      // Valid login if we have a status of 2xx (res.ok)
      if (res.ok) return res.json();
      throw new Error("Bad Credentials!");
    })
    .then(({ token }) => tokenService.setToken(token));
}

function getProfile(username) {
  return fetch(BASE_URL + username, {
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    if (res.status === 404) throw new Error("User not Found");
    throw new Error("Bad Credentials"); // <- this is what gets sent to the catch block when we call the function
  });
}

export default {
  signup,
  getUser,
  logout,
  login,
  getProfile,
};

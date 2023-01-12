import axios from "axios";

// const API_URL = 'https://comunication.herokuapp.com/';
const API_URL = "http://127.0.0.1:8000/";

// Register user
export const regiserUser = async (
  email,
  password,
  password_repeat,
  firstname,
  last_name,
  username,
  isSafe
) => {
  const user = {
    email: email,
    password: password,
    password_repeat: password_repeat,
    firstname: firstname,
    last_name: last_name,
    username: username,
  };
  console.log(isSafe === "true");
  if (isSafe === "true") {
    const response = await axios.post(API_URL + "register/", user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response;
  } else {
    const response = await axios.get(
      API_URL + "register/",
      { params: user },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  }
};

// Login user
export const login = async (username, password, isSafe) => {
  if (isSafe === "true") {
    const response = await axios.post(
      API_URL + "login/",
      {
        username: username,
        password: password,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } else {
    console.log({
      username: username,
      password: password,
    });
    const response = await axios.get(
      API_URL + "login/",
      {
        params: {
          username: username,
          password: password,
        },
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  }
};

// Logout user
export const logout = async () => {
  const response = await axios.post(
    API_URL + "logout/",
    {},
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const sendMail = async (email) => {
  const response = await axios.post(
    API_URL + "send-mail/",
    { email: email },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const changePasswordMail = async (email, newPassword, newPassword2) => {
  const response = await axios.post(
    API_URL + "change-password-mail/",
    {
      email: email,
      new_password: newPassword,
      verify_password: newPassword2,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const changePassword = async (
  userName,
  oldPassword,
  newPassword,
  newPassword2
) => {
  const response = await axios.post(
    API_URL + "change-password/",
    {
      username: userName,
      existing_password: oldPassword,
      new_password: newPassword,
      verify_password: newPassword2,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const validateCode = async (email, code) => {
  const response = await axios.post(
    API_URL + "verify-code/",
    {
      email: email,
      reset_code: code,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

// create-clients
export const create_clients = async (fname, lname, isSafe) => {
    const response = await axios.post(
      API_URL + "create-clients/",
      {
        fname: fname,
        lname: lname,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response;

};

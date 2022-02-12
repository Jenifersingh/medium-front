const API = "http://localhost:5000";

export const getPosts = () => {
  return fetch(`${API}/posts`, {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createPost = (body, token) => {
  console.log(body);
  return fetch(`${API}/post/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${token}`,
    },

    body: body,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const putPost = (body, postId, token) => {
  return fetch(`${API}/post/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signIn = (body) => {
  console.log(body);
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: JSON.stringify(body),
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signUp = (body) => {
  console.log(body);
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: JSON.stringify(body),
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

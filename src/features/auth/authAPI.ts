import AuthenticatedUser from "./AuthenticatedUser";

function login(userName: string, password: string): Promise<AuthenticatedUser> {
  const credentials = {
    userName: userName,
    password: password
  }
  return fetch('http://localhost:8081/api/v1/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  })
  .then(data => {
    let token = data.token;
//    setToken(token);
    const authenticatedUser = new AuthenticatedUser(
      data.userId,
      userName,
      token      
    )
    return authenticatedUser
  })
}

function logout(token: string): Promise<string> {
  //const token = getToken()
  if(token == null || token === "") {
    return Promise.resolve("ok")
  }
  return fetch('http://localhost:8081/api/v1/user/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  })
  .then((response) => {
    if (response.ok) {
      // deleteToken()
      return response.text();
    } else {
      throw Error(response.statusText);
    }
  })
}

export { login, logout };
let token = ""

function login(userName: string, password: string): Promise<string> {
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
    token = data.token
    return token
  })
}

function logout(): Promise<string> {
  return fetch('http://localhost:8081/api/v1/user/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  })
  .then((response) => {
    if (response.ok) {
      token = ""
      return response.text();
    } else {
      throw Error(response.statusText);
    }
  })
}

export { login, logout };
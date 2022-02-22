export async function login(userName: string, password: string): Promise<string> {
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
  .then(data => data.json())
}

export default login;
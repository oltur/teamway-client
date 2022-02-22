class AuthenticatedUser {
    constructor(userId: string = "", userName: string = "", token: string = "") {
      this.userId = userId;
      this.userName = userName;
      this.token = token;
    }  
    userId: string;
    userName: string;
    token: string;
  }
  
  export default AuthenticatedUser;
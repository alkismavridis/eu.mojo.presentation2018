export default {
  LOGIN:`mutation($username:String!, $password:String!) {
      login(username:$username, password:$password) {
        id, userName, isRoot 
    }
  }`,

  SIGNIN:`mutation($username:String!, $password:String!) {
      signin(username:$username, password:$password) {
        id, userName, isRoot 
    }
  }`,

  LOGOUT:`mutation { logout }`
};
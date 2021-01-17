var socket
var verified = 0;
var authProvUrl
var authProvInfo

var infoBox = document.getElementById("auth-info")
var userAuthProvElem = document.getElementById("auth-input-authprovider")

function socketConnect(authProv) {
  socket = io(authProv, {reconnection: false});
  socket.on('connect_failed', function () {
    infoBox.innerHTML = "Couldnt connect to auth provider"
  })
  socket.on("connect", () => {
    infoBox.innerHTML = "Connected to Authentication Provider at " + authProv
    verified = 1;
    userAuthProvElem.readonly="readonly"
    authProvUrl = authProv
  });
  socket.on("disconnect", () => {
    infoBox.innerHTML = "Lost connection to auth provider"
    userAuthProvElem.readonly="readonly"
    verified = 0;
    authProvUrl = ""
  });
  socket.on("message", (data) => {
    infoBox.innerHTML = data
  });

  socket.on("authProvInfo", (data) => {
    authProvInfo = data
    infoBox.innerHTML = ""
    if (data['anon']) {
      infoBox.innerHTML += "This Authentication Provider issues anonymous credentials<br>"
    } else {
      infoBox.innerHTML += "This Authentication Provider does NOT anonymous credentials<br>"
    }
    if (data['registration']) {
      infoBox.innerHTML += "This Authentication Provider is accepting new users"
    } else {
      infoBox.innerHTML += "This Authentication Provider is NOT accepting new users"
    }
  });
}

function verify() {
  if (verified == 0) {
    var userAuthProv = document.getElementById("auth-input-authprovider").value.replace(/\/$/, '')
    if (r.test(userAuthProv)) {
      socketConnect(userAuthProv)
    } else {
      infoBox.innerHTML = "Invalid Authentication Provider"
    }
  }
}


var r = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);

function register() {

  var userAuthProv = userAuthProvElem.value.replace(/\/$/, '')
  var username = document.getElementById('auth-input-username').value
  var password = document.getElementById('auth-input-password').value
  if (r.test(userAuthProv)) {


    if ((username && password) != "") {

      if (verified != 0) {
        var authform = document.getElementById('authForm')

        authform.method = "POST"
        authform.action = `${authProvUrl}/register`;
        authform.submit();
      } else {
        infoBox.innerHTML = "Verify your Authentication Provider!"
      }

    } else {
      infoBox.innerHTML = "Username or password is null"
    }

  } else {
    infoBox.innerHTML = "This Authentication Provider is not valid"
  }
}

function login() {
  var userAuthProv = userAuthProvElem.value.replace(/\/$/, '')
  var username = document.getElementById('auth-input-username').value
  var password = document.getElementById('auth-input-password').value
  if (r.test(userAuthProv)) {


    if ((username && password) != "") {

      if (verified != 0) {
        var authform = document.getElementById('authForm')

        authform.method = "POST"
        authform.action = `${authProvUrl}/login`;
        authform.submit();
      } else {
        infoBox.innerHTML = "Verify your Authentication Provider!"
      }

    } else {
      infoBox.innerHTML = "Username or password is null"
    }

  } else {
    infoBox.innerHTML = "This Authentication Provider is not valid"
  }
}

window.onload = function () {
  document.getElementById("login-button").addEventListener("click", login)
  document.getElementById("register-button").addEventListener("click", register)
  document.getElementById("verify-authProv").addEventListener("click", verify)
  document.getElementById("auth-page").value = window.location
  infoBox.innerHTML = "Welcome!"
}
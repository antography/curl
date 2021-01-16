var socket
var verified = 0;

var infoBox = document.getElementById("auth-info")
var userAuthProvElem = document.getElementById("auth-input-authprovider")

function socketConnect(authProv) {
  socket = io(authProv);
  socket.on('connect_failed', function () {
    infoBox.innerHTML = "Couldnt connect to server"
  })
  socket.on("connect", () => {
    infoBox.innerHTML = "Connected to Authentication Provider at " + authProv
    verified = 1;
    userAuthProvElem.disabled = true;
  });
  socket.on("disconnect", () => {
    console.log("AHHHHHHHHHHHHHHH");
  });

}

function verify() {
  if (verified == 0) {
    var userAuthProv = document.getElementById("auth-input-authprovider").value.replace(/\/$/, '')
    if (r.test(userAuthProv)) {
      socketConnect(userAuthProv)
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
        var registerData = {
          'username': username,
          'password': password
        }
        socket.emit("register", registerData)
        infoBox.innerHTML = ""
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
  document.getElementById("register-button").addEventListener("click", register)
  document.getElementById("verify-authProv").addEventListener("click", verify)
  infoBox.innerHTML = "Welcome!"
}
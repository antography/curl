
var r = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);


function register() {

  var userAuthProv = document.getElementById("auth-input-authprovider").value.replace(/\/$/, '')
  var infoBox = document.getElementById("auth-info")
  var username = document.getElementById('auth-input-username').value
  var password = document.getElementById('auth-input-password').value

  if (r.test(userAuthProv)) {

    if ((username && password) != "") {

      let data = new FormData();
      data.append('username', username);
      data.append('password', password);

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText)
        }
      };
      xhttp.open("POST", `${userAuthProv}/register`, true);
      xhttp.send(data);
      infoBox.innerHTML = ""
    } else {
      infoBox.innerHTML = "Username or password is null"
    }

  } else {
    infoBox.innerHTML = "This Authentication Provider is not valid"
  }
}

window.onload = function () {
  var infoBox = document.getElementById("auth-info")
  document.getElementById("register-button").addEventListener("click", register)
  infoBox.innerHTML = ""

}
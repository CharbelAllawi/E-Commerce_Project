document.addEventListener("DOMContentLoaded", () => {

  // here if id is null i will hide the login form and show welcome
  if (localStorage.getItem('id') != null) {
    document.getElementById("RegForm").style.display = "none";
    document.getElementById("LoginForm").style.display = "none";

    document.getElementById("f").style.display = "none";
    document.getElementById("wlcback").style.display = "block";
    document.getElementById("signoutbtn").style.display = "block";

  }
  document.querySelector(".outbtn").addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });
  document.querySelector(".registerbtn").addEventListener("click", () => {
    let username = document.querySelector(".usernameid").value;
    let email = document.querySelector(".emailid").value;
    let password = document.querySelector(".passwordid").value;

    let formdata = new FormData();
    formdata.append("name", username);
    formdata.append("email", email);
    formdata.append("password", password);

    let requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

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
  // register button instructions when clicked

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
    fetch("http://127.0.0.1:8000/api/register/", requestOptions)
      .then(response => response.json())
      .then(result => {
        const responseData = result;
        document.querySelector(".usernameid").value = "";
        document.querySelector(".emailid").value = "";
        document.querySelector(".passwordid").value = "";
        localStorage.setItem('id', responseData.user.id);
        document.getElementById("RegForm").style.display = "none";
        document.getElementById("LoginForm").style.display = "none";

        document.getElementById("f").style.display = "none";
        document.getElementById("wlcback").style.display = "block";
        document.getElementById("signoutbtn").style.display = "block";

      })
      .catch(error => console.log('error', error));
  });

  // login button instructions when clicked
  document.querySelector(".loginbtn").addEventListener("click", () => {
    let email = document.querySelector(".emailidlogin").value;
    let password = document.querySelector(".passwordidlogin").value;

    let formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    let requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/login/", requestOptions)
      .then(response => response.json())
      .then(result => {
        const responseData = result;
        document.querySelector(".emailidlogin").value = "";
        document.querySelector(".passwordidlogin").value = "";
        localStorage.setItem('id', responseData.user.id);
        document.getElementById("RegForm").style.display = "none";
        document.getElementById("LoginForm").style.display = "none";

        document.getElementById("f").style.display = "none";
        document.getElementById("wlcback").style.display = "block";
        document.getElementById("signoutbtn").style.display = "block";

      })
      .catch(error => console.log('error', error));
  });









});



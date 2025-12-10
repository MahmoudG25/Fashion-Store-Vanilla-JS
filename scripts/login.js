document
  .getElementsByClassName("loginBtn")[0]
  .addEventListener("click", function (e) {
    e.preventDefault();
    var mailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");
    var mail = mailInput.value.trim();
    var password = passwordInput.value;
    var savedUsers = JSON.parse(localStorage.getItem("allUsers")) || {};
    var matchedUser = savedUsers[mail] || null
    if (!matchedUser) {
      mailInput.style.border = "1px solid red";
      document.getElementById("emailAlert").innerHTML = "User doesn't exist";
      return;

      // if (emailExists) {
      //   passwordInput.style.border = "1px solid red";
      //   document.getElementById("passAlert").innerHTML = "Invalid password";
      // } else {
      //   mailInput.style.border = "1px solid red";
      //   document.getElementById("emailAlert").innerHTML = "Invalid email";
      // }
    }
    else if (matchedUser.Password !== password) {
      passwordInput.style.border = "1px solid red";
      document.getElementById("passAlert").innerHTML = "Invalid password";
      return
    }

    mailInput.style.border = "";
    passwordInput.style.border = "";
    document.getElementById("emailAlert").innerHTML = "";
    document.getElementById("passAlert").innerHTML = "";
    localStorage.setItem("LoggedInUser", JSON.stringify({ name: `${matchedUser.FirstName} ${matchedUser.LastName}`, email: matchedUser.Email, isLoggedIn: true }));


    window.location.href = "#home";
    window.location.reload()
  });

//  Toggle Password Eye

function togglePassword(id, icon) {
  const input = document.getElementById(id);
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";

  icon.innerHTML = isPassword
    ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" stroke-width="2" viewBox="0 0 24 24" width="22" height="22">
        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a18.85 18.85 0 0 1 4.5-5.5M9.9 9.9a3 3 0 1 0 4.2 4.2M3 3l18 18" />
      </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="black" stroke-width="2">
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
        <circle cx="12" cy="12" r="3" />
      </svg>`;
}

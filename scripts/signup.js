document
  .querySelector(".createAccount")
  .addEventListener("click", function (e) {
    e.preventDefault();

    var firstName = document.querySelector("#fname");
    var lastName = document.getElementById("lname");
    var emailName = document.getElementById("email");
    var phoneNumber = document.getElementById("phone");
    var passwordNum = document.getElementById("password");
    var confirmPassNum = document.getElementById("confirmPass");
    var checkBox = document.getElementById("checkBox");

    var emailRegex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // Helpers
    function showError(input, message, alertId) {
      input.style.border = "1px solid red";
      document.getElementById(alertId).innerHTML = message;
    }

    function clearError(input, alertId) {
      input.style.border = "";
      document.getElementById(alertId).innerHTML = "";
    }

    // First Name
    if (firstName.value.length < 3) {
      showError(firstName, "Please enter at least 3 characters", "FnameAlert");
      return;
    } else {
      clearError(firstName, "FnameAlert");
    }

    // Last Name
    if (lastName.value.length < 3) {
      showError(lastName, "Please enter at least 3 characters", "LnameAlert");
      return;
    } else {
      clearError(lastName, "LnameAlert");
    }

    // Email
    if (!emailRegex.test(emailName.value)) {
      showError(emailName, "Please enter a valid email address.", "emailAlert");
      return;
    } else {
      clearError(emailName, "emailAlert");
    }

    // Check the email address used before or not
    var existingUsers = JSON.parse(localStorage.getItem("allUsers")) || {};

    var newUser = {
      FirstName: firstName.value.trim(),
      LastName: lastName.value.trim(),
      Email: emailName.value.trim(),
      Phone: phoneNumber.value.trim(),
      Password: confirmPassNum.value.trim(),
    };

    if (existingUsers[newUser.Email]) {
      showError(emailName, "This email is already registered.", "emailAlert");
      return;
    }
    // Phone
    if (phoneNumber.value.trim() === "") {
      showError(
        phoneNumber,
        "The field is empty. Enter a phone number.",
        "phoneAlert"
      );
      return;
    } else if (isNaN(phoneNumber.value)) {
      showError(phoneNumber, "Phone must be a number", "phoneAlert");
      return;
    } else if (phoneNumber.value.length < 10 || phoneNumber.value.length > 13) {
      showError(
        phoneNumber,
        "Phone must be between 10 and 13 digits",
        "phoneAlert"
      );
      return;
    } else {
      clearError(phoneNumber, "phoneAlert");
    }

    // Password
    if (!strongPassword.test(passwordNum.value)) {
      showError(
        passwordNum,
        "Password must include uppercase, lowercase, number, symbol and be 8+ characters",
        "passAlert"
      );
      return;
    } else {
      clearError(passwordNum, "passAlert");
    }

    // Confirm Password
    if (confirmPassNum.value !== passwordNum.value) {
      showError(confirmPassNum, "Password does not match.", "confirmPassAlert");
      return;
    } else {
      clearError(confirmPassNum, "confirmPassAlert");
    }

    // Checkbox
    if (!checkBox.checked) {
      checkBox.style.outline = "1px solid red";
      document.getElementById("checkBoxAlert").innerHTML = "Check this out";
      return;
    } else {
      checkBox.style.outline = "";
      document.getElementById("checkBoxAlert").innerHTML = "";
    }

    //  Save to LocalStorage
    var newUser = {
      FirstName: firstName.value.trim(),
      LastName: lastName.value.trim(),
      Email: emailName.value.trim(),
      Phone: phoneNumber.value.trim(),
      Password: confirmPassNum.value.trim(),
    };

    var existingUsers = JSON.parse(localStorage.getItem("allUsers")) || {};

    existingUsers[newUser.Email] = newUser;

    localStorage.setItem("allUsers", JSON.stringify(existingUsers));

    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || {};

    let key = newUser.Email;

    if (!(key in cart)) {
      cart[key] = [];
    }

    if (!(key in wishlist)) {
      wishlist[key] = [];
    }


    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    window.location.href = "#login";
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

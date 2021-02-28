//style the contact form modal

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
// match the close class button
const modalClose = document.querySelectorAll(".close");

//DOM form elements
const contactForm = document.getElementById("contactform");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const message = document.getElementById("message");

// launch modal function
function launchModal() {
  modalbg.style.display = "block";
}

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//hide modal function
function hideModal() {
  modalbg.style.display = "none";
}

//   hide modal event
modalClose.forEach((btn) => btn.addEventListener("click", hideModal));

// email validation -  from w3resource.com
const ValidateEmail = (mail) => {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    )
  ) {
    return true;
  }
  return false;
};

// submit function - validate all the fields
function validateForm() {
  //assumed that all the fields are valid, will set it to false in case any of them is not
  let isFormValid = true;

  //if condition will be applied for each field
  if (firstName.value.length < 2) {
    // set the error attribute on the parent
    // display an erro if field is invalid
    firstName.parentNode.setAttribute("data-error-visible", true);
    isFormValid = false;
  } else {
    //clear the error message if data is correct
    firstName.parentNode.removeAttribute("data-error-visible");
  }

  if (lastName.value.length < 2) {
    lastName.parentNode.setAttribute("data-error-visible", true);
    isFormValid = false;
  } else {
    lastName.parentNode.removeAttribute("data-error-visible");
  }

  if (email.value == null || email.value == "" || !ValidateEmail(email.value)) {
    // add data-error attribute to parent div of email input
    email.parentNode.setAttribute("data-error-visible", true);
    isFormValid = false;
  } else {
    email.parentNode.removeAttribute("data-error-visible");
  }

  if (message.value.length < 2) {
    message.parentNode.setAttribute("data-error-visible", true);
    isFormValid = false;
  } else {
    message.parentNode.removeAttribute("data-error-visible");
  }

  if (!isFormValid) {
    return false;
  }

  console.log(`First Name: ${firstName.value}`);
  console.log(`Last Name: ${lastName.value}`);
  console.log(`Email: ${email.value}`);
  console.log(`Message: ${message.value}`);

  hideModal();
  return false;
}

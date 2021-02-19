//style the contctform modal

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
// match the close class button
const modalClose = document.querySelectorAll(".close")


//DOM form elements
const contactForm = document.getElementById('contactform');
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const message = document.getElementById('message');

// launch modal function
function launchModal () {
    modalbg.style.display = 'block';
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
function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    return (false)
}

// submit function - validate all the fields
function validateForm(){
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
  
    if (lastName.value.length < 2){
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

    if (message.value.length < 2){
        message.parentNode.setAttribute("data-error-visible", true);
        isFormValid = false;
      } else {
        message.parentNode.removeAttribute("data-error-visible");
      } 
      if (!isFormValid) {
        return false;
      }
}

// lightbox
const myLightbox = document.getElementById("myLightbox");
const myPhotos = document.getElementsByClassName("lightboxSlides");
let currentPosition = 1;

// Open the lightbox modal
function openLightbox() {
    myLightbox.style.display = "block";
}

function closeLightbox() {
    myLightbox.style.display = "none";
}

function currentSlide(n) {
    for (i = 0; i < myPhotos.length; i++) {
        if (i + 1 == n) {
            myPhotos[i].style.display = "block";
        } else {
            myPhotos[i].style.display = "none";
        }
    }
    currentPosition = n;
}

function plusSlides(n) {
    let newPosition = currentPosition + n;
    if (newPosition > 0 && newPosition <= myPhotos.length) {
        currentSlide(newPosition);
    }
}

// load json

function loadJson(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  }
  rawFile.send(null);
}

function loadCallback(text) {
  let data = JSON.parse(text);
  photographers = data["photographers"];

  const frontMain = document.getElementById("front-main");

  for (let p = 0; p < photographers.length; p++) {
    let photographerCard = document.createElement("DIV");
    photographerCard.setAttribute("class", "photographer-card");
    frontMain.appendChild(photographerCard);

    let anchor = document.createElement("A");
    anchor.setAttribute("href", "mimi_keel.html");
    photographerCard.appendChild(anchor);
    
    let photographerMain = document.createElement("DIV");
    photographerMain.setAttribute("class", "photographer-main");
    anchor.appendChild(photographerMain);

    // Picture
    let picture = document.createElement("PICTURE");
    picture.setAttribute("class", "front-photo");
    photographerMain.appendChild(picture);

    let source = document.createElement("SOURCE");
    source.setAttribute(
      "srcset",
      "/Sample Photos-2/Photographers ID Photos/" + photographers[p]["portrait"]
    );
    picture.appendChild(source);

    let img = document.createElement("IMG");
    img.setAttribute("alt", "Photo by " + photographers[p]["name"]);
    img.setAttribute("src", "/Sample Photos-2/Photographers ID Photos/" + photographers[p]["portrait"]);
    picture.appendChild(img);

    let name = document.createElement("DIV");
    name.setAttribute("class", "photographer-name");
    name.innerHTML = photographers[p]["name"];
    photographerMain.appendChild(name);
  

    // Details
    let details = document.createElement("DIV");
    details.setAttribute("class", "photographer-details");
    photographerCard.appendChild(details);

    let location = document.createElement("DIV");
    location.setAttribute("class", "location");
    location.innerHTML = photographers[p]["city"];
    details.appendChild(location);

    let description = document.createElement("DIV");
    description.setAttribute("class", "description");
    description.innerHTML = photographers[p]["tagline"];
    details.appendChild(description);

    let price = document.createElement("DIV");
    price.setAttribute("class", "price");
    price.innerHTML = "$" + photographers[p]["price"] + "/day";
    details.appendChild(price);

    // Categories
    let categories = document.createElement("DIV");
    categories.setAttribute("class", "photographer-categories");
    photographerCard.appendChild(categories);

    for (let i = 0; i < photographers[p]["tags"].length; i++) {
      let button = document.createElement("BUTTON");
      button.setAttribute("aria-label", "filter");
      button.setAttribute("class", "filter");
      button.innerHTML = "#" + photographers[p]["tags"][i];
      categories.appendChild(button);
    }

  }
}

loadJson("fisheyedata.json", loadCallback);

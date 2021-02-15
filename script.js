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


/// dropdown

var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "dropdown-select": */
x = document.getElementsByClassName("dropdown-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
// lightbox
const myLightbox = document.getElementById("myLightbox");
let currentPosition = 1;
const wrapper = document.getElementById("wrapper");
const logo = document.getElementById("logo");

// Open the lightbox modal
// eslint-disable-next-line no-unused-vars
function openLightbox() {
  myLightbox.style.display = "block";
  wrapper.style.display = "none";
  wrapper.setAttribute("aria-hidden", "true");
  logo.style.display = "none";
  logo.setAttribute("aria-hidden", "true");
}

// eslint-disable-next-line no-unused-vars
function closeLightbox() {
  myLightbox.style.display = "none";
  wrapper.style.display = "block";
  wrapper.setAttribute("aria-hidden", "false");
  logo.style.display = "block";
  logo.setAttribute("aria-hidden", "false");
}

function currentSlide(n) {
  const myPhotos = document.getElementsByClassName("lightboxSlides");

  for (let i = 0; i < myPhotos.length; i++) {
    if (i + 1 == n) {
      myPhotos[i].style.display = "block";
    } else {
      myPhotos[i].style.display = "none";
    }
  }
  currentPosition = n;
}

function plusSlides(n) {
  const myPhotos = document.getElementsByClassName("lightboxSlides");

  let newPosition = currentPosition + n;
  if (newPosition > 0 && newPosition <= myPhotos.length) {
    currentSlide(newPosition);
  }
}

//Close lightbox with esc key
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeLightbox();
  } else if (event.key === "ArrowRight") {
    plusSlides(1);
  } else if (event.key === "ArrowLeft") {
    plusSlides(-1);
  }
});

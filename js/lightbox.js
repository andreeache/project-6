// lightbox
const myLightbox = document.getElementById("myLightbox");
let currentPosition = 1;

// Open the lightbox modal
function openLightbox() {
  myLightbox.style.display = "block";
}

function closeLightbox() {
  myLightbox.style.display = "none";
}

function currentSlide(n) {
  const myPhotos = document.getElementsByClassName("lightboxSlides");

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
  const myPhotos = document.getElementsByClassName("lightboxSlides");

  let newPosition = currentPosition + n;
  if (newPosition > 0 && newPosition <= myPhotos.length) {
    currentSlide(newPosition);
  }
}

//Close lightbox with esc key
window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    myLightbox.style.display = 'none'
  }
})
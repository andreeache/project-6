// load json

function loadJson(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

function loadCallbackpp(text) {
  let data = JSON.parse(text);
  let media = data["media"];
  let photographers = data["photographers"];
  var photographer;

  // get the parameter dictionary
  const urlParams = new URLSearchParams(window.location.search);

  // iterate all elements in photographers in order to find the right photographer
  for (let i = 0; i < photographers.length; i++) {
    if (photographers[i]["id"] == urlParams.get("photographer_id")) {
      photographer = photographers[i];
      break;
    }
  }
  // photographer page / main section / photographer-info
  // photographer name
  let phName = document.getElementById("photographer-name-pp");
  phName.innerText = photographer["name"];

  // added photographer name to the contact form
  const photographerNameModal = document.getElementById(
    "modal-photographer-name"
  );
  photographerNameModal.innerText = photographer["name"];

  // photographer location
  let location = document.getElementById("location-pp");
  location.innerText = photographer["city"] + ", " + photographer["country"];

  //photographer tagline
  let description = document.getElementById("description-pp");
  description.innerText = photographer["tagline"];

  // photographer tags
  let tag = document.getElementById("button-pp");

  for (let i = 0; i < photographer["tags"].length; i++) {
    let button = document.createElement("BUTTON");
    button.setAttribute("aria-label", "filter");
    button.setAttribute("class", "filter");
    button.innerHTML = "#" + photographer["tags"][i];
    tag.appendChild(button);
  }

  // photographer image
  let frontPhoto = document.getElementById("front-photo");

  let source = document.createElement("SOURCE");
  source.setAttribute(
    "srcset",
    "Sample Photos-2/Photographers ID Photos/" + photographer["portrait"]
  );
  frontPhoto.appendChild(source);

  let img = document.createElement("IMG");
  img.setAttribute("alt", "Photo of " + photographer["name"]);
  img.setAttribute(
    "src",
    "Sample Photos-2/Photographers ID Photos/" + photographer["portrait"]
  );
  frontPhoto.appendChild(img);

  // generating portfolio
  const portfolio = document.getElementById("portfolio");

  // iterate all elements in media
  let currentPhoto = 0;
  for (let f = 0; f < media.length; f++) {
    let pc = media[f];
    // filter by photographer ID
    if (pc["photographerId"] != urlParams.get("photographer_id")) {
      continue;
    }

    currentPhoto += 1;

    //photocard
    let photoCard = document.createElement("DIV");
    photoCard.setAttribute("class", "photo-card");
    portfolio.appendChild(photoCard);

    // create an invisible div containing the date, used only for sorting
    let cardDate = document.createElement("DIV");
    cardDate.innerText = pc["date"];
    cardDate.style.display = "none";
    cardDate.setAttribute("class", "date-sort");
    photoCard.append(cardDate);

    if (pc["image"]) {
      //create picture element
      let picture = document.createElement("PICTURE");
      picture.setAttribute("class", "photo");
      picture.setAttribute("alt", pc["alt"] + ", closeup view" )
      picture.setAttribute("tabindex", "0");
      photoCard.appendChild(picture);
      // srcset for picture
      let source = document.createElement("SOURCE");
      source.setAttribute(
        "srcset",
        "Sample Photos-2/" + pc["photographerId"] + "/" + pc["image"]
      );
      picture.appendChild(source);

      //create img element
      let img = document.createElement("IMG");
      img.setAttribute(
        "src",
        "Sample Photos-2/" + pc["photographerId"] + "/" + pc["image"]
      );
      img.setAttribute("class", "hover-shadow cursor");
      img.setAttribute(
        "onclick",
        "openLightbox();currentSlide(" + String(currentPhoto) + ")"
      );
      picture.appendChild(img);
    } else {
      // it's a video
      let video = document.createElement("VIDEO");
      video.controls = true;
      video.setAttribute("class", "video");
      photoCard.appendChild(video);
      //srcset for video
      let source = document.createElement("SOURCE");
      source.setAttribute(
        "src",
        "Sample Photos-2/" + pc["photographerId"] + "/" + pc["video"] + "#t=0.1"
      );
      video.appendChild(source);
    }

    //create photo-card-details div, contains name and price
    let pcDetails = document.createElement("DIV");
    pcDetails.setAttribute("class", "photo-card-details");
    photoCard.appendChild(pcDetails);

    // create div photo-description, contains photo's name
    let phDescription = document.createElement("DIV");
    phDescription.setAttribute("class", "photo-description");
    phDescription.innerText = pc["alt"];
    pcDetails.appendChild(phDescription);

    // create div with photo price
    let photoPrice = document.createElement("DIV");
    photoPrice.setAttribute("class", "photo-price");
    photoPrice.innerHTML = pc["price"] + "$";
    pcDetails.appendChild(photoPrice);

    // create div for like section, contains nr of likes and heart icon
    let like = document.createElement("DIV");
    like.setAttribute("class", "like");
    pcDetails.appendChild(like);

    // create div with number of like
    let nrOfLikes = document.createElement("DIV");
    nrOfLikes.setAttribute("class", "number-of-like");
    nrOfLikes.innerHTML = pc["likes"];
    like.appendChild(nrOfLikes);

    // create div with heart icon
    let likeIcon = document.createElement("DIV");
    likeIcon.setAttribute("class", "fa fa-heart");
    likeIcon.setAttribute("aria-label", "likes");
    likeIcon.setAttribute("tabindex", "0");
    likeIcon.addEventListener("click", incrementLikes);
    like.appendChild(likeIcon);

    // add the photo to the lightbox too
    let lightbox = document.getElementById("lightbox-content");

    //create lightboxSlides div
    let lightboxSlide = document.createElement("DIV");
    lightboxSlide.setAttribute("class", "lightboxSlides");
    lightbox.appendChild(lightboxSlide);

    if (pc["image"]) {
      // create img element
      let lbImage = document.createElement("IMG");
      lbImage.setAttribute("alt", "Photo by " + photographer["name"]);
      lbImage.setAttribute(
        "src",
        "Sample Photos-2/" + pc["photographerId"] + "/" + pc["image"]
      );
      lightboxSlide.appendChild(lbImage);
    } else {
      let video = document.createElement("VIDEO");
      video.controls = true;
      lightboxSlide.appendChild(video);
      //srcset for video
      let source = document.createElement("SOURCE");
      source.setAttribute(
        "src",
        "Sample Photos-2/" + pc["photographerId"] + "/" + pc["video"] + "#t=0.1"
      );
      video.appendChild(source);
    }

    // created lightbox-text, contains photo's name
    let lbName = document.createElement("DIV");
    lbName.setAttribute("class", "lightbox-text");
    lbName.innerText = pc["alt"];
    lightboxSlide.appendChild(lbName);
  }
  sumLikes();
  sortMedia("Popularity");

  //photographer fare per day

  photographerPrice = document.getElementById("price-pp");
  photographerPrice. innerHTML = `${photographer["price"]}$ / Day`;
}

function incrementLikes() {
  // this = heart. this.previousSibling = the element with the number of likes
  this.previousSibling.innerText = parseInt(this.previousSibling.innerHTML) + 1;
  sumLikes();
}

// sum the likes from all the like elements
function sumLikes() {
  // get all the like elements in an array
  const likes = document.getElementsByClassName("number-of-like");

  let sum = 0;
  // iterate the array and add each like number to the above sum
  for (i = 0; i < likes.length; i++) {
    sum += parseInt(likes[i].innerText);
  }

  // set the sum in the destination
  const d = document.getElementById("sum-likes");
  d.innerText = sum;
}

// Sorting functions, comparing two cards
const sortByDate = (a, b) => {
  if (
    a.getElementsByClassName("date-sort")[0].innerText <
    b.getElementsByClassName("date-sort")[0].innerText
  ) {
    return -1;
  }
  return 1;
};

const sortByPopularity = (a, b) => {
  return (
    parseInt(a.getElementsByClassName("number-of-like")[0].innerText) <
    parseInt(b.getElementsByClassName("number-of-like")[0].innerText)
  );
};

const sortByTitle = (a, b) => {
  if (
    a.getElementsByClassName("photo-description")[0].innerText <
    b.getElementsByClassName("photo-description")[0].innerText
  ) {
    return -1;
  }
  return 1;
};

// apply sorting; parameter has to be one of: Date, Popularity or Title
// function will be called in dropdown.js
const sortMedia = (sortby) => {
  //transfrom html colection in an array
  let cards = [...document.getElementsByClassName("photo-card")];
  if (cards.length < 1) {
    return;
  }
  switch (sortby) {
    case "Date":
      cards.sort(sortByDate);
      break;
    case "Popularity":
      cards.sort(sortByPopularity);
      break;
    case "Title":
      cards.sort(sortByTitle);
      break;
  }

  const portfolio = document.getElementById("portfolio");
  //empty the portfolio
  portfolio.innerHTML = "";
  //and refill it with the sorted cards
  for (i = 0; i < cards.length; i++) {
    portfolio.appendChild(cards[i]);
  }
};

loadJson("fisheyedata.json", loadCallbackpp);

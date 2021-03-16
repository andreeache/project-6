import { mediaFactory } from "./mediaFactory.js";
// load json
function loadJson(file, callback) {
  let rawFile = new XMLHttpRequest();
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
  let jsonMedia = data["media"];
  let photographers = data["photographers"];
  let photographer;

  // get the parameter dictionary
  const urlParams = new URLSearchParams(window.location.search);

  // iterate all elements in photographers in order to find the right photographer from the url page
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

  //add accesibility labels to the modal contact form
  const modalbg = document.querySelector(".bground");
  modalbg.setAttribute("aria-label", "Contact me " + photographer["name"]);
  modalbg.setAttribute("aria-labelledby", "modal-photographer-name");

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
    button.setAttribute("sr-only", "Tag");
    button.setAttribute("class", "filter");
    button.innerHTML = "#" + photographer["tags"][i];
    // eslint-disable-next-line no-unused-vars
    button.addEventListener("click", function (_) {
      photoSort(photographer["tags"][i]);
    });

    tag.appendChild(button);

    let buttonSr = document.createElement("SPAN");
    buttonSr.setAttribute("class", "sr-only");
    buttonSr.innerHTML = "Tag";
    tag.appendChild(buttonSr);
  }

  // photographer image
  let frontPhoto = document.getElementById("front-photo");

  let source = document.createElement("SOURCE");
  source.setAttribute(
    "srcset",
    "Sample%20Photos-2/Photographers%20ID%20Photos/" + photographer["portrait"]
  );
  frontPhoto.appendChild(source);

  let img = document.createElement("IMG");
  img.setAttribute("alt", photographer["alt"]);
  img.setAttribute(
    "src",
    "Sample%20Photos-2/Photographers%20ID%20Photos/" + photographer["portrait"]
  );
  frontPhoto.appendChild(img);

  // generating portfolio
  const portfolio = document.getElementById("portfolio");

  // iterate all elements in media section of the json
  let currentCardIndex = 0;
  for (let f = 0; f < jsonMedia.length; f++) {
    let pc = jsonMedia[f];
    // filter by photographer ID
    if (pc["photographerId"] != urlParams.get("photographer_id")) {
      continue;
    }

    currentCardIndex += 1;

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

    // create invisible div containing photo tag, used only for sorting
    let photoTags = document.createElement("DIV");
    photoTags.innerText = pc["tags"];
    photoTags.style.display = "none";
    photoTags.setAttribute("class", "photo-sort");
    photoCard.append(photoTags);

    //media factory - choose between photo and video
    let media = new mediaFactory(pc, currentCardIndex);
    photoCard.appendChild(media.generate());

    //create photo-card-details div, contains name and price
    let pcDetails = document.createElement("DIV");
    pcDetails.setAttribute("class", "photo-card-details");
    pcDetails.setAttribute("tabindex", "0");
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
    photoPrice.setAttribute("tabindex", "0");
    pcDetails.appendChild(photoPrice);

    // create div for like section, contains nr of likes and heart icon
    let like = document.createElement("DIV");
    like.setAttribute("class", "like");
    pcDetails.appendChild(like);

    // create div with number of like
    let nrOfLikes = document.createElement("DIV");
    nrOfLikes.setAttribute("class", "number-of-like");
    nrOfLikes.innerHTML = pc["likes"];
    nrOfLikes.setAttribute("tabindex", "0");
    like.appendChild(nrOfLikes);

    // create div with heart icon
    let likeIcon = document.createElement("DIV");
    likeIcon.setAttribute("class", "fa fa-heart");
    likeIcon.setAttribute("aria-label", "likes");
    likeIcon.setAttribute("tabindex", "0");
    likeIcon.addEventListener("click", incrementLikes);
    likeIcon.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        likeIcon.click();
      }
    });
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
      lbImage.setAttribute("alt", pc["alt"]);
      lbImage.setAttribute(
        "src",
        "Sample%20Photos-2/" + pc["photographerId"] + "/" + pc["image"]
      );
      lbImage.setAttribute("tabindex", "0");
      lbImage.setAttribute("aria-label", pc["alt"]);
      lightboxSlide.appendChild(lbImage);
    } else {
      let video = document.createElement("VIDEO");
      video.controls = true;
      lightboxSlide.appendChild(video);
      //srcset for video
      let source = document.createElement("SOURCE");
      source.setAttribute(
        "src",
        "Sample%20Photos-2/" +
          pc["photographerId"] +
          "/" +
          pc["video"] +
          "#t=0.1"
      );
      video.appendChild(source);
      video.setAttribute("aria-label", pc["alt"]);
      video.setAttribute("alt", pc["alt"]);
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

  const photographerPrice = document.getElementById("price-pp");
  photographerPrice.innerHTML = `${photographer["price"]}$ / Day`;
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
  for (let i = 0; i < likes.length; i++) {
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
export const sortMedia = (sortby) => {
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
  for (let i = 0; i < cards.length; i++) {
    portfolio.appendChild(cards[i]);
  }
};

//last added
const photoSort = (filter) => {
  const photoCategories = document.getElementsByClassName("photo-sort");

  // Push into keepPhoto only the cards that matches the filter
  let keepPhoto = [];
  for (let i = 0; i < photoCategories.length; i++) {
    if (photoCategories[i].innerText == filter) {
      keepPhoto.push(photoCategories[i].parentNode);
    }
  }

  // hide all the cards
  let photoCards = document.getElementsByClassName("photo-card");
  for (let i = 0; i < photoCards.length; i++) {
    photoCards[i].style.display = "none";
  }
  // and display only the ones I want to keep
  for (let i = 0; i < keepPhoto.length; i++) {
    keepPhoto[i].style.display = "block";
  }
};

loadJson("fisheyedata.json", loadCallbackpp);

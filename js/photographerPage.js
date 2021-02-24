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
  img.setAttribute("alt", "Photo by " + photographer["name"]);
  img.setAttribute(
    "src",
    "Sample Photos-2/Photographers ID Photos/" + photographer["portrait"]
  );
  frontPhoto.appendChild(img);

  // generating portfolio
  const portfolio = document.getElementById("portfolio");

  // iterate all elements in media
  for (let f = 0; f < media.length; f++) {
    let pc = media[f];
    // filter by photographer ID
    if (pc["photographerId"] != urlParams.get("photographer_id")) {
      continue;
    }

    //photocard
    let photoCard = document.createElement("DIV");
    photoCard.setAttribute("class", "photo-card");
    portfolio.appendChild(photoCard);

    let picture = document.createElement("PICTURE");
    picture.setAttribute("class", "photo");
    photoCard.appendChild(picture);

    let source = document.createElement("SOURCE");
    source.setAttribute(
      "srcset",
      "Sample Photos-2/" + pc["photographerId"] + "/" + pc["image"]
    );
    picture.appendChild(source);

    let img = document.createElement("IMG");
    img.setAttribute(
      "src",
      "Sample Photos-2/" + pc["photographerId"] + "/" + pc["image"]
    );
    img.setAttribute("class", "photo");
    picture.appendChild(img);

    let pcDetails = document.createElement("DIV");
    pcDetails.setAttribute("class", "photo-card-details");
    photoCard.appendChild(pcDetails);

    let phDescription = document.createElement("DIV");
    phDescription.setAttribute("class", "photo-description");
    phDescription.innerText = pc["alt"];
    pcDetails.appendChild(phDescription);

    let photoPrice = document.createElement("DIV");
    photoPrice.setAttribute("class", "photo-price");
    photoPrice.innerHTML = pc["price"] + "$";
    pcDetails.appendChild(photoPrice);

    let like = document.createElement("DIV");
    like.setAttribute("class", "like");
    pcDetails.appendChild(like);

    let nrOfLikes = document.createElement("DIV");
    nrOfLikes.setAttribute("class", "number-of-like");
    nrOfLikes.innerHTML = pc["likes"];
    like.appendChild(nrOfLikes);

    let likeIcon = document.createElement("DIV");
    likeIcon.setAttribute("class", "fa fa-heart");
    like.appendChild(likeIcon);
  }
}

loadJson("fisheyedata.json", loadCallbackpp);

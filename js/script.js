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

function loadCallback(text) {
  let data = JSON.parse(text);
  let photographers = data["photographers"];

  // generating front-main from main page
  const frontMain = document.getElementById("front-main");

  for (let p = 0; p < photographers.length; p++) {
    let photographerCard = document.createElement("DIV");
    photographerCard.setAttribute("class", "photographer-card");
    frontMain.appendChild(photographerCard);

    let anchor = document.createElement("A");
    anchor.setAttribute(
      "href",
      "photographer-page.html?photographer_id=" + photographers[p]["id"]
    );
    photographerCard.appendChild(anchor);

    let photographerMain = document.createElement("H2");
    photographerMain.setAttribute("class", "photographer-main");
    anchor.appendChild(photographerMain);
    photographerMain.setAttribute("aria-label", photographers[p]["name"]);

    // Picture
    let picture = document.createElement("PICTURE");
    picture.setAttribute("class", "front-photo");
    photographerMain.appendChild(picture);

    let myPhoto;
    if (photographers[p]["thumbnail"]) {
      myPhoto =
        "Sample%20Photos-2/" +
        photographers[p]["id"] +
        "/" +
        photographers[p]["thumbnail"];
    } else {
      myPhoto =
        "Sample%20Photos-2/Photographers%20ID%20Photos/" +
        photographers[p]["portrait"];
    }

    let source = document.createElement("SOURCE");
    source.setAttribute("srcset", myPhoto);
    picture.appendChild(source);

    let img = document.createElement("IMG");
    img.setAttribute("alt", photographers[p]["alt"]);
    img.setAttribute("src", myPhoto);
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
    location.setAttribute("tabindex", "0");
    details.appendChild(location);

    let description = document.createElement("DIV");
    description.setAttribute("class", "description");
    description.innerHTML = photographers[p]["tagline"];
    description.setAttribute("tabindex", "0");
    details.appendChild(description);

    let price = document.createElement("DIV");
    price.setAttribute("class", "price");
    price.innerHTML = "$" + photographers[p]["price"] + "/day";
    price.setAttribute("tabindex", "0");
    details.appendChild(price);

    // Categories
    let categories = document.createElement("DIV");
    categories.setAttribute("class", "photographer-categories");
    photographerCard.appendChild(categories);

    for (let i = 0; i < photographers[p]["tags"].length; i++) {
      let button = document.createElement("BUTTON");
      button.setAttribute("class", "filter filter-card", "btn");
      button.setAttribute(
        "onclick",
        "filterSelection('" + photographers[p]["tags"][i] + "')"
      );
      button.innerHTML = "#" + photographers[p]["tags"][i];
      categories.appendChild(button);

      let buttonSr = document.createElement("SPAN");
      buttonSr.setAttribute("class", "sr-only");
      buttonSr.innerText = "Tag";
      button.appendChild(buttonSr);
    }
  }
}

loadJson("fisheyedata.json", loadCallback);

// eslint-disable-next-line no-unused-vars
const filterSelection = (filter) => {
  const categories = document.getElementsByClassName("filter-card");

  // Push into keepCard only the cards that matches the filter
  let keepCard = [];
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].textContent.slice(1, -3) == filter) {
      keepCard.push(categories[i].parentNode.parentNode);
    }
  }

  // hide all the cards
  let cards = document.getElementsByClassName("photographer-card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.display = "none";
  }
  // and display only the ones I want to keep
  for (let i = 0; i < keepCard.length; i++) {
    keepCard[i].style.display = "flex";
  }
};

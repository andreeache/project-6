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
      "Sample Photos-2/Photographers ID Photos/" + photographers[p]["portrait"]
    );
    picture.appendChild(source);

    let img = document.createElement("IMG");
    img.setAttribute("alt", "Photo by " + photographers[p]["name"]);
    img.setAttribute(
      "src",
      "Sample Photos-2/Photographers ID Photos/" + photographers[p]["portrait"]
    );
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
      button.setAttribute("class", "filter filter-card");
      button.innerHTML = "#" + photographers[p]["tags"][i];
      categories.appendChild(button);
    }
  }
}

loadJson("fisheyedata.json", loadCallback);

const filterSelection = (filter) => {
  const categories = document.getElementsByClassName("filter-card");

  // Push into keepCard only the cards that matches the filter
  let keepCard = [];
  for (i = 0; i < categories.length; i++) {
    if (categories[i].innerText == "#" + filter) {
      keepCard.push(categories[i].parentNode.parentNode);
    }
  }

  // hide all the cards
  let cards = document.getElementsByClassName("photographer-card");
  for (i = 0; i < cards.length; i++) {
    cards[i].style.display = "none";
  }
  // and display only the ones I want to keep
  for (i = 0; i < keepCard.length; i++) {
    keepCard[i].style.display = "flex";
  }
};

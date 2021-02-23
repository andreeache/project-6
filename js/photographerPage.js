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
  
  function loadCallbackpp(text) {
    let data = JSON.parse(text);
    let media = data["media"];

// generating portfolio
    const portfolio = document.getElementById("portfolio");
    // get the parameter dictionary
    const urlParams = new URLSearchParams(window.location.search);

    // iterate all elements in media
    for (let f = 0; f < media.length; f++) 
    {
        let pc = media[f];
    // filter by photographer ID
        if (pc['photographerId'] != urlParams.get("photographer_id")) {
            continue;
        }

      //photocard
        let photoCard = document.createElement("DIV");
        photoCard.setAttribute("class", "photo-card");
        photoCard.innerText=pc['image'];
        portfolio.appendChild(photoCard);

        let img = document.createElement("IMG");
        img.setAttribute("src", "Sample Photos-2/" + pc["photographerId"] + "/" + pc["image"]);
        photoCard.appendChild(img);
      }
}


loadJson("fisheyedata.json", loadCallbackpp);
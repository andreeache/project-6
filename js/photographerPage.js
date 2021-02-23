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
        portfolio.appendChild(photoCard);
        
        let picture = document.createElement("PICTURE");
        picture.setAttribute("class", "photo");
        photoCard.appendChild(picture);

        let source = document.createElement("SOURCE");
        source.setAttribute("srcset", "Sample Photos-2/" + pc["photographerId"] + "/" + pc["image"]);
        picture.appendChild(source);


        let img = document.createElement("IMG");
        img.setAttribute("src", "Sample Photos-2/" + pc["photographerId"] + "/" + pc["image"]);
        img.setAttribute ("class", "photo")
        picture.appendChild(img);

        
        let pcDetails = document.createElement("DIV");
        pcDetails.setAttribute("class", "photo-card-details");
        photoCard.appendChild(pcDetails);


        let phDescription = document.createElement("DIV");
        phDescription.setAttribute("class", "photo-description" );
        phDescription.innerText = pc ["image"];
        pcDetails.appendChild(phDescription);

        let photoPrice = document.createElement("DIV");
        photoPrice.setAttribute("class","photo-price");
        photoPrice.innerHTML = pc["price"] + '$';
        pcDetails.appendChild(photoPrice);

        let like = document.createElement("DIV");
        like.setAttribute("class", "like");
        pcDetails.appendChild(like);

        let nrOfLikes = document.createElement("DIV");
        nrOfLikes.setAttribute("class", "number-of-like");
        nrOfLikes.innerHTML = pc ["likes"];
        like.appendChild(nrOfLikes);

        let likeIcon = document.createElement("DIV");
        likeIcon.setAttribute("class", "fa fa-heart");
        like.appendChild(likeIcon);

      }





}


loadJson("fisheyedata.json", loadCallbackpp);
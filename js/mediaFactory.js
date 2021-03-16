// Media Factory with classes - factory method pattern 

class mediaImage {
  constructor(jsonDict, currentIndex) {
    this.jsondict = jsonDict;
    this.currentIndex = currentIndex;
  }

  generate() {
    //create picture element
    let picture = document.createElement("PICTURE");
    picture.setAttribute("class", "photo");
    picture.setAttribute("alt", this.jsondict["alt"] + ", closeup view");
    picture.setAttribute("aria-label", this.jsondict["alt"] + ", closeup view");
    picture.setAttribute("tabindex", "0");
    // srcset for picture
    let source = document.createElement("SOURCE");
    source.setAttribute(
      "srcset",
      "Sample%20Photos-2/" +
        this.jsondict["photographerId"] +
        "/" +
        this.jsondict["image"]
    );
    picture.appendChild(source);

    //create img element
    let img = document.createElement("IMG");
    img.setAttribute(
      "src",
      "Sample%20Photos-2/" +
        this.jsondict["photographerId"] +
        "/" +
        this.jsondict["image"]
    );
    img.setAttribute("class", "hover-shadow cursor");
    img.setAttribute(
      "onclick",
      "openLightbox();currentSlide(" + String(this.currentIndex) + ")"
    );
    img.setAttribute("alt", this.jsondict["alt"]);
    picture.appendChild(img);

    picture.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        img.click();
      }
    });

    return picture;
  }
}

class mediaVideo {
  constructor(jsonDict, currentIndex) {
    this.jsondict = jsonDict;
    this.currentIndex = currentIndex;
  }

  generate() {
    let video = document.createElement("VIDEO");
    video.controls = false;
    video.setAttribute("class", "video");
    video.setAttribute("alt", this.jsondict["alt"] + ", closeup view");
    video.setAttribute("aria-label", this.jsondict["alt"] + ", closeup view");
    //srcset for video
    let source = document.createElement("SOURCE");
    source.setAttribute(
      "src",
      "Sample%20Photos-2/" +
        this.jsondict["photographerId"] +
        "/" +
        this.jsondict["video"] +
        "#t=0.1"
    );
    source.setAttribute("alt", this.jsondict["alt"]);
    video.setAttribute(
      "onClick",
      "openLightbox();currentSlide(" + String(this.currentIndex) + ")"
    );
    video.appendChild(source);
    video.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        source.click();
      }
    });

    return video;
  }
}

export class mediaFactory {
  constructor(jsonDict, currentIndex) {
    if (jsonDict["image"]) {
      return new mediaImage(jsonDict, currentIndex);
    } else {
      return new mediaVideo(jsonDict, currentIndex);
    }
  }
}

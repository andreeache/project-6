import { sortMedia } from "./photographerPage.js";

// dropdown, followed example from W3 website
/* Look for any elements with the class "dropdown-select": */
const dropdownSelect = document.getElementsByClassName("dropdown-select");
let i;
for (i = 0; i < dropdownSelect.length; i++) {
  createMasterDDElement(dropdownSelect[i]);
}

function createMasterDDElement(ddSelect) {
  const selElmnt = ddSelect.getElementsByTagName("select")[0];
  /* For each element, create a new DIV that will act as the selected item: */
  let topSelectedItem = document.createElement("DIV");
  topSelectedItem.setAttribute("class", "select-selected");
  topSelectedItem.innerHTML =
    selElmnt.options[selElmnt.selectedIndex].innerHTML;
  ddSelect.appendChild(topSelectedItem);
  /* For each element, create a new DIV that will contain the option list: */
  let restOfList = document.createElement("DIV");
  restOfList.setAttribute("class", "select-items select-hide");
  createDDElement(restOfList, selElmnt, topSelectedItem);
  ddSelect.appendChild(restOfList);

  topSelectedItem.addEventListener("click", function (e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
 
  return topSelectedItem;
}

function createDDElement(aParent, selElmnt, aTopParent) {
  let j;
  for (j = 0; j < selElmnt.length; j++) {
    /* For each option in the original select element,
        create a new DIV that will act as an option item: */
    if (aTopParent.innerHTML == selElmnt.options[j].innerHTML) {
      continue;
    }
    let c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    // eslint-disable-next-line no-unused-vars
    c.addEventListener("click", function (e) {
      /* When an item is clicked, update the original select box,
            and the selected item: */
      let i, s, h;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      h = this.parentNode.previousSibling;
      for (i = 0; i < s.length; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;

          /* recreate all the divs */
          let p = aTopParent.parentNode;
          p.removeChild(aTopParent);
          p.removeChild(aParent);
          h = createMasterDDElement(p);
          sortMedia(this.innerText);
          break;
        }
      }
    });
    aParent.appendChild(c);
  }
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  let i;
  let arrNo = [];
  let x = document.getElementsByClassName("select-items");
  let y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeAllSelect() ;
  
  }
});
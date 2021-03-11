import { sortMedia } from "./photographerPage.js";

// dropdown, followed example from W3 website
/* Look for any elements with the class "dropdown-select": */
const dropdownSelect = document.getElementsByClassName("dropdown-select");
let i;
for (i = 0; i < dropdownSelect.length; i++) {
  createMasterDDElement(dropdownSelect[i]);
}

function openCloseDD(e) {
  /* When the select box is clicked, close any other select boxes,
  and open/close the current select box: */
  e.stopPropagation();
  window.topItem.nextSibling.classList.toggle("select-hide");
  window.topItem.classList.toggle("select-arrow-active");
}

function ddKeyDown(e) {
  const selElmnt = document.getElementsByTagName("select")[0];

  if (e.key === "ArrowDown") {
    if (selElmnt.selectedIndex < selElmnt.length - 1) {
      selElmnt.selectedIndex += 1;
      recreateAllDropdownDivs(window.topItem, window.topItem.nextSibling);
    }
  } else if (e.key === "ArrowUp") {
    if (selElmnt.selectedIndex > 0) {
      selElmnt.selectedIndex -= 1;
      recreateAllDropdownDivs(window.topItem, window.topItem.nextSibling);
    }
  } else if (e.key === "Enter") {
    openCloseDD(e);
  } else {
    return;
  }
  e.preventDefault();
  e.stopPropagation();
}

// eslint-disable-next-line no-unused-vars
function ddKeysOn(_) {
  window.addEventListener("keydown", ddKeyDown);
}

// eslint-disable-next-line no-unused-vars
function ddKeysOff(_) {
  window.removeEventListener("keydown", ddKeyDown);
}

function createMasterDDElement(ddSelect) {
  const selElmnt = ddSelect.getElementsByTagName("select")[0];
  /* For each element, create a new DIV that will act as the selected item: */
  let topSelectedItem = document.createElement("DIV");
  topSelectedItem.setAttribute("class", "select-selected");
  topSelectedItem.innerHTML =
    selElmnt.options[selElmnt.selectedIndex].innerHTML;
  ddSelect.appendChild(topSelectedItem);
  window.topItem = topSelectedItem;
  /* For each element, create a new DIV that will contain the option list: */
  let restOfList = document.createElement("DIV");
  restOfList.setAttribute("class", "select-items select-hide");
  createDDElement(restOfList, selElmnt, topSelectedItem);
  ddSelect.appendChild(restOfList);

  ddSelect.addEventListener("click", openCloseDD);
  ddSelect.addEventListener("focusin", ddKeysOn);
  ddSelect.addEventListener("focusout", ddKeysOff);

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
      // the hidden select box
      let s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      for (let i = 0; i < s.length; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          recreateAllDropdownDivs(aTopParent, aParent);
          break;
        }
      }
    });
    aParent.appendChild(c);
  }
}

const recreateAllDropdownDivs = (aTopParent, aParent) => {
  /* recreate all the dropdown related divs */
  let p = aTopParent.parentNode;
  p.removeChild(aTopParent);
  p.removeChild(aParent);
  createMasterDDElement(p);
  // eslint-disable-next-line no-undef
  sortMedia(window.topItem.innerText);
};

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
    closeAllSelect();
  }
});

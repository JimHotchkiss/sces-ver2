window.addEventListener("load", (event) => {
  selectionsEventListener();
  fadeIn();
  loadPageAtTop();
  ButtonEventListener();
  Store.removeSelections();
});

const ButtonEventListener = () => {
  const buttonDiv = document.getElementsByClassName("button-div");
  for (let item of buttonDiv) {
    item.addEventListener("click", () => {
      Store.removeSelections();
      resetSelectionDiv();
      resetMenuItemMargin();
      resetMenuBars();
      resetSelectionDescription();
      resetshowToTopButton();
      window.scrollTo(0, 0);
    });
  }
};

const selectionsEventListener = () => {
  const selectionDiv = document.getElementsByClassName("selection-div");
  for (let item of selectionDiv) {
    item.addEventListener("click", () => {
      let selectedItem = item;
      let selectedItemId = item.children.item(0).children.item(1).id;
      checkSelection(selectedItemId, selectedItem);
      // Store.removeSelections(selectedItemId);
    });
  }
};

const checkSelection = (selectedItemId, selectedItem) => {
  if (Store.getSelections()[0] === selectedItemId) {
    console.log("if");
    Store.removeSelections();
    resetSelectionDiv();
    resetMenuItemMargin();
    resetMenuBars();
    resetSelectionDescription();
    resetSubtopicLiMargin(selectedItem);
    // showToTopButton();
    // showSubtopicDiv();
    // changeborderLeft(selectedItem);
    // changeDescriptionColor(selectedItem);
    // showSubtopicDiv(selectedItem);
  } else {
    console.log("else");
    Store.removeSelections();
    Store.addSelections(selectedItemId);
    resetSelectionDiv();
    resetMenuItemMargin();
    resetMenuBars();
    resetSelectionDescription();
    showToTopButton();
    changeborderLeft(selectedItem);
    changeSubtopicLiMargin(selectedItem);
    changeDescriptionColor(selectedItem);
  }
};

const resetSubtopicLiMargin = (selectedItem) => {
  const liDivs = selectedItem.children.item(1).children.item(0);
  liDivs.classList.remove("subtopic-ul-selected");
};

const changeSubtopicLiMargin = (selectedItem) => {
  const liDivs = selectedItem.children.item(1).children.item(0);
  liDivs.classList.add("subtopic-ul-selected");
};

const resetshowToTopButton = () => {
  const buttonDiv = document.getElementById("button");
  buttonDiv.classList.remove("button-show");
};

const showToTopButton = () => {
  const buttonDiv = document.getElementById("button");
  buttonDiv.classList.add("button-show");
};

const resetSelectionDescription = () => {
  const selectionDescription = document.getElementsByClassName(
    "selection-description"
  );
  for (let item of selectionDescription) {
    item.classList.remove("selection-description-selected");
  }
};

const resetMenuBars = () => {
  const menuIcon = document.getElementsByClassName("menu-icon");
  for (let item of menuIcon) {
    let menuCollection = item.children;
    for (let menuItem of menuCollection) {
      menuItem.classList.remove("menu-bar-selected");
    }
  }
};

const resetMenuItemMargin = () => {
  const menuItem = document.getElementsByClassName("menu-icon");
  for (let item of menuItem) {
    item.classList.remove("menu-icon-selected");
  }
};

const resetSelectionDiv = () => {
  const selectionDiv = document.getElementsByClassName("selection-div");
  for (let item of selectionDiv) {
    item.classList.remove("selection-div-selected");
  }
};

const changeDescriptionColor = (selectedItem) => {
  const selectionDescription = selectedItem.children.item(0).children.item(1);
  selectionDescription.classList.add("selection-description-selected");
};

const changeborderLeft = (selectedItem) => {
  let menuItem = selectedItem.children.item(0);
  menuItemMargin(menuItem);
  menuBar(menuItem);
  selectedItem.classList.add("selection-div-selected");
};

const menuItemMargin = (menuItem) => {
  menuItem.children.item(0).classList.add("menu-icon-selected");
};

const changeBackground = (selectedItem) => {
  selectedItem.classList.add("selected-div-selected");
};

const menuBar = (menuItem) => {
  const menuBars = menuItem.children.item(0).children;
  for (let item of menuBars) {
    item.classList.add("menu-bar-selected");
  }
};

// Fade in
const fadeIn = () => {
  const faders = document.getElementsByClassName("fade-in");

  const appearOptions = { threshold: 1 };
  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        entry.target.classList.remove("appear");
        return;
      }
      entry.target.classList.add("appear");
      lockScroll();
    });
  },
  appearOptions);

  for (const fader of faders) {
    appearOnScroll.observe(fader);
  }
};

const loadPageAtTop = () => {
  window.scrollTo(0, 0);
};

const lockScroll = () => {
  document.body.classList.add("no-scroll");
};

// Store Class: Handles User's Selections
class Store {
  // Get selection
  static getSelections() {
    let selections;
    if (localStorage.getItem("selections") === null) {
      selections = [];
    } else {
      selections = JSON.parse(localStorage.getItem("selections"));
    }
    return selections;
  }

  // Add Selections
  static addSelections(selection) {
    const selections = Store.getSelections();
    selections.push(selection);
    localStorage.setItem("selections", JSON.stringify(selections));
  }

  // Remove selections
  static removeSelections(index) {
    const selections = Store.getSelections();
    selections.length = 0;
    localStorage.setItem("selections", JSON.stringify(selections));
  }
}

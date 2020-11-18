window.addEventListener("load", (event) => {
  selectionsEventListener();
  fadeIn();
  loadPageAtTop();
  ButtonEventListener();
});

const ButtonEventListener = () => {
  const buttonDiv = document.getElementsByClassName("button-div");
  for (let item of buttonDiv) {
    item.addEventListener("click", () => {
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
      console.log(item.children);
      resetSelectionDiv();
      resetMenuItemMargin();
      resetMenuBars();
      resetSelectionDescription();
      showToTopButton();
      showSubtopicDiv();
      let selectedItem = item;
      changeborderLeft(selectedItem);
      changeDescriptionColor(selectedItem);
      showSubtopicDiv(selectedItem);
    });
  }
};

const showSubtopicDiv = (selectedItem) => {
  if (selectedItem !== undefined) {
    document
      .querySelector(`#subtopic-${selectedItem.children[1].id}`)
      .classList.toggle("subtopic-div-show");
  }
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
  const selectionDescription = selectedItem.children.item(1);
  selectionDescription.classList.add("selection-description-selected");
};

const changeborderLeft = (selectedItem) => {
  let menuItem = selectedItem.children.item(0);
  menuItemMargin(menuItem);
  menuBar(menuItem);
  selectedItem.classList.add("selection-div-selected");
};

const menuItemMargin = (menuItem) => {
  menuItem.classList.add("menu-icon-selected");
};

const changeBackground = (selectedItem) => {
  selectedItem.classList.add("selected-div-selected");
};

const menuBar = (menuItem) => {
  const menuBars = menuItem.children;
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
  // console.log(window.pageYOffset, window.pageXOffset);
  document.body.classList.add("no-scroll");
};

window.addEventListener("load", (event) => {
  selectionsEventListener();
});

const selectionsEventListener = () => {
  const selectionDiv = document.getElementsByClassName("selection-div");
  for (let item of selectionDiv) {
    item.addEventListener("click", () => {
      resetSelectionBorder();
      resetMenuItemMargin();
      let selectedItem = item;
      changeborderLeft(selectedItem);
      changeBackground(selectedItem);
      changeDescriptionColor(selectedItem);
    });
  }
};

const resetMenuItemMargin = () => {
  const menuItem = document.getElementsByClassName("menu-icon");
  for (let item of menuItem) {
    item.classList.remove("menu-icon-selected");
  }
};

const resetSelectionBorder = () => {
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

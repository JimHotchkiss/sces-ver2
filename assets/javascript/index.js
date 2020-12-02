window.addEventListener("load", (event) => {
  selectionsEventListener()
  // fadeIn();
  // loadPageAtTop();
  // ButtonEventListener();
  // subTopicUlEventListener();
  Store.removeSelections()
  subTopicEventListener()
})

// Content Material
const tower_material = [
  {
    topic1:
      "Dicta sapiente in reprehenderit praesentium cum quibusdam assumenda possimus minima! Impedit totam doloribus autem laboriosam nulla deleniti debitis eaque quas pariatur fuga. Ex fuga incidunt optio ipsam adipisci quidem voluptatem.",
  },
  {
    topic2:
      "Dicta sapiente in reprehenderit praesentium cum quibusdam assumenda possimus minima! Impedit totam doloribus autem laboriosam nulla deleniti debitis eaque quas pariatur fuga. Ex fuga incidunt optio ipsam adipisci quidem voluptatem.",
  },
  {
    topic3:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quam, ipsa excepturi qui reiciendis ducimus dolor ab suscipit doloribus dicta minima nisi debitis at. Aliquam quaerat ducimus quo debitis facilis?",
  },
  {
    topic4:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quam, ipsa excepturi qui reiciendis ducimus dolor ab suscipit doloribus dicta minima nisi debitis at. Aliquam quaerat ducimus quo debitis facilis?",
  },
  {
    topic5:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quam, ipsa excepturi qui reiciendis ducimus dolor ab suscipit doloribus dicta minima nisi debitis at. Aliquam quaerat ducimus quo debitis facilis?",
  },
  {
    topic6:
      "Dicta sapiente in reprehenderit praesentium cum quibusdam assumenda possimus minima! Impedit totam doloribus autem laboriosam nulla deleniti debitis eaque quas pariatur fuga. Ex fuga incidunt optio ipsam adipisci quidem voluptatem.",
  },
]

// const subTopicUlEventListener = () => {
//   const subTopicLi = document.getElementsByClassName("tower-subtopic-li");
//   for (let item of subTopicLi) {
//     item.addEventListener("click", () => {
//       // hide content image
//       showTopicMaterial();
//       // hideTopicContent();
//     });
//   }
// };

// const hideTopicContent = () => {
//   const topicDiv = document.getElementsByClassName("topic-div");
//   for (let item of topicDiv) {
//     item.classList.add("topic-div-hide");
//   }
//   showTopicMaterial();
// };

// const showTopicContent = () => {
//   const topicDiv = document.getElementsByClassName("topic-div");
//   for (let item of topicDiv) {
//     item.classList.remove("topic-div-hide");
//   }
// };

// const showTopicMaterial = () => {
//   const topicsDiv = document.getElementById("topics-div");
//   topicsDiv.innerHTML = "";
//   const topicMaterialText = document.createElement("p");
//   topicMaterialText.setAttribute("class", "topic-material-text");
//   topicMaterialText.setAttribute("id", "topic-material-text");
//   topicMaterialText.innerText = tower_material[0].topic1;
//   const topicMaterialText2 = document.createElement("p");
//   topicMaterialText2.setAttribute("class", "topic-material-text");
//   topicMaterialText2.setAttribute("id", "topic-material-text2");
//   topicMaterialText2.innerText = tower_material[1].topic2;
//   const nextBtnDiv = document.createElement("div");
//   nextBtnDiv.setAttribute("class", "tower-next-btn");
//   nextBtnDiv.setAttribute("id", "tower-next-btn");
//   nextBtnDiv.innerText = "Next";
//   topicsDiv.appendChild(topicMaterialText);
//   topicsDiv.appendChild(topicMaterialText2);
//   topicsDiv.appendChild(nextBtnDiv);
//   towerNextBtnEventListener();
// };

// const towerNextBtnEventListener = () => {
//   const towerNextBtn = document.getElementById("tower-next-btn");
//   towerNextBtn.addEventListener("click", () => {
//     showTopicNextPage();
//   });
// };

// const showTopicNextPage = () => {
//   const topicText = document.getElementById("topic-material-text");
//   const topicText2 = document.getElementById("topic-material-text2");
//   topicText.innerText = "";
//   topicText.innerText = tower_material[2].topic3;
//   topicText2.innerText = "";
//   topicText2.innerText = tower_material[3].topic4;
//   changeBtnText();
// };

// const changeBtnText = () => {
//   const towerNextBtn = document.getElementById("tower-next-btn");
//   towerNextBtn.innerText = "Quiz";
// };

// const hideMaterialsDiv = () => {
//   const materialsDiv = document.getElementsByClassName("materials-div");
//   for (let item of materialsDiv) {
//     item.classList.remove("materials-div-show");
//   }
// };

// const ButtonEventListener = () => {
//   const buttonDiv = document.getElementsByClassName("button-div");
//   for (let item of buttonDiv) {
//     item.addEventListener("click", () => {
//       Store.removeSelections();
//       resetSelectionDiv();
//       resetMenuItemMargin();
//       resetMenuBars();
//       resetSelectionDescription();
//       resetshowToTopButton();
//       window.scrollTo(0, 0);
//     });
//   }
// };

const subTopicEventListener = () => {
  const towerSubtopicLic = document.getElementsByClassName("tower-subtopic-li")
  for (let item of towerSubtopicLic) {
    item.addEventListener("click", (event) => {
      console.log(event.target.dataset.topic)
    })
  }
}

const selectionsEventListener = () => {
  const selectionDiv = document.getElementsByClassName("selection-description")
  for (let item of selectionDiv) {
    item.addEventListener("click", () => {
      let selectedItem = item.parentElement.parentElement
      let selectedItemId = item.parentElement.parentElement.children
        .item(0)
        .children.item(1).dataset.topic
      checkSelection(selectedItemId, selectedItem)
    })
  }
}

const checkSelection = (selectedItemId, selectedItem) => {
  if (Store.getSelections()[0] === selectedItemId) {
    console.log("if")
    Store.removeSelections()
    resetSelectionDiv()
    resetMenuItemMargin()
    resetMenuBars()
    resetSelectionDescription()
    // resetSubtopicLiMargin(selectedItem);
    showIntroSection()
    hideContentSection()
    // resetshowToTopButton();
    // hideMaterialsDiv();
    // showTopicContent();
    // window.scrollTo(0, 0);
  } else {
    console.log("else")
    Store.removeSelections()
    Store.addSelections(selectedItemId)
    hideContentSection()
    resetSelectionDiv()
    resetMenuItemMargin()
    resetMenuBars()
    resetSelectionDescription()
    // showToTopButton();
    changeborderLeft(selectedItem)
    // changeSubtopicLiMargin(selectedItem);
    changeDescriptionColor(selectedItem)
    hideIntroSection()
    showContentSection()
  }
}

const hideContentSection = () => {
  const contentSectionDivs = document.getElementsByClassName("content-section")
  for (let item of contentSectionDivs) {
    item.classList.remove("content-section-show")
  }
}

const showContentSection = () => {
  const selection = Store.getSelections()[0]
  const contentSection = document.getElementById(selection)
  contentSection.classList.add("content-section-show")
}

const hideIntroSection = () => {
  const introductionSection = document.getElementById("introduction")
  introductionSection.classList.add("introduction-hide")
}

const showIntroSection = () => {
  const introductionSection = document.getElementById("introduction")
  introductionSection.classList.remove("introduction-hide")
}

// const resetSubtopicLiMargin = (selectedItem) => {
//   const liDivs = selectedItem.children.item(1).children.item(0);
//   liDivs.classList.remove("subtopic-ul-selected");
// };

// const changeSubtopicLiMargin = (selectedItem) => {
//   const liDivs = selectedItem.children.item(1).children.item(0);
//   liDivs.classList.add("subtopic-ul-selected");
// };

// const resetshowToTopButton = () => {
//   const buttonDiv = document.getElementById("button");
//   buttonDiv.classList.remove("button-show");
// };

// const showToTopButton = () => {
//   const buttonDiv = document.getElementById("button");
//   buttonDiv.classList.add("button-show");
// };

const resetSelectionDescription = () => {
  const selectionDescription = document.getElementsByClassName(
    "selection-description"
  )
  for (let item of selectionDescription) {
    item.classList.remove("selection-description-selected")
  }
}

const resetMenuBars = () => {
  const menuIcon = document.getElementsByClassName("menu-icon")
  for (let item of menuIcon) {
    let menuCollection = item.children
    for (let menuItem of menuCollection) {
      menuItem.classList.remove("menu-bar-selected")
    }
  }
}

const resetMenuItemMargin = () => {
  const menuItem = document.getElementsByClassName("menu-icon")
  for (let item of menuItem) {
    item.classList.remove("menu-icon-selected")
  }
}

const resetSelectionDiv = () => {
  const selectionDiv = document.getElementsByClassName("selection-description")
  for (let item of selectionDiv) {
    item.parentElement.parentElement.classList.remove("selection-div-selected")
  }
}

const changeDescriptionColor = (selectedItem) => {
  const selectionDescription = selectedItem.children.item(0).children.item(1)
  selectionDescription.classList.add("selection-description-selected")
}

const changeborderLeft = (selectedItem) => {
  let menuItem = selectedItem.children.item(0)
  menuItemMargin(menuItem)
  menuBar(menuItem)
  selectedItem.classList.add("selection-div-selected")
}

const menuItemMargin = (menuItem) => {
  menuItem.children.item(0).classList.add("menu-icon-selected")
}

// const changeBackground = (selectedItem) => {
//   selectedItem.classList.add("selected-div-selected");
// };

const menuBar = (menuItem) => {
  const menuBars = menuItem.children.item(0).children
  for (let item of menuBars) {
    item.classList.add("menu-bar-selected")
  }
}

// Fade in
// const fadeIn = () => {
//   const faders = document.getElementsByClassName("fade-in");

//   const appearOptions = { threshold: 1 };
//   const appearOnScroll = new IntersectionObserver(function (
//     entries,
//     appearOnScroll
//   ) {
//     entries.forEach((entry) => {
//       if (!entry.isIntersecting) {
//         entry.target.classList.remove("appear");
//         return;
//       }
//       entry.target.classList.add("appear");
//       lockScroll();
//     });
//   },
//   appearOptions);

//   for (const fader of faders) {
//     appearOnScroll.observe(fader);
//   }
// };

// const loadPageAtTop = () => {
//   window.scrollTo(0, 0);
// };

// const lockScroll = () => {
//   document.body.classList.add("no-scroll");
// };

// Store Class: Handles User's Selections
class Store {
  // Get selection
  static getSelections() {
    let selections
    if (localStorage.getItem("selections") === null) {
      selections = []
    } else {
      selections = JSON.parse(localStorage.getItem("selections"))
    }
    return selections
  }

  // Add Selections
  static addSelections(selection) {
    const selections = Store.getSelections()
    selections.push(selection)
    localStorage.setItem("selections", JSON.stringify(selections))
  }

  // Remove selections
  static removeSelections(index) {
    const selections = Store.getSelections()
    selections.length = 0
    localStorage.setItem("selections", JSON.stringify(selections))
  }
}

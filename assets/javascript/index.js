window.addEventListener("load", (event) => {
  selectionsEventListener()
  // fadeIn();
  // loadPageAtTop();
  // Bsubtopics-ulttonEventListener();
  Store.removeSelections()
  Skills.removeSubtopicArray()
  subTopicEventListener()
  nextSubtopicEventListener()
})

// Content Material
const tower_material = [
  {
    name: "topic 1",
    description:
      "Topic 1Dicta sapiente in reprehenderit praesentium cum quibusdam assumenda possimus minima! Impedit totam doloribus autem laboriosam nulla deleniti debitis eaque quas pariatur fuga. Ex fuga incidunt optio ipsam adipisci quidem voluptatem.",
  },
  {
    name: "topic 2",
    description:
      "Topic 2Dicta sapiente in reprehenderit praesentium cum quibusdam assumenda possimus minima! Impedit totam doloribus autem laboriosam nulla deleniti debitis eaque quas pariatur fuga. Ex fuga incidunt optio ipsam adipisci quidem voluptatem.",
  },
  {
    name: "topic 3",
    description:
      "Topic 3Dicta sapiente in reprehenderit praesentium cum quibusdam assumenda possimus minima! Impedit totam doloribus autem laboriosam nulla deleniti debitis eaque quas pariatur fuga. Ex fuga incidunt optio ipsam adipisci quidem voluptatem.",
  },
  {
    name: "topic 4",
    description:
      "Topic 4 Dicta sapiente in reprehenderit praesentium cum quibusdam assumenda possimus minima! Impedit totam doloribus autem laboriosam nulla deleniti debitis eaque quas pariatur fuga. Ex fuga incidunt optio ipsam adipisci quidem voluptatem.",
  },
  {
    name: "topic 5",
    description:
      "Topic 5Dicta sapiente in reprehenderit praesentium cum quibusdam assumenda possimus minima! Impedit totam doloribus autem laboriosam nulla deleniti debitis eaque quas pariatur fuga. Ex fuga incidunt optio ipsam adipisci quidem voluptatem.",
  },
  {
    name: "topic 6",
    description:
      "Topic 6Dicta sapiente in reprehenderit praesentium cum quibusdam assumenda possimus minima! Impedit totam doloribus autem laboriosam nulla deleniti debitis eaque quas pariatur fuga. Ex fuga incidunt optio ipsam adipisci quidem voluptatem.",
  },
]

const nextSubtopicEventListener = () => {
  const subtopicNextButton = document.getElementById("subtopic-next-button")
  subtopicNextButton.addEventListener("click", () => {
    // change subtopicTextColor
    changeSubtopicTextColor()
  })
}

const changeSubtopicTextColor = () => {
  console.log(selection)
  if (selection.classList.value === "subtopic1-text") {
    console.log(selection)
    selection.classList.add("subtopic1-text-color")
  } else {
    selection.classList.add("subtopic2-text-color")
  }
}

const subTopicEventListener = () => {
  const subTopicDivs = document.getElementsByClassName("subtopic-div")
  for (let item of subTopicDivs) {
    item.firstChild.addEventListener("click", () => {
      const selection = item.firstChild.dataset.subtopic
      Skills.addSubtopic(selection)
      hideSubtopicsUl()
      // changeSubtopicTextColor(item.firstChild)
      populateSubtopicContent(selection)
    })
  }
}

// const changeSubtopicTextColor = (selection) => {

// }

const hideSubtopicsUl = () => {
  const subtopicsUl = document.getElementById("subtopics-ul")
  subtopicsUl.classList.add("subtopic-ul-hide")
}

const populateSubtopicContent = (selection) => {
  tower_material.map((item) => {
    if (item.name === selection) {
      const subtopicMaterialDiv = document.getElementById(
        "subtopic-material-text"
      )
      subtopicMaterialDiv.innerText = item.description
      subtopicMaterialDiv.classList.add("subtopic-material-text-animate")
    }
  })
  showNextBtn()
}

const showNextBtn = () => {
  const subtopicNextButton = document.getElementById("subtopic-next-button")
  subtopicNextButton.classList.add("subtopic-next-button-show")
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
    resetSubTopicMaterialDiv()
    resetSubtopicTextColor()
    resetMenuItemMargin()
    resetMenuBars()
    resetSelectionDescription()
    // showToTopButton();
    changeborderLeft(selectedItem)
    // changeSubtopicLiMargin(selectedItem);
    changeDescriptionColor(selectedItem)
    hideIntroSection()
    showContentSection()
    loadSubTopics(selectedItem)
  }
}

const resetSubTopicMaterialDiv = () => {
  const subtopicsUl = document.getElementById("subtopics-ul")
  subtopicsUl.classList.remove("subtopic-ul-hide")
  resetMaterialText()
  resetNextButton()
}

const resetMaterialText = () => {
  const subtopicMaterialText = document.getElementById("subtopic-material-text")
  subtopicMaterialText.innerText = ""
}

const resetNextButton = () => {
  const subtopicNextButton = document.getElementById("subtopic-next-button")
  subtopicNextButton.classList.remove("subtopic-next-button-show")
}

const resetSubtopicTextColor = () => {
  const subtopic1Text = document.getElementsByClassName("subtopic1-text")
  for (item of subtopic1Text) {
    item.classList.remove("subtopic1-text-color")
  }
  // if (selection.dataset.subtopic === "topic 1") {
  //   selection.classList.add("subtopic1-text-color")
  // } else {
  //   selection.classList.add("subtopic2-text-color")
  // }
}

const loadSubTopics = (selectedItem) => {
  const subTopicsArray = []
  let subTopics
  if (selectedItem.id === "topic-one") {
    subTopics = document.getElementsByClassName("subtopic1-text")
  } else {
    subTopics = document.getElementsByClassName("subtopic2-text")
  }
  for (item of subTopics) {
    subTopicsArray.push(item.dataset.subtopic)
  }
  Skills.addSubtopicArray(subTopicsArray)
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
    console.log(selection)
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

// Skills Class - Handles users skills progress
class Skills {
  // a function that grabs all the subtopics?
  static getSubtopicsArray() {
    let subTopicSelectionsArray
    if (localStorage.getItem("subTopicSelectionsArray") === null) {
      subTopicSelectionsArray = []
    } else {
      subTopicSelectionsArray = JSON.parse(
        localStorage.getItem("subTopicSelectionsArray")
      )
    }
    return subTopicSelectionsArray
  }

  static getSubTopics() {
    let subTopics
    if (localStorage.getItem("subTopics") === null) {
      subTopics = []
    } else {
      subTopics = JSON.parse(localStorage.getItem("subTopics"))
    }
    return subTopics
  }

  static addSubtopicArray(subTopicsArray) {
    let subTopicSelectionsArray = Skills.getSubtopicsArray()
    subTopicsArray.map((subTopic) => subTopicSelectionsArray.push(subTopic))

    localStorage.setItem(
      "subTopicSelectionsArray",
      JSON.stringify(subTopicSelectionsArray)
    )
  }

  static addSubtopic(selectedItem) {
    const subtopics = Skills.getSubTopics()
    subtopics.push(selectedItem)
    localStorage.setItem("subTopicSelections", JSON.stringify(subtopics))
    console.log(subtopics)
  }

  static removeSubtopic() {
    const subtopicSelections = Skills.getSubTopics()
    subtopicSelections.length = 0
    localStorage.setItem("subtopic")
  }

  static removeSubtopicArray() {
    const subTopicSelectionsArray = Skills.getSubtopicsArray()
    subTopicSelectionsArray.length = 0
    localStorage.setItem(
      "subTopicSelectionsArray",
      JSON.stringify(subTopicSelectionsArray)
    )
  }
}

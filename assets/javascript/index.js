window.addEventListener("load", (event) => {
  selectionsEventListener()
  // fadeIn();
  // loadPageAtTop();
  // Bsubtopics-ulttonEventListener();
  Store.removeSelections()
  Skills.removeSubtopicArray()
  subTopicEventListener()
})

// Content Material
const tower_material = [
  {
    name: "Maneuvers monitor",
    competencies: [
      {
        "competency 1": "Turns black knob to unlock mounting arm",
      },
      {
        "competency 2": "Uses flat panel bracket to move monitor",
      },
      {
        "competency 3":
          "Locks black knob to lock monitor when moving tower to different location",
      },
      {
        "competency 4": "States troubleshooting if monitor is blank",
      },
    ],
  },
  {
    name: "Turns on Tower",
    competencies: [
      {
        "competency 1": "Plugs in",
      },
      {
        "competency 2": "Flips main switch on front of tower",
      },
      {
        "competency 3": "Presses green power button on SDC3- has flip screen",
      },
    ],
  },
]

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
    showIntroSection()
    hideContentSection()
  } else {
    console.log("else")
    Store.removeSelections()
    Store.addSelections(selectedItemId)
    hideContentSection()
    resetSelectionDiv()
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

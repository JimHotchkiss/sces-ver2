window.addEventListener("load", (event) => {
  selectionsEventListener()
  Store.removeSelections()
  Skills.removeSubtopicArray()
  nextBtnEventListener()
  competenciesBtnImgEventListener()
})

// Content Material
const MATERIAL = [
  {
    topic: "Connected OR Cart",
    subtopics: [
      {
        name: "Maneuvers monitor",
        description: "descriptive text",
        url: "https://youtu.be/g5DKY_4tHBU",
      },
      {
        name: "Power on tower",
        description: "descriptive text",
        url: "https://youtu.be/rcQ3TL-YMho",
      },
      {
        name: "Cart transport",
        description: "descriptive text",
        url: "https://youtu.be/PV1whxY8PZ4",
      },
    ],
  },
]

const competenciesBtnImgEventListener = () => {
  const btnImg = document.getElementsByClassName("btn-img")
  for (let item of btnImg) {
    item.addEventListener("click", () => console.log(item.dataset.completed))
  }
}

const nextBtnEventListener = () => {
  const nextBtn = document.getElementsByClassName("next-btn")
  for (let item of nextBtn) {
    item.addEventListener("click", () => {
      console.log(Store.getSelections(), CONNECTED_OR_CART)
      // Hide content description
      hideContentDescription()
    })
  }
}

const hideContentDescription = () => {
  const contentDescription = document.getElementById("content-description")
  contentDescription.classList.add("content-description-hide")
}

const selectionsEventListener = () => {
  const selectionDiv = document.getElementsByClassName("selection-description")
  for (let item of selectionDiv) {
    item.addEventListener("click", () => {
      let selectedItem = item.dataset.topic
      let selectedElement = item
      loadSelectionMaterial(selectedItem)
      checkSelection(selectedItem, selectedElement)
    })
  }
}

const loadSelectionMaterial = (selectedItem) => {
  const contentListDiv = document.getElementById("content-list-div")
  const contentListDynamicTitle = document.getElementById(
    "content-list-dynamic-title"
  )

  contentListDynamicTitle.innerText = selectedItem
  console.log(selectedItem)
  MATERIAL.map((item) => {
    if (item.topic === selectedItem) {
      item.subtopics.map((subtopic) => {
        const subtopicRowDiv = document.createElement("div")
        subtopicRowDiv.setAttribute("class", "subtopic-row-div")
        if (subtopic.url !== "") {
          const subtopicVideoIcon = document.createElement("div")
          subtopicVideoIcon.setAttribute("class", "subtopic-video-icon")
          subtopicRowDiv.appendChild(subtopicVideoIcon)
        }
        const subtopicText = document.createElement("p")
        subtopicText.setAttribute("class", "subtopic-text")
        subtopicText.innerText = subtopic.name
        subtopicRowDiv.appendChild(subtopicText)
        contentListDiv.appendChild(subtopicRowDiv)
      })
    }
  })
}

const checkSelection = (selectedItem, selectedElement) => {
  console.log(Store.getSelections()[0], selectedItem)
  if (Store.getSelections()[0] === selectedItem) {
    Store.removeSelections()
    resetSelectionDiv()
    resetMenuItemMargin()
    resetMenuBars()
    showIntroSection()
    hideContentSection()
    hideMaterialsDiv()
  } else {
    Store.removeSelections()
    Store.addSelections(selectedItem)
    hideContentSection()
    resetSelectionDiv()
    resetSubtopicTextColor()
    resetMenuItemMargin()
    resetMenuBars()
    changeborderLeft(selectedElement)
    hideIntroSection()
    showContentSection()
  }
}

const hideMaterialsDiv = () => {
  const materialsDiv = document.getElementById("materials-div")
  materialsDiv.classList.remove("materials-div-show")
}

const resetSubtopicTextColor = () => {
  const subtopic1Text = document.getElementsByClassName("subtopic1-text")
  for (item of subtopic1Text) {
    item.classList.remove("subtopic1-text-color")
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
  showMaterialsDiv()
}

const showMaterialsDiv = () => {
  const materialsDiv = document.getElementById("materials-div")
  materialsDiv.classList.add("materials-div-show")
  populateMaterialsDiv()
}

const populateMaterialsDiv = () => {
  console.log(Store.getSelections())
}

const hideIntroSection = () => {
  const introductionSection = document.getElementById("introduction")
  introductionSection.classList.add("introduction-hide")
}

const showIntroSection = () => {
  const introductionSection = document.getElementById("introduction")
  introductionSection.classList.remove("introduction-hide")
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

const changeborderLeft = (selectedElement) => {
  let selectedParentDiv = selectedElement.parentElement.parentElement
  menuItemMargin(selectedParentDiv)
  menuBar(selectedParentDiv)
  selectedParentDiv.classList.add("selection-div-selected")
}

const menuItemMargin = (selectedParentDiv) => {
  selectedParentDiv.children.item(0).classList.add("menu-icon-selected")
}

const menuBar = (selectedParentDiv) => {
  const menuBars = selectedParentDiv.children.item(0).children.item(0).children
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

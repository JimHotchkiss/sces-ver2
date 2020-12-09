window.addEventListener("load", (event) => {
  selectionsEventListener()
  Store.removeSelections()
  Skills.removeSubtopicArray()
  Skills.removeSubtopic()
})

// Content Material
const MATERIAL = [
  {
    topic: "Connected OR Cart",
    subtopics: [
      {
        name: "Maneuvers monitor",
        description: "descriptive text",
        videoUrl: "https://www.youtube.com/embed/g5DKY_4tHBU",
      },
      {
        name: "Power on tower",
        description: "descriptive text",
        videoUrl: "https://www.youtube.com/embed/rcQ3TL-YMho",
        pdfUrl: "../img/pdf.png",
      },
      {
        name: "Cart transport",
        description: "descriptive text",
        videoUrl: "https://www.youtube.com/embed/PV1whxY8PZ4",
        pdfUrl: "../img/pdf.png",
      },
    ],
  },
]

const subTopicVideoIconEventListener = () => {
  const subtopicVideoIcon = document.getElementsByClassName(
    "subtopic-video-icon"
  )
  for (let item of subtopicVideoIcon) {
    item.addEventListener("click", () => {
      const selectedItem = item.dataset.subtopic
      showSubtopicVideo(selectedItem)
    })
  }
}

const showSubtopicVideo = (selectedItem) => {
  MATERIAL.map((item) => {
    item.subtopics.map((subtopic) => {
      if (subtopic.name === selectedItem) {
        const url = subtopic.videoUrl
        resetContentHtml()
        loadSubtopicVideo(url, subtopic)
      }
    })
  })
}

const loadSubtopicVideo = (url, subtopic) => {
  const contentDiv = document.getElementById("content-list-div")
  const contentTitle = document.createElement("div")
  contentTitle.setAttribute("class", "video-title")
  const completeBtn = document.createElement("div")
  completeBtn.setAttribute("class", "complete-btn")
  completeBtn.setAttribute("id", "complete-btn")
  completeBtn.setAttribute("data-topic", subtopic.name)
  completeBtn.innerText = "Complete"
  contentTitle.innerText = subtopic.name
  const iFrame = document.createElement("iframe")
  iFrame.src = url
  iFrame.width = "560"
  iFrame.height = "315"
  contentDiv.appendChild(contentTitle)
  contentDiv.appendChild(iFrame)
  contentDiv.appendChild(completeBtn)
  completeBtnEventListener()
}

const completeBtnEventListener = () => {
  const completeBtn = document.getElementById("complete-btn")
  completeBtn.addEventListener("click", () => {
    const subtopic = completeBtn.dataset.topic
    Skills.addSubtopic(subtopic)
    hideSubtopicVideo(subtopic)
  })
}

const hideSubtopicVideo = () => {
  const contentDiv = document.getElementById("content-list-div")
  contentDiv.innerText = ""
  const selection = Store.getSelections()[0]
  loadSelectionMaterial(selection)
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

  // create title
  const contentListDynamicTitle = document.createElement("div")
  contentListDynamicTitle.setAttribute("class", "content-list-dynamic-title")
  contentListDynamicTitle.innerText = selectedItem + " " + "Learning Resources"
  contentListDiv.appendChild(contentListDynamicTitle)

  MATERIAL.map((item) => {
    if (item.topic === selectedItem) {
      item.subtopics.map((subtopic) => {
        const subtopicRowDiv = document.createElement("div")
        subtopicRowDiv.setAttribute("class", "subtopic-row-div")
        if (subtopic.videoUrl !== "") {
          const subtopicVideoIcon = document.createElement("div")
          subtopicVideoIcon.setAttribute("class", "subtopic-video-icon")
          subtopicVideoIcon.setAttribute("data-subtopic", subtopic.name)
          subtopicRowDiv.appendChild(subtopicVideoIcon)
        }
        if (subtopic.pdfUrl !== "") {
          const subtopicPdfIcon = document.createElement("div")
          subtopicPdfIcon.setAttribute("class", "subtopic-pdf-icon")
          subtopicRowDiv.appendChild(subtopicPdfIcon)
        }
        const subtopicText = document.createElement("p")
        subtopicText.setAttribute("class", "subtopic-text")
        const subtopicCompleteIcon = document.createElement("div")
        if (Skills.getSubTopics().length === 0) {
          subtopicCompleteIcon.setAttribute("class", "subtopic-complete-icon")
        } else {
          Skills.getSubTopics().map((topic) => {
            if (topic === subtopic.name) {
              subtopicCompleteIcon.setAttribute(
                "class",
                "subtopic-complete-icon-complete"
              )
            } else {
              subtopicCompleteIcon.setAttribute(
                "class",
                "subtopic-complete-icon"
              )
            }
          })
        }

        subtopicText.innerText = subtopic.name
        subtopicRowDiv.appendChild(subtopicText)
        subtopicRowDiv.appendChild(subtopicCompleteIcon)
        contentListDiv.appendChild(subtopicRowDiv)
      })
    }
  })
  subTopicVideoIconEventListener()
}

const checkSelection = (selectedItem, selectedElement) => {
  if (Store.getSelections()[0] === selectedItem) {
    Store.removeSelections()
    resetSelectionDiv()
    resetContentHtml()
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

const resetContentHtml = () => {
  const contentListDiv = document.getElementById("content-list-div")
  contentListDiv.innerText = ""
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
    if (localStorage.getItem("subTopicSelections") === null) {
      subTopics = []
    } else {
      subTopics = JSON.parse(localStorage.getItem("subTopicSelections"))
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
    if (subtopics.length === 0) {
      console.log("zero")
      subtopics.push(selectedItem)
      localStorage.setItem("subTopicSelections", JSON.stringify(subtopics))
    }

    subtopics.map((topic) => {
      if (topic === selectedItem) {
        console.log(subtopics)
        return subtopics
      } else {
        console.log(topic, selectedItem, "else")
        subtopics.push(selectedItem)
        localStorage.setItem("subTopicSelections", JSON.stringify(subtopics))
      }
    })
  }

  static removeSubtopic() {
    const subtopicSelections = Skills.getSubTopics()
    subtopicSelections.length = 0
    localStorage.setItem(
      "subTopicSelections",
      JSON.stringify(subtopicSelections)
    )
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

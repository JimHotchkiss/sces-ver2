window.addEventListener("load", (event) => {
  selectionsEventListener()
  Store.removeSelections()
  Skills.removeSubtopic()
  Skills.removeSubtopicArray()
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
        pdfUrl: "../img/pdf.png",
        compentencies: [
          { description: "Turns black knob to unlock mounting arm" },
          { description: "Uses flat panel bracket to move monitor" },
          {
            description:
              "Locks black knob to lock monitor when moving tower to different location",
          },
          { description: "States troubleshooting if monitor is blank" },
        ],
      },
      {
        name: "Power on tower",
        description: "descriptive text",
        videoUrl: "https://www.youtube.com/embed/rcQ3TL-YMho",
        pdfUrl: "../img/pdf.png",
        compentencies: [
          { description: "Plugs in " },
          { description: "Flips main switch on front of tower" },
          {
            description: "Presses green power button on SDC3- has flip screen",
          },
        ],
      },
      {
        name: "Cart transport",
        description: "descriptive text",
        videoUrl: "https://www.youtube.com/embed/PV1whxY8PZ4",
        pdfUrl: "../img/pdf.png",
      },
      {
        name: "Secondary monitor",
        description: "descriptive text",
        videoUrl: "https://www.youtube.com/embed/PV1whxY8PZ4",
        pdfUrl: "../img/pdf.png",
        compentencies: [
          {
            description:
              "Locates wireless transmitter and connection token key",
          },
          {
            description:
              "Confirms secondary monitor is on wireless RGB setting",
          },
          {
            description:
              "Connects token key from transmitter to monitor slot to sync secondary monitor",
          },
          {
            description:
              "Can switch signals if needed to the secondary monitor",
          },
        ],
      },
    ],
  },
  // sterile processing
  {
    topic: "Sterile Processing",
    subtopics: [
      {
        name: "Reprocessing 1688",
        description: "descriptive text",
        videoUrl: "",
        pdfUrl: "../img/pdf.png",
        compentencies: [
          { description: "Turns black knob to unlock mounting arm" },
          { description: "Uses flat panel bracket to move monitor" },
          {
            description:
              "Locks black knob to lock monitor when moving tower to different location",
          },
          { description: "States troubleshooting if monitor is blank" },
        ],
      },
    ],
  },
]

const subtopicPdfIconEventListener = () => {
  const subtopicPdfIcon = document.getElementsByClassName("subtopic-pdf-icon")
  for (let item of subtopicPdfIcon) {
    item.addEventListener("click", () => {
      const selectedItem = item.dataset.subtopic
      // showSubtopicVideo(selectedItem)
    })
  }
}

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
  checkCompleteMaterial()
  updateResourceProgressBar()
}

const updateResourceProgressBar = () => {
  let percentage
  MATERIAL.map((item, i) => {
    if (item.topic === Store.getSelections()[0]) {
      console.log(item.topic, Store.getSelections()[0])
      const subtopicLength = Skills.getSubTopics().length
      const materialLength = MATERIAL[i].subtopics.length
      console.log(Skills.getSubTopics(), materialLength)
      if (subtopicLength === 1 && materialLength == 1) {
        console.log(subtopicLength === 1 && materialLength == 1)
        percentage = 0
      } else {
        percentage = Math.floor((subtopicLength / materialLength) * 100)
        const contentSectionProgressBar = document.getElementsByClassName(
          "content-section-progress-bar"
        )
        for (let item of contentSectionProgressBar) {
          item.style.width = `${percentage}%`
        }
      }
    }
  })
}

const checkCompleteMaterial = () => {
  if (Skills.getSubTopics().length === MATERIAL[0].subtopics.length) {
    const selectionImage = document.getElementById(
      `${Store.getSelections()[0]}-img`
    )
    if (selectionImage !== null) {
      // selectionImage.classList.add("selection-progress-img-show")
      showTestBtn()
    }
  }
}

const showTestBtn = () => {
  const contentListDiv = document.getElementById("content-list-div")
  const testBtn = document.createElement("div")
  testBtn.setAttribute("class", "test-btn")
  testBtn.setAttribute("id", "test-btn")
  testBtn.innerText = "Test yourself"
  contentListDiv.appendChild(testBtn)
  testBtnEventListener()
}

const testBtnEventListener = () => {
  const testBtn = document.getElementById("test-btn")
  testBtn.addEventListener("click", () => {
    // reset content text html
    resetContentHtml()
    // Load compentencies into local storage -> SubtopicArray
    const compentencies = MATERIAL[0].subtopics
    Skills.addSubtopicArray(compentencies)
    // reset progress bar
    resetProgressBar()
    // reset content-section-text
    // loadTestingMaterial()
    loadTestingMaterial()
  })
}

const loadTestingMaterial = () => {
  const contentDiv = document.getElementById("content-list-div")
  Skills.getSubtopicsArray()[0].compentencies.map((eachItem, index) => {
    const descriptionDiv = document.createElement("div")
    descriptionDiv.setAttribute("class", "description-div")
    descriptionDiv.innerText = eachItem.description
    contentDiv.appendChild(descriptionDiv)
  })
}

const resetProgressBar = () => {
  const contentSectionProgressBar = document.getElementsByClassName(
    "content-section-progress-bar"
  )
  for (let item of contentSectionProgressBar) {
    item.style.width = `0%`
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

  // create title
  let contentListDynamicTitle = document.getElementById(
    "content-list-dynamic-title"
  )
  if (contentListDynamicTitle === null) {
    contentListDynamicTitle = document.createElement("div")
    contentListDynamicTitle.setAttribute("id", "content-list-dynamic-title")
    contentListDynamicTitle.innerText = "Learning Resources"
  } else {
    contentListDynamicTitle.innerText = ""
    contentListDynamicTitle.innerText = "Learning Resources"
  }

  contentListDiv.appendChild(contentListDynamicTitle)
  if (selectedItem !== "Connected OR Cart") {
    const imageDiv = document.getElementById("image-div")
    imageDiv.classList.add("image-div-hide")
  } else {
    const imageDiv = document.getElementById("image-div")
    imageDiv.classList.remove("image-div-hide")
  }

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
          subtopicPdfIcon.setAttribute("data-subtopic", subtopic.name)
          subtopicRowDiv.appendChild(subtopicPdfIcon)
        }
        const subtopicText = document.createElement("p")
        subtopicText.setAttribute("class", "subtopic-text")
        const subtopicCompleteIcon = document.createElement("div")
        subtopicCompleteIcon.setAttribute("class", "subtopic-complete-icon")
        subtopicCompleteIcon.setAttribute("data-topic", subtopic.name)

        // subtopic complete ring
        const subtopicCompleteRingOuter = document.createElement("div")
        subtopicCompleteRingOuter.setAttribute(
          "class",
          "subtopic-complete-ring-outer"
        )
        const subtopicCompleteRingInner = document.createElement("div")
        subtopicCompleteRingInner.setAttribute(
          "class",
          "subtopic-complete-ring-inner"
        )

        subtopicCompleteRingOuter.appendChild(subtopicCompleteRingInner)

        // end subtopic complete ring

        subtopicText.innerText = subtopic.name
        subtopicRowDiv.appendChild(subtopicText)
        subtopicRowDiv.appendChild(subtopicCompleteIcon)
        // insert subtopic complete ring
        subtopicRowDiv.appendChild(subtopicCompleteRingOuter)
        contentListDiv.appendChild(subtopicRowDiv)
      })
    }
  })
  subtopicAmendIcon()
  subTopicVideoIconEventListener()
  subtopicPdfIconEventListener()
}

const subtopicAmendIcon = () => {
  const subtopicIconDiv = document.getElementsByClassName(
    "subtopic-complete-icon"
  )
  Skills.getSubTopics().map((topic) => {
    for (let item of subtopicIconDiv) {
      if (topic === item.dataset.topic) {
        item.className = "subtopic-complete-icon-complete"
      } else {
      }
    }
  })
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
    checkCompleteMaterial()
  } else if (
    Store.getSelections().length !== 0 &&
    Store.getSelections()[0] !== selectedItem
  ) {
    // Skills.removeSubtopic()
    Store.removeSelections()
    Store.addSelections(selectedItem)
    // reset content html
    resetContentHtml()
    // reset skills menu
    resetBorderLeft()
    resetMenuBars()
    changeborderLeft(selectedElement)
    loadSelectionMaterial(selectedItem)
    showContentSection()
    showContentSectionTitle()
    resetProgressBar()
    updateResourceProgressBar()
  } else {
    Store.removeSelections()
    Store.addSelections(selectedItem)
    hideContentSection()
    changeborderLeft(selectedElement)
    hideIntroSection()
    showContentSection()
    showContentSectionTitle()
    checkCompleteMaterial()
  }
}

const resetBorderLeft = () => {
  const selectionDivs = document.getElementsByClassName("selection-div")
  for (let item of selectionDivs) {
    item.classList.remove("selection-div-selected")
  }
}

const showContentSectionTitle = () => {
  const contentSectionTitle = document.getElementById("content-section-title")
  const hTag = contentSectionTitle.children.item(0)
  const pTage = contentSectionTitle.children.item(1)
  hTag.innerText = Store.getSelections()[0]
  pTage.innerText = "Ad auctor condimentum dis est et facilisis"
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
  const contentSection = document.getElementById("content-section")
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
  updateResourceProgressBar()
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
      subtopics.push(selectedItem)
      localStorage.setItem("subTopicSelections", JSON.stringify(subtopics))
    }

    if (
      subtopics[0] !== selectedItem &&
      subtopics[1] !== selectedItem &&
      subtopics[2] !== selectedItem
    ) {
      subtopics.push(selectedItem)
      localStorage.setItem("subTopicSelections", JSON.stringify(subtopics))
    }
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

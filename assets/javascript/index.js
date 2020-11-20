window.addEventListener("load", (event) => {
  selectionsEventListener();
  fadeIn();
  loadPageAtTop();
  ButtonEventListener();
  subTopicUlEventListener();
  Store.removeSelections();
});

var codeBlock =
  '<div class="content">' +
  "<h1>This is a heading</h1>" +
  "<p>This is a paragraph of text.</p>" +
  '<p><strong>Note:</strong> If you don\'t escape "quotes" properly, it will not work.</p>' +
  "</div>";

// Quiz Material
const questions = [
  {
    question: "1.) What is the answer to this question?",
    answers: [
      {
        answer: "(a) Answer A",
      },
      {
        answer: "(b) Answer B",
      },
      {
        answer: "(c) Answer C",
      },
    ],
    correct_answer: "a",
  },
  {
    question: "2.) What is the answer to this question?",
    answers: [
      {
        answer: "(a) Answer A",
      },
      {
        answer: "(b) Answer B",
      },
      {
        answer: "(c) Answer C",
      },
    ],
    correct_answer: "a",
  },
  {
    question: "3.) What is the answer to this question?",
    answers: [
      {
        answer: "(a) Answer A",
      },
      {
        answer: "(b) Answer B",
      },
      {
        answer: "(c) Answer C",
      },
    ],
    correct_answer: "a",
  },
  {
    question: "4.) What is the answer to this question?",
    answers: [
      {
        answer: "(a) Answer A",
      },
      {
        answer: "(b) Answer B",
      },
      {
        answer: "(c) Answer C",
      },
    ],
    correct_answer: "a",
  },
];

const subTopicUlEventListener = () => {
  const subTopicLi = document.getElementsByClassName("tower-subtopic-li");
  for (let item of subTopicLi) {
    item.addEventListener("click", () => {
      // hide content image
      hideTopicContent();
    });
  }
};

const hideTopicContent = () => {
  const topicDiv = document.getElementsByClassName("topic-div");
  for (let item of topicDiv) {
    item.classList.add("topic-div-hide");
  }
  showMaterialsDiv();
};

const showTopicContent = () => {
  const topicDiv = document.getElementsByClassName("topic-div");
  for (let item of topicDiv) {
    item.classList.remove("topic-div-hide");
  }
};

const showMaterialsDiv = () => {
  const materialsDiv = document.getElementsByClassName("materials-div");
  for (let item of materialsDiv) {
    item.classList.add("materials-div-show");
  }
  showQuiz();
};

const showQuiz = () => {
  console.log(codeBlock);
  const materialsDiv = document.getElementById("materials-div");
  const questionDiv = document.createElement("div");
  questionDiv.setAttribute("class", "question-div");
  const answerDiv = document.createElement("div");
  answerDiv.setAttribute("class", "answer-div");
  questions.map((topic) => {
    const questionPtag = document.createElement("p");
    questionPtag.setAttribute("class", "question-ptag");
    questionPtag.innerText = topic.question;
    questionDiv.appendChild(questionPtag);
    topic.answers.map((answer) => {
      const answerPtag = document.createElement("p");
      answerPtag.setAttribute("class", "answer-ptag");
      answerPtag.innerText = answer.answer;
      answerDiv.appendChild(answerPtag);
    });
  });
  materialsDiv.appendChild(questionDiv);
  materialsDiv.appendChild(answerDiv);
};

const hideMaterialsDiv = () => {
  const materialsDiv = document.getElementsByClassName("materials-div");
  for (let item of materialsDiv) {
    item.classList.remove("materials-div-show");
  }
};

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
  const selectionDiv = document.getElementsByClassName("selection-description");
  for (let item of selectionDiv) {
    item.addEventListener("click", () => {
      let selectedItem = item.parentElement.parentElement;
      let selectedItemId = item.parentElement.parentElement.children
        .item(0)
        .children.item(1).id;
      checkSelection(selectedItemId, selectedItem);
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
    resetshowToTopButton();
    hideMaterialsDiv();
    showTopicContent();
    window.scrollTo(0, 0);
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
  const selectionDiv = document.getElementsByClassName("selection-description");
  for (let item of selectionDiv) {
    item.parentElement.parentElement.classList.remove("selection-div-selected");
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

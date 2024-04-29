"use strict";

const createList = () => {
  const listWrapper = document.createElement("div");
  listWrapper.classList.add("list__wrapper");

  const listContainer = document.createElement("div");
  listContainer.classList.add("list__container");

  const listHeader = document.createElement("div");
  listHeader.classList.add("list__header");

  listHeader.addEventListener("click", () => {
    listWrapper.classList.toggle("roll");
  });

  const listTitle = document.createElement("h1");
  listTitle.classList.add("list__title");
  listTitle.innerText = "Nowa lista";
  listTitle.contentEditable = "true";
  listTitle.addEventListener("blur", (e) => {
    if (e.target.innerText.trim() === "") {
      e.target.innerText = "Nowa lista";
    }
  });

  listTitle.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.blur();
    }
  });

  const listSearch = document.createElement("input");
  listSearch.classList.add("list__search-input");
  listSearch.placeholder = "Wyszukaj...";
  listSearch.addEventListener("input", function () {
    const searchText = this.value.toLowerCase();
    const listItems = listWrapper.querySelectorAll(".list__item");

    listItems.forEach((item) => {
      const itemText = item.querySelector("span").textContent.toLowerCase();
      item.style.display = itemText.includes(searchText) ? "" : "none";
    });
  });

  const undoContainer = document.createElement("div");
  undoContainer.classList.add("list__undo-container");

  const undoButton = document.createElement("button");
  undoButton.classList.add("list__undo-btn");
  undoButton.classList.add("hidden");
  undoButton.addEventListener("click", () => undoDelete(listWrapper));

  const list = document.createElement("ul");
  list.classList.add("list");

  const listAction = document.createElement("div");
  listAction.classList.add("list__action");

  const addButton = document.createElement("button");
  addButton.classList.add("list__add-btn");

  const plus = document.createElement("div");
  plus.textContent = "+";
  plus.classList.add("plus");

  const addInput = document.createElement("input");
  addInput.classList.add("list__add-input");
  addInput.placeholder = "Nowe zadanie";

  listHeader.appendChild(listTitle);
  listWrapper.append(listHeader);

  addButton.appendChild(plus);
  listAction.append(addButton);
  listAction.append(addInput);

  undoContainer.appendChild(undoButton);

  listContainer.append(listSearch);
  listContainer.append(undoContainer);
  listContainer.append(list);
  listContainer.append(listAction);

  listWrapper.append(listContainer);

  addButton.addEventListener("click", () => addTask(listWrapper));

  return listWrapper;
};

const addTask = (listWrapper) => {
  const input = listWrapper.querySelector(".list__add-input");
  const text = input.value.trim();
  const list = listWrapper.querySelector(".list");

  if (text !== "") {
    const listItem = document.createElement("li");
    listItem.classList.add("list__item");

    const listItemContent = document.createElement("div");
    listItemContent.classList.add("list__item-content");

    const textSpan = document.createElement("span");
    textSpan.textContent = text;
    listItemContent.appendChild(textSpan);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("item__delete-btn");
    deleteBtn.textContent = "✖";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const confirmation = confirm(
        `Czy na pewno chcesz usunąć zadanie o treści: ${text}?`
      );
      if (confirmation) {
        moveToTrash(listItem, listWrapper);
      }
    });
    listItemContent.appendChild(deleteBtn);
    listItem.appendChild(listItemContent);

    listItem.addEventListener("click", () => {
      const isCompleted = listItem.classList.toggle(
        "list__item-content--completed"
      );
      let dateLabel = listItem.querySelector(".mark-date");

      if (isCompleted) {
        const now = new Date();
        const dateString = now.toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });

        if (!dateLabel) {
          dateLabel = document.createElement("h5");
          dateLabel.classList.add("mark-date");
          listItem.appendChild(dateLabel);
        }
        dateLabel.textContent = `${dateString}`;
      } else if (dateLabel) {
        dateLabel.remove();
      }
    });

    list.appendChild(listItem);
  }
  input.value = "";
};

const addList = () => {
  const board = document.querySelector(".board");
  const listAdder = document.querySelector(".list-adder__container");
  const newList = createList();
  board.insertBefore(newList, listAdder);
};

const moveToTrash = (item, listWrapper) => {
  const list = listWrapper.querySelector(".list");
  list.lastDeletedItem = item;
  item.remove();

  const undoButton = listWrapper.querySelector(".list__undo-btn");
  if (undoButton.classList.contains("hidden")) {
    undoButton.classList.remove("hidden");
  }

  console.log(list.lastDeletedItem);
};

const undoDelete = (listWrapper) => {
  const list = listWrapper.querySelector(".list");
  const undoButton = listWrapper.querySelector(".list__undo-btn");
  console.log(list.lastDeletedItem);
  if (list && list.lastDeletedItem) {
    list.appendChild(list.lastDeletedItem);
    list.lastDeletedItem = null;
    if (!undoButton.classList.contains("hidden")) {
      undoButton.classList.add("hidden");
    }
  } else {
    alert("Brak zadań w koszu!");
  }
};

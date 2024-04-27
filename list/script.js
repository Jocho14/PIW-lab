"use strict";

const createList = () => {
  const listWrapper = document.createElement("div");
  listWrapper.classList.add("list__wrapper");

  const listContainer = document.createElement("div");
  listContainer.classList.add("list__container");

  const listSearch = document.createElement("input");
  listSearch.classList.add("list__search");

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

  listContainer.append(listSearch);
  listContainer.append(list);

  listWrapper.append(listContainer);

  addButton.appendChild(plus);
  listAction.append(addButton);
  listAction.append(addInput);

  listWrapper.append(listAction);

  return listWrapper;
};

const addTask = () => {
  const input = document.querySelector(".list__add-input");
  const text = input.value;

  const list = document.querySelector(".list");
  const listItem = document.createElement("li");
  listItem.classList.add("list__element");

  listItem.innerText = text;
  list.append(listItem);
};

const addList = () => {
  const board = document.querySelector(".board");

  const newList = createList();

  board.appendChild(newList);
};

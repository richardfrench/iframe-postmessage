const app = document.querySelector(".resizing-app");
const content = app.querySelector(".content");
const removeButton = document.querySelector("#remove");

function sendHeight() {
  const height = app.clientHeight;
  // I noticed that sometimes undefined
  // was sent as the height to the parent,
  // so check for it before trying
  if (height) {
    window.parent.postMessage({ height }, "https://3iyqy.csb.app/");
  }
}

function add() {
  const item = document.createElement("div");
  item.setAttribute("class", `box gradient${randomNumber(5)}`);
  content.appendChild(item);
  if (removeButton.disabled) removeButton.disabled = false;
  sendHeight();
}

function remove() {
  const lastItem = content.lastElementChild;
  if (lastItem) lastItem.remove();
  if (!content.lastElementChild) {
    removeButton.disabled = true;
  }
  sendHeight();
}

function randomNumber(range) {
  return Math.floor(Math.random() * range) + 1;
}

// call the sendHeight function at least once on load
window.addEventListener("load", sendHeight);

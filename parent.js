let container = document.querySelector("#target");
const iframe = document.createElement("iframe");
iframe.src = "https://3iyqy.csb.app/child.html";
iframe.width = "100%";
iframe.style = "border: 0";

// contentHeight sets an arbitrary default
// then keeps track of the last size update
// to avoid setting height again if nothing changes
let contentHeight = 500;
iframe.height = contentHeight;

window.addEventListener("load", () => {
  container.appendChild(iframe);
});

window.addEventListener(
  "message",
  function (e) {
    // return early on messages not from the expected source
    if (!event.origin.match("3iyqy.csb.app")) {
      return;
    }

    // message that was passed from iframe page
    let message = e.data;

    // before I update the height,
    // I check to see if it's defined
    // and if it's changed
    if (message.height && message.height !== contentHeight) {
      iframe.height = message.height + "px";
      contentHeight = message.height;
    }
  },
  false
);

// const data = require("langs/data");

// const socket = io();

// const clientsTotal = document.getElementById("client-total");


// //keep audio in public folder(#the static files)
// const messageTone=new Audio('/message-tone.mp3')

// const messageContainer = document.getElementById("message-container");
// const nameInput = document.getElementById("name-input");
// const messageForm = document.getElementById("message-form");
// const messageInput = document.getElementById("message-input");

// messageForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   sendMessage();
// });

// socket.on("clients-total", (data) => {
//   clientsTotal.innerText = `Total Clients: ${data}`;
// });

// //here we are sending the message
// function sendMessage() {
//   // messageContainer.innerText = `${messageInput.value}`;
//   const data = {
//     name: nameInput.value,
//     message: messageInput.value,
//     dateTime: new Date(),
//   };
//   socket.emit("message", data);
//   addMessageToUI(true, data);
//   //emptying the message input field, after sending the message, (send button is submit button for the form data)
//   messageInput.value = "";
// }

// //this is receiving a message
// socket.on("chat-message", (data) => {
//     messageTone.play();
//   addMessageToUI(false, data);
// });

// function addMessageToUI(isOwnMessage, data) {
//     clearFeedback();
//   if ((messageInput = "")) return;
//   const element = `<li class="${
//     isOwnMessage ? "message-right" : "message-left"
//   }">
//           <p class="message">
//             ${data.message}
//             <span>${data.name} ● ${moment(data.dateTime).fromNow()}</span>
//           </p>
//         </li>`;

//   messageContainer.innerHTML += element;
//   //calling the scroll to bottom function whenever a new messge is added to screen
//   scrollToBottom();
// }

// function scrollToBottom() {
//   messageContainer.scrollTo(0, messageContainer.scrollHeight);
// }

// messageInput.addEventListener("focus", (e) => {
//   socket.emit("feedback", { feedback: `✍️ ${nameInput} is typing...` });
// });

// messageInput.addEventListener("keypress", (e) => {
//   socket.emit("feedback", { feedback: `✍️ ${nameInput} is typing...` });
// });

// messageInput.addEventListener("blur", (e) => {
//   socket.emit("feedback", { feedback: `` });
// });

// //using data from server, we create an li tag to typing...
// socket.on("feedback", (data) => {
//     clearFeedback();
//   const element = `<li class="message-feedback">
//           <p class="feedback" id="feedback">${data.feedback}</p>
//         </li>`;
//   messageContainer.innerHTML += element;
// });


// function clearFeedback() {
//     document.querySelector("li.message-feedback").forEach(element => {
//         //direct remove elemnt nhi hota kya?? ki aise bahar ja kar phir andar dlete kiya
//         element.parentNode.removeChild(element)
//     })
// }

const socket = io();

const clientsTotal = document.getElementById("client-total");

const messageContainer = document.getElementById("message-container");
const nameInput = document.getElementById("name-input");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

const messageTone = new Audio("/message-tone.mp3");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});

socket.on("clients-total", (data) => {
  clientsTotal.innerText = `Total Clients: ${data}`;
});

function sendMessage() {
  if (messageInput.value === "") return;
  // console.log(messageInput.value)
  const data = {
    name: nameInput.value,
    message: messageInput.value,
    dateTime: new Date(),
  };
  socket.emit("message", data);
  addMessageToUI(true, data);
  messageInput.value = "";
}

socket.on("chat-message", (data) => {
  // console.log(data)
  messageTone.play();
  addMessageToUI(false, data);
});

function addMessageToUI(isOwnMessage, data) {
  clearFeedback();
  const element = `
      <li class="${isOwnMessage ? "message-right" : "message-left"}">
          <p class="message">
            ${data.message}
            <span>${data.name} ● ${moment(data.dateTime).fromNow()}</span>
          </p>
        </li>
        `;

  messageContainer.innerHTML += element;
  scrollToBottom();
}

function scrollToBottom() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight);
}

messageInput.addEventListener("focus", (e) => {
  socket.emit("feedback", {
    feedback: `✍️ ${nameInput.value} is typing a message`,
  });
});

messageInput.addEventListener("keypress", (e) => {
  socket.emit("feedback", {
    feedback: `✍️ ${nameInput.value} is typing a message`,
  });
});
messageInput.addEventListener("blur", (e) => {
  socket.emit("feedback", {
    feedback: "",
  });
});

socket.on("feedback", (data) => {
  clearFeedback();
  const element = `
        <li class="message-feedback">
          <p class="feedback" id="feedback">${data.feedback}</p>
        </li>
  `;
  messageContainer.innerHTML += element;
});

function clearFeedback() {
  document.querySelectorAll("li.message-feedback").forEach((element) => {
    element.parentNode.removeChild(element);
  });
}
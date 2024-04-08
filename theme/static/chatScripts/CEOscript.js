var wss_protocol = window.location.protocol == "https:" ? "wss://" : "ws://";
var CEOchatSocket = new WebSocket(
    wss_protocol + window.location.host + "/ws/CEOchat/"
);
var CEOmessages = [];
var CEOstart = "Hello I am the CEO. Ask me your requirements."

CEOstartingMessage = `<ul class="space-y-2"> <li class="flex ${
    "justify-start"
    }">
    <div class="relative max-w-xl px-4 py-2 rounded-lg shadow-md
    ${
    "text-gray-700 bg-white border border-gray-200"
    }">
    <span class="block font-normal">${CEOstart}</span></div></li>`;

CEOchatSocket.onopen = function (e) {
    document.querySelector("#CEOchat-log").innerHTML = CEOstartingMessage + "</ul>";
};

CEOchatSocket.onmessage = function (e) {
    var data = JSON.parse(e.data);
    var message = data["text"];
    CEOmessages.push(message);

    var str = CEOstartingMessage;
    CEOmessages.forEach(function (msg) {
    str += `<li class="flex ${
        msg.source == "bot" ? "justify-start" : "justify-end"
    }">
    <div class="relative max-w-xl px-4 py-2 rounded-lg shadow-md
        ${
        msg.source == "bot"
            ? "text-gray-700 bg-white border border-gray-200"
            : "bg-blue-600 text-white"
        }">
        <span class="block font-normal">${msg.msg}</span></div></li>`;
    });
    str += "</ul>";
    // Select the chat log div and update its content
    var chatLogDiv = document.querySelector("#CEOchat-log");
    chatLogDiv.innerHTML = str;

    // Scroll to the bottom of the chat log
    chatLogDiv.scrollTop = chatLogDiv.scrollHeight;
};

CEOchatSocket.onclose = function (e) {
    alert("Socket closed unexpectedly, please reload the page.");
};

document.querySelector("#CEOchat-message-input").focus();
document.querySelector("#CEOchat-message-input").onkeyup = function (e) {
    if (e.keyCode === 13) {
    // enter, return
    document.querySelector("#CEOchat-message-submit").click();
    }
};

document.querySelector("#CEOchat-message-submit").onclick = function (e) {
    var messageInputDom = document.querySelector("#CEOchat-message-input");
    var message = messageInputDom.value;
    if (message.trim() == "") {
        return;
    }
    CEOchatSocket.send(
    JSON.stringify({
        text: message,
    })
    );

    messageInputDom.value = "";
};

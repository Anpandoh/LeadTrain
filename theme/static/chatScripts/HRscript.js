var wss_protocol = window.location.protocol == "https:" ? "wss://" : "ws://";
var HRchatSocket = new WebSocket(
    wss_protocol + window.location.host + "/ws/HRchat/"
);
var HRmessages = [];
var HRstart = "Hi I am human resources. What can I help you with today?"

HRstartingMessage = `<ul class="space-y-2"> <li class="flex ${
    "justify-start"
    }">
    <div class="relative max-w-xl px-4 py-2 rounded-lg shadow-md
    ${
    "text-gray-700 bg-white border border-gray-200"
    }">
    <span class="block font-normal">${HRstart}</span></div></li>`;

HRchatSocket.onopen = function (e) {
    document.querySelector("#HRchat-log").innerHTML = HRstartingMessage + "</ul>";
};

HRchatSocket.onmessage = function (e) {
    var data = JSON.parse(e.data);
    var message = data["text"];
    HRmessages.push(message);

    var str = HRstartingMessage;
    HRmessages.forEach(function (msg) {
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
    document.querySelector("#HRchat-log").innerHTML = str;
};

HRchatSocket.onclose = function (e) {
    alert("Socket closed unexpectedly, please reload the page.");
};

document.querySelector("#HRchat-message-input").focus();
document.querySelector("#HRchat-message-input").onkeyup = function (e) {
    if (e.keyCode === 13) {
    // enter, return
    document.querySelector("#HRchat-message-submit").click();
    }
};

document.querySelector("#HRchat-message-submit").onclick = function (e) {
    var messageInputDom = document.querySelector("#HRchat-message-input");
    var message = messageInputDom.value;
    HRchatSocket.send(
    JSON.stringify({
        text: message,
    })
    );

    messageInputDom.value = "";
};

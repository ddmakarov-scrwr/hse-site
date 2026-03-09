window.onload = function () {

/* ===== КАРТА ===== */

var map = L.map('map').setView([55.8039, 37.4016], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

L.marker([55.8039, 37.4016]).addTo(map)
.bindPopup("МИЭМ ВШЭ — Таллинская 34")
.openPopup();


/* ===== ЧАТ ===== */

var input = document.getElementById("chat-input");
var sendBtn = document.getElementById("send-btn");
var messages = document.getElementById("chat-messages");
var voiceBtn = document.getElementById("voice-btn");


function addMessage(text, className){

    var div = document.createElement("div");
    div.className = "message " + className;
    div.textContent = text;

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}


function botReply(text){

    var msg = text.toLowerCase();

    if(msg.includes("привет")){
        return "Привет! Рад видеть тебя на моём сайте.";
    }

    if(msg.includes("вшэ") || msg.includes("миэм")){
        return "Я учусь в МИЭМ НИУ ВШЭ.";
    }

    if(msg.includes("адрес") || msg.includes("где")){
        return "МИЭМ ВШЭ находится на Таллинской улице, 34.";
    }

    if(msg.includes("сайт") || msg.includes("проект")){
        return "Этот сайт — моя учебная работа.";
    }

    var answers = [
        "Интересный вопрос.",
        "Расскажи подробнее.",
        "Я подумаю над этим.",
        "Хорошая тема.",
        "Давай обсудим."
    ];

    return answers[Math.floor(Math.random()*answers.length)];
}


sendBtn.onclick = function(){

    var text = input.value;

    if(text === "") return;

    addMessage("Вы: " + text, "user");

    setTimeout(function(){
        addMessage("Автор: " + botReply(text), "bot");
    }, 500);

    input.value = "";
};


/* ===== ГОЛОСОВОЙ ВВОД ===== */

if ('webkitSpeechRecognition' in window) {

var recognition = new webkitSpeechRecognition();
recognition.lang = "ru-RU";

voiceBtn.onclick = function(){
    recognition.start();
};

recognition.onresult = function(event){

    var speech = event.results[0][0].transcript;

    input.value = speech;

};

}

};

let close = document.getElementById("close");
let chatBot = document.getElementById("chatBot");
let chatBtn = document.getElementById("chatBtn")
close.addEventListener("click",function(){
    chatBot.style.display="none"
})


chatBtn.addEventListener("click",function(){
    chatBot.style.display="block"
})
var messageModal = document.getElementById("messageModal");
var messageCapsule = document.getElementById("capsule_3");
var closeMessageBtn = document.getElementsByClassName("closeBtn")[1];
var messageContent = document.getElementById("messageContent");
var messageSender = document.getElementById("messageSender");
var upVoteBtn = document.getElementById("upVote");
var downVoteBtn = document.getElementById("downVote");
let getMessageCount = 0;
// Events
document.addEventListener('DOMContentLoaded', bindUpVote);
document.addEventListener('DOMContentLoaded', bindDownVote);
document.addEventListener('DOMContentLoaded', getMessage);
document.addEventListener('DOMContentLoaded', closeMessageModal);
messageCapsule.addEventListener('click', openMessageModal);
closeMessageBtn.addEventListener('click', closeMessageModal);
window.addEventListener('click', outsideMessageModalClick);

// Function to open modal
function openMessageModal(){
    messageModal.style.display = "block";
}

// Function to close modal
function closeMessageModal(){
    messageModal.style.display = "none";
}
// Close modal on outside click
function outsideMessageModalClick(e){
    if(e.target === messageModal){
        messageModal.style.display = "none";
    }
}

// Get message from DB
function getMessage(){
    var req = new XMLHttpRequest();
        
    req.open("GET", "/api/messages", true);

    req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400) {
                var response = JSON.parse(req.responseText);
                if((response.score > -3 && getMessageCount < 5) || (getMessageCount >= 5)){
                    messageContent.textContent = response.message;
                    messageSender.textContent = "Sender: " + response.name;
                    upVoteBtn.setAttribute("data-id", response._id);
                    downVoteBtn.setAttribute("data-id", response._id);
                }
                else{
                    console.log(getMessageCount++);
                    getMessage();
                }
           }
        else {
            messageContent.textContent = "There has been an error.";
            messageSender.textContent = "N/A"
            console.log("Error in network request: " + req.statusText);
        }});
    req.send(null);
    
    event.preventDefault();
}

function bindUpVote(){
    upVoteBtn.addEventListener('click', function(event){

        upVoteBtn.classList.add('vote-buttons-clicked');
        upVoteBtn.disabled = true;
        downVoteBtn.disabled = true;

        var req = new XMLHttpRequest();
        var payload = {};
        payload.scoreChange = 1;
            req.open("POST", '/api/messages/' + upVoteBtn.getAttribute('data-id'), true);
            req.setRequestHeader('Content-Type','application/json');
            req.addEventListener('load',function(){
                if(req.status >= 200 && req.status < 400)
                {
                    //var response = JSON.parse(req.responseText);
                    //console.log(response);

                } else {
                    console.log("Error in network request: " + req.statusText);
                }});
            req.send(JSON.stringify(payload));
            event.preventDefault();
 });
}

function bindDownVote(){
    downVoteBtn.addEventListener('click', function(event){

        downVoteBtn.classList.add('vote-buttons-clicked');
        upVoteBtn.disabled = true;
        downVoteBtn.disabled = true;
        
        var req = new XMLHttpRequest();
        var payload = {};
        payload.scoreChange = -1;
            req.open("POST", '/api/messages/' + downVoteBtn.getAttribute('data-id'), true);
            req.setRequestHeader('Content-Type','application/json');
            req.addEventListener('load',function(){
                if(req.status >= 200 && req.status < 400)
                {
                    //var response = JSON.parse(req.responseText);
                    //console.log(response);

                } else {
                    console.log("Error in network request: " + req.statusText);
                }});
            req.send(JSON.stringify(payload));
            event.preventDefault();
 });
}
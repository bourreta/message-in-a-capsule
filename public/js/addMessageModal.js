var addMessageModal = document.getElementById("addMessageModal");
var addMessageBtn = document.getElementById("addMessageBtn");
var closeMessageBtn = document.getElementsByClassName("closeBtn")[2];


// Events
document.addEventListener('DOMContentLoaded', bindSubmit);
document.addEventListener('DOMContentLoaded', closeAddMessageModal);
addMessageBtn.addEventListener('click', openAddMessageModal);
closeMessageBtn.addEventListener('click', closeAddMessageModal);
window.addEventListener('click', outsideAddMessageModalClick);


// Function to open modal
function openAddMessageModal(){
    addMessageModal.style.display = "block";
}

// Function to close modal
function closeAddMessageModal(){
    addMessageModal.style.display = "none";
}
// Close modal on outside click
function outsideAddMessageModalClick(e){
    if(e.target === addMessageModal){
        addMessageModal.style.display = "none";
    }
}

// Count and display # of chars entered for message textarea input
function countChars(e){
    var numChars = document.getElementById("numChars");
    numChars.textContent = e.value.length + "/400";
}

function bindSubmit(){
    document.getElementById('submitBtn').addEventListener('click', function(event){

        var req = new XMLHttpRequest();
        var payload = {};
        
        payload.name = document.getElementById('newName').value;
        payload.message = document.getElementById('newMessage').value;
        if(payload.message.length >= 40 && payload.name.length >= 2){
            req.open("POST", '/api/messages', true);
            req.setRequestHeader('Content-Type','application/json');
            req.addEventListener('load',function(){
                if(req.status >= 200 && req.status < 400)
                {
                    var response = JSON.parse(req.responseText);
                    //console.log(response);
            
                } else {
                    console.log("Error in network request: " + req.statusText);
                }});
            req.send(JSON.stringify(payload));
            event.preventDefault();
            document.getElementById('newName').value = ""
            document.getElementById('newMessage').value = "";
            document.getElementById('modal-form').style.display = "none";
            document.getElementById('message-sent').style.display = "block";
        }
 });
}
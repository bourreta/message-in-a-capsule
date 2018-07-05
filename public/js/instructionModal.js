var instructionModal = document.getElementById('instructionModal');
var modalBtn = document.getElementById('modalBtn');
var closeBtn = document.getElementsByClassName('closeBtn')[0];

// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
document.addEventListener('DOMContentLoaded', openModal);
window.addEventListener('click', outsideClick);

// Function to open modal
function openModal(){
    instructionModal.style.display = "block";
}

// Function to close modal
function closeModal(){
    instructionModal.style.display = "none";
}

function outsideClick(e){
    if(e.target === instructionModal){
        instructionModal.style.display = "none";
    }
}
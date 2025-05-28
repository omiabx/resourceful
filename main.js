const editBTN = document.getElementById("edit");
const uploadTab = document.getElementById('upload');
const submitBTN = document.getElementById('submitbtn');
const titleInput = document.getElementById('inputtitle');
const descInput = document.getElementById('inputdescription');
const fileInput = document.getElementById('inputfile');
const titleWarning = document.getElementById('titlewarning');
const descWarning = document.getElementById('descriptionwarning');
const fileWarning = document.getElementById('filewarning');
const mainPage = document.getElementById('mainpage');
const form = document.getElementById('upload');
const body = document.getElementById('pagebody');
const overlay = document.getElementById('overlay');
const cancelBTN = document.getElementById('cancelbtn');

editBTN.onclick = function(){
    if (form.style.display == 'none') {
        form.style.display = 'block';
        body.className = 'modal-active';
        overlay.style.display = 'block';
    }
    
};

cancelBTN.onclick = function(){
    if (form.style.display == 'block'){
        form.style.display = 'none';
        body.className = '';
        overlay.style.display = 'none';
    }
}


submitBTN.onclick = function(){
    if (titleInput.value == ""){
        titleWarning.style.display = 'block';
    }else{
        titleWarning.style.display = 'none';
    }
    if (fileInput.value == ""){
        fileWarning.style.display = 'block';
    }else{
       fileWarning.style.display = 'none'; 
    }


};

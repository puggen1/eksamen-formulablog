
let form = document.querySelector("form");
form.addEventListener("submit", validateForm);
let reqNameLength = 5;
let reqSubLength = 15;
let reqMesLength = 25;
let success = document.querySelector("#success");
let regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function validateForm(event){
    event.preventDefault();
    console.log(event);
    //path to what need validation
    let name = event.path[0][0];
    let email = event.path[0][1];
    let subject = event.path[0][2];
    let message = event.path[0][3];
    //response for what is true or false;
    let nameStatus = inputLength(reqNameLength, name);
    let emailStatus = emailValidation(regex, email)
    let SubjectStatus = inputLength(reqSubLength, subject);
    let messageStatus = inputLength(reqMesLength, message);
    if(nameStatus && emailStatus && SubjectStatus && messageStatus){
        console.log("form submitted");
        successMessage(success, `<i class="fas fa-check-circle"></i>Form submitted successfully!`);
        }
    else{
        console.log("error");
        hideMessage(success)
        

    }
}

/***********************************************
Reset Button
***********************************************/
//might not need
let resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", reset)
function reset(event){
    console.log(event)
    for(let i = 0; i < 4; i++){
        hideMessage(event.path[2][i]);
    }
    hideMessage(document.querySelector("#success"))
}

/***********************************************
validations functions
***********************************************/
function inputLength(requiredNumber, target){
    let errorMessage = requiredNumber + " characters long";
    if(target.value.length > requiredNumber){
        hideMessage(target)
        return true;
    }
    else{
        showMessage(target, errorMessage)
        return false;
    }
}
function emailValidation(validation, target){
    let email = target.value.trim();
    let validationStatus = validation.test(email)
    console.log(validationStatus, typeof email)
    if(validationStatus){
        hideMessage(target);
    }
    else{
        showMessage(target)
    }
    return validationStatus;

}
/***********************************************
show error messages
***********************************************/
function showMessage(target, requirement="a valid Email"){
    let messagePlacement = document.querySelector(`#${target.id}Msg`)
    messagePlacement.classList.remove("hidden")
    messagePlacement.innerHTML = `needs to be ${requirement}`;

}
function hideMessage(target){
    let messagePlacement = document.querySelector(`#${target.id}Msg`)
    //so screen readers dont read the message
    messagePlacement.classList.add("hidden")
}
function successMessage(target, msg){
    let messagePlacement = document.querySelector(`#${target.id}Msg`);
    let messageDiv = document.querySelector(`#${target.id}`);
    console.log(messagePlacement)
    messagePlacement.innerHTML = msg;
    messagePlacement.classList.remove("hidden");
    messageDiv.classList.remove("hidden");
}
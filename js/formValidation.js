let form = document.querySelector("form");
form.addEventListener("submit", validateForm);

let fields = document.querySelectorAll("input, textarea");

//has true or false based on if submit have been pressed
let submitBtnPressed = false;
let isSubmitted = false;
//the required lengths for the form

//currently the same regex i used in the js ca, it works so i dont know if i should switch it

let regex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//this for loop and eventlistener triggers when the submit button has been pressed, but some field are not valid, then when the fields are being filled, the error message will hide when req is met;
for (let field of fields) {
  field.addEventListener("keyup", function () {
    if (emailValidation(regex, field) || inputLength(field)) {
      hideMessage(document.activeElement);
    }
  });
  field.addEventListener("blur", function () {
    if (field.id == "email") {
      emailValidation(regex, field);
    } else {
      inputLength(field);
    }
  });
}
const success = document.querySelector("#success");
function validateForm(event) {
  event.preventDefault();
  submitBtnPressed = true;

  //path to what need validation
  let name = event.target[0];
  let email = event.target[1];
  let subject = event.target[2];
  let message = event.target[3];
  //response for what is true or false;
  let nameStatus = inputLength(name);
  let emailStatus = emailValidation(regex, email);
  let SubjectStatus = inputLength(subject);
  let messageStatus = inputLength(message);
  if (nameStatus && emailStatus && SubjectStatus && messageStatus) {
    isSubmitted = true;
    console.log("form submitted");
    successMessage(
      success,
      `<i class="fas fa-check-circle"></i>Form submitted successfully!`
    );
  } else {
    console.log("error");
    hideMessage(success);
  }
}

/***********************************************
Reset Button
***********************************************/
//since the reset button reset all fields on default i first thought i didnt need this, but then i found out that i needed to hide the error messages.

let resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", reset);
function reset(event) {
  isSubmitted = false;
  submitBtnPressed = false;
  for (let i = 0; i < 4; i++) {
    hideMessage(event.path[2][i]);
  }
  hideMessage(document.querySelector("#success"));
}

/***********************************************
validations functions
***********************************************/
function inputLength(target) {
  let requiredNumber;
  if (target.id == "name") {
    requiredNumber = 5;
  } else if (target.id == "subject") {
    requiredNumber = 15;
  } else {
    requiredNumber = 25;
  }
  let errorMessage = requiredNumber + " characters long";
  if (target.value.length > requiredNumber) {
    hideMessage(target);
    return true;
  } else {
    showMessage(target, errorMessage);
    return false;
  }
}
function emailValidation(validation, target) {
  let email = target.value.trim();
  let validationStatus = validation.test(email);
  console.log(validationStatus, typeof email);
  if (validationStatus) {
    hideMessage(target);
  } else {
    showMessage(target);
  }
  return validationStatus;
}
/***********************************************
show error messages
***********************************************/
function showMessage(target, requirement = "a valid Email") {
  //this if statement helps the keyup eventlistener so it wont show message before required length is true
  if (document.activeElement == target) {
    return;
  }
  let messagePlacement = document.querySelector(`#${target.id}Msg`);
  messagePlacement.classList.remove("hidden");
  messagePlacement.innerHTML = `needs to be ${requirement}`;
}
function hideMessage(target) {
  let messagePlacement = document.querySelector(`#${target.id}Msg`);
  messagePlacement.classList.add("hidden");
}
function successMessage(target, msg) {
  //this message box shows up when all the fields are true
  let messagePlacement = document.querySelector(`#${target.id}Msg`);
  let messageDiv = document.querySelector(`#${target.id}`);
  console.log(messagePlacement);
  messagePlacement.innerHTML = msg;
  messagePlacement.classList.remove("hidden");
  messageDiv.classList.remove("hidden");
}

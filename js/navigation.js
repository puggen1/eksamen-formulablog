// navigation mobile

let navBarIcon = document.querySelector("#header i");
let navBar = document.querySelector("#nav")
navBarIcon.addEventListener("click", toggleNavIcon);

function toggleNavIcon(){
    if(navBarIcon.classList.contains("fa-bars")){
        navBarIcon.classList.replace("fa-bars", "fa-times");
    }
    else{
        navBarIcon.classList.replace("fa-times", "fa-bars");
        
    }
    toggleNav();
}
function toggleNav(){
    if(!navBar.classList.contains("show")){
        navBar.style.display = "grid";
    }
    else{
        navBar.style.display = "none";
    }
        navBar.classList.toggle("show")
    }
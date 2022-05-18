// navigation mobile

let navBarIcon = document.querySelector("#header i");
let navBar = document.querySelector("#nav")
navBarIcon.addEventListener("click", toggleNavIcon);

function toggleNavIcon(){
    if(navBarIcon.classList.contains("fa-bars")){
        navBarIcon.classList.remove("fa-bars");
        navBarIcon.classList.add("fa-times")
    }
    else{
        navBarIcon.classList.add("fa-bars");
        navBarIcon.classList.remove("fa-times")
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
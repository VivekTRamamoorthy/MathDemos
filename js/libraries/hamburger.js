// Look for .hamburger
const hamburgerContainer = document.querySelector(".hamburger-container");
const navbar = document.querySelector("nav");
const hamburger = document.querySelector(".hamburger");
const navButtons = document.querySelectorAll("nav>button");
const header = document.querySelector("header");
const title = document.getElementById("title");
// On click
hamburgerContainer.addEventListener("click", function() {
    console.log('toggle navbar buttons')
    hamburger.classList.toggle("is-active");
    navButtons.forEach(element=>{element.classList.toggle("is-active")});
    navbar.classList.toggle("is-active")
    header.classList.toggle("is-active")
    title.classList.toggle("is-active")
})
navbar.addEventListener("click", function() {
    console.log('toggle navbar buttons')
    hamburger.classList.toggle("is-active");
    navButtons.forEach(element=>{element.classList.toggle("is-active")});
    navbar.classList.toggle("is-active")
    header.classList.toggle("is-active")
    title.classList.toggle("is-active")
})


hamburgerContainer.addEventListener("touchdown", function() {
    console.log('toggle navbar buttons')
    hamburger.classList.toggle("is-active");
    navButtons.forEach(element=>{element.classList.toggle("is-active")});
    navbar.classList.toggle("is-active")
    header.classList.toggle("is-active")
    title.classList.toggle("is-active")
})
navbar.addEventListener("touchdown", function() {
    console.log('toggle navbar buttons')
    hamburger.classList.toggle("is-active");
    navButtons.forEach(element=>{element.classList.toggle("is-active")});
    navbar.classList.toggle("is-active")
    header.classList.toggle("is-active")
    title.classList.toggle("is-active")
})
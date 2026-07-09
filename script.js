const menuBtn = document.querySelector("#menu-toggle");
const menu = document.querySelector("#nav-links");


menuBtn.addEventListener("click",()=>{

    menu.classList.toggle("active");
    menuBtn.classList.toggle("active");

});

const links = document.querySelectorAll(".nav-links a");

links.forEach(link=>{

    link.addEventListener("click",()=>{

        menu.classList.remove("active");
        menuBtn.classList.remove("active");

    });

});
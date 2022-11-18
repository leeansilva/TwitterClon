/////////BOTONES NAV/////////////////

const index = document.querySelector(".__home")
const explore = document.querySelector(".__search")
const notifications = document.querySelector(".__notifications");
const messages = document.querySelector(".__message");
const bkmarks = document.querySelector(".__saves");
const list = document.querySelector(".__list");
const profile = document.querySelector(".__profile");
const moreOptions = document.querySelector(".__moreoptions")
///////////////notificaciones/////////////////

index.addEventListener("click",(e)=>{
    e.preventDefault();
    window.open("http://localhost/Twitter/Home/","_self");
})

notifications.addEventListener("click",(e)=>{
    e.preventDefault();

    window.open("http://localhost/Twitter/Home/Notifications/notifications.html","_self");
})

///////////////mensajes/////////////////
messages.addEventListener("click",(e)=>{
    e.preventDefault();

    window.open("http://localhost/Twitter/Home/Messages/messages.html","_self");
})

///////////////guardados/////////////////
bkmarks.addEventListener("click",(e)=>{
    e.preventDefault();

    window.open("http://localhost/Twitter/Home/Bookmarks/bookmarks.html","_self");
})

///////////////listas/////////////////
list.addEventListener("click",(e)=>{
    e.preventDefault();

    alert("Estoy trabajando en eso :)");
})

///////////////perfil/////////////////
profile.addEventListener("click",(e)=>{
    e.preventDefault();

    window.open("http://localhost/Twitter/Home/Profile/profile.html","_self");
})

///////////////opciones/////////////////
moreOptions.addEventListener("click",(e)=>{
    e.preventDefault();

    window.open("http://localhost/Twitter/Home/MoreOptions/MoreOptions.html","_self");
})

///////////////buscar/////////////////
explore.addEventListener("click",(e)=>{
    e.preventDefault();

    alert("Estoy trabajando en eso :)")
})

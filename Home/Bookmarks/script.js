// "use strict"

const homeTweets = document.querySelector(".home-tweets");
const cantidadDeTweets = document.querySelectorAll(".h-t__tweet1")
// const tweet = document.createElement("div");
const regContainer = document.querySelector(".reg-container")
const nameUser = document.getElementById("name");
const buttonSend = document.getElementById("next");

//datos de usuario=

const imagenPerfil1 = document.querySelector(".imagenProfile1");
const imagenPerfil2 = document.querySelector(".imagenProfile2");
const imagenPerfil3 = document.querySelector(".imagenProfile3");
const imagenPerfilModal = document.getElementById("modalImg")

const nombre = document.querySelector(".account__profile");
const userName1 = document.querySelector(".user")




const cargarMasPublis = entry =>{
 if (entry[0].isIntersecting === true) {
        cargarPublicaciones(2);
        }

}
let options = {
    root: document.querySelector('home-tweets'),
    rootMarginTop: '0px',
    threshold: 1.0
  }

const observer = new IntersectionObserver(cargarMasPublis,options);

const createTweet = (name,screenName,imgP,content,date,favorites,rt,imagen,idi) =>{
    // const centerContainer = document.querySelector(".container-center")
    // const container = document.createElement("div");

    const tweet = document.createElement("div");
    
    const imgProfile = document.createElement("img");
        
    const tweetTop = document.createElement("div");
        const profile = document.createElement("a");
        const user = document.createElement("span");
        const time = document.createElement("a");
        const bars = document.createElement("a");
        const iBars = document.createElement("i");

    const tweetCenter = document.createElement("div");
        const text = document.createElement("p");
        const imagn = document.createElement("img");

    const tweetBottom = document.createElement("div");
        const comentButton = document.createElement("div");

        const retweetButton = document.createElement("div");
        
        const likeButton = document.createElement("a");

        const shareButton = document.createElement("div");
        const iShareButton = document.createElement("i");

    // container.classList.add("home-tweets");
        imgProfile.classList.add("profile");
    tweet.classList.add("h-t__tweet1");
    tweet.setAttribute("id",`t${idi}`)
    
    tweetTop.classList.add("tweet__top");
        profile.classList.add("profile");
        user.classList.add("user-profile");
        time.classList.add("time");
        iBars.classList.add("fa-solid");
        bars.classList.add("bars");
        iBars.classList.add("fa-bars");

    tweetCenter.classList.add("tweet__center");
    tweetCenter.setAttribute("id",`cTw${idi}`)
        text.classList.add("text");
    
    tweetBottom.classList.add("tweet_bottom");
        comentButton.classList.add("tweets__comment-button");
        comentButton.setAttribute("id",`c${idi}`)

        retweetButton.classList.add("tweets__retweet-button");
        retweetButton.setAttribute("id",`r${idi}`);

        likeButton.classList.add("tweets__like-button");
        likeButton.setAttribute("id",`l${idi}`);
        

        shareButton.classList.add("tweets__share-button");
        iShareButton.classList.add("fa-solid");
        iShareButton.classList.add("fa-share-nodes");

    // container.appendChild(tweet);

    tweet.appendChild(imgProfile)
    tweet.appendChild(tweetTop);
    tweet.appendChild(tweetCenter);
    tweet.appendChild(tweetBottom);


    tweetTop.appendChild(profile);
    tweetTop.appendChild(user);
    tweetTop.appendChild(time);
    tweetTop.appendChild(bars);
    bars.appendChild(iBars);

    tweetCenter.appendChild(text);

    tweetBottom.appendChild(comentButton);
    
    tweetBottom.appendChild(retweetButton);
    
    tweetBottom.appendChild(likeButton);
    
    tweetBottom.appendChild(shareButton);
    shareButton.appendChild(iShareButton);
    
    homeTweets.appendChild(tweet);

    imgProfile.src = imgP;
    profile.textContent = name;
    user.textContent = screenName;
    text.textContent = content;
    time.textContent = " · "+ date;
    retweetButton.innerHTML = `<i id='r${idi}' class="fa-solid fa-retweet"></i>` + rt;
    likeButton.innerHTML = `<div class="like-bg"><div id='l${idi}' class="fa-solid fa-cora"></div></div>` + favorites;
    comentButton.innerHTML = `<i id='c${idi}' class="fa-solid fa-comment"></i>`
    imagn.src = imagen;

    if (imagn.src = imagen){
    tweetCenter.appendChild(imagn);
    }
    
    interacciones(idi);

    return tweet
}


const cargarPublicaciones = async num => {

    const request = await fetch("tweets.txt");//pedimos datos
    const content = await request.json();
    const arr = content.content; //una vez que se cargan los datos accedemos al content;
   

    let documentFragment = document.createDocumentFragment(); //creamos document fragment para usarlo dps
    
    
    for (let i = 0; i < num; i++) { //creamos un for que se ejecuta siempre que i sea menor  a num

       

      if(arr[i] != undefined) { //si arr tiene una posicion que no es undefined o una posicion llamada imagen
        
            

        let UID = Math.floor(Math.random() * 200);
        
      
        const newPublicacion = createTweet(arr[i+UID].name,arr[i+UID].nameScreen,arr[i+UID].imgProfile,arr[i+UID].text,arr[i+UID].date,arr[i+UID].favorites,arr[i+UID].rt,arr[i+UID].imagen,uuid.v1(i)); //new publicacion es el codigo con arr[posicion].nombre y .contenido
      documentFragment.appendChild(newPublicacion); //metemos new publicacion en document fragment
      
      if (i == num-1) observer.observe(newPublicacion); //si i es igual a num-1, ejecutamos observer y obvservamos nueva publicacion, osea cada 10 publis.
                             //al ejecutarse el observer, se van a mostrar 4 publis dinamicamente.  
                                 
    }  else {   //si hay una posicion undefined en arr:                                          
        let noMore = document.createElement("h3");//creamos h3 
        noMore.textContent = "No hay mas publicaciones";
        documentFragment.appendChild(noMore);
        break; //el break es para que no se ejecute mas esta funcion.
    } 
    }
    
    homeTweets.appendChild(documentFragment); //metemos el document fragment en publicaciones.
}  

cargarPublicaciones(10) //llamamos a la funcion y pedimos las primeras 4 publis

//revisar como quedo el html y el codigo del json 

///Indexed DB
const IDBRequest1 = indexedDB.open("Users",1);

const getIDBData = (mode) =>{
    const db = IDBRequest1.result;
    const IDBtransaction = db.transaction("name",mode);
    const objectStore = IDBtransaction.objectStore("name");
    return [objectStore,IDBtransaction];
}
//read data, para eso usamos "cursor"
const getObjetos = ()=>{
    const IDBData = getIDBData("readonly");
    const cursor = IDBData[0].openCursor();
    cursor.addEventListener("success",()=>{
        if(cursor.result){
        //    console.log(cursor.result.key,cursor.result.value,cursor.result.value.email,cursor.result.value.password)
        cursor.result.continue()
            
        }
    })
}
//evento success para verificar 
IDBRequest1.addEventListener("success",()=>{
    getObjetos();
    leerObjetos();
})

 const modObjeto = (key,objeto) =>{
    const IDBData = getIDBData("readwrite")
    IDBData[0].put(objeto,key); //buscamos esa key, si ya existe lo modifica, si no lo agrega
    console.log("Objeto modificado correctamente")
}   

const leerObjetos = ()=>{
    const IDBData = getIDBData("readonly");
    const cursor = IDBData[0].openCursor();
    
    document.querySelector(".imagenProfile1").innerHTML = "";
    
    cursor.addEventListener("success",()=>{
     if (cursor.result){
    let i1 = cursor.result.value.userImg;
    let nombreU = cursor.result.value.nombre;
    let userU = cursor.result.value.userName;

    imagenPerfil2.src = i1
    imagenPerfil3.src = i1
    imagenPerfilModal.src = i1

    nombre.innerHTML = `<img class="imagenProfile1" src="${i1}" alt=""> ${nombreU}`
    userName1.textContent = userU

    cursor.result.continue();
     }
    })
 }



 



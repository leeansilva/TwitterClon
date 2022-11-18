///////variables

let containerGeneral = document.querySelector(".grid__container")
const x = document.getElementById("x");

//ultimo post


//setearlo con null en listener del tweet y cuando X setearlo con una funcion.

   let interval = setInterval(() => {
        console.log("soy de post!!!")

        cargarPublicaciones()
        homeTweets.insertBefore(homeTweets.lastChild, homeTweets.firstChild);
        
        
    }, 15000);

//botones

const buttonTweet1 = document.querySelector(".__tweetC");

 const buttonTweet2 = document.querySelector(".__tweetL");

 
 const buttonTweetM = document.querySelector(".__tweetM");

 const buttonTweetR = document.getElementById("buttonTweetR");
 const buttonTweetR2 = document.getElementById("");

 //input
 const inputTextTweet = document.querySelector(".valueTextTweet");
 const inputTextTweet2 = document.getElementById("valueTextTweet2")

 //hora
 const addZeros = n =>{
    if (n.toString().length < 2) return "0".concat(n);
    //Pasamos a string para que el .length cuente la cantidad de caracteres de "n".
    //si es menor a 2, return 0 y lo concatena a "n".
    return n;
//Si no pasa nada, retorna n.(numero)     
}


//funcion para postear

const postObject = ()=>{
    const IDBData = getIDBData("readonly");
    const cursor = IDBData[0].openCursor();
    
    document.querySelector(".imagenProfile1").innerHTML = "";
    
    cursor.addEventListener("success",()=>{
     if (cursor.result){
     const i1 = cursor.result.value.userImg;
     const nombreU = cursor.result.value.nombre;
     const userU = cursor.result.value.userName;
     const valueTextTw = inputTextTweet.value;

     
     const time = new Date();
     let hora = addZeros(time.getHours());
     let minutos = addZeros(time.getMinutes());
     let segundos = addZeros(time.getSeconds());
     const horario = `${hora}:${minutos}:${segundos}`   
     
     if(imagenVP.id == "123"){
        createTweet(nombreU,userU,i1,valueTextTw,horario,"0","0",null,uuid.v1())
     }
     
     
     
     if(imagenVP.className == "posibleI"){
        createTweet(nombreU,userU,i1,valueTextTw,horario,"0","0",imagenVP.src,uuid.v1())
      
     } 
        
     imagenVP.classList.remove("posibleI");
     imagenVP.classList.add("imposibleI");
   
    
    
   
   

    cursor.result.continue();
     }
    })
} 

//eventos a los botones e inputs

inputTextTweet.addEventListener("keyup",()=>{
    buttonTweet1.classList.replace("__tweetC","__tweetPosible");
    buttonTweetM.classList.replace("__tweetM","__tweetPosible")

    if (inputTextTweet.value.length == 0){
        buttonTweet1.classList.replace("__tweetPosible","__tweetC");
        buttonTweetM.classList.replace("__tweetPosible","__tweetM")    
    }  
});

x.addEventListener("click",()=>{
    cerrarModalPost()
})

buttonTweet1.addEventListener("click",()=>{
    if(buttonTweet1.className == "__tweetPosible" && inputTextTweet.value.length != 0){
        postObject()
        
        const interval = setInterval(() => {
              homeTweets.insertBefore(homeTweets.lastChild, homeTweets.firstChild);
      
              if(homeTweets.lastChild){
                  clearInterval(interval);
                  inputTextTweet.value = "";
                 
                  buttonTweet1.classList.replace("__tweetPosible","__tweetC") ;
                  if(imagenVP.id != "123"){
                    imagenVP.id = "123"
                }
              }
              
          }, 10);
          
    }
    })


const modalPost = ()=> {
   let containerPost = document.querySelector(".modalTweet");
    containerPost.style.display = "flex";
        
    const cc = document.querySelector(".twitt__M")
    cc.appendChild(inputTextTweet)
  }
  const cerrarModalPost = ()=> {
    let containerPost = document.querySelector(".modalTweet");
     containerPost.style.display = "none";
         
     const cc = document.querySelector(".twitt__wh")
     cc.appendChild(inputTextTweet)
   }
 

buttonTweet2.addEventListener("click",()=>{
    modalPost()
    
});
buttonTweetM.addEventListener("click",()=>{
    if(buttonTweetM.className == "__tweetPosible" && inputTextTweet.value.length != 0){
        postObject()
        
        const interval = setInterval(() => {
            let containerPost = document.querySelector(".modalTweet");
              homeTweets.insertBefore(homeTweets.lastChild, homeTweets.firstChild);
      
              if(homeTweets.lastChild){
                  clearInterval(interval);
                  inputTextTweet.value = "";
               
                  buttonTweetM.classList.replace("__tweetPosible","__tweetM");
                  cerrarModalPost()
                if(imagenVP.id != "123"){
                    imagenVP.id = "123"
                }
              }
          }, 10);
    }
})

buttonTweetR.addEventListener("click",()=>{
    postObject()
    const interval = setInterval(() => {
        homeTweets.insertBefore(homeTweets.lastChild, homeTweets.firstChild);
    
        if(homeTweets.lastChild){
            clearInterval(interval)
        }
    }, 10);
    inputTextTweet.innerHTML = "";
    
})


 //agregar observer al home fixed. cuando esta, se agrega interval, cuando no esta se borra.

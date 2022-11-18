///////variables

let containerGeneral = document.querySelector(".grid__container")
const x = document.getElementById("x");

//ultimo post


//botones

const buttonTweet1 = document.querySelector(".__tweetC");

 const buttonTweet2 = document.querySelector(".__tweetL");

 
 const buttonTweetM = document.querySelector(".__tweetM");

 const buttonTweetR = document.getElementById("buttonTweetR");
 const buttonTweetR2 = document.getElementById("");

 //input
 const inputText1 = document.querySelector(".valueTextTweet")
 
 const inputTextTweet2 = document.getElementById("valueTextTweet2");


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
     const valueTextTw = inputText1.value;
     
     const time = new Date();
     let hora = addZeros(time.getHours());
     let minutos = addZeros(time.getMinutes());
     let segundos = addZeros(time.getSeconds());
     const horario = `${hora}:${minutos}:${segundos}`   

    createTweet(nombreU,userU,i1,valueTextTw,horario,"0","0",null,uuid.v1())

    cursor.result.continue();
     }
    })
} 

//eventos a los botones e inputs
inputText1.addEventListener("keyup",()=>{
    buttonTweetM.classList.replace("__tweetM","__tweetPosible")

    if (inputText1.value.length == 0){
        buttonTweet1.classList.replace("__tweetPosible","__tweetC");
        buttonTweetM.classList.replace("__tweetPosible","__tweetM")    
    }  
});


x.addEventListener("click",()=>{
    cerrarModalPost()
})




const modalPost = ()=> {
   let containerPost = document.querySelector(".modalTweet");
    containerPost.style.display = "flex";
        
    const cc = document.querySelector(".twitt__M")
    cc.appendChild(inputText1)
  }
  const cerrarModalPost = ()=> {
    let containerPost = document.querySelector(".modalTweet");
     containerPost.style.display = "none";
   }
 

buttonTweet2.addEventListener("click",()=>{
    modalPost()
    
});
buttonTweetM.addEventListener("click",()=>{
    if(buttonTweetM.className == "__tweetPosible" && inputText1.value.length != 0){
        postObject()
        
        const interval = setInterval(() => {
            let containerPost = document.querySelector(".modalTweet");
              homeTweets.insertBefore(homeTweets.lastChild, homeTweets.firstChild);
      
              if(homeTweets.lastChild){
                  clearInterval(interval);
                  inputText1.value = "";
                  buttonTweetM.classList.replace("__tweetPosible","__tweetM");
                  cerrarModalPost()

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
    inputText1.innerHTML = "";
    
})


 //agregar observer al home fixed. cuando esta, se agrega interval, cuando no esta se borra.

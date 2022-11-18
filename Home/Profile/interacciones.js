//interacciones
const createTweetContainer = document.querySelector(".c-c__twitt");
const homeFixed = document.querySelector(".home-fixed")
const line = document.createElement("hr");
let intervalx = [];


const interacciones = (identify) =>{
    


    let like = document.getElementById("l"+identify)
    let comment = document.getElementById("c"+identify);
    let centerTw = document.getElementById("cTw"+identify);
   

                 
     /////////////////////boton like///////////////////////

            like.addEventListener("click",(e)=>{
                e.preventDefault()
                e.stopPropagation()
                identify = e.currentTarget.id 
                let likeIdentify = e.target.id

                let likeP = document.getElementById(identify);
                let likeBackground = likeP.firstChild
                let likeIcon = likeBackground.firstChild;

                let num = parseInt(likeP.innerText);
                num ++;
                likeP.innerHTML = `<div class="like-bg"><div id='like${identify}' class="like fa-solid fa-cora" style="animation: like 0.8s steps(28) forwards"></div></div>`+ num;

                if (likeIcon.classList.contains("dislike")){
                    likeP.innerHTML = `<div class="like-bg"><div id='like${identify}' class="like fa-solid fa-cora" style="animation: like 0.8s steps(28) forwards"></div></div>`+ num;
                }

                
               
                
                if (likeIcon.classList.contains("like")){
                    likeP.innerHTML = `<div class="like-bg"><div id='like${identify}' class="dislike fa-solid fa-cora" ></div></div>`+ (num-2);

                }
            })
////////////////////////fin boton like ////////////////////////////


////////////////////////comment boton////////////////////////////
            comment.addEventListener("click",(e)=>{
                    e.preventDefault()
                    e.stopPropagation()
                    identify = e.target.id
                    console.log(identify)
            })

    
            centerTw.addEventListener("click",(event)=>{
            event.stopPropagation()
            event.preventDefault();
            
           

            identify = event.currentTarget.id
            let centerTwSelected = document.getElementById(identify).parentElement;
            let centerTwClick = document.getElementById(identify);
            let centerTwSelectedAll = document.querySelectorAll(".h-t__tweet1");
            clearInterval(interval)
            clearInterval(intervalx[0])
            
            for (let i = 0; i < centerTwSelectedAll.length; i++) {
                // centerTwSelectedAll[i].classList.remove("h-t__tweet1");
                centerTwSelectedAll[i].style.display = "none";
               
            }
    
                createTweetContainer.style.display = "none";
                createTweetContainer.classList.remove("c-c__twitt");
                createTweetContainer.classList.add("tweetContainerDisplayNone")

                homeFixed.innerHTML = `<div class="home-fixed">
                <i id="x5" class="fa-solid fa-x"></i>
                <a href="#">Tweet</a>
                </div>`

                if (centerTwSelected.id = identify){
                   
                    let homeTweets = document.querySelector(".home-tweets")
                    homeTweets.insertBefore( centerTwSelected,homeTweets.firstChild);

                    centerTwSelected.classList.remove("h-t__tweet1")
                    centerTwSelected.classList.add("h-t__tweet2")
                    centerTwSelected.style.display = "grid";

                    centerTwSelected.removeAttribute("id")
                }
////////////////////////fin boton comment ////////////////////////////


////////////////////////x boton /////////////////////////////////////
    let x5 = document.getElementById("x5");
               

        x5.addEventListener("click",(e)=>{
            
                intervalx[0] = setInterval(() => {
                    console.log("x")
            
                    cargarPublicaciones()
                    homeTweets.insertBefore(homeTweets.lastChild, homeTweets.firstChild);
                    
                    
                }, 15000);
            

            
            centerTwSelected.classList.remove("h-t__tweet2");
            centerTwSelected.classList.add("h-t__tweet1");

            for (let i = 0; i < centerTwSelectedAll.length; i++) {
                centerTwSelectedAll[i].classList.remove("h-t__tweet2");
            
                if(centerTwSelectedAll[i].style.display == "none"){
                    centerTwSelectedAll[i].style.display = "grid"
                    
                }
                
        }
        
                

                createTweetContainer.style.display = "flex";
                createTweetContainer.classList.remove("tweetContainerDisplayNone")
                createTweetContainer.classList.add("c-c__twitt");
                homeFixed.innerHTML = `<div class="home-fixed">
                <a href="#">Inicio</a>
                <a href="" title="Tweets destacados"><span class="material-icons"><span class="material-icons">
                                auto_awesome
                                </span></span></a>
                </div>`
            })
  ////////////////////////fin boton x ////////////////////////////

    })
}

let buttonFotos = document.querySelector(".button-fotos");

buttonFotos.addEventListener("click",(e)=>{
    const inputFotos = document.querySelector(".inputFile-fotos");
    inputFotos.click();
    imagenVP.removeAttribute('id')
})
const inputFotos = document.querySelector(".inputFile-fotos");
const inputTweet = document.querySelector(".valueTextTweet")
const imagenVP = document.querySelector(".imposibleI")


const leerArchivo = ar => {
    for (let i = 0; i < ar.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(ar[i]);
        reader.addEventListener("load",(e)=>{
           let newImgurl = e.currentTarget.result;
           imagenVP.src = newImgurl;
        })
    }
}
inputFotos.addEventListener("change",(e)=>{
    leerArchivo(inputFotos.files)
    console.log(e)
    imagenVP.classList.remove("imposibleI");
    imagenVP.classList.add("posibleI");
    
    })

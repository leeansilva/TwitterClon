//variables para usar 
    const IDBRequest1 = indexedDB.open("Users",1);
    // const IDBRequest2 = indexedDB.open("Tweets",2);
    //botones
    const buttonReg = document.getElementById("botonreg");
    const modalReg = document.querySelector(".reg-container");
    const modal = document.querySelector(".modal");
    const x = document.getElementById("x");
    const x2 = document.getElementById("x2");
    const buttonIniciar = document.querySelector(".button-have")
    const buttonSend = document.getElementById("next");
    const buttonSend2 = document.getElementById("next2");
    //inputs
    const nombre = document.getElementById("name");
    const emailNum = document.querySelector(".user");
    const date = document.getElementById("cumple");
    //labels
    const label1 = document.getElementById("label1");
    const label2 = document.getElementById("label2");
    //input group
    const nameGroup = document.getElementById("nombre");
    const mailGroup = document.getElementById("mail");
    const dateGroup = document.getElementById("fecha") 
    //mensaje de error
    const redFlag = document.createElement("span");
    redFlag.style.color = "red";
    redFlag.style.fontSize = "13px"
    //modal Password
    const regContainer = document.querySelector(".reg-container");
    const inputPassValue = document.querySelector(".valuePass");
    //containers para que no molesten con el modal.
    const container1 = document.querySelector(".container__1");
    const container2 = document.querySelector(".container__2");
// Abrimos las 2 bases de datos.
IDBRequest1.addEventListener("upgradeneeded",()=>{//cuando se abra una request a IDB:
    const db1 = IDBRequest1.result;//si la request es valida, accedemos al resultado
    db1.createObjectStore("name",{//creamos "tabla" almacen de objetos
        autoIncrement: true//                  para que aumente las keys
    })
})
// IDBRequest2.addEventListener("upgradeneeded",()=>{//cuando se abra una base de datos:
//     const db2 = IDBRequest2.result;
//     db2.createObjectStore("tweets",{
//         autoIncrement: true
//     })
// })

//Añadimos Usuarios
    const addObjeto = objeto =>{
       const IDBData = getIDBData("readwrite");
       IDBData[0].add(objeto);
       IDBData[1].addEventListener("complete",()=>{
        console.log("objeto agregado correctamente");
        window.open("http://localhost/Twitter/Home/","_self")
       })

    }
//Obtener data
const getIDBData = (mode) =>{
    const db = IDBRequest1.result;
    const IDBtransaction = db.transaction("name",mode);
    const objectStore = IDBtransaction.objectStore("name");
    return [objectStore,IDBtransaction];
}
//read data
const leerObjetos = ()=>{
    const IDBData = getIDBData("readonly");
    const cursor = IDBData[0].openCursor();
    const fragment = document.createDocumentFragment();
    cursor.addEventListener("success",()=>{
        if(cursor.result){
           console.log(cursor.result.key,cursor.result.value)
            cursor.result.continue()
        }
    })
}
//evebti succes para verificar 
IDBRequest1.addEventListener("success",()=>{
    leerObjetos();
})
//Eliminar users

// const eliminarObjeto = key =>{
//     const IDBData = getIDBData();
//     IDBData[0].delete(key);
//     IDBtransaction.addEventListener("complete",()=>{
//         console.log("objeto eliminado correctamente")
//     })
// }

//EVENTOS botones:
buttonReg.addEventListener("click",(e)=> {      
    modalReg.style.display = "inline-block";
    console.log(e.target);
});
x2.addEventListener("click",()=>{
    modalReg.style.display = "none";
})
buttonIniciar.addEventListener("click",(e)=> {      
    modal.style.display = "flex";
    console.log(e.target);
});
x.addEventListener("click",()=>{
    modal.style.display = "none";
});


//modal para introducir password// segundo send
const modalPass = () =>{
    const buttonSend2 = document.createElement("input")
    
 
    const password = document.createElement("div");
    const texto = document.createElement("span");
    const inputPassword = document.createElement("input");
 
    texto.innerHTML = `Necesitaras una contraseña`+"<br><br>"+"Asegurate que tenga 8 caracteres o más.";
    inputPassword.type = "password";
    inputPassword.classList.add("valuePass")
    buttonSend2.id = "next2";
    buttonSend2.classList.add("button");
    buttonSend2.value = "Siguiente";
    buttonSend2.type = "submit"
 
    password.classList.add("register");
 
    regContainer.appendChild(password);
    password.appendChild(x2);
    password.appendChild(texto);
    password.appendChild(inputPassword);
    password.appendChild(buttonSend2);
 
    x2.style.marginTop = "-100px";
    buttonSend2.style.marginBottom = "-65px";
    
    
    buttonSend2.addEventListener("click",(e)=>{
        e.preventDefault();
        const passValue = document.querySelector(".valuePass").value
        
        if (passValue.length > 8){
            e.preventDefault();
        modalUser();
        } else if (passValue.length < 8) alert("Introduce una contraseña mayor a 8 caracteres.")
        
    })
    return inputPassword.value
 }
const validarCampos = ()=>{
    let error = [];
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (nombre.value.length < 3){
        error[0] = true;
        error[1] = nombre.classList.add("red"),label1.style.color = "red",nameGroup.appendChild(redFlag),redFlag.innerText = "El nombre debe contener entre 3 y 20 caracteres.";
        return error;
    } else if (nombre.value.length > 25){
        error[0] = true;
        error[1] = nombre.classList.add("red"),label1.style.color = "red",nameGroup.appendChild(redFlag),redFlag.innerText = "El nombre debe contener entre 3 y 20 caracteres.";
        return error;
    } else if(!regexEmail.test(emailNum.value)){
        error[0] = true;
        error[1] = emailNum.classList.add("red"),label2.style.color = "red",mailGroup.appendChild(redFlag),redFlag.innerText = "Introduzca un correo válido.";
        return error
    } else if(date.value.length < 2 ||
              date.value.length > 10){
        error[0] = true;
        error[1] = date.classList.add("red"),dateGroup.appendChild(redFlag),redFlag.innerText = "Introduzca su fecha de nacimiento.";
        return error
    } 
    error[0] = false;
    return error;
}



// primer boton send
buttonSend.addEventListener("click",(e)=>{
    e.preventDefault();
    let error = validarCampos();
    if (error[0]){
        (error[1])
    } else if(error[0] == false){

        nombre.classList.remove("red");
        emailNum.classList.remove("red");
        date.classList.remove("red");
        container1.style.opacity = "0.2"
        container2.style.opacity = "0.2";
        container1.style.userSelect = "none"
        container2.style.userSelect = "none"
        
        modalPass();
     }
})


//MODAL NOMBRE DE USUARIO. SEND3

const modalUser = () =>{

    const buttonSend3 = document.createElement("input")
    const user = document.createElement("div");
    const texto = document.createElement("span");
    const inputUser = document.createElement("input");
 
    texto.innerHTML = `Tu @usuario es único.`+"<br><br>"+"Puedes cambiarlo cuando quieras.";
    inputUser.type = "text";
    inputUser.classList.add("valueText");
    buttonSend3.type = "submit"
    buttonSend3.classList.add("button")
    buttonSend3.id = "next3";
    buttonSend3.value = "Siguiente";

    user.style.zIndex = "1000"
 
    user.classList.add("register");
 
    regContainer.appendChild(user);
    user.appendChild(texto);
    user.appendChild(x2);
    user.appendChild(inputUser);
    user.appendChild(buttonSend3);
 
    x2.style.marginTop = "-100px";
    buttonSend3.style.marginBottom = "10px";
    texto.style.marginTop = "50px"
    x2.style.marginTop = "-640px"
    inputUser.value = "@"
    
    buttonSend3.addEventListener("click",(e)=>{
        e.preventDefault();
        const userValue = document.querySelector(".valueText").value
        
        if (userValue.length > 2){
            e.preventDefault();
            modalImagen();
        } else if (userValue.length < 2||
            !userValue.indexOf("@") == -1) alert("Introduce un nombre válido.")
        
    })
    
    return inputUser.value;
}

modalImagen = () =>{
    const buttonSend4 = document.createElement("input")
    const userImagen = document.createElement("div");
    const texto = document.createElement("span");
    const inputUserImagen = document.createElement("input");
    const imagen = document.createElement("img");
 
    texto.innerHTML = `Elige una imágen de perfil`+"<br><br>"+"¿Tienes una selife favorita? Súbela ahora.";
    inputUserImagen.type = "file";
    inputUserImagen.accept = "image/*";
    inputUserImagen.id = "archivo";
    inputUserImagen.classList.add("valueImagen");
    buttonSend4.type = "submit"
    buttonSend4.classList.add("button")
    buttonSend4.id = "next4";
    buttonSend4.value = "Siguiente";

    userImagen.style.zIndex = "2000"
 
    userImagen.classList.add("register");
    imagen.classList.add("imagenVP")
    inputUserImagen.classList.add("custom-file-input")
 
    regContainer.appendChild(userImagen);
    userImagen.appendChild(texto);
    userImagen.appendChild(x2);
    userImagen.appendChild(imagen);
    userImagen.appendChild(inputUserImagen);
    userImagen.appendChild(buttonSend4);
    
 
    x2.style.marginTop = "-100px";
    buttonSend4.style.marginBottom = "10px";
    texto.style.marginTop = "50px"
    x2.style.marginTop = "-640px"
    imagen.style.height = "150px";
    imagen.style.width = "150px";
    imagen.style.borderRadius = "50%";
    imagen.style.display = "inline-block"
    imagen.style.marginTop = "320px"
    imagen.style.marginLeft = "150px"

    const archivo = document.getElementById('archivo');
    let imagenVP = document.querySelector(".imagenVP");

    archivo.addEventListener("change",(e)=>{
    leerArchivo(archivo.files)
    console.log(e)
    })

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
    
    buttonSend4.addEventListener("click",(e)=>{
        e.preventDefault();
        alert("imagen añadida.")
        let nombreI = nombre.value;
        let emailI = emailNum.value;
        let passwordI = document.querySelector(".valuePass").value;
        let userI = document.querySelector(".valueText").value;
        let userImagenI = document.querySelector(".imagenVP").src;

        if (passwordI.length > 8){
            addObjeto({nombre:nombreI,
                       email:emailI,
                       password:passwordI,
                       userName:userI,
                       userImg:userImagenI});//esto es como decir {nombre : "input.value"}    //Llamamos a la funcion y ponemos como parametro un objeto
            modalReg.style.display = "none";
            
           
        } 
    })
    
    
    return inputUserImagen.value;
}









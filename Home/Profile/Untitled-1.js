"use strict"

let frutas = ["banana","manzana","melon","poronga","frutilla"];

frutas.forEach((frutas)=>{
    console.log("la variable es: ", frutas)
})

// que pasa si quiero tener un array en que se almacenen los precios, para luego imprimirlos en un ticket?
//podemos usar MAP

const precios = frutas.map((frut)=>{
    console.log("mapeo una frutita", frut);
    return 2* frut.length
});

console.log("El ticket es: ", precios)
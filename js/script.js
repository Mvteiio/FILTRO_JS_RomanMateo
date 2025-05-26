async function llamadaAPIprincipal(){
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta")
    let data = await response.json()

    window.recetasData = data

    mostrarRecetas(data)
    await configurarBuscador()
}

function mostrarRecetas(data){
    const template = document.getElementById("template");
    const container = document.getElementById("container-grid");
    let datos = data["meals"]
    container.innerHTML = ""; // limpia antes de insertar

    datos.forEach(receta => {
        const clone = template.cloneNode(true);
        clone.style.display = "flex"
        clone.querySelector("#imagenFicha").src = receta["strMealThumb"];
        clone.querySelector("#nombreRecetaFicha").textContent = receta["strMeal"];

        // clone.querySelector("#BotonVerMas").setAttribute("id", receta["idMeal"]);
        clone.onclick = () => abrirDatos(receta.idMeal);

        container.appendChild(clone);
    });
}

llamadaAPIprincipal()

async function abrirDatos(idReceta) {
    console.log(idReceta)
    await infoDetallada(idReceta)
    document.getElementById("tarjetaDetallada").classList.add("mostrar");    
}

function cerrarDatos() {
    document.getElementById("tarjetaDetallada").classList.remove("mostrar");
    }

async function infoDetallada(idReceta) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceta}`)
    let data = await response.json()
    let datos = data["meals"][0]
        

    console.log(datos)
    document.getElementById("nombreDetailed").textContent = datos.strMeal;
    document.getElementById("categoriaPaisText").textContent = (datos.strCategory + " - " + datos.strArea);
    document.getElementById("ingrediente1").textContent = (datos.strIngredient1 + ": " + datos.strMeasure1);
    document.getElementById("imagenDetailed").src = datos.strMealThumb
    document.getElementById("instruccionesDetailed").textContent = datos.strInstructions;
    document.getElementById("ingrediente2").textContent = (datos.strIngredient2 + ": " + datos.strMeasure2);
    document.getElementById("ingrediente3").textContent = (datos.strIngredient3 + ": " + datos.strMeasure3);
    document.getElementById("ingrediente4").textContent = (datos.strIngredient4 + ": " + datos.strMeasure4);
    document.getElementById("ingrediente5").textContent = (datos.strIngredient5 + ": " + datos.strMeasure5);
    document.getElementById("ingrediente6").textContent = (datos.strIngredient6 + ": " + datos.strMeasure6);
    document.getElementById("ingrediente7").textContent = (datos.strIngredient7 + ": " + datos.strMeasure7);
    document.getElementById("ingrediente8").textContent = (datos.strIngredient8 + ": " + datos.strMeasure8);
    document.getElementById("ingrediente9").textContent = (datos.strIngredient9 + ": " + datos.strMeasure9);
    document.getElementById("ingrediente10").textContent = (datos.strIngredient10 + ": " + datos.strMeasure10);
    document.getElementById("ingrediente11").textContent = (datos.strIngredient11 + ": " + datos.strMeasure11);
    document.getElementById("ingrediente12").textContent = (datos.strIngredient12 + ": " + datos.strMeasure12);
    document.getElementById("ingrediente13").textContent = (datos.strIngredient13 + ": " + datos.strMeasure13);
    
};

async function configurarBuscador() {
    const buscador1 = document.getElementById("buscador");
    

    buscador1.addEventListener('input', async function() {
        const buscador = this.value;
        console.log(window.recetasData)
        
        if (buscador === ""){
            mostrarRecetas(window.recetasData)
        }
        
        // Filtrar usuarios
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${buscador}`)
        let recetaFiltrada = await response.json()
        
        // resultados filtrados
        mostrarRecetas(recetaFiltrada);
    });
}
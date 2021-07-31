//console.log('funciona');
//variables
let i;
let indexArray2;
const formularioUI = document.querySelector('#Formulario');
const listaActividadesUI = document.getElementById('listaActividades');
let arrayActividades = [];

//funciones
const CrearItem = (actividad,descripcion) => {
   //si actualiza
  if (document.querySelector("#agregar").textContent === "Actualizar"){
    arrayActividades[indexArray2].actividad = document.querySelector("#actividad").value
    arrayActividades[indexArray2].descripcion = document.querySelector("#descripcion").value
    GuardarDB();
    document.querySelector("#agregar").textContent="Agregar tarea"
    document.getElementById("agregar").className += "btn btn-primary";
    document.querySelector("#actividad").className += "form-label form-control shadow-none";
    document.querySelector("#descripcion").className += "form-label form-control shadow-none";
  }else{
      //si es nuevo
      let item = {
        actividad: actividad,
        descripcion: descripcion
      }
      arrayActividades.push(item);
      return item;
  }
}

const GuardarDB = () => {
  localStorage.setItem('rutina', JSON.stringify(arrayActividades));
  MostrarDB();
}

const MostrarDB = () => {
  listaActividadesUI.innerHTML = '';
  arrayActividades = JSON.parse(localStorage.getItem('rutina'));
  //console.log(arrayActividades);
  if(arrayActividades === null)
  {
    arrayActividades = [];
  }
  else
  {
    arrayActividades.forEach(element => {
        listaActividadesUI.innerHTML += `<div class="alert alert-primary" role="alert"> <b>${element.actividad}</b><br>${element.descripcion} <span class="float-right" style="float: right;"> <button type="submit" class="btn btn-primary">Eliminar</button> <button type="submit" class="btn btn-primary">Editar</button> </span> </div>`
    });
  }
}

const EliminarDB = (actividad) => {
  let indexArray;
  arrayActividades.forEach((elemento, index) => {
    if(elemento.actividad === actividad){
      indexArray = index;
    }
  });  
  arrayActividades.splice(indexArray,1);
  GuardarDB();
}

const EditarDB = (actividad) => {
  indexArray2 = arrayActividades.findIndex((elemento)=>elemento.actividad === actividad);
  document.querySelector("#actividad").value = arrayActividades[indexArray2].actividad;
  document.querySelector("#descripcion").value = arrayActividades[indexArray2].descripcion;
  document.querySelector("#agregar").textContent="Actualizar"

//  document.querySelector("#agregar").element.classList.replace('btn btn-primary', 'btn btn-warning');
    document.getElementById("agregar").className += "btn btn-warning";
    document.querySelector("#actividad").className += "form-label form-control shadow-lg bg-body rounded";
  document.querySelector("#descripcion").className += "form-label form-control shadow-lg bg-body rounded";
}
    
//eventos
formularioUI.addEventListener('submit', (e) => {
  e.preventDefault();
  let actividadUI = document.querySelector('#actividad').value;
  let descripcionUI = document.querySelector('#descripcion').value;
  CrearItem(actividadUI,descripcionUI);
  GuardarDB();
  formularioUI.reset();
});

///
document.addEventListener('DOMContentLoaded', MostrarDB);
////
listaActividadesUI.addEventListener('click', (e) => {
  e.preventDefault();
  //let texto = e.path[2].childNodes[1].innerHTML;
  //console.log(texto);
  if(e.target.innerHTML === 'Editar' || e.target.innerHTML === 'Eliminar'){
    let texto = e.path[2].childNodes[1].innerHTML;
    //let descripcion = e.path[2].childNodes[5].innerHTML;
    //console.log(descripcion);
    if(e.target.innerHTML === 'Eliminar'){
      EliminarDB(texto);
    }
    if(e.target.innerHTML === 'Editar'){      
        EditarDB(texto);
    }
  }
});
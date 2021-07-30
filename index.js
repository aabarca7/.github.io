//console.log('funciona');
//variables
const formularioUI = document.querySelector('#Formulario');
const listaActividadesUI = document.getElementById('listaActividades');
let arrayActividades = [];

//funciones

const CrearItem = (actividad, descripcion) => {

    let item = {
        actividad: actividad,
        descripcion: descripcion
    }

    arrayActividades.push(item);
    return item;
}

const GuardarDB = () => {
    localStorage.setItem('rutina', JSON.stringify(arrayActividades));
}

const MostrarDB = () => {

    listaActividadesUI.innerHTML = '';
    arrayActividades = JSON.parse(localStorage.getItem('rutina'));
    //console.log(arrayActividades);
    if (arrayActividades === null) {
        arrayActividades = [];
    } else {
        arrayActividades.forEach(element => {
            if (element.estado) {
                listaActividadesUI.innerHTML += `<div class="alert alert-primary" role="alert"> <b>${element.actividad}</b>${element.descripcion} <span class="float-right" style="float: right;"> <button type="submit" class="btn btn-primary">Eliminar</button> <button type="submit" class="btn btn-primary">Editar</button> </span> </div>`
            } else {
                listaActividadesUI.innerHTML += `<div class="alert alert-primary" role="alert"> <b>${element.actividad}</b>${element.descripcion} <span class="float-right" style="float: right;"> <button type="submit" class="btn btn-primary">Eliminar</button> <button type="submit" class="btn btn-primary">Editar</button> </span> </div>`
            }
        });

    }
}



//eventos
formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();
    let actividadUI = document.querySelector('#actividad').value;
    let descripcionUI = document.querySelector('#descripcion').value;
    CrearItem(actividadUI, descripcionUI);
    GuardarDB();
    formularioUI.reset();
});


document.addEventListener('DOMContentLoaded', MostrarDB);
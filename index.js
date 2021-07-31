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
    MostrarDB();

}
const MostrarDB = () => {
    listaActividadesUI.innerHTML = '';
    arrayActividades = JSON.parse(localStorage.getItem('rutina'));
    //console.log(arrayActividades);
    if (arrayActividades === null) {
        arrayActividades = [];
    } else {
        arrayActividades.forEach(element => {
            listaActividadesUI.innerHTML += `<div class="alert alert-primary" role="alert"> <b>${element.actividad}</b>${element.descripcion} <span class="float-right" style="float: right;"> <button type="submit" class="btn btn-primary">Eliminar</button> <button type="submit" class="btn btn-primary">Editar</button> </span> </div>`
        });
    }
}

const EliminarDB = (actividad) => {
    let indexArray;
    arrayActividades.forEach((elemento, index) => {
        if (elemento.actividad === actividad) {
            indexArray = index;
        }
    });

    arrayActividades.splice(indexArray, 1);
    GuardarDB();
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
///
document.addEventListener('DOMContentLoaded', MostrarDB);
////
listaActividadesUI.addEventListener('click', (e) => {
    e.preventDefault();
    //let texto = e.path[2].childNodes[1].innerHTML;
    //console.log(texto);
    //console.log(e.target.innerHTML);
    if (e.target.innerHTML === 'Editar' || e.target.innerHTML === 'Eliminar') {
        let texto = e.path[2].childNodes[1].innerHTML;
        //console.log(texto);
        if (e.target.innerHTML === 'Eliminar') {
            EliminarDB(texto);
        }

    }

});
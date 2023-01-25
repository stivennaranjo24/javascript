let listaEmpleados=[];
const objEmpleado={
    id:'',
    nombre:'',
    cargo:''
}
let editando=false;

const formulario=document.querySelector('#formulario');
const nombreInput=document.querySelector('#nombre');
const cargoInput=document.querySelector('#cargo');
const btnAgregar=document.querySelector('#btnagregar');

formulario.addEventListener('submit',validarformulario);

function validarformulario(e){
    e.preventDefault();
    if(nombreInput.value ==='' || cargoInput.value===''){
        alert('todos los campos son obligaorios');
        return;
    }
    if(editando){
        editarempleado();
        editando=false;
    }else{
        objEmpleado.id=Date.now();
        objEmpleado.nombre=nombreInput.value;
        objEmpleado.cargo=cargoInput.value;

        agregarEmpleado();
    }
}

function agregarEmpleado(){
    listaEmpleados.push({...objEmpleado});

    mostrarEmpleados();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto(){
    objEmpleado.id='';
    objEmpleado.nombre='';
    objEmpleado.cargo='';
}
function mostrarEmpleados(){

    limpiarHTML();

    const divEmpleados=document.querySelector('.div-empleados');

    listaEmpleados.forEach(empleado=>{
        const {id,nombre,cargo}=empleado;

        const parrafo=document.createElement('p');
        parrafo.textContent=`${id} - ${nombre} - ${cargo} - `;
        parrafo.dataset.id=id;

        const editarBoton= document.createElement('button');
        editarBoton.onclick=()=>cargarEmpleado(empleado);
        editarBoton.textContent='editar';
        editarBoton.classList.add('btn','btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton= document.createElement('button');
        eliminarBoton.onclick=()=>eliminarEmpleado(id);
        eliminarBoton.textContent='eliminar';
        eliminarBoton.classList.add('btn','btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);


    })


}

function cargarEmpleado(empleado){
    
    const {id,nombre,cargo}=empleado;

    nombreInput.value=nombre;
    cargoInput.value=cargo;

    objEmpleado.id=id;

    formulario.querySelector('button[type="submit"]').textContent='actualizar';

    editando=true;

}

function editarempleado(){
    objEmpleado.nombre=nombreInput.value;
    objEmpleado.cargo=cargoInput.value;

    listaEmpleados.map(empleado =>{
        if(empleado.id===objEmpleado.id){
            empleado.id=objEmpleado.id;
            empleado.nombre=objEmpleado.nombre;
            empleado.cargo=objEmpleado.cargo;
        }
    });

    limpiarHTML();
    mostrarEmpleados();

    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent='agregar';

    editando=false;
}


function eliminarEmpleado(id){
    listaEmpleados=listaEmpleados.filter(empleado => empleado.id !== id);

    limpiarHTML();
    mostrarEmpleados();
}
function limpiarHTML(){

    const divEmpleados=document.querySelector('.div-empleados');
    while(divEmpleados.firstChild){
        divEmpleados.removeChild(divEmpleados.firstChild)
    }

}
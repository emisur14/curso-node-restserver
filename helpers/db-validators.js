const Role = require('../models/role');
const {Usuario,Categoria, Producto} = require('../models');



const esRoleValido = async(rol= '') => {
    const existeRol = await Role.findOne({ rol });
    if(!existeRol) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`)
    }
}

const existeEmail = async(correo='') => {
    const Email = await Usuario.findOne({ correo });
    if (Email) {        
        throw new Error(`El correo: ${ correo }, ya esta registrado`)      
    }
}

const existeUsuarioPorId = async( id ) => {
    const existeUsuario = await Usuario.findById(id);    
    if (!existeUsuario) {        
        throw new Error(`El id: ${ id }, no existe`)      
    }
}



const existeCategoriaPorId = async( id ) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria || !existeCategoria.estado ) {
        throw new Error(`El id: ${ id }, no existe`)
    }
}

const existeNombreCategoria = async(nombre='') => {
    const Nombre = await Categoria.findOne({nombre});
    if(Nombre) {
        throw new Error(`Esta categoria ${ nombre }, ya existe`);
    }
}

const existeProductoPorId = async( id ) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto || !existeProducto.estado ) {
        throw new Error(`El id: ${ id }, no existe`)
    }
}

//Validar colecciones permitidas
const coleccionesPermitidas =(coleccion='', colecciones =[]) => {
    const incluida = colecciones.includes( coleccion);
    if( !incluida ) {
        throw new Error(`La colección ${ coleccion } no es permitida, ${ colecciones }`)
    }

    return true;
}




module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeNombreCategoria,
    existeProductoPorId,
    coleccionesPermitidas
}
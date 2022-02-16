const Categoria = require('../models/categoria');


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

module.exports = {
    existeCategoriaPorId,
    existeNombreCategoria
}
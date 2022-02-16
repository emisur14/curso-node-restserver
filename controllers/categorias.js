const { response, request } = require('express');
const res = require('express/lib/response');
const { Categoria, Usuario } = require('../models');


//obtenerCategorias - paginado - total -pupulate
const categoriasGet = async(req=request, res= response) => {
 
     const {limite=5, desde=0} = req.query;
     const query = {estado:true};

     const [total,categorias] = await Promise.all([
        Categoria.countDocuments(query),
         Categoria.find(query)    
         .populate('usuario','nombre')    
         .skip(Number(desde))
         .limit(Number(limite))
       ]);

     res.json({
         total
         ,categorias
     }); 
}


//obtenerCategoria  -pupulate {}
const categoriaGet = async(req=request, res= response) => {

    const {id} = req.params;
    const categoria = await Categoria.findById(id).populate('usuario','nombre');

    res.json(categoria)  
}



const crearCategria = async(req, res = response, next) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        })
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json(categoria);
}


//actualizarCategoria
const actualizarCategoria = async(req, res= response) => { 
    const {id} = req.params;
    const {_id,estatus,usuario, ...data} = req.body;   

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
 
    const categoria = await Categoria.findByIdAndUpdate(id,data, {new:true});

    res.json(categoria);
}


// borrarCategoria - estado:false
const borrarCategoria = async(req, res= response) => {

    const {id} = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false}, {new:true});

    res.json(categoria);
}



module.exports = {
    crearCategria,
    categoriasGet,
    categoriaGet,
    actualizarCategoria,
    borrarCategoria
}
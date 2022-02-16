const { response, request } = require('express');
const res = require('express/lib/response');
const { Producto } = require('../models');



//obtenerProductos - paginado - total -pupulate
const productosGet = async(req=request, res= response) => {

    const {limite=5, desde=0} = req.query;
    const query = {estado:true};

    const [total,productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)    
        .populate('usuario','nombre')
        .populate('categoria','nombre')    
        .skip(Number(desde))
        .limit(Number(limite))
      ]);    

     res.json({
         total
         ,productos
     });     
}


//obtenerCategoria  -pupulate {}
const productoGet = async(req=request, res= response) => {

     const {id} = req.params;
     const producto = await Producto.findById(id)
                                .populate('usuario','nombre')
                                .populate('categoria','nombre');

     res.json(producto);   
}


const crearProducto = async(req, res = response, next) => {

    const {estado, usuario, ...body} = req.body;   
     
    const nombre =  body.nombre.toUpperCase()

    const productoDB = await Producto.findOne({nombre});

    if (productoDB) {
         return res.status(400).json({
            msg: `El producto ${ nombre }, ya existe`
         })
    }
      

    // //Generar la data a guardar
     const data = {
         ...body,
         nombre,
         usuario: req.usuario._id        
     }

     const producto = new Producto(data);

     await producto.save();

     res.status(201).json(producto);   
}

//actualizarProducto
const actualizarProducto = async(req, res= response) => { 
     const {id} = req.params;
     const {_id,estado,usuario, ...data} = req.body;
     
     if (data.nombre) {
         data.nombre = data.nombre.toUpperCase();
     }
  
     data.usuario = req.usuario._id;
     
 
    const producto = await Producto.findByIdAndUpdate(id,data, {new:true});

    res.json(producto);    
}


// borrarCategoria - estado:false
const borrarProducto = async(req, res= response) => {

     const {id} = req.params;
     const producto = await Producto.findByIdAndUpdate(id,{estado:false}, {new:true});

     res.json(producto);  
}


module.exports = {
    crearProducto,
    productosGet,
    productoGet,
    actualizarProducto,
    borrarProducto
}



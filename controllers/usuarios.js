const { response, request } = require('express');


const usuariosGet = (req= request, res= response) => {

    const { q, nombre="No name", apkey,page =1, limit } = req.query;


    res.json({               
        msg: 'get API - Controler',
        q, 
        nombre,
        apkey,
        page,
        limit
    });
}

const usuariosPost = (req, res= response) => {

    const { nombre, edad } = req.body;



    res.json({               
        msg: 'post API - Controler',
        nombre,
        edad
    })
}

const usuariosPut = (req, res= response) => {

    const { id } = req.params;

    
    res.json({               
        msg: 'putt API - Controler',
        id

    })
}

const usuariosPatch = (req, res= response) => {
    res.json({               
        msg: 'patch API - Controler'
    })
}

const usuariosDelete = (req, res= response) => {
    res.json({               
        msg: 'delete API - Controler'
    })
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}
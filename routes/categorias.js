const {Router} = require('express');
const { check } = require('express-validator');
const { crearCategria
      ,categoriasGet
      ,categoriaGet
      ,actualizarCategoria     
      ,borrarCategoria
      } = require('../controllers/categorias');
const { existeCategoriaPorId, 
        existeNombreCategoria } = require('../helpers/db-validators');

const {   
    valdiarJWT, validarCampos, esAdminRole,  
} = require('../middlewares');

const router = Router();


//Obtener todas las categorias - publico
//Agregar check(id).custom( existeCategoria )
router.get('/', categoriasGet)


//Obtener una categoria por id - publico
router.get('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
]
,categoriaGet )


//Crear categoria - privado -cualquier persona con token valido
router.post('/',[
   valdiarJWT,
   check('nombre','El nombre es obligatorio').not().isEmpty(),
   validarCampos
], crearCategria)


//Actualizar - privado -cualquier persona con token valido
router.put('/:id',[
    valdiarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId),
    check('nombre').custom( existeNombreCategoria),
    validarCampos
],actualizarCategoria)


//Borrar una categoria - Admin
router.delete('/:id', [
    valdiarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],
borrarCategoria)



module.exports = router;
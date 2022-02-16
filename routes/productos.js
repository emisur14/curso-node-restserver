const {Router} = require('express');
const { check } = require('express-validator');
const { productosGet
    , productoGet
    , crearProducto
    , actualizarProducto
    , borrarProducto } = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');
const { valdiarJWT, validarCampos, esAdminRole } = require('../middlewares');


const router = Router();


router.get('/', productosGet );

router.get('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],productoGet);

router.post('/',[
    valdiarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','La categoria es obligatoria').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId),
    validarCampos
],crearProducto);

router.put('/:id',[
    valdiarJWT,    
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( existeProductoPorId),    
    validarCampos
],actualizarProducto);

router.delete('/:id',[
    valdiarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],borrarProducto);


module.exports =router;







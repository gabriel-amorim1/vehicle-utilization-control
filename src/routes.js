const express = require('express');
require('express-group-routes');
const { celebrate, Segments, Joi } = require('celebrate');
const VehicleController = require('./controllers/VehicleController');
const DriverController = require('./controllers/DriverController');
const VehicleUtilizationsController = require('./controllers/VehicleUtilizationsController');

const routes = express.Router();

//Rota automóveis
routes.group("/vehicles", (router) => {
    
    //Rota para cadastrar um novo automóvel
    router.post('/create', celebrate({
        [Segments.BODY]: Joi.object().keys({
            license_plate: Joi.string().required().length(7),
            color: Joi.string().required(),
            brand: Joi.string().required()
        })
    }),VehicleController.create);

    //Rota para atualizar um automóvel cadastrado
    router.put('/update', celebrate({
        [Segments.BODY]: Joi.object().keys({
            id: Joi.number().required(),
            license_plate: Joi.string().length(7),
            color: Joi.string(),
            brand: Joi.string()
        })
    }),VehicleController.update);

    //Rota para excluir um automóvel cadastrado
    router.delete('/delete/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }),VehicleController.delete);

    //Rota para recuperar um automóvel cadastrado pelo seu id
    router.get('/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }),VehicleController.findById);

    //Rota para listar os automóveis cadastrados.
    router.get('/', VehicleController.list);
});

//Rota motoristas
routes.group("/drivers", (router) => {
    
    //Rota para cadastrar um novo motorista
    router.post('/create', celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required()
        })
    }),DriverController.create);

    //Rota para atualizar um motorista cadastrado
    router.put('/update', celebrate({
        [Segments.BODY]: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string()
        })
    }),DriverController.update);

    //Rota para excluir um motorista cadastrado
    router.delete('/delete/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }),DriverController.delete);

    //Rota para recuperar um motorista cadastrado pelo seu id
    router.get('/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }),DriverController.findById);

    //Rota para listar os motorista cadastrados.
    router.get('/', DriverController.list);
});

//Rota utilização de automóvel
routes.group("/vehicle_utilizations", (router) => {
    
    //Rota para cadastrar uma nova utilização de automóvel
    router.post('/create', celebrate({
        [Segments.BODY]: Joi.object().keys({
            reason: Joi.string().required(),
            driver_id: Joi.number().required(),
            vehicle_id: Joi.number().required()
        })
    }),VehicleUtilizationsController.create);

    //Rota para finalizar uma utilização de automóvel cadastrado
    router.get('/finalize/:id', celebrate({
        [Segments.BODY]: Joi.object().keys({
            id: Joi.number().required()
        })
    }),VehicleUtilizationsController.finalize);

    //Rota para listar os motorista cadastrados.
    router.get('/', VehicleUtilizationsController.list);
});

module.exports = routes; // exporta variável
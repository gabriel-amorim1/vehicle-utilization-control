const express = require('express');
require('express-group-routes');
const { celebrate, Segments, Joi } = require('celebrate');
const OngController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');
const VehicleController = require('./controllers/VehicleController');

const routes = express.Router();

//Rota automoveis
routes.group("/vehicles", (router) => {
    //lista automoveis
    router.get('/', VehicleController.index);
    //cria automoveis
    router.post('/create', celebrate({
        [Segments.BODY]: Joi.object().keys({
            license_plate: Joi.string().required().length(7),
            color: Joi.string().required(),
            brand: Joi.string().required()
        })
    }),VehicleController.create);
    //atualiza automovel
    router.post('/update', celebrate({
        [Segments.BODY]: Joi.object().keys({
            id: Joi.number().required(),
            license_plate: Joi.string().length(7),
            color: Joi.string(),
            brand: Joi.string()
        })
    }),VehicleController.update);
    //deleta automovel
    router.delete('/delete/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }),VehicleController.delete);
});



routes.get('/profiles', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}),profileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),incidentController.index);

routes.post('/incidents', incidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),incidentController.delete);

routes.post('/sessions', sessionController.create);

module.exports = routes; // exporta variável
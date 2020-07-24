const connection = require('../database/connection');

module.exports = {

    //Cadastra um novo automóvel
    async create (request, response) {
        const { license_plate, color, brand } = request.body;
        
        try{
            await connection('vehicles').insert({
                license_plate,
                color,
                brand
            });
            success = true;
            message = "Vehicle registered with success.";
        }catch(exception){
            success = false;
            message = exception;
            if(await connection('vehicles').where('license_plate', {license_plate}))
                message = "Already exists a vehicle registered with this license plate.";
        }

        return response.json({success, message});
    },

    //Atualiza um automóvel cadastrado
    async update (request, response) {
        const { id, license_plate, color, brand } = request.body;
        
        try{
            await connection('vehicles').update({
                license_plate,
                color,
                brand
            }).where({
                id
            });
            success = true;
            message = "Vehicle updated with success.";
        }catch(exception){
            success = false;
            message = exception;
        }

        return response.json({success, message});
    },

    //Exclui um automóvel cadastrado
    async delete(request, response){
        const { id } = request.params;

        try{
            await connection('vehicles').where('id', id).delete();
            success = true;
            message = "Vehicle deleted with success.";
            response.status(200);
        }catch(exception){
            success = false;
            message = exception;
        }

        return response.json({success, message});
    },

    //Recupera um automóvel cadastrado pelo seu id
    async findById(request, response){
        const { id } = request.params;
        try{
            const vehicle = await connection('vehicles').where('id', id).first();
            success = true;
            message = vehicle;
            if(message == undefined){
                success = false;
                message = "Doesn't exists a vehicle with this id." 
            }
            response.status(200);
        }catch(exception){
            success = false;
            message = exception;
        }
        return response.json({success, message});
    },

    //Lista os automóveis cadastrados
    async list (request, response){
        var url = require('url');
        var url_parts = url.parse(request.url, true);
        var query = url_parts.query;
        var vehicles;
        try{
            //Queria ter usado algo relacionado a query nessa parte mas não consegui
            if(query.color != undefined && query.brand != undefined){
                vehicles = await connection('vehicles').select('*').where({
                    color: query.color, 
                    brand: query.brand
                });
            }else if(query.color != undefined){
                vehicles = await connection('vehicles').select('*').where("color", query.color);
            }else if(query.brand != undefined){
                vehicles = await connection('vehicles').select('*').where("brand", query.brand);
            }else {
                vehicles = await connection('vehicles').select('*');
            }

            success = true;
            message = vehicles;
            if(message[0] == undefined){
                success = false;
                message = "Doesn't exists a vehicle with this name."
            }
            response.status(200);
        }catch(exception){
            success = false;
            message = exception;
        }
        return response.json({success, message});
    }
};
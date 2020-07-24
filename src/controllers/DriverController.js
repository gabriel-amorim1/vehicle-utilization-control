const connection = require('../database/connection');

module.exports = {

    //Cadastra um novo motorista
    async create (request, response) {
        const { name } = request.body;
        
        try{
            await connection('drivers').insert({ name });
            success = true;
            message = "Driver registered with success.";
        }catch(exception){
            success = false;
            message = exception;
        }

        return response.json({success, message});
    },

    //Atualiza um motorista cadastrado
    async update (request, response) {
        const { id, name } = request.body;
        try{
            if(await connection('drivers').update({ name }).where({ id })){
                success = true;
                message = "Driver updated with success.";
            }else{
                success = false;
                message = "Doesn't exists a driver with this ID.";
            }
        }catch(exception){
            success = false;
            message = exception;
        }

        return response.json({success, message});
    },

    //Exclui um motorista cadastrado
    async delete(request, response){
        const { id } = request.params;

        try{
            if(await connection('drivers').where('id', id).delete()){
                message = "Driver deleted with success.";
                success = true;
            }else{
                success = false;
                message = "Doesn't exists a driver with this id.";
            }
            response.status(200);
        }catch(exception){
            success = false;
            message = exception;
        }

        return response.json({success, message});
    },

    //Recupera um motorista cadastrado pelo seu id
    async findById(request, response){
        const { id } = request.params;
        try{
            const driver = await connection('drivers').where('id', id).first();
            success = true;
            message = driver;
            
            if(message == undefined){
                success = false;
                message = "Doesn't exists a driver with this id." 
            }

            response.status(200);
        }catch(exception){
            success = false;
            message = exception;
        }
        return response.json({success, message});
    },

    //Lista os motoristas cadastrados
    async list (request, response){
        var url = require('url');
        var url_parts = url.parse(request.url, true);
        var query = url_parts.query;
        var drivers;
        try{
            if(query.name != undefined){
                drivers = await connection('drivers').select('*').where("name", query.name);
                message = drivers;
                success = true;
                if(message[0] == undefined){
                    success = false;
                    message = "Doesn't exists a driver with this name."
                }
            }else {
                drivers = await connection('drivers').select('*');
                message = drivers;
                success = true;
            }
            response.status(200);
        }catch(exception){
            success = false;
            message = exception;
        }
        return response.json({success, message});
    }
};
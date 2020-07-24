const connection = require('../database/connection');

module.exports = {

    //Cadastra a nova utilização de um automóvel por um motorista
    async create (request, response) {
        const { reason, driver_id, vehicle_id } = request.body;
        var format = require('date-format');
        initial_data = format.asString('dd/MM/yyyy hh:mm:ss', new Date());
        try{
            //Confere se o id do motorista e do automóvel existem
            if(await connection('drivers').where('id', driver_id).first() 
                && await connection('vehicles').where('id', vehicle_id).first()){
                /* Confere se há alguma utilização de veículo sem data final com o id
                do motorista e o id do carro que está tentando criar a utilização */
                if(!await connection('vehicle_utilizations').where({driver_id})
                    .where({vehicle_id}).where('final_data', '00/00/0000 00:00:00').first()){
                    await connection('vehicle_utilizations').insert({
                        initial_data,
                        reason,
                        driver_id,
                        vehicle_id
                    });
                    success = true;
                    message = "Vehicle Utilization registered with success.";
                }else{
                    success = false;
                    message = "Vehicle already in use or driver already using a vehicle.";
                }
            }else{
                success = false;
                message = "Driver or vehicle doesn't exists.";
            }
        }catch(exception){
            success = false;
            message = exception;
        }

        return response.json({success, message});
    },

    //Finaliza a utilização de um automóvel
    async finalize (request, response) {
        const { id } = request.params;
        var format = require('date-format');
        final_data = format.asString('dd/MM/yyyy hh:mm:ss', new Date());
        
        
        try{
            /*Confere se a data final está como padrão, caso esteja é porque
             a utilização do veículo já foi finalizada */
            if(await connection('vehicle_utilizations').update('final_data', final_data)
                .where('id', id).where('final_data' ,"00/00/0000 00:00:00")){
                success = true;
                message = "Vehicle utilization finalized with success.";
            }else{
                success = false;
                message = "Vehicle utilization already finalized or this vehicle utilization doesn't exists.";
            }
        }catch(exception){
            success = false;
            message = exception;
        }

        return response.json({success, message});
    },

    //Lista os registros de utilização
    async list (request, response){
         try{
            const posts = await connection('vehicle_utilizations')
                .join('drivers', 'drivers.id', 'vehicle_utilizations.driver_id')
                .join('vehicles', 'vehicles.id', 'vehicle_utilizations.vehicle_id')
                .select('vehicle_utilizations.id', 'name', 'driver_id', 'vehicle_id', 'license_plate', 'color', 'brand', 'initial_data', 'final_data', 'reason')
                .groupBy('vehicle_utilizations.id');
            success = true;
            message = posts;
        }catch(exception){
            success = false;
            message = exception;
        }
        return response.json({success, message});
    }
};
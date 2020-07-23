const connection = require('../database/connection');

module.exports = {
    //lista os automóveis cadastrados
    async index (request, response){
        const vehicles = await connection('vehicles'). select('*');
    
        return response.json(vehicles);
    },

    //cria automóveis
    async create (request, response) {
        const { license_plate, color, brand } = request.body;
        
        try{
            await connection('vehicles').insert({
                license_plate,
                color,
                brand
            })
        }catch(e){
            
            if(await connection('vehicles').where('license_plate', {license_plate}))
                return response.json("Already exists a vehicle registered with this license plate.");

            return response.json({e});
        }

        return response.json("Vehicle registered with success.");
    },

    //atualiza os automóveis
    async update (request, response) {
        const { id, license_plate, color, brand } = request.body;
        
        try{
            await connection('vehicles').update({
                license_plate,
                color,
                brand
            }).where({
                id
            })
        }catch(e){
            return response.json({e});
        }

        return response.json("Vehicle updated with success.");
    },

    //deleta automóvel
    async delete(request, response){
        const { id } = request.params;

        await connection('vehicles').where('id', id).delete();

        return response.status(204).send();
    }
};
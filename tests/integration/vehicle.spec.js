const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
const generateUniqueLicensePlate = require('../../src/utils/generateUniqueLicensePlate');

describe('Vehicle', () => {
    beforeEach(async() => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async() => {
        await connection.destroy();
    });

    //Teste de criação de automovel
    it('should be able to create a new vehicle', async() => {
        const licensePlate = generateUniqueLicensePlate();
        const response = await request(app)
            .post('/vehicles/create')
            .send({
                license_plate: licensePlate,
                color: "preto",
                brand: "Honda"
        });

        expect(response.body).toHaveProperty('success', true);
    });

    //Teste para listar os automóveis
    it('should be able to list vehicles', async() => {
        const licensePlate = generateUniqueLicensePlate();
        await request(app)
            .post('/vehicles/create')
            .send({
                license_plate: licensePlate,
                color: "preto",
                brand: "Honda"
        });

        const response = await request(app)
            .get('/vehicles/')
            .send({
        });

        const responseColor = await request(app)
            .get('/vehicles?color=preto')
            .send({
        });

        const responseBrand = await request(app)
            .get('/vehicles?brand=Honda')
            .send({
        });

        const responseColorAndBrand = await request(app)
            .get('/vehicles?color=preto&brand=Honda')
            .send({
        });

        expect(response.body).toHaveProperty('success', true);
        expect(responseColor.body).toHaveProperty('success', true);
        expect(responseBrand.body).toHaveProperty('success', true);
        expect(responseColorAndBrand.body).toHaveProperty('success', true);
    });

    //Teste para atualizar o automovel
    it('should be able to update vehicle', async() => {
        const licensePlate = generateUniqueLicensePlate();
        await request(app)
            .post('/vehicles/create')
            .send({
                license_plate: licensePlate,
                color: "preto",
                brand: "Honda"
        });

        const response = await request(app)
            .put('/vehicles/update')
            .send({
                id: 1,
                license_plate: "DDD1234",
                color: "branco",
                brand: "Mercedes"
        });

        expect(response.body).toHaveProperty('success', true);
    });

    //Teste para procurar pelo Id específico do automovel
    it('should be able to findById vehicle', async() => {
        const licensePlate = generateUniqueLicensePlate();
        
        await request(app)
            .post('/vehicles/create')
            .send({
                license_plate: licensePlate,
                color: "preto",
                brand: "Honda"
        });
        idString = await connection('vehicles').where('license_plate', licensePlate);
        id = parseInt(idString);
        const response = await request(app)
            .get('/vehicles/')
            .send({
        });

        expect(response.body).toHaveProperty('success', true);
    });

    //Teste para excluir um automovel pelo id
    it('should be able to delete vehicle', async() => {
        const licensePlate = generateUniqueLicensePlate();

        await request(app)
            .post('/vehicles/create')
            .send({
                license_plate: licensePlate,
                color: "preto",
                brand: "Honda"
        });

        const response = await request(app)
            .delete('/vehicles/delete/1')
            .send({
        });

        expect(response.body).toHaveProperty('success', true);
    });
});
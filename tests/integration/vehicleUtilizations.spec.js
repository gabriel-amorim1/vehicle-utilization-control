const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
const generateUniqueLicensePlate = require('../../src/utils/generateUniqueLicensePlate');

describe('Vehicle_Utilizations', () => {
    beforeEach(async() => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async() => {
        await connection.destroy();
    });

    //Teste de criação de utilização do veículo
    it('should be able to create a new vehicle utilization', async() => {
        const licensePlate = generateUniqueLicensePlate();
        await request(app)
            .post('/vehicles/create')
            .send({
                license_plate: licensePlate,
                color: "preto",
                brand: "Honda"
        });
        await request(app)
            .post('/drivers/create')
            .send({
                name: "Gabriel"
        });
        const response = await request(app)
            .post('/vehicle_utilizations/create')
            .send({
                reason: "Passeio com o automóvel",
                driver_id: 1,
                vehicle_id: 1
        });

        expect(response.body).toHaveProperty('success', true);
    });

    //Teste de finalização da utilização do veículo
    it('should be able to finalize a vehicle utilization', async() => {
        const licensePlate = generateUniqueLicensePlate();
        await request(app)
            .post('/vehicles/create')
            .send({
                license_plate: licensePlate,
                color: "preto",
                brand: "Honda"
        });
        await request(app)
            .post('/drivers/create')
            .send({
                name: "Gabriel"
        });
        await request(app)
            .post('/vehicle_utilizations/create')
            .send({
                reason: "Passeio com o automóvel",
                driver_id: 1,
                vehicle_id: 1
        });
        const response = await request(app)
            .get('/vehicle_utilizations/finalize/1')
            .send({
        });

        expect(response.body).toHaveProperty('success', true);
    });

    //Teste de listar as utilizações dos veículos
    it('should be able to list vehicles utilizations', async() => {
        const licensePlate = generateUniqueLicensePlate();
        await request(app)
            .post('/vehicles/create')
            .send({
                license_plate: licensePlate,
                color: "preto",
                brand: "Honda"
        });
        await request(app)
            .post('/drivers/create')
            .send({
                name: "Gabriel"
        });
        await request(app)
            .post('/vehicle_utilizations/create')
            .send({
                reason: "Passeio com o automóvel",
                driver_id: 1,
                vehicle_id: 1
        });
        const response = await request(app)
            .get('/vehicle_utilizations')
            .send({
        });

        expect(response.body).toHaveProperty('success', true);
    });
});
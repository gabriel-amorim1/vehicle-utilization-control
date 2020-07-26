const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Driver', () => {
    beforeEach(async() => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async() => {
        await connection.destroy();
    });

    //Teste de criação de motorista
    it('should be able to create a new Driver', async() => {
        const response = await request(app)
            .post('/drivers/create')
            .send({
                name: "Gabriel"
        });

        expect(response.body).toHaveProperty('success', true);
    });

    //Teste para listar todos motoristas cadastrados
    it('should be able to list all Drivers', async() => {
        const response = await request(app)
            .get('/drivers/')
            .send({
        });

        expect(response.body).toHaveProperty('success', true);
    });

    //Teste para listar os motoristas com filtro de nome
    it('should be able to list all Drivers with this name', async() => {
        await request(app)
            .post('/drivers/create')
            .send({
                name: "Gabriel"
        });

        const response = await request(app)
            .get('/drivers?name=Gabriel')
            .send({
        });

        expect(response.body).toHaveProperty('success', true);
    });

    //Teste para atualizar o motorista
    it('should be able to update Driver', async() => {
        await request(app)
            .post('/drivers/create')
            .send({
                name: "Gabriel"
        });

        const response = await request(app)
            .put('/drivers/update')
            .send({
                id: 1,
                name: "Gabriel Amorim"
        });

        expect(response.body).toHaveProperty('success', true);
    });

    //Teste para procurar pelo Id específico do motorista
    it('should be able to findById Driver', async() => {
        await request(app)
            .post('/drivers/create')
            .send({
                name: "Gabriel"
        });

        const response = await request(app)
            .get('/drivers/1')
            .send({
        });

        expect(response.body).toHaveProperty('success', true);
    });

    //Teste para excluir um motorista pelo id
    it('should be able to delete Driver', async() => {
        await request(app)
            .post('/drivers/create')
            .send({
                name: "Gabriel"
        });

        const response = await request(app)
            .delete('/drivers/delete/1')
            .send({
        });

        expect(response.body).toHaveProperty('success', true);
    });
});
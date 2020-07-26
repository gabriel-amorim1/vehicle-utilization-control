const generateUniqueLicensePlate = require('../../src/utils/generateUniqueLicensePlate');

describe('Generate Unique License Plate', () => {
    it('should generate an unique License Plate', () => {
        const licensePlate = generateUniqueLicensePlate();

        expect(licensePlate).toHaveLength(7);
    })
});
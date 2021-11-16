let assert = require("assert");
let fruitBasket = require("../fruitbasket");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:Minenhle!28@localhost:5432/fruit_basket';

const pool = new Pool({
    connectionString
});

describe('The fruitbasket function', () => {
    let fruit = fruitBasket(pool)

    beforeEach( async() => {
        await pool.query("truncate Fruit_Basket")
    })

    it('should add the strawberry fruit basket to the database', async () => {
        await fruit.createBasket('Strawberry', 1, '4.00');
        assert.deepEqual(await fruit.findFruit('Strawberry'), [{fruit_type: 'Strawberry', fruit_quantity: 1, fruit_price: '4.00'}])
    })

    it('should add the orange fruit basket to the database ,', async () => {
        await fruit.createBasket('Orange', 1, '5.00')
        assert.deepEqual(await fruit.findFruit('Orange'), [{fruit_type: 'Orange', fruit_quantity: 1, fruit_price: '5.00'}])
    })

    it('should update the number of fruits in a given Pomegranate basket', async () => {
        await fruit.createBasket('Pomegranate', 2, '3.00')
        await fruit.updateBasket('Pomegranate', 4)
        let selectedFruit = await fruit.findFruit('Pomegranate')
        assert.equal(selectedFruit[0].fruit_quantity, 6)
    })

    it('should update the number of fruits in a Pear Basket', async () => {
        fruit.createBasket('Pear', 3, '5.00')
        await fruit.updateBasket('Pear', 2)
        let selectedFruit = await fruit.findFruit('Pear')
        assert.equal(selectedFruit[0].fruit_quantity, 5)
    })

    it('should show the total price for an apple fruit basket', async () => {
        fruit.createBasket('Apple', 5, '2.00')
        assert.equal(await fruit.getTotalPerBasket('Apple'), '10.00')
    })

    it('should show the total price for a pear basket', async function () {
        await fruit.createBasket('Pear', 2, '2.50');
        assert.equal(await fruit.getTotalPerBasket('Pear'), '5.00')
    })

    it('should show the sum of the total of the strawberry fruit baskets', async () => {
        await fruit.createBasket('Strawberry', 2, '4.00')
        await fruit.createBasket('Strawberry', 4, '4.00')
        await fruit.createBasket('Apple', 6, '5.00')
        assert.equal(24, await fruit.getTotalPerType('Strawberry'))
    });

    it('should show the sum of the total of the banana fruit baskets', async () => {
        await fruit.createBasket('Banana', 3, '10.00')
        await fruit.createBasket('Banana', 5, '10.00')
        await fruit.createBasket('Banana', 5, '10.00')
        assert.equal(130, await fruit.getTotalPerType('Banana'))
    })

    after(function () {
        pool.end()
    })
});
module.exports = (pool) => {
    let fruitType = ""
    let fruitQuantity = 0
    let fruitPrice = 0
    
    const createBasket = async (type, quantity, price) => {
        await pool.query("insert into Fruit_Basket(fruit_type, fruit_quantity, fruit_price) values ($1, $2, $3)", [type, quantity, price])
    }

    const updateBasket = async (fruit, quantity) => {
        await pool.query("update Fruit_Basket set fruit_quantity = fruit_quantity + $1 where fruit_type = $2", [quantity, fruit])
    }

    const findFruit = async (fruit) => {
        let selectedFruit = await pool.query("select fruit_price, fruit_quantity, fruit_type from Fruit_Basket where fruit_type = $1", [fruit] )
        return selectedFruit.rows
    }

    const getTotalPerBasket = async (fruit) => {
        let totalPerBasket = await pool.query("select (fruit_price * fruit_quantity) as basket_total from Fruit_Basket where fruit_type = $1", [fruit])
        return totalPerBasket.rows[0].basket_total
    }

    const getTotalPerType = async (fruit) => {
        let totalPerType = await pool.query("select sum(fruit_price * fruit_quantity) as type_total from Fruit_Basket where fruit_type = $1", [fruit])
        return totalPerType.rows[0].type_total
    }

    return {
        createBasket,
        updateBasket,
        findFruit,
        getTotalPerBasket,
        getTotalPerType
    }
}
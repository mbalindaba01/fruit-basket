create table Fruit_Basket (
    basket_id serial not null primary key,
    fruit_type text not null,
    fruit_quantity int not null,
    fruit_price decimal(5,2)
)

insert into Fruit_Basket (fruit_type, fruit_quantity, fruit_price) values ('Apple', 1 , '2.50'), ('Orange', 1, '3.00'), ('Banana', 1, '2.00')
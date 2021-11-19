create table fruit_basket (
    basket_id serial not null primary key,
    fruit_type text not null,
    fruit_quantity integer not null,
    fruit_price decimal(5,2)
);

insert into fruit_basket (fruit_type, fruit_quantity, fruit_price) values ('Apple', 1 , '2.50'), ('Orange', 1, '3.00'), ('Banana', 1, '2.00');
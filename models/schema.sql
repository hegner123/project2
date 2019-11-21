### Schema
DROP DATABASE IF EXISTS project2_db;
CREATE DATABASE project2_db;

USE project2_db;

create table books (
	book_id int,
    isbn bigint (20),
    authors text ,
    original_publish_year int,
    title text,
    qty_on_hand int,
    qty_checked_out int,
    book_rating double,
    image_url text,
    small_image_url text,
    primary key (book_id)
);

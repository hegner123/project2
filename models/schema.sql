### Schema
DROP DATABASE IF EXISTS project2_db;
CREATE DATABASE project2_db;
USE project2_db;
Drop Table if exists books, checkouts, users;


CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `checkouts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  
  CREATE TABLE `books` (
  `book_id` int(11) DEFAULT NULL,
  `isbn` bigint(20) DEFAULT NULL,
  `authors` text,
  `original_publish_year` int(11) DEFAULT NULL,
  `title` text,
  `qty_on_hand` int(11) DEFAULT NULL,
  `qty_checked_out` int(11) DEFAULT NULL,
  `book_rating` double DEFAULT NULL,
  `image_url` text,
  `small_image_url` text,
  `createdAt` text,
  `updatedAt` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


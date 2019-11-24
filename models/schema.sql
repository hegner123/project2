### Schema
DROP DATABASE IF EXISTS project2_db;
CREATE DATABASE project2_db;
USE project2_db;
Drop Table if exists books, checkouts, users;


CREATE TABLE `books` (
  `book_id` int(11) NOT NULL,
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
  `updatedAt` text,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `checkouts` (
  `checkout_id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `checkout_on` datetime DEFAULT NULL,
  `return_by_date` datetime DEFAULT NULL,
  `return_on` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`checkout_id`),
  UNIQUE KEY `Checkouts_userId_bookId_unique` (`userId`,`bookId`),
  KEY `bookId` (`bookId`),
  CONSTRAINT `checkouts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `checkouts_ibfk_2` FOREIGN KEY (`bookId`) REFERENCES `books` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;





CREATE TABLE `social_media_cache` (
	`id` int AUTO_INCREMENT NOT NULL,
	`platform` enum('twitter','truthsocial') NOT NULL,
	`account` varchar(128) NOT NULL,
	`postId` varchar(128) NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL,
	`engagement` json,
	`cachedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `social_media_cache_id` PRIMARY KEY(`id`),
	CONSTRAINT `social_media_cache_postId_unique` UNIQUE(`postId`)
);

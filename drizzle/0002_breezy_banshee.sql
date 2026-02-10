CREATE TABLE `social_media_cache` (
	`id` int AUTO_INCREMENT NOT NULL,
	`platform` enum('twitter','truthsocial') NOT NULL,
	`handle` varchar(64) NOT NULL,
	`postId` varchar(64) NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL,
	`metrics` text,
	`url` text,
	`media` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`cachedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `social_media_cache_id` PRIMARY KEY(`id`)
);

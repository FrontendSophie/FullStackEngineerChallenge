CREATE TABLE `reviews` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `reviewerId` int(11) DEFAULT NULL,
  `revieweeId` int(11) DEFAULT NULL,
  `review` longtext DEFAULT NULL,
  `feedback` longtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `review_relation` (`reviewerId`,`revieweeId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
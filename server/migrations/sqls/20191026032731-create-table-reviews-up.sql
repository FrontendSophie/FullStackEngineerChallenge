CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `reviewerId` int(11) DEFAULT NULL,
  `revieweeId` int(11) DEFAULT NULL,
  `review` longtext,
  `feedback` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `review_relation` (`reviewerId`,`revieweeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

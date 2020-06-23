
--
-- Table structure for table `admin_role`
--

DROP TABLE IF EXISTS `admin_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `admin_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '名称',
  `remark` varchar(200) NOT NULL DEFAULT '' COMMENT '备注',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_role`
--

LOCK TABLES `admin_role` WRITE;
/*!40000 ALTER TABLE `admin_role` DISABLE KEYS */;
INSERT INTO `admin_role` VALUES (1,'超级管理员','超级管理员','2019-11-03 22:30:07','2019-11-03 22:30:07',NULL);
/*!40000 ALTER TABLE `admin_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_roleRoute`
--

DROP TABLE IF EXISTS `admin_roleRoute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `admin_roleRoute` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `roleId` int(11) NOT NULL COMMENT '角色ID',
  `routeId` int(11) NOT NULL COMMENT '路由ID',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_roleRoute`
--

LOCK TABLES `admin_roleRoute` WRITE;
/*!40000 ALTER TABLE `admin_roleRoute` DISABLE KEYS */;
INSERT INTO `admin_roleRoute` VALUES (1,1,1,'2019-11-03 22:30:07','2019-11-03 22:30:07',NULL),(2,1,2,'2019-11-03 22:30:07','2019-11-03 22:30:07',NULL),(3,1,3,'2019-11-03 22:30:07','2019-11-03 22:30:07',NULL),(4,1,4,'2019-11-03 22:30:07','2019-11-03 22:30:07',NULL),(5,1,5,'2019-11-03 22:30:07','2019-11-03 22:30:07',NULL),(6,1,6,'2019-11-03 22:30:07','2019-11-03 22:30:07',NULL),(7,1,7,'2019-11-03 22:30:07','2019-11-03 22:30:07',NULL),(8,1,8,'2019-11-03 22:30:07','2019-11-03 22:30:07',NULL),(9,1,9,'2019-11-03 22:30:07','2019-11-03 22:30:07',NULL),(10,1,10,'2019-11-03 22:30:07','2019-11-03 22:30:07',NULL),(11,1,11,'2019-11-03 22:30:07','2019-11-03 22:30:07',NULL);
/*!40000 ALTER TABLE `admin_roleRoute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_route`
--

DROP TABLE IF EXISTS `admin_route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `admin_route` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '名称',
  `route` varchar(1000) NOT NULL DEFAULT '' COMMENT '路由',
  `interfaces` varchar(10000) NOT NULL DEFAULT '' COMMENT '接口',
  `remark` varchar(200) NOT NULL DEFAULT '' COMMENT '备注',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_route`
--

LOCK TABLES `admin_route` WRITE;
/*!40000 ALTER TABLE `admin_route` DISABLE KEYS */;
INSERT INTO `admin_route` VALUES (1,'权限管理-权限列表','{\"order\":\"10\",\"label\":\"权限管理\",\"index\":\"role\",\"icon\":\"icon-role\",\"children\":[{\"label\":\"权限列表\",\"index\":\"/auth/route\",\"icon\":\"icon-role\"}]}','[{\"method\":\"GET\",\"path\":\"/admin/admin_route\"},{\"method\":\"POST\",\"path\":\"/admin/admin_route/{id}/delete\"}]','权限管理-权限列表','2018-03-27 20:23:43','2018-08-19 15:44:30',NULL),(2,'权限管理-权限编辑','{\"order\":\"10\",\"label\":\"权限管理\",\"index\":\"role\",\"icon\":\"icon-user\",\"children\":[{\"label\":\"权限编辑\",\"index\":\"/auth/route/edit\",\"notMenu\":\"true\"}]}','[{\"method\":\"POST\",\"path\":\"/admin/admin_route\"},{\"method\":\"POST\",\"path\":\"/admin/admin_route/{id}\"}]','权限管理-权限编辑','2018-03-27 20:25:10','2018-03-27 22:40:31',NULL),(3,'权限管理-角色列表','{\"order\":\"10\",\"label\":\"权限管理\",\"index\":\"role\",\"icon\":\"icon-role\",\"children\":[{\"label\":\"角色列表\",\"icon\":\"icon-role\",\"index\":\"/auth/role\"}]}','[{\"method\":\"GET\",\"path\":\"/admin/admin_role\"},{\"method\":\"POST\",\"path\":\"/admin/admin_role/{id}/delete\"}]','权限管理-角色列表','2018-03-27 20:40:58','2018-08-19 15:44:43',NULL),(4,'权限管理-角色添加','{\"order\":\"10\",\"label\":\"权限管理\",\"index\":\"role\",\"icon\":\"icon-user\",\"children\":[{\"label\":\"角色添加\",\"index\":\"/auth/role/add\",\"notMenu\":\"true\"}]}','[{\"method\":\"POST\",\"path\":\"/admin/admin_role\"}]','权限管理-角色添加','2018-03-27 20:46:26','2018-03-27 22:40:47',NULL),(5,'权限管理-角色权限设置','{\"order\":\"10\",\"label\":\"权限管理\",\"index\":\"role\",\"icon\":\"icon-user\",\"children\":[{\"label\":\"角色权限设置\",\"index\":\"/auth/role/setRoute\",\"notMenu\":\"true\"}]}','[{\"method\":\"POST\",\"path\":\"/admin/admin_role/{id}\"},{\"method\":\"GET\",\"path\":\"/admin/admin_route/all\"},{\"method\":\"GET\",\"path\":\"/admin/admin_roleRoute/all\"},{\"method\":\"POST\",\"path\":\"/admin/admin_roleRoute/bulk\"},{\"method\":\"POST\",\"path\":\"/admin/admin_roleRoute/{idStr}/bulkDelete\"}]','权限管理-角色权限设置','2018-03-27 20:48:56','2018-03-27 22:56:21',NULL),(6,'权限管理-用户角色列表','{\"order\":\"10\",\"label\":\"权限管理\",\"index\":\"role\",\"icon\":\"icon-role\",\"children\":[{\"label\":\"用户角色列表\",\"icon\":\"icon-role\",\"index\":\"/auth/user\"}]}','[{\"method\":\"GET\",\"path\":\"/admin/admin_user\"}]','权限管理-用户角色列表','2018-03-27 20:52:38','2018-08-19 15:45:00',NULL),(7,'权限管理-用户角色设置','{\"order\":\"10\",\"label\":\"权限管理\",\"index\":\"role\",\"icon\":\"icon-user\",\"children\":[{\"label\":\"用户角色设置\",\"index\":\"/auth/user/setRole\",\"notMenu\":\"true\"}]}','[{\"method\":\"GET\",\"path\":\"/admin/admin_user\"},{\"method\":\"GET\",\"path\":\"/admin/admin_role\"},{\"method\":\"GET\",\"path\":\"/admin/admin_userRole\"},{\"method\":\"GET\",\"path\":\"/admin/admin_route/all\"},{\"method\":\"GET\",\"path\":\"/admin/admin_roleRoute/all\"},{\"method\":\"POST\",\"path\":\"/admin/admin_userRole\"},{\"method\":\"POST\",\"path\":\"/admin/admin_userRole/{id}/delete\"}]','权限管理-用户角色设置','2018-03-27 20:54:05','2018-03-27 22:41:01',NULL),(8,'管理员-修改密码','{\"order\":\"30\",\"label\":\"管理员\",\"index\":\"administrator\",\"icon\":\"icon-admin\",\"children\":[{\"label\":\"修改密码\",\"index\":\"/administrator/updatePassword\",\"icon\":\"icon-admin\",\"notMenu\":\"true\"}]}','[{\"method\":\"POST\",\"path\":\"/admin/admin_user/updatePassword\"}]','管理员-修改密码','2018-03-27 22:40:00','2018-08-19 15:45:15',NULL),(9,'管理员列表','{\"order\":\"30\",\"label\":\"管理员\",\"index\":\"administrator\",\"icon\":\"icon-admin\",\"children\":[{\"label\":\"管理员列表\",\"index\":\"/administrator\",\"icon\":\"icon-admin\"}]}','[{\"method\":\"GET\",\"path\":\"/admin/admin_user\"}]','管理员列表','2018-03-27 00:12:39','2018-08-19 15:39:36',NULL),(10,'管理员创建','{\"order\":\"30\",\"label\":\"管理员\",\"index\":\"administrator\",\"icon\":\"icon-admin\",\"children\":[{\"label\":\"管理员创建\",\"index\":\"/administrator/new\",\"icon\":\"icon-admin\"}]}','[{\"method\":\"POST\",\"path\":\"/admin/admin_user/register\"}]','管理员创建','2018-03-27 00:13:53','2018-08-19 15:39:47',NULL),(11,'Dashboard','{\"order\":\"1\",\"label\":\"Dashboard\",\"index\":\"/dashboard\",\"icon\":\"icon-dashboard\"}','[]','Dashboard','2018-03-26 18:38:55','2019-01-30 01:54:47',NULL);
/*!40000 ALTER TABLE `admin_route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_user`
--

DROP TABLE IF EXISTS `admin_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `admin_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `lastLoginAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_user`
--

LOCK TABLES `admin_user` WRITE;
/*!40000 ALTER TABLE `admin_user` DISABLE KEYS */;
INSERT INTO `admin_user` VALUES (1,'fullstack','1daccdf2caf18a6813284bde46655de3','2019-11-05 02:16:39','2019-11-03 22:30:06','2019-11-05 02:16:39',NULL);
/*!40000 ALTER TABLE `admin_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_userOperationLog`
--

DROP TABLE IF EXISTS `admin_userOperationLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `admin_userOperationLog` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `api` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `method` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `query` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payload` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_userOperationLog`
--

LOCK TABLES `admin_userOperationLog` WRITE;
/*!40000 ALTER TABLE `admin_userOperationLog` DISABLE KEYS */;
INSERT INTO `admin_userOperationLog` VALUES (1,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:12','2019-11-03 22:48:12',NULL),(2,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:15','2019-11-03 22:48:15',NULL),(3,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:15','2019-11-03 22:48:15',NULL),(4,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:16','2019-11-03 22:48:16',NULL),(5,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:17','2019-11-03 22:48:17',NULL),(6,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:48:18','2019-11-03 22:48:18',NULL),(7,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:19','2019-11-03 22:48:19',NULL),(8,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:22','2019-11-03 22:48:22',NULL),(9,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:23','2019-11-03 22:48:23',NULL),(10,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:48:23','2019-11-03 22:48:23',NULL),(11,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:24','2019-11-03 22:48:24',NULL),(12,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:24','2019-11-03 22:48:24',NULL),(13,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:25','2019-11-03 22:48:25',NULL),(14,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:48:25','2019-11-03 22:48:25',NULL),(15,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:27','2019-11-03 22:48:27',NULL),(16,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:27','2019-11-03 22:48:27',NULL),(17,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:28','2019-11-03 22:48:28',NULL),(18,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:48:28','2019-11-03 22:48:28',NULL),(19,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:29','2019-11-03 22:48:29',NULL),(20,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:29','2019-11-03 22:48:29',NULL),(21,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:30','2019-11-03 22:48:30',NULL),(22,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:41','2019-11-03 22:48:41',NULL),(23,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:43','2019-11-03 22:48:43',NULL),(24,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:44','2019-11-03 22:48:44',NULL),(25,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:48:45','2019-11-03 22:48:45',NULL),(26,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:48:46','2019-11-03 22:48:46',NULL),(27,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":50}','','2019-11-03 22:48:46','2019-11-03 22:48:46',NULL),(28,'fullstack','/admin/admin_userRole','get','{\"userId\":1,\"page\":1,\"size\":10}','','2019-11-03 22:48:46','2019-11-03 22:48:46',NULL),(29,'fullstack','/admin/admin_route/all','get','{}','','2019-11-03 22:48:46','2019-11-03 22:48:46',NULL),(30,'fullstack','/admin/admin_roleRoute/all','get','{\"roleIdStr\":\"1\"}','','2019-11-03 22:48:46','2019-11-03 22:48:46',NULL),(31,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:48:48','2019-11-03 22:48:48',NULL),(32,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:49','2019-11-03 22:48:49',NULL),(33,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:50','2019-11-03 22:48:50',NULL),(34,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:54','2019-11-03 22:48:54',NULL),(35,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:55','2019-11-03 22:48:55',NULL),(36,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:48:58','2019-11-03 22:48:58',NULL),(37,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:49:00','2019-11-03 22:49:00',NULL),(38,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:49:01','2019-11-03 22:49:01',NULL),(39,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:49:02','2019-11-03 22:49:02',NULL),(40,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":50}','','2019-11-03 22:49:02','2019-11-03 22:49:02',NULL),(41,'fullstack','/admin/admin_userRole','get','{\"userId\":1,\"page\":1,\"size\":10}','','2019-11-03 22:49:02','2019-11-03 22:49:02',NULL),(42,'fullstack','/admin/admin_route/all','get','{}','','2019-11-03 22:49:02','2019-11-03 22:49:02',NULL),(43,'fullstack','/admin/admin_roleRoute/all','get','{\"roleIdStr\":\"1\"}','','2019-11-03 22:49:02','2019-11-03 22:49:02',NULL),(44,'fullstack','/admin/admin_user/updatePassword','post','','{\"password\":\"123456\",\"newPassword\":\"123456\"}','2019-11-03 22:49:36','2019-11-03 22:49:36',NULL),(45,'fullstack','/admin/admin_user/updatePassword','post','','{\"password\":\"123456\",\"newPassword\":\"12345678\"}','2019-11-03 22:49:43','2019-11-03 22:49:43',NULL),(46,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:49:50','2019-11-03 22:49:50',NULL),(47,'fullstack','/admin/admin_user/updatePassword','post','','{\"password\":\"12345678\",\"newPassword\":\"123456\"}','2019-11-03 22:50:00','2019-11-03 22:50:00',NULL),(48,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:51:36','2019-11-03 22:51:36',NULL),(49,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:51:37','2019-11-03 22:51:37',NULL),(50,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:51:39','2019-11-03 22:51:39',NULL),(51,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:51:40','2019-11-03 22:51:40',NULL),(52,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:51:42','2019-11-03 22:51:42',NULL),(53,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:51:44','2019-11-03 22:51:44',NULL),(54,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:51:44','2019-11-03 22:51:44',NULL),(55,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:51:45','2019-11-03 22:51:45',NULL),(56,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:51:45','2019-11-03 22:51:45',NULL),(57,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:51:46','2019-11-03 22:51:46',NULL),(58,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:51:46','2019-11-03 22:51:46',NULL),(59,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:51:47','2019-11-03 22:51:47',NULL),(60,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:51:48','2019-11-03 22:51:48',NULL),(61,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:51:49','2019-11-03 22:51:49',NULL),(62,'fullstack','/admin/admin_roleRoute/all','get','{\"roleIdStr\":\"1\"}','','2019-11-03 22:51:50','2019-11-03 22:51:50',NULL),(63,'fullstack','/admin/admin_route/all','get','{}','','2019-11-03 22:51:50','2019-11-03 22:51:50',NULL),(64,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:51:51','2019-11-03 22:51:51',NULL),(65,'fullstack','/admin/admin_roleRoute/all','get','{\"roleIdStr\":\"1\"}','','2019-11-03 22:51:52','2019-11-03 22:51:52',NULL),(66,'fullstack','/admin/admin_route/all','get','{}','','2019-11-03 22:51:52','2019-11-03 22:51:52',NULL),(67,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:51:54','2019-11-03 22:51:54',NULL),(68,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:51:55','2019-11-03 22:51:55',NULL),(69,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:51:56','2019-11-03 22:51:56',NULL),(70,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:51:57','2019-11-03 22:51:57',NULL),(71,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:53:43','2019-11-03 22:53:43',NULL),(72,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:53:44','2019-11-03 22:53:44',NULL),(73,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:53:44','2019-11-03 22:53:44',NULL),(74,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:53:49','2019-11-03 22:53:49',NULL),(75,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:53:50','2019-11-03 22:53:50',NULL),(76,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:53:51','2019-11-03 22:53:51',NULL),(77,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:53:52','2019-11-03 22:53:52',NULL),(78,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:53:54','2019-11-03 22:53:54',NULL),(79,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:53:55','2019-11-03 22:53:55',NULL),(80,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:53:56','2019-11-03 22:53:56',NULL),(81,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:53:57','2019-11-03 22:53:57',NULL),(82,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:53:57','2019-11-03 22:53:57',NULL),(83,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:53:58','2019-11-03 22:53:58',NULL),(84,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:53:59','2019-11-03 22:53:59',NULL),(85,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:53:59','2019-11-03 22:53:59',NULL),(86,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:54:00','2019-11-03 22:54:00',NULL),(87,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:54:00','2019-11-03 22:54:00',NULL),(88,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:54:01','2019-11-03 22:54:01',NULL),(89,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:54:02','2019-11-03 22:54:02',NULL),(90,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:54:05','2019-11-03 22:54:05',NULL),(91,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:54:05','2019-11-03 22:54:05',NULL),(92,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:54:06','2019-11-03 22:54:06',NULL),(93,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:54:23','2019-11-03 22:54:23',NULL),(94,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:54:24','2019-11-03 22:54:24',NULL),(95,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:54:55','2019-11-03 22:54:55',NULL),(96,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:54:57','2019-11-03 22:54:57',NULL),(97,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:54:58','2019-11-03 22:54:58',NULL),(98,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:54:59','2019-11-03 22:54:59',NULL),(99,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:55:09','2019-11-03 22:55:09',NULL),(100,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:55:09','2019-11-03 22:55:09',NULL),(101,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:55:14','2019-11-03 22:55:14',NULL),(102,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:55:15','2019-11-03 22:55:15',NULL),(103,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:55:16','2019-11-03 22:55:16',NULL),(104,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:55:16','2019-11-03 22:55:16',NULL),(105,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:55:17','2019-11-03 22:55:17',NULL),(106,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:55:17','2019-11-03 22:55:17',NULL),(107,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:55:18','2019-11-03 22:55:18',NULL),(108,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:55:18','2019-11-03 22:55:18',NULL),(109,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:55:19','2019-11-03 22:55:19',NULL),(110,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 22:55:22','2019-11-03 22:55:22',NULL),(111,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 22:55:23','2019-11-03 22:55:23',NULL),(112,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 22:55:23','2019-11-03 22:55:23',NULL),(113,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 23:02:04','2019-11-03 23:02:04',NULL),(114,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 23:02:06','2019-11-03 23:02:06',NULL),(115,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 23:02:14','2019-11-03 23:02:14',NULL),(116,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 23:02:15','2019-11-03 23:02:15',NULL),(117,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 23:02:16','2019-11-03 23:02:16',NULL),(118,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 23:02:17','2019-11-03 23:02:17',NULL),(119,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 23:02:18','2019-11-03 23:02:18',NULL),(120,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 23:02:19','2019-11-03 23:02:19',NULL),(121,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 23:02:19','2019-11-03 23:02:19',NULL),(122,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 23:02:20','2019-11-03 23:02:20',NULL),(123,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 23:02:20','2019-11-03 23:02:20',NULL),(124,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 23:03:45','2019-11-03 23:03:45',NULL),(125,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 23:03:46','2019-11-03 23:03:46',NULL),(126,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 23:03:46','2019-11-03 23:03:46',NULL),(127,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 23:03:51','2019-11-03 23:03:51',NULL),(128,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 23:03:51','2019-11-03 23:03:51',NULL),(129,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 23:09:28','2019-11-03 23:09:28',NULL),(130,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 23:09:29','2019-11-03 23:09:29',NULL),(131,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 23:09:29','2019-11-03 23:09:29',NULL),(132,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 23:09:30','2019-11-03 23:09:30',NULL),(133,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 23:09:39','2019-11-03 23:09:39',NULL),(134,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 23:09:42','2019-11-03 23:09:42',NULL),(135,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 23:09:46','2019-11-03 23:09:46',NULL),(136,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 23:09:50','2019-11-03 23:09:50',NULL),(137,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 23:10:11','2019-11-03 23:10:11',NULL),(138,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 23:10:12','2019-11-03 23:10:12',NULL),(139,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 23:11:52','2019-11-03 23:11:52',NULL),(140,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 23:11:54','2019-11-03 23:11:54',NULL),(141,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 23:12:01','2019-11-03 23:12:01',NULL),(142,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 23:14:47','2019-11-03 23:14:47',NULL),(143,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 23:14:48','2019-11-03 23:14:48',NULL),(144,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 23:14:48','2019-11-03 23:14:48',NULL),(145,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 23:14:49','2019-11-03 23:14:49',NULL),(146,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 23:14:50','2019-11-03 23:14:50',NULL),(147,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 23:14:52','2019-11-03 23:14:52',NULL),(148,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 23:14:53','2019-11-03 23:14:53',NULL),(149,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 23:14:53','2019-11-03 23:14:53',NULL),(150,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 23:14:54','2019-11-03 23:14:54',NULL),(151,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 23:14:55','2019-11-03 23:14:55',NULL),(152,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-03 23:17:58','2019-11-03 23:17:58',NULL),(153,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-03 23:18:00','2019-11-03 23:18:00',NULL),(154,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 23:18:00','2019-11-03 23:18:00',NULL),(155,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-03 23:18:02','2019-11-03 23:18:02',NULL),(156,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-05 02:16:45','2019-11-05 02:16:45',NULL),(157,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-05 02:16:47','2019-11-05 02:16:47',NULL),(158,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-05 02:16:47','2019-11-05 02:16:47',NULL),(159,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-05 02:16:49','2019-11-05 02:16:49',NULL),(160,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-05 02:17:20','2019-11-05 02:17:20',NULL),(161,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-05 02:17:34','2019-11-05 02:17:34',NULL),(162,'fullstack','/admin/admin_roleRoute/all','get','{\"roleIdStr\":\"1\"}','','2019-11-05 02:17:38','2019-11-05 02:17:38',NULL),(163,'fullstack','/admin/admin_route/all','get','{}','','2019-11-05 02:17:38','2019-11-05 02:17:38',NULL),(164,'fullstack','/admin/admin_user','get','{\"page\":0,\"size\":10}','','2019-11-05 02:17:42','2019-11-05 02:17:42',NULL),(165,'fullstack','/admin/admin_role','get','{\"page\":1,\"size\":30}','','2019-11-05 02:17:42','2019-11-05 02:17:42',NULL),(166,'fullstack','/admin/admin_route','get','{\"page\":1,\"size\":30}','','2019-11-05 02:17:43','2019-11-05 02:17:43',NULL);
/*!40000 ALTER TABLE `admin_userOperationLog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_userRole`
--

DROP TABLE IF EXISTS `admin_userRole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `admin_userRole` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL COMMENT '用户ID',
  `roleId` int(11) NOT NULL COMMENT '角色ID',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_userRole`
--

LOCK TABLES `admin_userRole` WRITE;
/*!40000 ALTER TABLE `admin_userRole` DISABLE KEYS */;
INSERT INTO `admin_userRole` VALUES (1,1,1,'2019-11-03 22:30:07','2019-11-03 22:30:07',NULL);
/*!40000 ALTER TABLE `admin_userRole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FlushLog`
--

DROP TABLE IF EXISTS `FlushLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `FlushLog` (
  `FlushDate` date NOT NULL COMMENT '数据清洗日期',
  `Type` int(11) NOT NULL COMMENT '清洗类型',
  `TypeDesc` varchar(100) NOT NULL COMMENT '清洗类型描述',
  `State` tinyint(4) NOT NULL DEFAULT '0' COMMENT '清洗状态：0-未清洗;1-已完成',
  `CreateTime` datetime DEFAULT NULL,
  `UpdateTime` datetime DEFAULT NULL,
  UNIQUE KEY `FlushDate` (`FlushDate`,`Type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FlushLog`
--

LOCK TABLES `FlushLog` WRITE;
/*!40000 ALTER TABLE `FlushLog` DISABLE KEYS */;
/*!40000 ALTER TABLE `FlushLog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveDailyData`
--

DROP TABLE IF EXISTS `LiveDailyData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveDailyData` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `MatchId` varchar(50) NOT NULL,
  `FlushDate` date NOT NULL COMMENT '数据清洗日期',
  `Uid` int(11) NOT NULL DEFAULT '0',
  `PlatId` int(11) NOT NULL,
  `UserId` varchar(100) NOT NULL,
  `TeamId` int(11) NOT NULL,
  `PlayerId` int(11) NOT NULL,
  `VoteNum` double NOT NULL DEFAULT '0' COMMENT '用户投票数',
  `VoteCount` bigint(20) NOT NULL DEFAULT '0' COMMENT '用户投票次数',
  `FreeNum` double NOT NULL DEFAULT '0' COMMENT '用户免费投票数',
  `FreeCount` bigint(20) NOT NULL DEFAULT '0' COMMENT '用户免费投票次数',
  `CreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `MatchId` (`FlushDate`,`MatchId`,`TeamId`,`PlayerId`,`PlatId`,`UserId`),
  KEY `UserId` (`Uid`,`FlushDate`) USING BTREE,
  KEY `FlushDate` (`FlushDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='每日数据表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveDailyData`
--

LOCK TABLES `LiveDailyData` WRITE;
/*!40000 ALTER TABLE `LiveDailyData` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveDailyData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveInteractEvent`
--

DROP TABLE IF EXISTS `LiveInteractEvent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveInteractEvent` (
  `dtEventTime` datetime DEFAULT NULL,
  `matchid` int(11) DEFAULT NULL,
  `teamid` int(11) DEFAULT NULL,
  `playerid` int(11) DEFAULT NULL,
  `userid` varchar(48) NOT NULL,
  `platid` int(11) DEFAULT NULL,
  `votenum` int(11) DEFAULT '0',
  `type` tinyint(2) DEFAULT '0',
  `flowid` varchar(255) DEFAULT NULL,
  KEY `dtEventTime` (`dtEventTime`),
  KEY `userid` (`userid`),
  KEY `type` (`type`),
  KEY `matchid` (`matchid`),
  KEY `platid` (`platid`),
  KEY `dtEventTime_2` (`userid`,`dtEventTime`),
  KEY `dtEventTime_3` (`platid`,`userid`,`dtEventTime`),
  KEY `matchid_2` (`matchid`,`platid`,`userid`) USING BTREE,
  KEY `dt_type` (`dtEventTime`,`type`),
  KEY `team_time` (`teamid`,`dtEventTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='流水表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveInteractEvent`
--

LOCK TABLES `LiveInteractEvent` WRITE;
/*!40000 ALTER TABLE `LiveInteractEvent` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveInteractEvent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveInteractEvent_201802`
--

DROP TABLE IF EXISTS `LiveInteractEvent_201802`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveInteractEvent_201802` (
  `dtEventTime` datetime DEFAULT NULL,
  `matchid` int(11) DEFAULT NULL,
  `teamid` int(11) DEFAULT NULL,
  `playerid` int(11) DEFAULT NULL,
  `userid` varchar(48) NOT NULL,
  `platid` int(11) DEFAULT NULL,
  `votenum` int(11) DEFAULT '0',
  `type` tinyint(2) DEFAULT '0',
  `flowid` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveInteractEvent_201802`
--

LOCK TABLES `LiveInteractEvent_201802` WRITE;
/*!40000 ALTER TABLE `LiveInteractEvent_201802` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveInteractEvent_201802` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveInteractEvent_201904`
--

DROP TABLE IF EXISTS `LiveInteractEvent_201904`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveInteractEvent_201904` (
  `dtEventTime` datetime DEFAULT NULL,
  `matchid` int(11) DEFAULT NULL,
  `teamid` int(11) DEFAULT NULL,
  `playerid` int(11) DEFAULT NULL,
  `userid` varchar(48) NOT NULL,
  `platid` int(11) DEFAULT NULL,
  `votenum` int(11) DEFAULT '0',
  `type` tinyint(2) DEFAULT '0',
  `flowid` varchar(255) DEFAULT NULL,
  KEY `dtEventTime` (`dtEventTime`),
  KEY `userid` (`userid`),
  KEY `type` (`type`),
  KEY `matchid` (`matchid`),
  KEY `platid` (`platid`),
  KEY `dtEventTime_2` (`userid`,`dtEventTime`),
  KEY `dtEventTime_3` (`platid`,`userid`,`dtEventTime`),
  KEY `matchid_2` (`matchid`,`platid`,`userid`) USING BTREE,
  KEY `dt_type` (`dtEventTime`,`type`),
  KEY `team_time` (`teamid`,`dtEventTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='流水表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveInteractEvent_201904`
--

LOCK TABLES `LiveInteractEvent_201904` WRITE;
/*!40000 ALTER TABLE `LiveInteractEvent_201904` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveInteractEvent_201904` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveInteractEvent_201905`
--

DROP TABLE IF EXISTS `LiveInteractEvent_201905`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveInteractEvent_201905` (
  `dtEventTime` datetime DEFAULT NULL,
  `matchid` int(11) DEFAULT NULL,
  `teamid` int(11) DEFAULT NULL,
  `playerid` int(11) DEFAULT NULL,
  `userid` varchar(48) NOT NULL,
  `platid` int(11) DEFAULT NULL,
  `votenum` int(11) DEFAULT '0',
  `type` tinyint(2) DEFAULT '0',
  `flowid` varchar(255) DEFAULT NULL,
  KEY `dtEventTime` (`dtEventTime`),
  KEY `userid` (`userid`),
  KEY `type` (`type`),
  KEY `matchid` (`matchid`),
  KEY `platid` (`platid`),
  KEY `dtEventTime_2` (`userid`,`dtEventTime`),
  KEY `dtEventTime_3` (`platid`,`userid`,`dtEventTime`),
  KEY `matchid_2` (`matchid`,`platid`,`userid`) USING BTREE,
  KEY `dt_type` (`dtEventTime`,`type`),
  KEY `team_time` (`teamid`,`dtEventTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='流水表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveInteractEvent_201905`
--

LOCK TABLES `LiveInteractEvent_201905` WRITE;
/*!40000 ALTER TABLE `LiveInteractEvent_201905` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveInteractEvent_201905` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveSeasonPlayer`
--

DROP TABLE IF EXISTS `LiveSeasonPlayer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveSeasonPlayer` (
  `dtEventTime` datetime DEFAULT NULL,
  `PlayerID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '选手ID',
  `TeamID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '战队ID',
  `SeasonID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '赛季ID',
  `Exp` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '本赛季所获取经验值',
  `Rank` int(11) unsigned DEFAULT '0' COMMENT '本赛季排名',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `Lineup` int(11) NOT NULL DEFAULT '1' COMMENT '统计周期内的上场次数',
  UNIQUE KEY `tb_season_player_rank_log_PlayerID_SeasonID_uindex` (`PlayerID`,`SeasonID`,`TeamID`) USING BTREE,
  KEY `SeasonID` (`TeamID`,`SeasonID`,`Rank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='选手赛季排行记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveSeasonPlayer`
--

LOCK TABLES `LiveSeasonPlayer` WRITE;
/*!40000 ALTER TABLE `LiveSeasonPlayer` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveSeasonPlayer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveSeasonPlayerUser`
--

DROP TABLE IF EXISTS `LiveSeasonPlayerUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveSeasonPlayerUser` (
  `dtEventTime` datetime DEFAULT NULL,
  `seasonid` int(11) unsigned DEFAULT NULL,
  `uid` int(11) unsigned NOT NULL,
  `playerid` int(11) unsigned NOT NULL,
  `teamid` int(11) unsigned NOT NULL,
  `totalexp` float DEFAULT NULL COMMENT '粉丝在该选手累计经验',
  `RankLevel` int(11) NOT NULL DEFAULT '1',
  `createdat` datetime DEFAULT NULL,
  `updatedat` datetime DEFAULT NULL,
  `FavTeamId` int(11) DEFAULT NULL,
  `UserRank` int(11) DEFAULT NULL COMMENT '用户在该选手下的排名',
  `FlushDate` date DEFAULT NULL,
  UNIQUE KEY `uni_idx1` (`seasonid`,`uid`,`playerid`,`teamid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveSeasonPlayerUser`
--

LOCK TABLES `LiveSeasonPlayerUser` WRITE;
/*!40000 ALTER TABLE `LiveSeasonPlayerUser` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveSeasonPlayerUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveSeasonPlayerUserGroup`
--

DROP TABLE IF EXISTS `LiveSeasonPlayerUserGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveSeasonPlayerUserGroup` (
  `Uid` int(11) NOT NULL COMMENT '用户内部uid',
  `Exp` int(11) NOT NULL COMMENT '周期内获得的经验值',
  `Rank` int(11) NOT NULL,
  `FavTeamId` int(11) NOT NULL COMMENT '选手所属战队id',
  `RankLevel` tinyint(3) NOT NULL COMMENT '用户对选手所在队伍的铭牌等级',
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户头像',
  `PlatIds` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户绑定的直播平台id，以,分隔',
  `FlushDate` date NOT NULL COMMENT '数据清洗日期',
  `SeasonId` int(11) NOT NULL DEFAULT '1' COMMENT '赛季id',
  `TeamId` int(11) NOT NULL COMMENT '战队id',
  `PlayerId` int(11) NOT NULL COMMENT '选手id',
  KEY `Rank` (`SeasonId`,`PlayerId`,`FlushDate`,`Rank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='聚合qq的 选手下用户赛季贡献榜';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveSeasonPlayerUserGroup`
--

LOCK TABLES `LiveSeasonPlayerUserGroup` WRITE;
/*!40000 ALTER TABLE `LiveSeasonPlayerUserGroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveSeasonPlayerUserGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveSeasonTeam`
--

DROP TABLE IF EXISTS `LiveSeasonTeam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveSeasonTeam` (
  `dtEventTime` datetime DEFAULT NULL,
  `TeamID` int(11) NOT NULL COMMENT '战队ID',
  `SeasonID` int(11) NOT NULL COMMENT '赛季ID',
  `Exp` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '本赛季所获取经验值',
  `Rank` int(11) unsigned DEFAULT '0' COMMENT '本赛季排名',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  UNIQUE KEY `tb_season_team_rank_log_TeamID_SeasonID_uindex` (`TeamID`,`SeasonID`),
  KEY `SeasonID` (`SeasonID`,`Rank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='战队赛季排行记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveSeasonTeam`
--

LOCK TABLES `LiveSeasonTeam` WRITE;
/*!40000 ALTER TABLE `LiveSeasonTeam` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveSeasonTeam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveSeasonTeamUser`
--

DROP TABLE IF EXISTS `LiveSeasonTeamUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveSeasonTeamUser` (
  `dtEventTime` datetime DEFAULT NULL,
  `seasonid` int(11) unsigned DEFAULT NULL,
  `uid` int(11) unsigned NOT NULL,
  `teamid` int(11) unsigned NOT NULL COMMENT '战队ID',
  `totalexp` varchar(255) DEFAULT '' COMMENT '粉丝在该战队累计经验',
  `createdat` datetime DEFAULT NULL,
  `updatedat` datetime DEFAULT NULL,
  `FlushDate` date DEFAULT NULL,
  UNIQUE KEY `seasonid` (`seasonid`,`uid`,`teamid`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveSeasonTeamUser`
--

LOCK TABLES `LiveSeasonTeamUser` WRITE;
/*!40000 ALTER TABLE `LiveSeasonTeamUser` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveSeasonTeamUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveSeasonTeamUserGroup`
--

DROP TABLE IF EXISTS `LiveSeasonTeamUserGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveSeasonTeamUserGroup` (
  `Uid` int(11) NOT NULL COMMENT '用户内部uid',
  `Exp` int(11) NOT NULL COMMENT '周期内获得的经验值',
  `Rank` int(11) NOT NULL,
  `RankLevel` tinyint(3) NOT NULL COMMENT '最喜欢的战队的铭牌等级',
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户头像',
  `PlatIds` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户绑定的直播平台id，以,分隔',
  `Date` date NOT NULL COMMENT '数据清洗日期',
  `SeasonId` int(11) NOT NULL DEFAULT '1' COMMENT '赛季id',
  `TeamId` int(11) NOT NULL COMMENT '战队id',
  `FlushDate` date NOT NULL COMMENT '数据清洗日期',
  KEY `Rank` (`SeasonId`,`TeamId`,`Date`,`Rank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='聚合qq的 战队下用户赛季贡献榜';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveSeasonTeamUserGroup`
--

LOCK TABLES `LiveSeasonTeamUserGroup` WRITE;
/*!40000 ALTER TABLE `LiveSeasonTeamUserGroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveSeasonTeamUserGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveSeasonUser`
--

DROP TABLE IF EXISTS `LiveSeasonUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveSeasonUser` (
  `dtEventTime` datetime DEFAULT NULL,
  `Uid` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '内部用户ID',
  `QQ` bigint(20) NOT NULL DEFAULT '0',
  `SeasonID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '赛季ID',
  `Exp` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '本赛季获取经验',
  `Rank` int(11) unsigned DEFAULT '0' COMMENT '本赛季排名',
  `FlushDate` date NOT NULL,
  `FavTeamId` int(11) NOT NULL COMMENT '最喜爱的战队id',
  `RankLevel` tinyint(2) DEFAULT '1' COMMENT '最喜欢的战队的段位',
  UNIQUE KEY `Uid_2` (`Uid`,`SeasonID`),
  KEY `Uid` (`Uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户赛季排行记录表(Top100)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveSeasonUser`
--

LOCK TABLES `LiveSeasonUser` WRITE;
/*!40000 ALTER TABLE `LiveSeasonUser` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveSeasonUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveSeasonUserGroup`
--

DROP TABLE IF EXISTS `LiveSeasonUserGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveSeasonUserGroup` (
  `Uid` int(11) NOT NULL COMMENT '用户内部uid',
  `Exp` int(11) NOT NULL COMMENT '周期内获得的经验值',
  `Rank` int(11) NOT NULL,
  `FavTeamId` int(11) NOT NULL COMMENT '最喜欢的战队id',
  `RankLevel` tinyint(3) NOT NULL COMMENT '最喜欢的战队的铭牌等级',
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户头像',
  `PlatIds` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户绑定的直播平台id，以,分隔',
  `FlushDate` date NOT NULL COMMENT '数据清洗日期',
  `SeasonId` int(11) NOT NULL DEFAULT '1' COMMENT '赛季id',
  KEY `Rank` (`SeasonId`,`FlushDate`,`Rank`),
  KEY `FlushDate` (`FlushDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='根据qq聚合后的用户赛季贡献排行榜';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveSeasonUserGroup`
--

LOCK TABLES `LiveSeasonUserGroup` WRITE;
/*!40000 ALTER TABLE `LiveSeasonUserGroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveSeasonUserGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveTotalPlayer`
--

DROP TABLE IF EXISTS `LiveTotalPlayer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveTotalPlayer` (
  `dtEventTime` datetime DEFAULT NULL,
  `PlayerID` int(11) NOT NULL,
  `TeamID` int(11) NOT NULL DEFAULT '0',
  `Rank` int(11) NOT NULL DEFAULT '0',
  `Exp` bigint(20) unsigned NOT NULL DEFAULT '0',
  `UpdatedAt` datetime DEFAULT NULL,
  `Lineup` int(11) NOT NULL DEFAULT '1' COMMENT '统计周期内的上场次数',
  PRIMARY KEY (`PlayerID`,`TeamID`) USING BTREE,
  KEY `TeamID` (`TeamID`,`Rank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveTotalPlayer`
--

LOCK TABLES `LiveTotalPlayer` WRITE;
/*!40000 ALTER TABLE `LiveTotalPlayer` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveTotalPlayer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveTotalPlayerUser`
--

DROP TABLE IF EXISTS `LiveTotalPlayerUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveTotalPlayerUser` (
  `dtEventTime` datetime DEFAULT NULL,
  `uid` int(11) unsigned NOT NULL,
  `playerid` int(11) NOT NULL,
  `teamid` int(11) unsigned NOT NULL,
  `totalexp` varchar(255) DEFAULT '' COMMENT '粉丝在该选手累计经验',
  `RankLevel` int(11) NOT NULL DEFAULT '1',
  `createdat` datetime DEFAULT NULL,
  `updatedat` datetime DEFAULT NULL,
  `FavTeamId` int(11) NOT NULL,
  `UserRank` int(11) DEFAULT NULL COMMENT '用户在该选手下的排名',
  `FlushDate` date DEFAULT NULL,
  UNIQUE KEY `uid` (`uid`,`playerid`,`teamid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveTotalPlayerUser`
--

LOCK TABLES `LiveTotalPlayerUser` WRITE;
/*!40000 ALTER TABLE `LiveTotalPlayerUser` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveTotalPlayerUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveTotalPlayerUserGroup`
--

DROP TABLE IF EXISTS `LiveTotalPlayerUserGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveTotalPlayerUserGroup` (
  `Uid` int(11) NOT NULL COMMENT '用户内部uid',
  `Exp` int(11) NOT NULL COMMENT '周期内获得的经验值',
  `Rank` int(11) NOT NULL,
  `FavTeamId` int(11) NOT NULL COMMENT '选手所属战队id',
  `RankLevel` tinyint(3) NOT NULL COMMENT '用户对选手所在队伍的铭牌等级',
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户头像',
  `PlatIds` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户绑定的直播平台id，以,分隔',
  `FlushDate` date NOT NULL COMMENT '数据清洗日期',
  `TeamId` int(11) NOT NULL COMMENT '战队id',
  `PlayerId` int(11) NOT NULL COMMENT '选手id',
  KEY `Rank` (`PlayerId`,`FlushDate`,`Rank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='聚合qq的 战队下用户总计贡献榜';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveTotalPlayerUserGroup`
--

LOCK TABLES `LiveTotalPlayerUserGroup` WRITE;
/*!40000 ALTER TABLE `LiveTotalPlayerUserGroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveTotalPlayerUserGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveTotalTeam`
--

DROP TABLE IF EXISTS `LiveTotalTeam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveTotalTeam` (
  `dtEventTime` datetime DEFAULT NULL,
  `TeamID` int(11) NOT NULL,
  `Exp` bigint(20) unsigned NOT NULL DEFAULT '0',
  `Rank` int(11) NOT NULL DEFAULT '0',
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`TeamID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveTotalTeam`
--

LOCK TABLES `LiveTotalTeam` WRITE;
/*!40000 ALTER TABLE `LiveTotalTeam` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveTotalTeam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveTotalTeamUser`
--

DROP TABLE IF EXISTS `LiveTotalTeamUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveTotalTeamUser` (
  `dtEventTime` datetime DEFAULT NULL,
  `uid` int(11) unsigned NOT NULL,
  `teamid` int(11) unsigned NOT NULL COMMENT '战队ID',
  `totalexp` varchar(255) DEFAULT '' COMMENT '粉丝在该战队累计经验',
  `createdat` datetime DEFAULT NULL,
  `updatedat` datetime DEFAULT NULL,
  `FlushDate` date DEFAULT NULL,
  UNIQUE KEY `uid` (`uid`,`teamid`),
  KEY `uid_2` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveTotalTeamUser`
--

LOCK TABLES `LiveTotalTeamUser` WRITE;
/*!40000 ALTER TABLE `LiveTotalTeamUser` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveTotalTeamUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveTotalTeamUserGroup`
--

DROP TABLE IF EXISTS `LiveTotalTeamUserGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveTotalTeamUserGroup` (
  `Uid` int(11) NOT NULL COMMENT '用户内部uid',
  `Exp` int(11) NOT NULL COMMENT '周期内获得的经验值',
  `Rank` int(11) NOT NULL,
  `RankLevel` tinyint(3) NOT NULL COMMENT '最喜欢的战队的铭牌等级',
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户头像',
  `PlatIds` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户绑定的直播平台id，以,分隔',
  `FlushDate` date NOT NULL COMMENT '数据清洗日期',
  `TeamId` int(11) NOT NULL COMMENT '战队id',
  KEY `Rank` (`TeamId`,`FlushDate`,`Rank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='聚合qq的 战队下用户总贡献榜';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveTotalTeamUserGroup`
--

LOCK TABLES `LiveTotalTeamUserGroup` WRITE;
/*!40000 ALTER TABLE `LiveTotalTeamUserGroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveTotalTeamUserGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveTotalUser`
--

DROP TABLE IF EXISTS `LiveTotalUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveTotalUser` (
  `dtEventTime` datetime DEFAULT NULL,
  `Uid` int(10) unsigned NOT NULL,
  `QQ` bigint(20) NOT NULL DEFAULT '0',
  `Exp` int(11) unsigned NOT NULL DEFAULT '0',
  `Rank` int(10) unsigned NOT NULL DEFAULT '0',
  `FlushDate` date DEFAULT NULL,
  `FavTeamId` int(11) NOT NULL COMMENT '最喜爱的战队ID',
  `RankLevel` tinyint(2) DEFAULT '1' COMMENT '最喜欢的战队的段位',
  UNIQUE KEY `Uid` (`Uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='top100';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveTotalUser`
--

LOCK TABLES `LiveTotalUser` WRITE;
/*!40000 ALTER TABLE `LiveTotalUser` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveTotalUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveTotalUserGroup`
--

DROP TABLE IF EXISTS `LiveTotalUserGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveTotalUserGroup` (
  `Uid` int(11) NOT NULL COMMENT '用户内部uid',
  `Exp` int(11) NOT NULL COMMENT '周期内获得的经验值',
  `Rank` int(11) NOT NULL,
  `FavTeamId` int(11) NOT NULL COMMENT '最喜欢的战队id',
  `RankLevel` tinyint(3) NOT NULL COMMENT '最喜欢的战队的铭牌等级',
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户头像',
  `PlatIds` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户绑定的直播平台id，以,分隔',
  `FlushDate` date NOT NULL COMMENT '数据清洗日期',
  KEY `Rank` (`FlushDate`,`Rank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='根据qq聚合后的用户总贡献排行榜';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveTotalUserGroup`
--

LOCK TABLES `LiveTotalUserGroup` WRITE;
/*!40000 ALTER TABLE `LiveTotalUserGroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveTotalUserGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveWeekPlayer`
--

DROP TABLE IF EXISTS `LiveWeekPlayer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveWeekPlayer` (
  `dtEventTime` datetime DEFAULT NULL,
  `PlayerID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '选手ID',
  `TeamID` int(10) unsigned NOT NULL DEFAULT '0',
  `Rank` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '近三场排行',
  `FlushDate` datetime DEFAULT NULL COMMENT '最近一场比赛日期',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `Exp` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '近三场累计Exp，小数取整',
  `Lineup` int(11) NOT NULL DEFAULT '1' COMMENT '统计周期内的上场次数',
  UNIQUE KEY `PlayerID_2` (`PlayerID`,`TeamID`) USING BTREE,
  UNIQUE KEY `PlayerID` (`PlayerID`,`FlushDate`),
  KEY `Rank` (`TeamID`,`FlushDate`,`Rank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='选手近三场表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveWeekPlayer`
--

LOCK TABLES `LiveWeekPlayer` WRITE;
/*!40000 ALTER TABLE `LiveWeekPlayer` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveWeekPlayer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveWeekPlayerUser`
--

DROP TABLE IF EXISTS `LiveWeekPlayerUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveWeekPlayerUser` (
  `dtEventTime` datetime DEFAULT NULL,
  `uid` int(11) unsigned NOT NULL,
  `playerid` int(11) unsigned NOT NULL,
  `teamid` int(11) unsigned NOT NULL COMMENT '战队ID',
  `totalexp` bigint(20) DEFAULT '0' COMMENT '粉丝在该选手累计经验',
  `RankLevel` int(11) NOT NULL DEFAULT '1',
  `createdat` datetime DEFAULT NULL,
  `updatedat` datetime DEFAULT NULL,
  `FavTeamId` int(11) DEFAULT NULL,
  `UserRank` int(11) DEFAULT NULL COMMENT '用户在该选手下的排名',
  `FlushDate` date DEFAULT NULL,
  UNIQUE KEY `uid` (`uid`,`playerid`,`teamid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveWeekPlayerUser`
--

LOCK TABLES `LiveWeekPlayerUser` WRITE;
/*!40000 ALTER TABLE `LiveWeekPlayerUser` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveWeekPlayerUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveWeekPlayerUserGroup`
--

DROP TABLE IF EXISTS `LiveWeekPlayerUserGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveWeekPlayerUserGroup` (
  `Uid` int(11) NOT NULL COMMENT '用户内部uid',
  `Exp` int(11) NOT NULL COMMENT '周期内获得的经验值',
  `Rank` int(11) NOT NULL,
  `FavTeamId` int(11) NOT NULL COMMENT '选手所属战队id',
  `RankLevel` tinyint(3) NOT NULL COMMENT '用户对选手所在队伍的铭牌等级',
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户头像',
  `PlatIds` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户绑定的直播平台id，以,分隔',
  `FlushDate` date NOT NULL COMMENT '数据清洗日期',
  `TeamId` int(11) NOT NULL COMMENT '战队id',
  `PlayerId` int(11) NOT NULL COMMENT '选手id',
  KEY `Rank` (`PlayerId`,`FlushDate`,`Rank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='聚合qq的 选手下用户周贡献榜';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveWeekPlayerUserGroup`
--

LOCK TABLES `LiveWeekPlayerUserGroup` WRITE;
/*!40000 ALTER TABLE `LiveWeekPlayerUserGroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveWeekPlayerUserGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveWeekTeam`
--

DROP TABLE IF EXISTS `LiveWeekTeam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveWeekTeam` (
  `dtEventTime` datetime DEFAULT NULL,
  `TeamID` int(11) NOT NULL COMMENT '战队ID',
  `Exp` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '近三场累计Exp，小数取整',
  `Rank` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '近三场排行',
  `FlushDate` datetime DEFAULT NULL COMMENT '最近一场比赛日期',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  UNIQUE KEY `TeamID_2` (`TeamID`),
  UNIQUE KEY `TeamID` (`TeamID`,`FlushDate`),
  KEY `Rank` (`FlushDate`,`Rank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='战队近三场表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveWeekTeam`
--

LOCK TABLES `LiveWeekTeam` WRITE;
/*!40000 ALTER TABLE `LiveWeekTeam` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveWeekTeam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveWeekTeamUser`
--

DROP TABLE IF EXISTS `LiveWeekTeamUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveWeekTeamUser` (
  `dtEventTime` datetime DEFAULT NULL,
  `uid` int(11) unsigned NOT NULL,
  `teamid` int(11) unsigned NOT NULL COMMENT '战队ID',
  `totalexp` varchar(255) DEFAULT '' COMMENT '粉丝在该战队累计经验',
  `createdat` datetime DEFAULT NULL,
  `updatedat` datetime DEFAULT NULL,
  `FlushDate` date DEFAULT NULL,
  UNIQUE KEY `flushdate` (`uid`,`teamid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveWeekTeamUser`
--

LOCK TABLES `LiveWeekTeamUser` WRITE;
/*!40000 ALTER TABLE `LiveWeekTeamUser` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveWeekTeamUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveWeekTeamUserGroup`
--

DROP TABLE IF EXISTS `LiveWeekTeamUserGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveWeekTeamUserGroup` (
  `Uid` int(11) NOT NULL COMMENT '用户内部uid',
  `Exp` int(11) NOT NULL COMMENT '周期内获得的经验值',
  `Rank` int(11) NOT NULL,
  `RankLevel` tinyint(3) NOT NULL COMMENT '最喜欢的战队的铭牌等级',
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户头像',
  `PlatIds` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户绑定的直播平台id，以,分隔',
  `TeamId` int(11) NOT NULL COMMENT '战队id',
  `FlushDate` date DEFAULT NULL,
  KEY `Rank` (`TeamId`,`Rank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='聚合qq的 战队下用户周贡献榜';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveWeekTeamUserGroup`
--

LOCK TABLES `LiveWeekTeamUserGroup` WRITE;
/*!40000 ALTER TABLE `LiveWeekTeamUserGroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveWeekTeamUserGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveWeekUser`
--

DROP TABLE IF EXISTS `LiveWeekUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveWeekUser` (
  `dtEventTime` datetime DEFAULT NULL,
  `QQ` bigint(20) NOT NULL DEFAULT '0',
  `Exp` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '近三场累计Exp，小数取整',
  `Rank` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '近三场排行',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `Uid` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '内部用户唯一ID',
  `FavTeamId` int(11) NOT NULL COMMENT '最喜欢的战队id',
  `RankLevel` tinyint(3) NOT NULL DEFAULT '1' COMMENT '最喜欢的战队的段位',
  `FlushDate` date DEFAULT NULL,
  UNIQUE KEY `Uid` (`Uid`),
  KEY `QQ` (`QQ`),
  KEY `Exp` (`FlushDate`,`Exp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='一周用户贡献榜,限量200名榜单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveWeekUser`
--

LOCK TABLES `LiveWeekUser` WRITE;
/*!40000 ALTER TABLE `LiveWeekUser` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveWeekUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveWeekUserGroup`
--

DROP TABLE IF EXISTS `LiveWeekUserGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LiveWeekUserGroup` (
  `Uid` int(11) NOT NULL COMMENT '用户内部uid',
  `Exp` int(11) NOT NULL COMMENT '周期内获得的经验值',
  `Rank` int(11) NOT NULL,
  `FavTeamId` int(11) NOT NULL COMMENT '最喜欢的战队id',
  `RankLevel` tinyint(3) NOT NULL COMMENT '最喜欢的战队的铭牌等级',
  `UserName` varchar(255) DEFAULT NULL COMMENT '用户名，绑定q的是qq昵称，否则是直播平台用户昵称',
  `Avatar` varchar(255) DEFAULT NULL COMMENT '用户头像',
  `PlatIds` varchar(255) NOT NULL COMMENT '用户绑定的直播平台id，以,分隔',
  `FlushDate` date NOT NULL COMMENT '数据清洗日期',
  KEY `Rank` (`FlushDate`,`Rank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='根据qq聚合后的用户贡献周榜';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveWeekUserGroup`
--

LOCK TABLES `LiveWeekUserGroup` WRITE;
/*!40000 ALTER TABLE `LiveWeekUserGroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveWeekUserGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_users`
--

DROP TABLE IF EXISTS `oauth_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `oauth_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `gender` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1',
  `last_login_at` timestamp NULL DEFAULT NULL,
  `login_times` int(11) NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_users`
--

LOCK TABLES `oauth_users` WRITE;
/*!40000 ALTER TABLE `oauth_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_action_log`
--

DROP TABLE IF EXISTS `tb_action_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_action_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iUserId` int(11) NOT NULL COMMENT '管理员id',
  `sUserName` varchar(255) NOT NULL COMMENT '管理员名',
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '操作时间',
  `sContent` text NOT NULL COMMENT '操作的内容',
  `UpdatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员操作日志';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_action_log`
--

LOCK TABLES `tb_action_log` WRITE;
/*!40000 ALTER TABLE `tb_action_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_action_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_ad`
--

DROP TABLE IF EXISTS `tb_ad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_ad` (
  `id` int(11) NOT NULL DEFAULT '0',
  `sUser` varchar(255) NOT NULL COMMENT '创建人',
  `sUrl` varchar(255) NOT NULL COMMENT '广告链接',
  `CreatedAt` datetime NOT NULL COMMENT '创建时间',
  `sName` varchar(255) NOT NULL COMMENT '广告备注',
  `iPosition` tinyint(3) NOT NULL COMMENT '广告位置',
  `UpdatedAt` datetime NOT NULL COMMENT '创建时间',
  `iStatus` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否启用',
  PRIMARY KEY (`id`),
  KEY `iStatus` (`iStatus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_ad`
--

LOCK TABLES `tb_ad` WRITE;
/*!40000 ALTER TABLE `tb_ad` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_ad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_ad_log`
--

DROP TABLE IF EXISTS `tb_ad_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_ad_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` varchar(255) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `iAdid` int(11) DEFAULT NULL,
  `sPlat` varchar(255) NOT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `iTest` tinyint(1) NOT NULL,
  `iSuccess` tinyint(1) NOT NULL,
  `sRst` varchar(255) NOT NULL,
  `iMatchId` int(11) NOT NULL,
  `iAdTime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `iMatchId` (`iMatchId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_ad_log`
--

LOCK TABLES `tb_ad_log` WRITE;
/*!40000 ALTER TABLE `tb_ad_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_ad_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_admin_info`
--

DROP TABLE IF EXISTS `tb_admin_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_admin_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sOpenId` varchar(32) NOT NULL COMMENT '小程序的openid',
  `sUserName` varchar(255) NOT NULL COMMENT '用户名',
  `sUserAvatar` varchar(255) NOT NULL COMMENT '用户头像',
  `dtRegister` datetime NOT NULL COMMENT '注册时间',
  `iRoleId` tinyint(2) NOT NULL COMMENT '角色id',
  `iTeamId` int(11) NOT NULL COMMENT '所属战队',
  PRIMARY KEY (`id`),
  KEY `sOpenId` (`sOpenId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_admin_info`
--

LOCK TABLES `tb_admin_info` WRITE;
/*!40000 ALTER TABLE `tb_admin_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_admin_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_city_configIp`
--

DROP TABLE IF EXISTS `tb_city_configIp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_city_configIp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `SideType` varchar(5) DEFAULT NULL,
  `CityCode` varchar(20) DEFAULT NULL,
  `Position` int(11) DEFAULT NULL,
  `Ip` varchar(50) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_city_configIp`
--

LOCK TABLES `tb_city_configIp` WRITE;
/*!40000 ALTER TABLE `tb_city_configIp` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_city_configIp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_city_ips`
--

DROP TABLE IF EXISTS `tb_city_ips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_city_ips` (
  `match_id` int(11) DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  `ip_type` varchar(50) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_city_ips`
--

LOCK TABLES `tb_city_ips` WRITE;
/*!40000 ALTER TABLE `tb_city_ips` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_city_ips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_commentator_info`
--

DROP TABLE IF EXISTS `tb_commentator_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_commentator_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `CmtDes` varchar(255) NOT NULL COMMENT '名称',
  `CmtAvatar` varchar(255) DEFAULT NULL COMMENT '头像URL',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='解说';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_commentator_info`
--

LOCK TABLES `tb_commentator_info` WRITE;
/*!40000 ALTER TABLE `tb_commentator_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_commentator_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_data_more_rank`
--

DROP TABLE IF EXISTS `tb_data_more_rank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_data_more_rank` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `MatchID` int(11) DEFAULT NULL,
  `TeamID` int(11) DEFAULT NULL,
  `Exp` int(11) DEFAULT NULL,
  `PlatformID` int(11) DEFAULT NULL,
  `Verify` int(11) DEFAULT NULL,
  `LevelDesc` varchar(255) DEFAULT NULL,
  `UserID` varchar(255) DEFAULT NULL,
  `NickName` varchar(255) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `SumExp` int(11) DEFAULT '0',
  `RankLevel` int(11) DEFAULT NULL COMMENT '用户等级',
  PRIMARY KEY (`id`),
  KEY `m_p_t` (`MatchID`,`PlatformID`,`TeamID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_data_more_rank`
--

LOCK TABLES `tb_data_more_rank` WRITE;
/*!40000 ALTER TABLE `tb_data_more_rank` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_data_more_rank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_daydream_info`
--

DROP TABLE IF EXISTS `tb_daydream_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_daydream_info` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `MatchID` int(11) NOT NULL COMMENT '比赛ID',
  `Type` int(1) NOT NULL COMMENT '类型（1：付费、2：免费）',
  `Name` varchar(100) NOT NULL DEFAULT '' COMMENT '名称',
  `Intro` varchar(5000) NOT NULL DEFAULT '' COMMENT '介绍',
  `TargetScore` int(12) NOT NULL DEFAULT '0' COMMENT '总打赏额度',
  `CurrentScore` int(12) NOT NULL DEFAULT '0' COMMENT '当前打赏额度',
  `ProgressRate` double(5,2) NOT NULL DEFAULT '0.00' COMMENT '进度',
  `Duration` int(12) NOT NULL DEFAULT '0' COMMENT '任务时长（分钟）',
  `Status` int(1) NOT NULL DEFAULT '0' COMMENT '状态（0：未上架、1：已上架、2：已下架、3：已完成、4：已结束、5：已过期）',
  `Deadline` bigint(13) NOT NULL DEFAULT '0' COMMENT '截止日期',
  `CreatedAt` timestamp NULL DEFAULT NULL,
  `UpdatedAt` timestamp NULL DEFAULT NULL,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_daydream_info`
--

LOCK TABLES `tb_daydream_info` WRITE;
/*!40000 ALTER TABLE `tb_daydream_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_daydream_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_daydream_lottery_vote_log`
--

DROP TABLE IF EXISTS `tb_daydream_lottery_vote_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_daydream_lottery_vote_log` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `DaydreamID` int(11) NOT NULL COMMENT '任务ID',
  `MatchID` int(11) NOT NULL COMMENT '比赛ID',
  `PlatID` int(11) NOT NULL COMMENT '平台ID',
  `UserID` varchar(48) NOT NULL DEFAULT '' COMMENT '平台用户ID',
  `FlowID` varchar(255) NOT NULL DEFAULT '' COMMENT '平台流水ID',
  `VoteNum` int(12) NOT NULL DEFAULT '0' COMMENT '赏额度',
  `CreatedAt` timestamp NULL DEFAULT NULL,
  `UpdatedAt` timestamp NULL DEFAULT NULL,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `DaydreamID` (`DaydreamID`),
  KEY `UserID` (`UserID`),
  KEY `PlatID` (`PlatID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_daydream_lottery_vote_log`
--

LOCK TABLES `tb_daydream_lottery_vote_log` WRITE;
/*!40000 ALTER TABLE `tb_daydream_lottery_vote_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_daydream_lottery_vote_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_daydream_lucky_vote_log`
--

DROP TABLE IF EXISTS `tb_daydream_lucky_vote_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_daydream_lucky_vote_log` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `DaydreamID` int(11) NOT NULL COMMENT '任务ID',
  `MatchID` int(11) NOT NULL COMMENT '比赛ID',
  `PlatID` int(11) NOT NULL COMMENT '平台ID',
  `UserID` varchar(48) NOT NULL DEFAULT '' COMMENT '平台用户ID',
  `FlowID` varchar(255) NOT NULL DEFAULT '' COMMENT '平台流水ID',
  `VoteNum` int(12) NOT NULL DEFAULT '0' COMMENT '赏额度',
  `ProgressRate` double(5,2) NOT NULL DEFAULT '0.00' COMMENT '进度',
  `CreatedAt` timestamp NULL DEFAULT NULL,
  `UpdatedAt` timestamp NULL DEFAULT NULL,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `DaydreamID` (`DaydreamID`),
  KEY `UserID` (`UserID`),
  KEY `PlatID` (`PlatID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_daydream_lucky_vote_log`
--

LOCK TABLES `tb_daydream_lucky_vote_log` WRITE;
/*!40000 ALTER TABLE `tb_daydream_lucky_vote_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_daydream_lucky_vote_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_daydream_vote_log`
--

DROP TABLE IF EXISTS `tb_daydream_vote_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_daydream_vote_log` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `DaydreamID` int(11) NOT NULL COMMENT '任务ID',
  `MatchID` int(11) NOT NULL COMMENT '比赛ID',
  `PlatID` int(11) NOT NULL COMMENT '平台ID',
  `UserID` varchar(48) NOT NULL DEFAULT '' COMMENT '平台用户ID',
  `FlowID` varchar(255) NOT NULL DEFAULT '' COMMENT '平台流水ID',
  `VoteNum` int(12) NOT NULL DEFAULT '0' COMMENT '赏额度',
  `CreatedAt` timestamp NULL DEFAULT NULL,
  `UpdatedAt` timestamp NULL DEFAULT NULL,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `DaydreamID` (`DaydreamID`),
  KEY `UserID` (`UserID`),
  KEY `PlatID` (`PlatID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_daydream_vote_log`
--

LOCK TABLES `tb_daydream_vote_log` WRITE;
/*!40000 ALTER TABLE `tb_daydream_vote_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_daydream_vote_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_dict`
--

DROP TABLE IF EXISTS `tb_dict`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_dict` (
  `id` int(11) NOT NULL,
  `Key` varchar(255) DEFAULT NULL,
  `Value` varchar(255) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_dict`
--

LOCK TABLES `tb_dict` WRITE;
/*!40000 ALTER TABLE `tb_dict` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_dict` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_game_info`
--

DROP TABLE IF EXISTS `tb_game_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_game_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `PlatformGameId` varchar(128) NOT NULL COMMENT 'platformID_gameID拼接唯一ID',
  `StartTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '比赛开始时间',
  `GameName` varchar(256) NOT NULL COMMENT '比赛细节数据',
  PRIMARY KEY (`id`),
  UNIQUE KEY `PlatformGameId` (`PlatformGameId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='赛程小节数据表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_game_info`
--

LOCK TABLES `tb_game_info` WRITE;
/*!40000 ALTER TABLE `tb_game_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_game_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_gift_info`
--

DROP TABLE IF EXISTS `tb_gift_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_gift_info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `GiftType` varchar(255) NOT NULL DEFAULT '' COMMENT '礼物名称',
  `Price` varchar(255) DEFAULT '0' COMMENT '礼物价格，单位元',
  `State` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '礼物状态，0-关闭；1-开启',
  `DelayPushTime` int(11) DEFAULT '0' COMMENT '延迟推送时间',
  `DelayEndTime` int(11) DEFAULT '0' COMMENT '接收结束时间',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='礼物信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_gift_info`
--

LOCK TABLES `tb_gift_info` WRITE;
/*!40000 ALTER TABLE `tb_gift_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_gift_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_gift_purchase_log`
--

DROP TABLE IF EXISTS `tb_gift_purchase_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_gift_purchase_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Uid` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '内部用户ID',
  `GiftID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '礼物ID',
  `GiftTypeID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '礼物类型ID',
  `PlatformID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '平台ID',
  `UserID` varchar(255) NOT NULL DEFAULT '',
  `NickName` varchar(255) NOT NULL DEFAULT '' COMMENT '平台用户昵称（直播展示）',
  `MatchID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '比赛ID',
  `TeamID` int(11) NOT NULL DEFAULT '0' COMMENT '战队ID',
  `PlayerID` int(11) DEFAULT '0' COMMENT '选手ID',
  `Count` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '礼物轮数（第N次大小龙）',
  `Round` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '比赛小局数',
  `State` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '0-已购买待通知;1-已通知待播放;2-已发送;3-已播放;9-玩家被ban',
  `NetStatus` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '0-直播平台未收到；1-已收到',
  `Inactive` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '1-代表不会播放了，需要通知直播平台退款',
  `GiftOld` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '开启新一轮以前旧数据标记为 1，不再向现场发送',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='礼物购买与播放记录';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_gift_purchase_log`
--

LOCK TABLES `tb_gift_purchase_log` WRITE;
/*!40000 ALTER TABLE `tb_gift_purchase_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_gift_purchase_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_level_rule`
--

DROP TABLE IF EXISTS `tb_level_rule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_level_rule` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Type` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '1-用户；2-选手；3-战队',
  `Level` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '等级',
  `Exp` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '所需经验点数',
  `Desc` varchar(255) NOT NULL DEFAULT '' COMMENT '黄铜、白银、黄金...',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `UserLevel` int(11) NOT NULL DEFAULT '0' COMMENT '用户等级',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='等级规则表 ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_level_rule`
--

LOCK TABLES `tb_level_rule` WRITE;
/*!40000 ALTER TABLE `tb_level_rule` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_level_rule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_live_notice_error_info`
--

DROP TABLE IF EXISTS `tb_live_notice_error_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_live_notice_error_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `Url` varchar(255) DEFAULT NULL,
  `Data` varchar(255) DEFAULT NULL,
  `NetStatus` int(11) DEFAULT '0',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_live_notice_error_info`
--

LOCK TABLES `tb_live_notice_error_info` WRITE;
/*!40000 ALTER TABLE `tb_live_notice_error_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_live_notice_error_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_live_notice_info`
--

DROP TABLE IF EXISTS `tb_live_notice_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_live_notice_info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `MatchID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '比赛ID',
  `Round` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '比赛小局数',
  `Status` varchar(255) DEFAULT '' COMMENT 'Start/Endï¼Œå¼€å§‹æˆ–è€…ç»“æŸ',
  `Time` datetime DEFAULT NULL COMMENT 'é€šçŸ¥å¼€å§‹ç§’æ€çš„æ—¶é—´',
  `PlatformID` int(11) unsigned DEFAULT '0' COMMENT 'ç›´æ’­å¹³å°PlatformID',
  `Method` varchar(255) DEFAULT '' COMMENT 'æ–¹æ³•åå­—',
  `NetStatus` tinyint(1) unsigned DEFAULT '0' COMMENT '0-ä»£è¡¨æœªé€šçŸ¥ï¼Œ1-é€šçŸ¥æˆåŠŸ',
  `IsOnGoing` tinyint(1) unsigned DEFAULT '0' COMMENT '1æ­£åœ¨æ¯”èµ›ï¼Œ0æ²¡æœ‰æ¯”èµ›',
  `GiftSerial` varchar(255) DEFAULT '' COMMENT '方便直播平台跟踪标识一次通知事件， matchid  + gifttypeid+ round + count ',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `NoticeType` int(11) DEFAULT NULL COMMENT 'é€šçŸ¥ç±»åž‹',
  `GiftTypeID` int(11) DEFAULT NULL COMMENT 'ç¤¼ç‰©ç±»åž‹',
  `Lock` int(11) DEFAULT NULL COMMENT 'åˆ†å¸ƒå¼åŠ é”',
  `PushTime` datetime DEFAULT NULL COMMENT 'å‘ç›´æ’­å¹³å°æŽ¨æ—¶é—´',
  `Data` varchar(255) DEFAULT NULL COMMENT 'JSONå­—ç¬¦ä¸²',
  `Pause` int(11) DEFAULT '0' COMMENT 'æ¯”èµ›æš‚åœ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='通知直播平台比赛开始结束表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_live_notice_info`
--

LOCK TABLES `tb_live_notice_info` WRITE;
/*!40000 ALTER TABLE `tb_live_notice_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_live_notice_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_match_battle_exp`
--

DROP TABLE IF EXISTS `tb_match_battle_exp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_match_battle_exp` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `MatchID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '比赛ID',
  `Round` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '小局ID',
  `PlayerID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '选手ID',
  `TeamID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '战队ID',
  `Exp` int(11) unsigned NOT NULL DEFAULT '0',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='比赛对局经验记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_match_battle_exp`
--

LOCK TABLES `tb_match_battle_exp` WRITE;
/*!40000 ALTER TABLE `tb_match_battle_exp` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_match_battle_exp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_match_battle_log`
--

DROP TABLE IF EXISTS `tb_match_battle_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_match_battle_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `MatchID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '比赛ID',
  `Round` int(11) DEFAULT NULL COMMENT 'å°å±€',
  `Winner` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '获胜队伍TeamID',
  `StartTime` timestamp NULL DEFAULT NULL COMMENT '开始时间',
  `EndTime` timestamp NULL DEFAULT NULL COMMENT '结束时间',
  `IgameID` varbinary(50) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='比赛对局记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_match_battle_log`
--

LOCK TABLES `tb_match_battle_log` WRITE;
/*!40000 ALTER TABLE `tb_match_battle_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_match_battle_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_match_city_info`
--

DROP TABLE IF EXISTS `tb_match_city_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_match_city_info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT '' COMMENT '城市名称',
  `CityCode` varchar(255) DEFAULT '' COMMENT '机场三字码',
  `Desc` varchar(255) DEFAULT '' COMMENT '描述',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `DeletedAt` datetime DEFAULT NULL,
  `LinkStatus` int(11) DEFAULT NULL,
  `GuardLinkStatus` int(11) DEFAULT NULL,
  `MatchID` int(11) DEFAULT NULL,
  `TeamA` int(11) DEFAULT NULL,
  `TeamB` int(11) DEFAULT NULL,
  `IsSendEmoji` tinyint(1) unsigned DEFAULT '0' COMMENT '1发送，0都不发送',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='比赛城市表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_match_city_info`
--

LOCK TABLES `tb_match_city_info` WRITE;
/*!40000 ALTER TABLE `tb_match_city_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_match_city_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_match_game_rel`
--

DROP TABLE IF EXISTS `tb_match_game_rel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_match_game_rel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `MatchId` int(11) NOT NULL COMMENT 'tb_match_info.id',
  `PlatformGameId` varchar(128) NOT NULL COMMENT '对应 matchId比赛',
  `StartTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '比赛开始时间',
  `iBo` tinyint(2) NOT NULL COMMENT '当前小局ID',
  `Area` varchar(64) NOT NULL COMMENT '赛区(lpl or international)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `PlatformGameId` (`PlatformGameId`),
  UNIQUE KEY `MatchId` (`MatchId`,`iBo`),
  KEY `StartTime` (`StartTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='赛程与当前赛程小节比赛关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_match_game_rel`
--

LOCK TABLES `tb_match_game_rel` WRITE;
/*!40000 ALTER TABLE `tb_match_game_rel` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_match_game_rel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_match_gift_log`
--

DROP TABLE IF EXISTS `tb_match_gift_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_match_gift_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `MatchID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '比赛ID',
  `GiftTypeID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '秒杀礼物ID',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='比赛秒杀记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_match_gift_log`
--

LOCK TABLES `tb_match_gift_log` WRITE;
/*!40000 ALTER TABLE `tb_match_gift_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_match_gift_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_match_gift_notice`
--

DROP TABLE IF EXISTS `tb_match_gift_notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_match_gift_notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `MatchID` int(11) NOT NULL COMMENT '比赛ID',
  `Round` int(11) NOT NULL COMMENT '小局ID',
  `Count` int(11) NOT NULL COMMENT '礼物轮数',
  `GiftSerial` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '流水号',
  `GiftTypeID` int(11) NOT NULL COMMENT '秒杀礼物ID',
  `StartTime` datetime NOT NULL COMMENT '开启时间',
  `EndTime` datetime NOT NULL COMMENT '结束时间',
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `NetStatus` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_match_gift_notice`
--

LOCK TABLES `tb_match_gift_notice` WRITE;
/*!40000 ALTER TABLE `tb_match_gift_notice` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_match_gift_notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_match_info`
--

DROP TABLE IF EXISTS `tb_match_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_match_info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `MatchLocation` varchar(255) NOT NULL DEFAULT '' COMMENT '比赛城市',
  `BO` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '比赛BO数',
  `CurrentRound` int(11) NOT NULL COMMENT '当前进行的局数',
  `TeamInfo` varchar(10) NOT NULL COMMENT '两队TeamID',
  `MatchStart` datetime DEFAULT NULL,
  `CityCode` varchar(10) NOT NULL DEFAULT '' COMMENT '城市代码',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `IsOnGoing` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '比赛是否进行中 1 是 0 否',
  `CmtInfo` varchar(20) DEFAULT NULL COMMENT '解说id',
  `dtLastModifyTime` datetime NOT NULL COMMENT '首发修改的最后时限',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='赛程信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_match_info`
--

LOCK TABLES `tb_match_info` WRITE;
/*!40000 ALTER TABLE `tb_match_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_match_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_match_lineup_info`
--

DROP TABLE IF EXISTS `tb_match_lineup_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_match_lineup_info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `MatchID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '比赛ID',
  `PlayerInfo` varchar(50) NOT NULL COMMENT '1,2,3,4,5',
  `HeroInfo` varchar(255) DEFAULT NULL COMMENT 'Playeré€‰æ‹©çš„è‹±é›„ID',
  `BattleID` int(11) NOT NULL COMMENT 'æœ¬å°å±€æ¯”èµ›ID',
  `TypeID` int(11) DEFAULT NULL COMMENT 'AI è¯†åˆ«',
  `WorldID` int(11) NOT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `Round` int(11) NOT NULL COMMENT '小局',
  `Side` varchar(10) NOT NULL COMMENT 'blue/red',
  `TeamID` int(11) NOT NULL,
  `Pov` varchar(50) DEFAULT NULL COMMENT '开启第一视角的选手',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='出场阵容表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_match_lineup_info`
--

LOCK TABLES `tb_match_lineup_info` WRITE;
/*!40000 ALTER TABLE `tb_match_lineup_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_match_lineup_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_match_pause`
--

DROP TABLE IF EXISTS `tb_match_pause`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_match_pause` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `MatchID` int(11) DEFAULT NULL,
  `Round` int(11) DEFAULT NULL,
  `StartTime` datetime DEFAULT NULL,
  `EndTime` datetime DEFAULT NULL,
  `Status` int(11) DEFAULT '0',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_match_pause`
--

LOCK TABLES `tb_match_pause` WRITE;
/*!40000 ALTER TABLE `tb_match_pause` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_match_pause` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_platform_info`
--

DROP TABLE IF EXISTS `tb_platform_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_platform_info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='直播平台表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_platform_info`
--

LOCK TABLES `tb_platform_info` WRITE;
/*!40000 ALTER TABLE `tb_platform_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_platform_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_player_info`
--

DROP TABLE IF EXISTS `tb_player_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_player_info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '选手ID',
  `PlayerDes` varchar(255) NOT NULL DEFAULT '' COMMENT 'QQ同步来的选手名称，对应NickName',
  `GameName` varchar(255) DEFAULT NULL COMMENT 'QQ同步来的选手名称，对应GameName',
  `PlayerPos` varchar(255) NOT NULL DEFAULT '' COMMENT '选手位置',
  `TeamID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '当前队伍ID',
  `PlayerInternalAvatar` varchar(255) DEFAULT '' COMMENT '内部维护选手头像',
  `PlayerAvatar` varchar(255) DEFAULT '' COMMENT '从QQ API抓取过来的头像地址',
  `PlayerEmoji` varchar(255) DEFAULT '' COMMENT '内部维护选手表情包，梗',
  `Exp` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '累计经验',
  `Rank` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '选手榜总排行',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `DeletedAt` datetime DEFAULT NULL,
  `PlayerEmoji1` varchar(255) DEFAULT '' COMMENT '内部维护选手表情包，梗',
  `PlayerEmoji2` varchar(255) DEFAULT '' COMMENT '内部维护选手表情包，梗',
  `PlayerEmoji3` varchar(255) DEFAULT '' COMMENT '内部维护选手表情包，梗',
  `BigAvatar` varchar(255) DEFAULT NULL COMMENT '550像素头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='选手信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_player_info`
--

LOCK TABLES `tb_player_info` WRITE;
/*!40000 ALTER TABLE `tb_player_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_player_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_player_info_bak`
--

DROP TABLE IF EXISTS `tb_player_info_bak`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_player_info_bak` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '选手ID',
  `PlayerDes` varchar(255) NOT NULL DEFAULT '' COMMENT 'QQ同步来的选手名称，对应NickName',
  `GameName` varchar(255) DEFAULT NULL COMMENT 'QQ同步来的选手名称，对应GameName',
  `PlayerPos` varchar(255) NOT NULL DEFAULT '' COMMENT '选手位置',
  `TeamID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '当前队伍ID',
  `PlayerInternalAvatar` varchar(255) DEFAULT '' COMMENT '内部维护选手头像',
  `PlayerAvatar` varchar(255) DEFAULT '' COMMENT '从QQ API抓取过来的头像地址',
  `PlayerEmoji` varchar(255) DEFAULT '' COMMENT '内部维护选手表情包，梗',
  `Exp` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '累计经验',
  `Rank` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '选手榜总排行',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `DeletedAt` datetime DEFAULT NULL,
  `PlayerEmoji1` varchar(255) DEFAULT '' COMMENT '内部维护选手表情包，梗',
  `PlayerEmoji2` varchar(255) DEFAULT '' COMMENT '内部维护选手表情包，梗',
  `PlayerEmoji3` varchar(255) DEFAULT '' COMMENT '内部维护选手表情包，梗',
  `BigAvatar` varchar(255) DEFAULT NULL COMMENT '550像素头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='选手信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_player_info_bak`
--

LOCK TABLES `tb_player_info_bak` WRITE;
/*!40000 ALTER TABLE `tb_player_info_bak` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_player_info_bak` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_player_score_log`
--

DROP TABLE IF EXISTS `tb_player_score_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_player_score_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `PlayerID` int(11) unsigned NOT NULL DEFAULT '0',
  `MatchID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '比赛ID',
  `Round` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '第几小局',
  `ScoreType` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '表现类型(1-助攻；2-击杀；3-双杀...)',
  `Point` int(11) unsigned DEFAULT '0' COMMENT '势力值',
  `ConsumeState` tinyint(1) unsigned DEFAULT '0' COMMENT '是否统计（0-未统计，1-已统计）',
  `TeamID` int(11) DEFAULT NULL COMMENT 'æˆ˜é˜Ÿ id',
  `KafkaState` int(11) DEFAULT '0',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='选手游戏内表现得分记录';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_player_score_log`
--

LOCK TABLES `tb_player_score_log` WRITE;
/*!40000 ALTER TABLE `tb_player_score_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_player_score_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_qcloud_event`
--

DROP TABLE IF EXISTS `tb_qcloud_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_qcloud_event` (
  `id` varchar(32) NOT NULL COMMENT 'typeID',
  `MatchID` int(11) DEFAULT NULL COMMENT 'æ¯”èµ›ID',
  `Round` int(11) DEFAULT NULL COMMENT 'å°å±€æ•°(BO)',
  `Count` int(11) DEFAULT NULL COMMENT 'ä¸€å±€ä¸­ç¬¬å‡ è½®',
  `eventType` varchar(32) NOT NULL COMMENT 'äº‹ä»¶ç±»åž‹',
  `time` varchar(16) DEFAULT NULL COMMENT 'æ—¶é—´xx:xx',
  `teamName` varchar(32) DEFAULT NULL COMMENT 'å¯¹æˆ˜åŒæ–¹æˆ˜é˜Ÿåç§°',
  `nextDrake` varchar(32) DEFAULT NULL COMMENT 'ä¸‹ä¸€æ¡å°é¾™ç±»åž‹',
  `competitorID` varchar(32) DEFAULT NULL COMMENT 'é€‰æ‰‹ID',
  `IsPush` int(11) NOT NULL DEFAULT '0' COMMENT '0-æœªæŽ¨é€çŽ°åœºï¼Œ1-å·²æŽ¨é€çŽ°åœº',
  `Lock` int(11) NOT NULL DEFAULT '0' COMMENT 'åˆ†å¸ƒå¼åŠ é”',
  `team` varchar(32) DEFAULT NULL COMMENT 'çº¢è“æ–¹',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `giftTypeID` int(11) DEFAULT '0' COMMENT '礼物类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_qcloud_event`
--

LOCK TABLES `tb_qcloud_event` WRITE;
/*!40000 ALTER TABLE `tb_qcloud_event` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_qcloud_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_rank_banlist`
--

DROP TABLE IF EXISTS `tb_rank_banlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_rank_banlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `PlatId` int(11) DEFAULT NULL,
  `UserId` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='黑名单用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_rank_banlist`
--

LOCK TABLES `tb_rank_banlist` WRITE;
/*!40000 ALTER TABLE `tb_rank_banlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_rank_banlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_rank_player_match`
--

DROP TABLE IF EXISTS `tb_rank_player_match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_rank_player_match` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `MatchId` int(11) DEFAULT NULL,
  `PlayerId` int(11) DEFAULT NULL,
  `TeamId` int(11) DEFAULT NULL,
  `PlayerRank` int(11) DEFAULT NULL,
  `PlatId` int(11) DEFAULT NULL,
  `UserId` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Exp` int(11) DEFAULT NULL,
  `FavTeamId` int(11) DEFAULT NULL,
  `RankLevel` int(11) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='单场比赛TOP3选手粉丝表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_rank_player_match`
--

LOCK TABLES `tb_rank_player_match` WRITE;
/*!40000 ALTER TABLE `tb_rank_player_match` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_rank_player_match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_rank_player_realtime`
--

DROP TABLE IF EXISTS `tb_rank_player_realtime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_rank_player_realtime` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `PlayerId` int(11) DEFAULT NULL,
  `TeamId` int(11) DEFAULT NULL,
  `PlayerRank` int(11) DEFAULT NULL,
  `PlatId` int(11) DEFAULT NULL,
  `UserId` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Exp` int(11) DEFAULT NULL,
  `FavTeamId` int(11) DEFAULT NULL,
  `RankLevel` int(11) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='今日实时TOP3选手粉丝表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_rank_player_realtime`
--

LOCK TABLES `tb_rank_player_realtime` WRITE;
/*!40000 ALTER TABLE `tb_rank_player_realtime` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_rank_player_realtime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_rank_player_season`
--

DROP TABLE IF EXISTS `tb_rank_player_season`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_rank_player_season` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `PlayerId` int(11) DEFAULT NULL,
  `TeamId` int(11) DEFAULT NULL,
  `PlayerRank` int(11) DEFAULT NULL,
  `PlatId` int(11) DEFAULT NULL,
  `UserId` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Exp` int(11) DEFAULT NULL,
  `FavTeamId` int(11) DEFAULT NULL,
  `RankLevel` int(11) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `DeletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='单场比赛TOP3选手粉丝表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_rank_player_season`
--

LOCK TABLES `tb_rank_player_season` WRITE;
/*!40000 ALTER TABLE `tb_rank_player_season` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_rank_player_season` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_rank_player_week`
--

DROP TABLE IF EXISTS `tb_rank_player_week`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_rank_player_week` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `FlushDate` date DEFAULT NULL,
  `PlayerId` int(11) DEFAULT NULL,
  `PlayerPos` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TeamId` int(11) DEFAULT NULL,
  `PlatId` int(11) DEFAULT NULL,
  `UserId` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Exp` int(11) DEFAULT NULL,
  `FavTeamId` int(11) DEFAULT NULL,
  `RankLevel` int(11) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='本周各位置最喜欢选手粉丝表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_rank_player_week`
--

LOCK TABLES `tb_rank_player_week` WRITE;
/*!40000 ALTER TABLE `tb_rank_player_week` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_rank_player_week` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_rank_user_day`
--

DROP TABLE IF EXISTS `tb_rank_user_day`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_rank_user_day` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `FlushDate` date DEFAULT NULL,
  `PlatId` int(11) DEFAULT NULL,
  `UserId` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Exp` int(11) DEFAULT NULL,
  `FavTeamId` int(11) DEFAULT NULL,
  `RankLevel` int(11) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `UserAvatar` varchar(255) DEFAULT NULL COMMENT '用户头像',
  PRIMARY KEY (`id`),
  KEY `FlushDate` (`FlushDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='单日TOP30粉丝表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_rank_user_day`
--

LOCK TABLES `tb_rank_user_day` WRITE;
/*!40000 ALTER TABLE `tb_rank_user_day` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_rank_user_day` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_rank_user_match`
--

DROP TABLE IF EXISTS `tb_rank_user_match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_rank_user_match` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `MatchId` int(11) DEFAULT NULL,
  `PlatId` int(11) DEFAULT NULL,
  `UserId` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Exp` int(11) DEFAULT NULL,
  `FavTeamId` int(11) DEFAULT NULL,
  `RankLevel` int(11) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `UserAvatar` varchar(255) DEFAULT NULL COMMENT '用户头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='æ¯”è³½å¹³å°TOP10ç²‰ä¸è¡¨';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_rank_user_match`
--

LOCK TABLES `tb_rank_user_match` WRITE;
/*!40000 ALTER TABLE `tb_rank_user_match` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_rank_user_match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_rank_user_realtime`
--

DROP TABLE IF EXISTS `tb_rank_user_realtime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_rank_user_realtime` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `PlatId` int(11) DEFAULT NULL,
  `UserId` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Exp` int(11) DEFAULT NULL,
  `FavTeamId` int(11) DEFAULT NULL,
  `RankLevel` int(11) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `UserAvatar` varchar(255) DEFAULT NULL COMMENT '用户头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='今日实时TOP30粉丝表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_rank_user_realtime`
--

LOCK TABLES `tb_rank_user_realtime` WRITE;
/*!40000 ALTER TABLE `tb_rank_user_realtime` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_rank_user_realtime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_rank_user_week`
--

DROP TABLE IF EXISTS `tb_rank_user_week`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_rank_user_week` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `FlushDate` date DEFAULT NULL,
  `PlatId` int(11) DEFAULT NULL,
  `UserId` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Exp` int(11) DEFAULT NULL,
  `FavTeamId` int(11) DEFAULT NULL,
  `RankLevel` int(11) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `UserAvatar` varchar(255) DEFAULT NULL COMMENT '用户头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='单周TOP30粉丝表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_rank_user_week`
--

LOCK TABLES `tb_rank_user_week` WRITE;
/*!40000 ALTER TABLE `tb_rank_user_week` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_rank_user_week` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_realtime_player_exp`
--

DROP TABLE IF EXISTS `tb_realtime_player_exp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_realtime_player_exp` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `PlayerID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '选手ID',
  `TeamID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '战队ID',
  `MatchID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '比赛ID',
  `Exp` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '本场比赛所获经验值',
  `Rank` int(11) NOT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='比赛实时选手势力值表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_realtime_player_exp`
--

LOCK TABLES `tb_realtime_player_exp` WRITE;
/*!40000 ALTER TABLE `tb_realtime_player_exp` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_realtime_player_exp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_realtime_team_exp`
--

DROP TABLE IF EXISTS `tb_realtime_team_exp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_realtime_team_exp` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `TeamID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '战队ID',
  `MatchID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '比赛ID',
  `Exp` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '本场比赛所获经验值',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='比赛实时战队势力值表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_realtime_team_exp`
--

LOCK TABLES `tb_realtime_team_exp` WRITE;
/*!40000 ALTER TABLE `tb_realtime_team_exp` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_realtime_team_exp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_realtime_user_exp`
--

DROP TABLE IF EXISTS `tb_realtime_user_exp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_realtime_user_exp` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Uid` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '用户ID',
  `PlatformID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '平台ID',
  `UserID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '平台用户ID',
  `TeamID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '战队ID',
  `MatchID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '比赛ID',
  `Exp` int(11) unsigned DEFAULT '0' COMMENT '本场比赛所获经验值',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='比赛用户实时排行信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_realtime_user_exp`
--

LOCK TABLES `tb_realtime_user_exp` WRITE;
/*!40000 ALTER TABLE `tb_realtime_user_exp` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_realtime_user_exp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_season_info`
--

DROP TABLE IF EXISTS `tb_season_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_season_info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '赛季ID',
  `SeasonDesc` varchar(100) NOT NULL COMMENT '赛季名称',
  `StartTime` datetime DEFAULT NULL COMMENT '开始时间',
  `EndTime` datetime DEFAULT NULL COMMENT '结束时间',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `iOpen` tinyint(1) NOT NULL COMMENT '赛季是否开启',
  PRIMARY KEY (`id`),
  KEY `iOpen` (`iOpen`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='赛季表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_season_info`
--

LOCK TABLES `tb_season_info` WRITE;
/*!40000 ALTER TABLE `tb_season_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_season_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_spring`
--

DROP TABLE IF EXISTS `tb_spring`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_spring` (
  `total` decimal(32,0) DEFAULT NULL,
  `platid` int(11) DEFAULT NULL,
  `userid` varchar(48) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_spring`
--

LOCK TABLES `tb_spring` WRITE;
/*!40000 ALTER TABLE `tb_spring` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_spring` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_team_first`
--

DROP TABLE IF EXISTS `tb_team_first`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_team_first` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iMatchId` int(11) NOT NULL COMMENT '赛程id',
  `iTeamId` int(11) NOT NULL,
  `sTeamName` varchar(255) NOT NULL,
  `sSide` varchar(255) NOT NULL COMMENT '选边，red,blue',
  `iSup` int(11) NOT NULL COMMENT '辅助选手id',
  `iJug` int(11) NOT NULL COMMENT '打野选手id',
  `iMid` int(11) NOT NULL COMMENT '中单选手id',
  `iTop` int(11) NOT NULL COMMENT '上单选手id',
  `iAdc` int(11) NOT NULL,
  `dtUpdateTime` datetime NOT NULL COMMENT '最后更新时间',
  `iBo` tinyint(2) NOT NULL COMMENT '所属小局',
  PRIMARY KEY (`id`),
  UNIQUE KEY `iMatchId` (`iMatchId`,`iTeamId`,`iBo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='首发名单表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_team_first`
--

LOCK TABLES `tb_team_first` WRITE;
/*!40000 ALTER TABLE `tb_team_first` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_team_first` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_team_info`
--

DROP TABLE IF EXISTS `tb_team_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_team_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `TeamDes` varchar(255) NOT NULL DEFAULT '' COMMENT 'QQ API同步来的队伍名称',
  `TeamEnDes` varchar(255) DEFAULT NULL COMMENT 'QQ 同步来的名称，对应 TeamEnName',
  `TeamInternalLogo` varchar(512) NOT NULL DEFAULT '' COMMENT '内部维护战队LOGO',
  `TeamLogo` varchar(512) DEFAULT '' COMMENT 'QQ API同步来的战队LOGO',
  `Exp` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '队伍累计经验',
  `IsLPL` tinyint(4) DEFAULT '0' COMMENT '1: LPL战队 0 不是 默认0',
  `Rank` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '队伍总排行',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `DeletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='战队信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_team_info`
--

LOCK TABLES `tb_team_info` WRITE;
/*!40000 ALTER TABLE `tb_team_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_team_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user_info`
--

DROP TABLE IF EXISTS `tb_user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `QQ` bigint(21) DEFAULT '0' COMMENT 'QQ number',
  `AppID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'appid，联合openid转换QQ',
  `WechatID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '微信ID',
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '平台昵称，默认QQ昵称',
  `userid` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `platid` int(11) DEFAULT '0',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `Avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '头像',
  `QQOpenID` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'QQ open ID',
  `FavTeamId` int(11) NOT NULL COMMENT '用户设置的战队铭牌',
  `RankLevel` int(11) NOT NULL DEFAULT '1',
  `BigAvatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '550像素头像',
  PRIMARY KEY (`id`),
  UNIQUE KEY `userid_2` (`userid`,`platid`,`QQOpenID`),
  KEY `userinfo_QQ_index` (`QQ`),
  KEY `QQOpenID` (`QQOpenID`),
  KEY `platid` (`QQOpenID`,`platid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户主表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user_info`
--

LOCK TABLES `tb_user_info` WRITE;
/*!40000 ALTER TABLE `tb_user_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_web_log`
--

DROP TABLE IF EXISTS `tb_web_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_web_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `ActionName` varchar(255) NOT NULL DEFAULT '' COMMENT '操作的名字，比如 UpClient 重启现场客户端',
  `Message` varchar(255) DEFAULT '' COMMENT '客户端返回的消息',
  `CityId` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '城市id',
  `MatchID` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '比赛id',
  `Result` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '0-成功；1-是吧；2-等待',
  `TypeColor` int(11) unsigned NOT NULL COMMENT 'Web页面显示 0-黑色；1-红色；2-蓝色',
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Web 控制端执行操作日志表 ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_web_log`
--

LOCK TABLES `tb_web_log` WRITE;
/*!40000 ALTER TABLE `tb_web_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_web_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_websocket_action`
--

DROP TABLE IF EXISTS `tb_websocket_action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_websocket_action` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_name` varchar(50) DEFAULT NULL,
  `data` varchar(1000) DEFAULT NULL,
  `action_status` int(11) DEFAULT '0',
  `city_code` varchar(50) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_websocket_action`
--

LOCK TABLES `tb_websocket_action` WRITE;
/*!40000 ALTER TABLE `tb_websocket_action` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_websocket_action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tmp_table_team`
--

DROP TABLE IF EXISTS `tmp_table_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tmp_table_team` (
  `Uid` int(11) NOT NULL DEFAULT '0',
  `total` double DEFAULT NULL,
  `TeamId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tmp_table_team`
--

LOCK TABLES `tmp_table_team` WRITE;
/*!40000 ALTER TABLE `tmp_table_team` DISABLE KEYS */;
/*!40000 ALTER TABLE `tmp_table_team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tmp_total`
--

DROP TABLE IF EXISTS `tmp_total`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tmp_total` (
  `Uid` int(11) NOT NULL DEFAULT '0',
  `total` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tmp_total`
--

LOCK TABLES `tmp_total` WRITE;
/*!40000 ALTER TABLE `tmp_total` DISABLE KEYS */;
/*!40000 ALTER TABLE `tmp_total` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uploads`
--

DROP TABLE IF EXISTS `uploads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `uploads` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `disk` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `uploadable_id` int(11) DEFAULT NULL,
  `uploadable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `uploadable_index` (`uploadable_id`,`uploadable_type`(191),`type`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uploads`
--

LOCK TABLES `uploads` WRITE;
/*!40000 ALTER TABLE `uploads` DISABLE KEYS */;
/*!40000 ALTER TABLE `uploads` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-13 19:18:36

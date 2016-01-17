-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 19, 2014 at 10:09 AM
-- Server version: 5.5.24-log
-- PHP Version: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `wcvrptwc`
--

-- --------------------------------------------------------

--
-- Table structure for table `conflict`
--

CREATE TABLE IF NOT EXISTS `conflict` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `unique_index` (`A`,`B`),
  KEY `A` (`A`),
  KEY `B` (`B`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `conflict`
--

INSERT INTO `conflict` (`ID`, `A`, `B`) VALUES
(1, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `distance`
--

CREATE TABLE IF NOT EXISTS `distance` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL,
  `Length` double NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `B` (`B`),
  KEY `A` (`A`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=340 ;

--
-- Dumping data for table `distance`
--

INSERT INTO `distance` (`ID`, `A`, `B`, `Length`) VALUES
(1, 1, 1, 0),
(2, 11, 11, 0),
(3, 1, 11, 12207),
(4, 11, 1, 12158),
(5, 12, 12, 0),
(6, 1, 12, 4871),
(7, 12, 1, 4898),
(8, 11, 12, 9983),
(9, 12, 11, 9927),
(10, 13, 13, 0),
(11, 1, 13, 6529),
(12, 13, 1, 6506),
(13, 12, 13, 2968),
(14, 13, 12, 2968),
(15, 11, 13, 7263),
(16, 13, 11, 7293),
(17, 14, 14, 0),
(18, 1, 14, 3300),
(19, 14, 1, 3277),
(20, 11, 14, 8881),
(21, 14, 11, 8907),
(22, 12, 14, 4260),
(23, 14, 12, 2233),
(24, 13, 14, 3229),
(25, 14, 13, 3229),
(26, 15, 15, 0),
(27, 1, 15, 3238),
(28, 15, 1, 3246),
(29, 11, 15, 9745),
(30, 15, 11, 9772),
(31, 12, 15, 2200),
(32, 15, 12, 1871),
(33, 13, 15, 3596),
(34, 15, 13, 4093),
(35, 14, 15, 875),
(36, 15, 14, 875),
(37, 16, 16, 0),
(38, 1, 16, 3966),
(39, 16, 1, 3927),
(40, 12, 16, 1308),
(41, 16, 12, 1248),
(42, 13, 16, 2987),
(43, 16, 13, 3187),
(44, 14, 16, 1135),
(45, 16, 14, 1417),
(46, 15, 16, 773),
(47, 16, 15, 831),
(48, 11, 16, 8884),
(49, 16, 11, 8865),
(65, 18, 18, 0),
(66, 1, 18, 4031),
(67, 18, 1, 3992),
(68, 11, 18, 8820),
(69, 18, 11, 8800),
(70, 12, 18, 1243),
(71, 18, 12, 1183),
(72, 13, 18, 2922),
(73, 18, 13, 3122),
(74, 14, 18, 1070),
(75, 18, 14, 1482),
(76, 15, 18, 708),
(77, 18, 15, 895),
(78, 16, 18, 65),
(79, 18, 16, 65),
(80, 19, 19, 0),
(81, 1, 19, 4481),
(82, 19, 1, 4460),
(83, 11, 19, 8910),
(84, 19, 11, 8873),
(85, 12, 19, 1577),
(86, 19, 12, 1631),
(87, 13, 19, 3256),
(88, 19, 13, 3195),
(89, 14, 19, 1500),
(90, 19, 14, 2244),
(91, 15, 19, 1139),
(92, 19, 15, 1141),
(93, 16, 19, 515),
(94, 19, 16, 532),
(95, 18, 19, 451),
(96, 19, 18, 468),
(97, 20, 20, 0),
(98, 1, 20, 5913),
(99, 20, 1, 5890),
(100, 11, 20, 8281),
(101, 20, 11, 8328),
(102, 12, 20, 3278),
(103, 20, 12, 3278),
(104, 13, 20, 1018),
(105, 20, 13, 1108),
(106, 14, 20, 2613),
(107, 20, 14, 2613),
(108, 15, 20, 3477),
(109, 20, 15, 3336),
(110, 16, 20, 2492),
(111, 20, 16, 2475),
(112, 18, 20, 2428),
(113, 20, 18, 2410),
(114, 19, 20, 2119),
(115, 20, 19, 2119),
(116, 21, 21, 0),
(117, 1, 21, 12189),
(118, 21, 1, 10003),
(119, 11, 21, 11334),
(120, 21, 11, 9104),
(121, 12, 21, 9637),
(122, 21, 12, 7474),
(123, 13, 21, 6669),
(124, 21, 13, 4506),
(125, 14, 21, 8889),
(126, 21, 14, 6726),
(127, 15, 21, 9753),
(128, 21, 15, 7590),
(129, 16, 21, 8846),
(130, 21, 16, 6729),
(131, 18, 21, 8782),
(132, 21, 18, 6665),
(133, 19, 21, 8854),
(134, 21, 19, 6755),
(135, 20, 21, 7908),
(136, 21, 20, 5524),
(137, 22, 22, 0),
(138, 1, 22, 12442),
(139, 22, 1, 9934),
(140, 11, 22, 11587),
(141, 22, 11, 9034),
(142, 12, 22, 9890),
(143, 22, 12, 7405),
(144, 13, 22, 6922),
(145, 22, 13, 4437),
(146, 14, 22, 9142),
(147, 22, 14, 6657),
(148, 15, 22, 10006),
(149, 22, 15, 7521),
(150, 16, 22, 9099),
(151, 22, 16, 6660),
(152, 18, 22, 9035),
(153, 22, 18, 6596),
(154, 19, 22, 9107),
(155, 22, 19, 6685),
(156, 20, 22, 8161),
(157, 22, 20, 5455),
(158, 21, 22, 253),
(159, 22, 21, 2744),
(160, 23, 23, 0),
(161, 1, 23, 5816),
(162, 23, 1, 4449),
(163, 11, 23, 13521),
(164, 23, 11, 12718),
(165, 12, 23, 6776),
(166, 23, 12, 5382),
(167, 13, 23, 7869),
(168, 23, 13, 7040),
(169, 14, 23, 4640),
(170, 23, 14, 3811),
(171, 15, 23, 5123),
(172, 23, 15, 3749),
(173, 16, 23, 5805),
(174, 23, 16, 4477),
(175, 18, 23, 5869),
(176, 23, 18, 4541),
(177, 19, 23, 6884),
(178, 23, 19, 4992),
(179, 20, 23, 7253),
(180, 23, 20, 6424),
(181, 21, 23, 11366),
(182, 23, 21, 12700),
(183, 22, 23, 11297),
(184, 23, 22, 12953),
(185, 24, 24, 0),
(186, 1, 24, 8393),
(187, 24, 1, 6471),
(188, 12, 24, 9353),
(189, 24, 12, 7404),
(190, 13, 24, 10446),
(191, 24, 13, 9062),
(192, 14, 24, 7217),
(193, 24, 14, 5833),
(194, 15, 24, 7700),
(195, 24, 15, 5771),
(196, 16, 24, 8382),
(197, 24, 16, 6499),
(198, 18, 24, 8447),
(199, 24, 18, 6563),
(200, 19, 24, 9461),
(201, 24, 19, 7014),
(202, 20, 24, 9830),
(203, 24, 20, 8446),
(204, 21, 24, 13943),
(205, 24, 21, 14721),
(206, 22, 24, 13874),
(207, 24, 22, 14975),
(208, 23, 24, 3070),
(209, 24, 23, 2486),
(210, 11, 24, 16098),
(211, 24, 11, 14740),
(212, 25, 25, 0),
(213, 1, 25, 18004),
(214, 25, 1, 17769),
(215, 12, 25, 15724),
(216, 25, 12, 15594),
(217, 13, 25, 13090),
(218, 25, 13, 12874),
(219, 14, 25, 14704),
(220, 25, 14, 14492),
(221, 15, 25, 15568),
(222, 25, 15, 15356),
(223, 16, 25, 14662),
(224, 25, 16, 14495),
(225, 18, 25, 14597),
(226, 25, 18, 14431),
(227, 19, 25, 14670),
(228, 25, 19, 14521),
(229, 20, 25, 14124),
(230, 25, 20, 13892),
(231, 21, 25, 10642),
(232, 25, 21, 12435),
(233, 22, 25, 10573),
(234, 25, 22, 12688),
(235, 23, 25, 18515),
(236, 25, 23, 19132),
(237, 24, 25, 20537),
(238, 25, 24, 21709),
(239, 11, 25, 11241),
(240, 25, 11, 11095),
(241, 26, 26, 0),
(242, 1, 26, 2240),
(243, 26, 1, 2210),
(244, 12, 26, 3200),
(245, 26, 12, 3260),
(246, 13, 26, 4289),
(247, 26, 13, 4289),
(248, 14, 26, 1060),
(249, 26, 14, 1060),
(250, 15, 26, 1548),
(251, 26, 15, 1935),
(252, 16, 26, 2230),
(253, 26, 16, 2355),
(254, 18, 26, 2294),
(255, 26, 18, 2419),
(256, 19, 26, 2762),
(257, 26, 19, 2560),
(258, 20, 26, 3673),
(259, 26, 20, 3673),
(260, 21, 26, 7786),
(261, 26, 21, 9949),
(262, 22, 26, 7717),
(263, 26, 22, 10202),
(264, 23, 26, 2751),
(265, 26, 23, 3580),
(266, 24, 26, 4773),
(267, 26, 24, 6158),
(268, 25, 26, 15552),
(269, 26, 25, 15764),
(270, 11, 26, 9941),
(271, 26, 11, 9967),
(272, 27, 27, 0),
(273, 1, 27, 4603),
(274, 27, 1, 4624),
(275, 12, 27, 678),
(276, 27, 12, 678),
(277, 13, 27, 2290),
(278, 27, 13, 2290),
(279, 14, 27, 1622),
(280, 27, 14, 1668),
(281, 15, 27, 1261),
(282, 27, 15, 1306),
(283, 16, 27, 637),
(284, 27, 16, 697),
(285, 18, 27, 573),
(286, 27, 18, 632),
(287, 19, 27, 1020),
(288, 27, 19, 967),
(289, 20, 27, 2600),
(290, 27, 20, 2600),
(291, 21, 27, 6796),
(292, 27, 21, 8959),
(293, 22, 27, 6727),
(294, 27, 22, 9212),
(295, 23, 27, 5114),
(296, 27, 23, 6502),
(297, 24, 27, 7136),
(298, 27, 24, 9079),
(299, 25, 27, 15164),
(300, 27, 25, 15113),
(301, 26, 27, 2682),
(302, 27, 26, 2927),
(303, 11, 27, 9553),
(304, 27, 11, 9316),
(305, 28, 28, 0),
(306, 1, 28, 8666),
(307, 28, 1, 7752),
(308, 12, 28, 4387),
(309, 28, 12, 4394),
(310, 13, 28, 7354),
(311, 28, 13, 7362),
(312, 14, 28, 8329),
(313, 28, 14, 7114),
(314, 15, 28, 5975),
(315, 28, 15, 6002),
(316, 16, 28, 5908),
(317, 28, 16, 5878),
(318, 18, 28, 5972),
(319, 28, 18, 5943),
(320, 19, 28, 6440),
(321, 28, 19, 5971),
(322, 20, 28, 7665),
(323, 28, 20, 7672),
(324, 21, 28, 8625),
(325, 28, 21, 15671),
(326, 22, 28, 8556),
(327, 28, 22, 15924),
(328, 23, 28, 5934),
(329, 28, 23, 5952),
(330, 24, 28, 7956),
(331, 28, 24, 8529),
(332, 25, 28, 22802),
(333, 28, 25, 21818),
(334, 26, 28, 7269),
(335, 28, 26, 6054),
(336, 27, 28, 5064),
(337, 28, 27, 5072),
(338, 11, 28, 17209),
(339, 28, 11, 16021);

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE IF NOT EXISTS `location` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Lat` double NOT NULL,
  `Lon` double NOT NULL,
  `Type` int(11) NOT NULL,
  `Image` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Type` (`Type`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=29 ;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`ID`, `Name`, `Lat`, `Lon`, `Type`, `Image`) VALUES
(1, 'Nơi xuất phát', 10.95718, 106.7914, 1, ''),
(11, 'Bãi chôn lấp', 10.99731, 106.8678, 3, ''),
(12, 'Chợ nhỏ Quyết Thắng', 10.94057, 106.8247, 2, ''),
(13, 'Cầu Ðồng Tràm', 10.95286, 106.8427, 2, ''),
(14, 'Kho bạc Nhà nước', 10.95606, 106.8183, 2, ''),
(15, 'Khu kinh doanh nhà', 10.95027, 106.8166, 2, ''),
(16, 'Sở Tư pháp', 10.95025, 106.8215, 2, ''),
(18, 'Công viên Biên Hùng', 10.95067, 106.8219, 2, ''),
(19, 'Ga Biên Hòa', 10.95082, 106.8259, 2, ''),
(20, 'Nhà máy giấy Tân Mai', 10.95137, 106.8374, 2, ''),
(21, 'Công viên Long Bình', 10.93783, 106.8684, 2, ''),
(22, 'Chợ Long Bình Tân', 10.93908, 106.8692, 2, ''),
(23, 'Hố rác Nhị Tì', 10.94446, 106.7969, 2, ''),
(24, 'Hố rác Tân Hạnh', 10.95128, 106.7786, 2, ''),
(25, 'Ga Hố Nai', 10.95639, 106.9414, 2, ''),
(26, 'Bến xe Biên Hòa', 10.95486, 106.8089, 2, ''),
(27, 'Cuối đường Võ Thị Sáu', 10.94625, 106.8235, 2, ''),
(28, 'Hố rác Tân Vạn', 10.91121, 106.8282, 2, '');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE IF NOT EXISTS `service` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Location` int(11) NOT NULL,
  `Window` int(11) NOT NULL,
  `Waste` int(11) NOT NULL,
  `Load` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `my_unique_key` (`Location`,`Window`,`Waste`),
  KEY `Location` (`Location`),
  KEY `Window` (`Window`),
  KEY `Waste` (`Waste`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=161 ;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`ID`, `Location`, `Window`, `Waste`, `Load`) VALUES
(62, 1, 1, 0, 0),
(63, 11, 1, 0, 0),
(64, 12, 2, 1, 3),
(65, 12, 2, 2, 11),
(66, 12, 3, 1, 2),
(67, 12, 3, 2, 7),
(68, 12, 4, 1, 2),
(69, 12, 4, 2, 10),
(70, 13, 2, 2, 13),
(71, 13, 2, 1, 3),
(72, 13, 3, 1, 2),
(73, 13, 3, 2, 10),
(74, 13, 4, 1, 3),
(75, 13, 4, 2, 11),
(76, 14, 2, 2, 12),
(77, 14, 2, 1, 3),
(78, 14, 3, 2, 8),
(79, 14, 3, 1, 2),
(80, 14, 4, 1, 3),
(81, 14, 4, 2, 11),
(82, 15, 2, 2, 11),
(83, 15, 2, 1, 3),
(84, 15, 3, 1, 2),
(85, 15, 3, 2, 8),
(86, 15, 4, 1, 2),
(87, 15, 4, 2, 10),
(88, 16, 2, 2, 12),
(89, 16, 2, 1, 3),
(90, 16, 3, 1, 2),
(91, 16, 3, 2, 9),
(92, 16, 4, 1, 2),
(93, 16, 4, 2, 10),
(94, 18, 2, 2, 10),
(95, 18, 2, 1, 3),
(96, 18, 3, 1, 2),
(97, 18, 3, 2, 7),
(98, 18, 4, 1, 2),
(99, 18, 4, 2, 10),
(100, 19, 2, 1, 2),
(101, 19, 2, 2, 7),
(102, 19, 3, 1, 1),
(103, 19, 4, 1, 1),
(104, 19, 4, 2, 6),
(105, 20, 2, 1, 3),
(106, 20, 2, 2, 13),
(107, 20, 3, 1, 2),
(108, 20, 3, 2, 9),
(109, 20, 4, 1, 3),
(110, 20, 4, 2, 12),
(111, 21, 2, 1, 2),
(112, 21, 2, 2, 7),
(113, 21, 3, 1, 1),
(114, 21, 3, 2, 5),
(115, 21, 4, 1, 1),
(116, 21, 4, 2, 6),
(117, 22, 2, 1, 3),
(118, 22, 2, 2, 12),
(119, 22, 3, 1, 2),
(120, 22, 3, 2, 9),
(121, 22, 4, 1, 3),
(122, 22, 4, 2, 11),
(123, 23, 2, 1, 2),
(124, 23, 2, 2, 7),
(125, 23, 3, 1, 1),
(126, 23, 3, 2, 5),
(127, 23, 4, 1, 2),
(128, 23, 4, 2, 6),
(129, 24, 2, 1, 2),
(130, 24, 2, 2, 6),
(131, 24, 3, 1, 1),
(132, 24, 3, 2, 3),
(133, 24, 4, 1, 1),
(134, 24, 4, 2, 6),
(135, 25, 2, 1, 1),
(136, 25, 2, 2, 6),
(137, 25, 3, 1, 1),
(138, 25, 3, 2, 4),
(139, 25, 4, 1, 1),
(140, 25, 4, 2, 3),
(141, 26, 2, 1, 3),
(142, 26, 2, 2, 13),
(143, 26, 3, 1, 2),
(144, 26, 3, 2, 10),
(145, 26, 4, 1, 3),
(146, 26, 4, 2, 12),
(147, 27, 2, 1, 2),
(148, 27, 2, 2, 8),
(149, 27, 3, 1, 1),
(150, 27, 3, 2, 6),
(151, 27, 4, 1, 2),
(153, 27, 4, 2, 7),
(154, 28, 2, 1, 1),
(155, 28, 2, 2, 6),
(156, 28, 3, 1, 1),
(157, 28, 3, 2, 3),
(158, 28, 4, 1, 1),
(159, 28, 4, 2, 4),
(160, 19, 3, 2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `stop`
--

CREATE TABLE IF NOT EXISTS `stop` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ServiceTime` time NOT NULL,
  `Image` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Dumping data for table `stop`
--

INSERT INTO `stop` (`ID`, `Name`, `ServiceTime`, `Image`) VALUES
(1, 'Depot', '00:00:00', 'img/depot.png'),
(2, 'Stop', '00:30:00', 'img/stop.png'),
(3, 'Landfill', '00:15:00', 'img/landfill.png');

-- --------------------------------------------------------

--
-- Table structure for table `temp`
--

CREATE TABLE IF NOT EXISTS `temp` (
  `1` int(11) NOT NULL,
  `2` int(11) NOT NULL,
  `3` int(11) NOT NULL,
  `4` int(11) NOT NULL,
  `5` int(11) NOT NULL,
  `6` int(11) NOT NULL,
  `7` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `truck`
--

CREATE TABLE IF NOT EXISTS `truck` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `Detail` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Dumping data for table `truck`
--

INSERT INTO `truck` (`ID`, `Name`, `Detail`) VALUES
(1, 'Cặp thùng', 'Bin clipper'),
(2, 'Máng', 'Bulldoze');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle`
--

CREATE TABLE IF NOT EXISTS `vehicle` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `Truck` int(11) NOT NULL,
  `Capacity` float NOT NULL,
  `Volume` float NOT NULL,
  `Engine` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `Speed` int(11) NOT NULL,
  `Length` int(11) NOT NULL,
  `Count` int(11) NOT NULL,
  `Image` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Truck` (`Truck`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=15 ;

--
-- Dumping data for table `vehicle`
--

INSERT INTO `vehicle` (`ID`, `Name`, `Truck`, `Capacity`, `Volume`, `Engine`, `Speed`, `Length`, `Count`, `Image`) VALUES
(13, 'Hino 24 tấn', 1, 24, 20, 'Hino', 40, 200, 25, ''),
(14, 'Isuzu 20 tấn', 2, 20, 16, 'Isuzu', 40, 250, 30, '');

-- --------------------------------------------------------

--
-- Table structure for table `waste`
--

CREATE TABLE IF NOT EXISTS `waste` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `Image` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Dumping data for table `waste`
--

INSERT INTO `waste` (`ID`, `Name`, `Image`) VALUES
(0, 'Xử lý rác', ''),
(1, 'Tái chế', 'recycle.png'),
(2, 'Không tái chế', 'non-recycle.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `window`
--

CREATE TABLE IF NOT EXISTS `window` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `EarlyTime` time NOT NULL,
  `LateTime` time NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- Dumping data for table `window`
--

INSERT INTO `window` (`ID`, `Name`, `EarlyTime`, `LateTime`) VALUES
(1, 'Toàn thời gian', '05:00:00', '20:00:00'),
(2, 'Buổi sáng', '05:00:00', '06:30:00'),
(3, 'Buổi trưa', '10:00:00', '12:00:00'),
(4, 'Buổi chiều', '16:30:00', '18:00:00');

-- --------------------------------------------------------

--
-- Stand-in structure for view `_conflict`
--
CREATE TABLE IF NOT EXISTS `_conflict` (
`ID` int(11)
,`A` int(11)
,`B` int(11)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `_location`
--
CREATE TABLE IF NOT EXISTS `_location` (
`ID` int(11)
,`Name` varchar(256)
,`Lat` double
,`Lon` double
,`Type` varchar(256)
,`Image` varchar(256)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `_service`
--
CREATE TABLE IF NOT EXISTS `_service` (
`ID` int(11)
,`Location` varchar(256)
,`Type` varchar(256)
,`Window` varchar(256)
,`Waste` varchar(256)
,`Load` int(11)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `_stop`
--
CREATE TABLE IF NOT EXISTS `_stop` (
`ID` int(11)
,`Name` varchar(256)
,`ServiceTime` time
,`Image` varchar(256)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `_truck`
--
CREATE TABLE IF NOT EXISTS `_truck` (
`ID` int(11)
,`Name` varchar(256)
,`Detail` varchar(256)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `_vehicle`
--
CREATE TABLE IF NOT EXISTS `_vehicle` (
`ID` int(11)
,`Name` varchar(256)
,`Truck` text
,`Capacity` float
,`Volume` float
,`Engine` varchar(256)
,`Speed` int(11)
,`Length` int(11)
,`Count` int(11)
,`Image` varchar(256)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `_waste`
--
CREATE TABLE IF NOT EXISTS `_waste` (
`ID` int(11)
,`Name` varchar(256)
,`Image` varchar(256)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `_window`
--
CREATE TABLE IF NOT EXISTS `_window` (
`ID` int(11)
,`Name` varchar(256)
,`EarlyTime` time
,`LateTime` time
);
-- --------------------------------------------------------

--
-- Structure for view `_conflict`
--
DROP TABLE IF EXISTS `_conflict`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `_conflict` AS select `conflict`.`ID` AS `ID`,`conflict`.`A` AS `A`,`conflict`.`B` AS `B` from `conflict`;

-- --------------------------------------------------------

--
-- Structure for view `_location`
--
DROP TABLE IF EXISTS `_location`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `_location` AS select `location`.`ID` AS `ID`,`location`.`Name` AS `Name`,`location`.`Lat` AS `Lat`,`location`.`Lon` AS `Lon`,`stop`.`Name` AS `Type`,`location`.`Image` AS `Image` from (`location` join `stop`) where (`stop`.`ID` = `location`.`Type`);

-- --------------------------------------------------------

--
-- Structure for view `_service`
--
DROP TABLE IF EXISTS `_service`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `_service` AS select `service`.`ID` AS `ID`,`location`.`Name` AS `Location`,`stop`.`Name` AS `Type`,`window`.`Name` AS `Window`,`waste`.`Name` AS `Waste`,`service`.`Load` AS `Load` from ((((`service` join `location`) join `stop`) join `window`) join `waste`) where ((`service`.`Location` = `location`.`ID`) and (`service`.`Window` = `window`.`ID`) and (`service`.`Waste` = `waste`.`ID`) and (`stop`.`ID` = `location`.`Type`));

-- --------------------------------------------------------

--
-- Structure for view `_stop`
--
DROP TABLE IF EXISTS `_stop`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `_stop` AS select `stop`.`ID` AS `ID`,`stop`.`Name` AS `Name`,`stop`.`ServiceTime` AS `ServiceTime`,`stop`.`Image` AS `Image` from `stop`;

-- --------------------------------------------------------

--
-- Structure for view `_truck`
--
DROP TABLE IF EXISTS `_truck`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `_truck` AS select `truck`.`ID` AS `ID`,`truck`.`Name` AS `Name`,`truck`.`Detail` AS `Detail` from `truck`;

-- --------------------------------------------------------

--
-- Structure for view `_vehicle`
--
DROP TABLE IF EXISTS `_vehicle`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `_vehicle` AS select `vehicle`.`ID` AS `ID`,`vehicle`.`Name` AS `Name`,concat(`truck`.`Name`,' (',`truck`.`Detail`,')') AS `Truck`,`vehicle`.`Capacity` AS `Capacity`,`vehicle`.`Volume` AS `Volume`,`vehicle`.`Engine` AS `Engine`,`vehicle`.`Speed` AS `Speed`,`vehicle`.`Length` AS `Length`,`vehicle`.`Count` AS `Count`,`vehicle`.`Image` AS `Image` from (`vehicle` join `truck`) where (`vehicle`.`Truck` = `truck`.`ID`);

-- --------------------------------------------------------

--
-- Structure for view `_waste`
--
DROP TABLE IF EXISTS `_waste`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `_waste` AS select `waste`.`ID` AS `ID`,`waste`.`Name` AS `Name`,`waste`.`Image` AS `Image` from `waste`;

-- --------------------------------------------------------

--
-- Structure for view `_window`
--
DROP TABLE IF EXISTS `_window`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `_window` AS select `window`.`ID` AS `ID`,`window`.`Name` AS `Name`,`window`.`EarlyTime` AS `EarlyTime`,`window`.`LateTime` AS `LateTime` from `window`;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `conflict`
--
ALTER TABLE `conflict`
  ADD CONSTRAINT `conflict_ibfk_1` FOREIGN KEY (`A`) REFERENCES `waste` (`ID`),
  ADD CONSTRAINT `conflict_ibfk_2` FOREIGN KEY (`B`) REFERENCES `waste` (`ID`);

--
-- Constraints for table `distance`
--
ALTER TABLE `distance`
  ADD CONSTRAINT `distance_ibfk_1` FOREIGN KEY (`A`) REFERENCES `location` (`ID`),
  ADD CONSTRAINT `distance_ibfk_3` FOREIGN KEY (`B`) REFERENCES `location` (`ID`);

--
-- Constraints for table `location`
--
ALTER TABLE `location`
  ADD CONSTRAINT `location_ibfk_1` FOREIGN KEY (`Type`) REFERENCES `stop` (`ID`);

--
-- Constraints for table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `service_ibfk_2` FOREIGN KEY (`Location`) REFERENCES `location` (`ID`),
  ADD CONSTRAINT `service_ibfk_3` FOREIGN KEY (`Window`) REFERENCES `window` (`ID`),
  ADD CONSTRAINT `service_ibfk_4` FOREIGN KEY (`Waste`) REFERENCES `waste` (`ID`);

--
-- Constraints for table `vehicle`
--
ALTER TABLE `vehicle`
  ADD CONSTRAINT `vehicle_ibfk_1` FOREIGN KEY (`Truck`) REFERENCES `truck` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 29, 2025 at 05:44 PM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fmo_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `aquaculture_facilities`
--

DROP TABLE IF EXISTS `aquaculture_facilities`;
CREATE TABLE IF NOT EXISTS `aquaculture_facilities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `facility_name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `species` varchar(255) NOT NULL,
  `capacity` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `contact_info` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_aqua_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `aquaculture_facilities`
--

INSERT INTO `aquaculture_facilities` (`id`, `facility_name`, `location`, `species`, `capacity`, `owner`, `contact_info`, `created_at`, `user_id`) VALUES
(1, 'Cloyd Pond', 'Romblon', 'koi', 'Puerto Galera', 'cloyd fesalbon', '898989989', '2025-02-17 14:26:21', NULL),
(2, 'Calapan Pond', 'Masipit', 'Koi', '99', 'Juan Dela Cruz', '09123456781', '2025-06-29 13:16:08', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=504 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `audit_logs`
--

INSERT INTO `audit_logs` (`id`, `user_id`, `email`, `action`, `timestamp`) VALUES
(1, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 07:48:55'),
(2, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-08 07:59:57'),
(3, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-03-08 08:00:12'),
(4, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-08 08:00:32'),
(5, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 08:00:38'),
(6, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 08:07:59'),
(7, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 08:15:52'),
(8, NULL, 'Unknown', 'Logged out', '2025-03-08 08:44:44'),
(9, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-08 08:45:04'),
(10, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-03-08 08:49:40'),
(11, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-08 08:49:49'),
(12, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 08:50:28'),
(13, 2, 'aash100227@gmail.com', 'Logged out', '2025-03-08 08:54:40'),
(14, NULL, 'Unknown', 'Logged out', '2025-03-08 08:55:49'),
(15, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 08:55:54'),
(16, 2, 'aash100227@gmail.com', 'Logged out', '2025-03-08 09:03:51'),
(17, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 09:21:57'),
(18, NULL, 'Unknown', 'Logged out', '2025-03-08 09:29:21'),
(19, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 09:37:38'),
(20, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 09:38:15'),
(21, 2, 'aash100227@gmail.com', 'Logged out', '2025-03-08 09:40:19'),
(22, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 09:43:41'),
(23, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 09:48:30'),
(24, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 09:51:37'),
(25, 2, 'aash100227@gmail.com', 'Logged out', '2025-03-08 09:54:31'),
(26, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-08 09:57:54'),
(27, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-08 09:59:24'),
(28, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-08 09:59:31'),
(29, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 10:13:12'),
(30, 2, 'aash100227@gmail.com', 'Logged out', '2025-03-08 10:13:19'),
(31, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-08 10:13:25'),
(32, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 10:18:17'),
(33, 2, 'aash100227@gmail.com', 'Logged out', '2025-03-08 10:18:20'),
(34, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-08 10:18:28'),
(35, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-08 10:24:50'),
(36, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 10:26:59'),
(37, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 10:27:02'),
(38, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-08 10:27:55'),
(39, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-08 10:30:31'),
(40, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-08 10:30:42'),
(41, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-08 10:30:47'),
(42, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-08 10:31:43'),
(43, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-08 10:31:48'),
(44, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-08 10:46:34'),
(45, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-08 10:49:00'),
(46, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-08 10:49:06'),
(47, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-08 10:49:56'),
(48, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 10:50:03'),
(49, 2, 'aash100227@gmail.com', 'Logged out', '2025-03-08 10:52:37'),
(50, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-08 10:52:42'),
(51, NULL, 'Unknown', 'Logged out', '2025-03-08 10:59:41'),
(52, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-08 10:59:50'),
(53, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-08 11:00:22'),
(54, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 11:00:27'),
(55, 2, 'aash100227@gmail.com', 'Logged out', '2025-03-08 13:04:42'),
(56, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-08 13:04:48'),
(57, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-08 13:04:57'),
(58, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 13:05:03'),
(59, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 14:16:01'),
(60, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 14:22:54'),
(61, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 14:28:32'),
(62, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 14:47:48'),
(63, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 14:54:19'),
(64, 2, 'aash100227@gmail.com', 'Logged out', '2025-03-08 14:56:01'),
(65, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-08 14:56:05'),
(66, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-10 07:09:41'),
(67, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-10 07:42:24'),
(68, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-10 07:43:28'),
(69, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-10 07:52:29'),
(70, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-10 07:52:43'),
(71, 2, 'aash100227@gmail.com', 'Logged out', '2025-03-10 07:58:56'),
(72, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-10 07:59:21'),
(73, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-10 08:00:11'),
(74, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-10 08:00:19'),
(75, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-10 08:00:51'),
(76, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-15 15:07:32'),
(77, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-15 16:21:24'),
(78, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-15 16:27:50'),
(79, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-15 16:31:56'),
(80, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-15 16:41:55'),
(81, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-15 16:49:41'),
(82, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-15 16:58:38'),
(83, 2, 'aash100227@gmail.com', 'Logged out', '2025-03-15 17:08:42'),
(84, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-15 17:08:49'),
(85, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-15 17:15:28'),
(86, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-15 18:58:21'),
(87, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-15 19:05:29'),
(88, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-15 19:06:50'),
(89, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-16 14:41:48'),
(90, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-16 14:44:31'),
(91, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-16 14:44:35'),
(92, 2, 'aash100227@gmail.com', 'Logged out', '2025-03-16 14:44:44'),
(93, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-16 14:45:02'),
(94, NULL, 'Unknown', 'Logged out', '2025-03-16 14:46:09'),
(95, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-16 14:46:15'),
(96, 2, 'aash100227@gmail.com', 'Logged out', '2025-03-16 14:46:39'),
(97, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-16 14:46:44'),
(98, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-16 14:47:48'),
(99, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-16 14:56:37'),
(100, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-16 14:57:05'),
(101, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-16 14:57:10'),
(102, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-16 14:57:55'),
(103, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-16 14:57:59'),
(104, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-16 14:59:18'),
(105, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-16 14:59:22'),
(106, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-16 15:03:45'),
(107, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-16 15:10:20'),
(108, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-16 15:20:03'),
(109, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-16 15:22:22'),
(110, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-16 15:31:53'),
(111, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-16 15:59:20'),
(112, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-16 16:28:49'),
(113, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-16 16:31:08'),
(114, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-16 16:31:50'),
(115, 2, 'aash100227@gmail.com', 'Logged out', '2025-03-16 16:33:12'),
(116, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-16 16:34:24'),
(117, NULL, 'Unknown', 'Logged out', '2025-03-16 16:46:37'),
(118, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-16 16:46:41'),
(119, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-16 16:49:43'),
(120, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-16 16:50:23'),
(121, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-03-16 16:50:57'),
(122, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-16 16:52:11'),
(123, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-16 16:53:09'),
(124, NULL, 'Unknown', 'Requested password reset', '2025-03-16 16:53:47'),
(125, NULL, 'zyggizyg72@gmail.com', 'Logged in', '2025-03-16 16:55:55'),
(126, NULL, 'zyggizyg72@gmail.com', 'Logged out', '2025-03-16 16:56:01'),
(127, NULL, 'Unknown', 'Signed up', '2025-03-16 16:56:39'),
(128, NULL, 'Unknown', 'Verified email', '2025-03-16 16:56:47'),
(129, 7, 'zyggizyg72@gmail.com', 'Logged in', '2025-03-16 16:56:56'),
(130, 7, 'zyggizyg72@gmail.com', 'Submitted a catch report', '2025-03-16 16:57:17'),
(131, 7, 'zyggizyg72@gmail.com', 'Logged out', '2025-03-16 16:57:23'),
(132, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-16 17:11:48'),
(133, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-16 17:12:43'),
(134, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-17 07:04:52'),
(135, 2, 'aash100227@gmail.com', 'Logged out', '2025-03-17 07:05:06'),
(136, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-17 07:05:10'),
(137, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-30 13:29:41'),
(138, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-30 13:30:12'),
(139, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-30 13:30:17'),
(140, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-30 13:35:55'),
(141, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-30 13:36:20'),
(142, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-30 13:40:26'),
(143, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-30 13:43:40'),
(144, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-30 13:43:58'),
(145, NULL, 'Unknown', 'Logged out', '2025-03-30 13:48:25'),
(146, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-30 13:48:32'),
(147, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-30 13:55:33'),
(148, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-30 14:25:22'),
(149, 2, 'aash100227@gmail.com', 'Logged out', '2025-03-30 14:27:52'),
(150, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-30 14:27:59'),
(151, 6, 'hakd857@gmail.com', 'Logged in', '2025-03-30 15:25:30'),
(152, 6, 'hakd857@gmail.com', 'Logged out', '2025-03-30 15:33:45'),
(153, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-30 15:33:53'),
(154, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-30 15:45:14'),
(155, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-30 15:48:27'),
(156, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-30 15:54:31'),
(157, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-30 15:59:43'),
(158, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-30 16:20:10'),
(159, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-30 16:22:30'),
(160, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-30 16:27:49'),
(161, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-30 16:45:47'),
(162, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-30 16:47:28'),
(163, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-05 06:02:29'),
(164, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-05 06:11:59'),
(165, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 06:12:05'),
(166, 6, 'hakd857@gmail.com', 'Logged out', '2025-04-05 06:15:56'),
(167, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 06:16:55'),
(168, NULL, 'Unknown', 'Logged out', '2025-04-05 06:47:07'),
(169, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 06:47:16'),
(170, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 06:53:59'),
(171, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 07:07:38'),
(172, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-05 07:08:44'),
(173, NULL, 'Unknown', 'Logged out', '2025-04-05 07:09:30'),
(174, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-05 07:09:37'),
(175, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-05 07:10:32'),
(176, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 07:10:37'),
(177, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 07:20:52'),
(178, 6, 'hakd857@gmail.com', 'Logged out', '2025-04-05 07:32:41'),
(179, 7, 'zyggizyg72@gmail.com', 'Logged in', '2025-04-05 07:32:48'),
(180, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 07:42:55'),
(181, 6, 'hakd857@gmail.com', 'Logged out', '2025-04-05 07:43:08'),
(182, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-05 07:43:13'),
(183, NULL, 'Unknown', 'Logged out', '2025-04-05 07:44:49'),
(184, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-05 07:44:55'),
(185, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-05 07:46:32'),
(186, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 07:46:38'),
(187, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 09:29:16'),
(188, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 09:37:21'),
(189, 6, 'hakd857@gmail.com', 'Logged out', '2025-04-05 09:37:38'),
(190, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-05 09:37:43'),
(191, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-05 09:38:19'),
(192, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 09:38:25'),
(193, 6, 'hakd857@gmail.com', 'Logged out', '2025-04-05 09:44:38'),
(194, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-05 09:44:43'),
(195, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-05 10:14:41'),
(196, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-05 10:20:59'),
(197, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-05 10:21:37'),
(198, NULL, 'Unknown', 'Logged out', '2025-04-05 10:26:25'),
(199, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-05 10:26:30'),
(200, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-05 10:26:41'),
(201, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 10:26:45'),
(202, 6, 'hakd857@gmail.com', 'Logged out', '2025-04-05 10:27:24'),
(203, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-05 10:27:28'),
(204, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-05 10:28:05'),
(205, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-05 10:28:58'),
(206, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-05 10:29:07'),
(207, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 10:29:12'),
(208, NULL, 'Unknown', 'Logged out', '2025-04-05 10:30:01'),
(209, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-05 10:30:05'),
(210, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-05 10:30:11'),
(211, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 10:30:16'),
(212, 6, 'hakd857@gmail.com', 'Logged out', '2025-04-05 10:30:22'),
(213, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-05 10:46:29'),
(214, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-05 10:46:46'),
(215, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 10:46:52'),
(216, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-05 10:54:18'),
(217, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-05 10:54:34'),
(218, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 10:54:38'),
(219, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 10:56:10'),
(220, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 10:56:28'),
(221, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 10:57:29'),
(222, 6, 'hakd857@gmail.com', 'Logged out', '2025-04-05 10:57:40'),
(223, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 11:09:24'),
(224, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 11:20:55'),
(225, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 11:22:08'),
(226, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-05 11:23:19'),
(227, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-05 11:23:27'),
(228, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 11:23:33'),
(229, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 11:25:02'),
(230, 6, 'hakd857@gmail.com', 'Logged out', '2025-04-05 11:25:35'),
(231, 7, 'zyggizyg72@gmail.com', 'Logged in', '2025-04-05 11:25:40'),
(232, 7, 'zyggizyg72@gmail.com', 'Logged out', '2025-04-05 11:26:09'),
(233, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-05 11:26:14'),
(234, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-05 11:26:34'),
(235, 7, 'zyggizyg72@gmail.com', 'Logged in', '2025-04-05 11:26:40'),
(236, NULL, 'Unknown', 'Logged out', '2025-04-05 11:27:26'),
(237, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 11:27:30'),
(238, 6, 'hakd857@gmail.com', 'Logged out', '2025-04-05 11:29:18'),
(239, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-05 11:29:23'),
(240, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-05 11:29:37'),
(241, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 11:29:47'),
(242, 6, 'hakd857@gmail.com', 'Logged out', '2025-04-05 11:38:54'),
(243, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-05 11:40:02'),
(244, 6, 'hakd857@gmail.com', 'Logged out', '2025-04-05 11:43:11'),
(245, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-06 13:27:54'),
(246, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-06 14:26:04'),
(247, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-06 14:26:19'),
(248, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-07 07:07:10'),
(249, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-07 07:08:02'),
(250, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-07 07:10:33'),
(251, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-07 07:10:53'),
(252, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-07 07:10:58'),
(253, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-07 07:11:12'),
(254, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-07 07:11:56'),
(255, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-07 07:12:00'),
(256, 6, 'hakd857@gmail.com', 'Logged out', '2025-04-07 07:12:40'),
(257, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-07 07:36:08'),
(258, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-07 07:56:42'),
(259, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-07 07:57:09'),
(260, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-07 08:13:25'),
(261, NULL, 'Unknown', 'Logged out', '2025-04-07 08:40:46'),
(262, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-07 08:48:20'),
(263, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-07 08:48:32'),
(264, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-07 08:48:38'),
(265, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-04-07 08:49:20'),
(266, 6, 'hakd857@gmail.com', 'Logged out', '2025-04-07 08:50:15'),
(267, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-07 08:50:21'),
(268, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-07 08:53:15'),
(269, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-07 08:53:21'),
(270, 6, 'hakd857@gmail.com', 'Logged out', '2025-04-07 08:53:43'),
(271, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-13 13:07:27'),
(272, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-13 13:11:59'),
(273, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-13 13:12:05'),
(274, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-14 07:10:57'),
(275, 6, 'hakd857@gmail.com', 'Logged out', '2025-04-14 07:11:10'),
(276, 2, 'aash100227@gmail.com', 'Logged in', '2025-04-14 07:11:17'),
(277, 2, 'aash100227@gmail.com', 'Logged out', '2025-04-14 07:13:36'),
(278, 6, 'hakd857@gmail.com', 'Logged in', '2025-04-14 07:13:44'),
(279, 2, 'aash100227@gmail.com', 'Logged in', '2025-05-01 13:26:18'),
(280, 2, 'aash100227@gmail.com', 'Logged out', '2025-05-01 13:26:28'),
(281, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-01 13:26:37'),
(282, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-01 14:18:54'),
(283, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-01 14:25:43'),
(284, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-01 14:55:09'),
(285, NULL, 'Unknown', 'Logged out', '2025-05-01 15:02:26'),
(286, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-01 15:02:32'),
(287, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-01 15:07:58'),
(288, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-01 15:10:26'),
(289, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-01 15:10:54'),
(290, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-01 15:11:16'),
(291, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-01 15:11:42'),
(292, 6, 'hakd857@gmail.com', 'Logged out', '2025-05-01 15:13:57'),
(293, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-01 15:14:05'),
(294, 6, 'hakd857@gmail.com', 'Logged out', '2025-05-01 15:14:11'),
(295, 7, 'zyggizyg72@gmail.com', 'Logged in', '2025-05-01 15:14:16'),
(296, 7, 'zyggizyg72@gmail.com', 'Submitted a catch report', '2025-05-01 15:14:31'),
(297, 7, 'zyggizyg72@gmail.com', 'Submitted a catch report', '2025-05-01 15:21:58'),
(298, 7, 'zyggizyg72@gmail.com', 'Logged out', '2025-05-01 15:22:32'),
(299, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-01 15:22:38'),
(300, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-01 15:23:02'),
(301, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-01 15:27:00'),
(302, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-01 15:27:22'),
(303, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-01 15:28:56'),
(304, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-01 15:29:16'),
(305, NULL, 'Unknown', 'Logged out', '2025-05-01 15:30:41'),
(306, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-01 15:30:46'),
(307, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-01 15:31:08'),
(308, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-01 15:36:30'),
(309, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-01 15:36:56'),
(310, NULL, 'Unknown', 'Logged out', '2025-05-01 15:39:22'),
(311, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-01 15:39:31'),
(312, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-01 15:39:55'),
(313, NULL, 'Unknown', 'Logged out', '2025-05-01 15:42:11'),
(314, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-01 15:43:27'),
(315, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-01 15:43:48'),
(316, NULL, 'Unknown', 'Logged out', '2025-05-01 15:56:25'),
(317, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-01 15:56:33'),
(318, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-01 15:56:49'),
(319, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-01 16:05:24'),
(320, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-01 16:05:42'),
(321, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-01 16:12:13'),
(322, NULL, 'Unknown', 'Logged out', '2025-05-01 16:14:57'),
(323, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-01 16:15:03'),
(324, 6, 'hakd857@gmail.com', 'Logged out', '2025-05-01 16:16:14'),
(325, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-01 16:16:20'),
(326, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-02 13:57:38'),
(327, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-02 14:13:52'),
(328, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-03 14:01:38'),
(329, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-03 14:01:55'),
(330, NULL, 'Unknown', 'Logged out', '2025-05-03 14:06:41'),
(331, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-03 14:06:47'),
(332, NULL, 'Unknown', 'Logged out', '2025-05-03 14:08:11'),
(333, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-03 14:08:16'),
(334, NULL, 'Unknown', 'Logged out', '2025-05-03 14:30:44'),
(335, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-03 14:30:50'),
(336, NULL, 'Unknown', 'Logged out', '2025-05-03 14:39:45'),
(337, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-03 14:39:52'),
(338, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-03 14:40:14'),
(339, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-03 14:40:40'),
(340, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-03 14:41:01'),
(341, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-03 14:41:21'),
(342, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-03 14:41:47'),
(343, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-03 14:42:12'),
(344, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-05-03 14:42:30'),
(345, 2, 'aash100227@gmail.com', 'Logged in', '2025-05-04 12:10:47'),
(346, 2, 'aash100227@gmail.com', 'Logged in', '2025-05-04 12:13:44'),
(347, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-04 12:14:09'),
(348, 2, 'aash100227@gmail.com', 'Logged in', '2025-05-04 12:25:03'),
(349, NULL, 'Unknown', 'Logged out', '2025-05-04 13:14:23'),
(350, 2, 'aash100227@gmail.com', 'Logged in', '2025-05-04 13:14:30'),
(351, 2, 'aash100227@gmail.com', 'Logged in', '2025-05-04 13:48:21'),
(352, 2, 'aash100227@gmail.com', 'Logged in', '2025-05-04 13:50:14'),
(353, 2, 'aash100227@gmail.com', 'Logged in', '2025-05-04 13:53:18'),
(354, 2, 'aash100227@gmail.com', 'Logged in', '2025-05-04 13:54:52'),
(355, 2, 'aash100227@gmail.com', 'Logged in', '2025-05-04 13:55:18'),
(356, 2, 'aash100227@gmail.com', 'Logged in', '2025-05-09 03:47:23'),
(357, 2, 'aash100227@gmail.com', 'Logged out', '2025-05-09 03:47:45'),
(358, 2, 'aash100227@gmail.com', 'Logged in', '2025-05-09 03:47:53'),
(359, 2, 'aash100227@gmail.com', 'Logged out', '2025-05-09 03:50:23'),
(360, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-09 03:50:29'),
(361, 6, 'hakd857@gmail.com', 'Logged out', '2025-05-09 03:52:19'),
(362, 2, 'aash100227@gmail.com', 'Logged in', '2025-05-10 12:10:38'),
(363, 2, 'aash100227@gmail.com', 'Logged out', '2025-05-10 12:11:37'),
(364, 2, 'aash100227@gmail.com', 'Logged in', '2025-05-24 12:25:35'),
(365, 2, 'aash100227@gmail.com', 'Logged in', '2025-05-24 12:43:01'),
(366, 2, 'aash100227@gmail.com', 'Logged out', '2025-05-24 12:46:30'),
(367, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-24 12:46:36'),
(368, 6, 'hakd857@gmail.com', 'Logged out', '2025-05-24 12:51:27'),
(369, 2, 'aash100227@gmail.com', 'Logged in', '2025-05-24 12:51:32'),
(370, 2, 'aash100227@gmail.com', 'Logged out', '2025-05-24 12:51:53'),
(371, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-24 12:51:58'),
(372, 2, 'aash100227@gmail.com', 'Logged in', '2025-05-31 10:40:49'),
(373, 2, 'aash100227@gmail.com', 'Logged out', '2025-05-31 11:05:27'),
(374, 2, 'aash100227@gmail.com', 'Logged in', '2025-05-31 11:05:32'),
(375, 2, 'aash100227@gmail.com', 'Logged out', '2025-05-31 11:34:39'),
(376, 6, 'hakd857@gmail.com', 'Logged in', '2025-05-31 11:34:47'),
(377, 2, 'aash100227@gmail.com', 'Logged in', '2025-05-31 11:53:14'),
(378, 6, 'hakd857@gmail.com', 'Logged out', '2025-05-31 12:00:55'),
(379, 2, 'aash100227@gmail.com', 'Logged in', '2025-05-31 12:29:16'),
(380, 2, 'aash100227@gmail.com', 'Logged out', '2025-05-31 12:29:58'),
(381, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-02 02:57:07'),
(382, 2, 'aash100227@gmail.com', 'Logged out', '2025-06-02 02:57:38'),
(383, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-02 03:00:19'),
(384, 6, 'hakd857@gmail.com', 'Logged out', '2025-06-02 03:00:31'),
(385, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-02 03:00:36'),
(386, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-02 03:04:49'),
(387, 2, 'aash100227@gmail.com', 'Logged out', '2025-06-02 03:08:29'),
(388, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-02 03:08:39'),
(389, 2, 'aash100227@gmail.com', 'Logged out', '2025-06-02 03:32:28'),
(390, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-02 03:32:47'),
(391, 2, 'aash100227@gmail.com', 'Logged out', '2025-06-02 03:36:05'),
(392, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-02 03:36:13'),
(393, 6, 'hakd857@gmail.com', 'Logged out', '2025-06-02 04:11:48'),
(394, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-02 04:21:49'),
(395, 2, 'aash100227@gmail.com', 'Logged out', '2025-06-02 04:25:52'),
(396, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-02 04:26:10'),
(397, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-03 01:25:46'),
(398, 2, 'aash100227@gmail.com', 'Logged out', '2025-06-03 01:26:00'),
(399, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-03 01:26:05'),
(400, 6, 'hakd857@gmail.com', 'Logged out', '2025-06-03 01:29:48'),
(401, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-15 06:31:59'),
(402, 6, 'hakd857@gmail.com', 'Logged out', '2025-06-15 06:34:16'),
(403, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-15 06:37:18'),
(404, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-15 06:47:43'),
(405, 6, 'hakd857@gmail.com', 'Logged out', '2025-06-15 06:47:52'),
(406, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-15 06:57:14'),
(407, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-15 07:44:13'),
(408, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-15 07:52:11'),
(409, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-15 08:07:33'),
(410, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-15 08:09:32'),
(411, 6, 'hakd857@gmail.com', 'Logged out', '2025-06-15 08:17:55'),
(412, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-15 08:18:04'),
(413, 2, 'aash100227@gmail.com', 'Logged out', '2025-06-15 08:18:32'),
(414, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-15 08:18:38'),
(415, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-15 08:24:37'),
(416, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-15 08:25:41'),
(417, 2, 'aash100227@gmail.com', 'Logged out', '2025-06-15 08:26:43'),
(418, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-15 08:26:47'),
(419, 6, 'hakd857@gmail.com', 'Logged out', '2025-06-15 08:27:41'),
(420, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-15 08:27:46'),
(421, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-18 13:18:30'),
(422, 2, 'aash100227@gmail.com', 'Logged out', '2025-06-18 13:27:26'),
(423, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-18 13:27:32'),
(424, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-18 13:28:57'),
(425, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-18 13:30:21'),
(426, 6, 'hakd857@gmail.com', 'Logged out', '2025-06-18 13:40:40'),
(427, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-18 13:40:46'),
(428, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-18 16:16:40'),
(429, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-19 12:58:20'),
(430, 6, 'hakd857@gmail.com', 'Logged out', '2025-06-19 12:59:08'),
(431, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-19 12:59:14'),
(432, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-19 13:08:20'),
(433, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-19 13:51:52'),
(434, 2, 'aash100227@gmail.com', 'Logged out', '2025-06-19 14:09:19'),
(435, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-19 16:18:32'),
(436, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-19 16:32:48'),
(437, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-19 16:42:02'),
(438, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-19 16:42:42'),
(439, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-19 16:52:17'),
(440, 2, 'aash100227@gmail.com', 'Logged out', '2025-06-19 16:58:56'),
(441, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-19 16:59:00'),
(442, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-19 17:00:34'),
(443, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-19 17:13:11'),
(444, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-19 17:18:04'),
(445, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-19 17:24:22'),
(446, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-20 13:52:13'),
(447, 2, 'aash100227@gmail.com', 'Logged out', '2025-06-20 14:21:31'),
(448, NULL, 'Unknown', 'Signed up', '2025-06-20 14:22:25'),
(449, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-22 13:30:13'),
(450, 2, 'aash100227@gmail.com', 'Logged out', '2025-06-22 13:30:33'),
(451, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-22 13:30:40'),
(452, 6, 'hakd857@gmail.com', 'Logged out', '2025-06-22 13:34:39'),
(453, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-22 13:34:44'),
(454, 2, 'aash100227@gmail.com', 'Logged out', '2025-06-22 13:35:24'),
(455, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-22 13:35:28'),
(456, 6, 'hakd857@gmail.com', 'Logged out', '2025-06-22 13:35:55'),
(457, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-22 13:36:02'),
(458, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-25 02:43:41'),
(459, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-25 02:45:13'),
(460, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-25 02:46:05'),
(461, 2, 'aash100227@gmail.com', 'Logged out', '2025-06-25 03:02:35'),
(462, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-25 03:06:25'),
(463, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-25 03:12:39'),
(464, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-25 03:15:59'),
(465, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-25 03:17:58'),
(466, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-26 12:48:15'),
(467, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-26 12:48:24'),
(468, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-26 13:03:38'),
(469, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-26 15:27:37'),
(470, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-26 15:45:33'),
(471, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-26 15:47:26'),
(472, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-26 15:51:04'),
(473, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-26 16:33:14'),
(474, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-27 12:47:28'),
(475, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-27 12:49:40'),
(476, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-27 13:08:49'),
(477, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-27 13:13:06'),
(478, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-27 13:15:45'),
(479, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-27 13:17:49'),
(480, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-27 13:17:58'),
(481, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-27 13:33:08'),
(482, 2, 'aash100227@gmail.com', 'Logged out', '2025-06-27 13:37:17'),
(483, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-27 13:37:25'),
(484, 6, 'hakd857@gmail.com', 'Logged out', '2025-06-27 13:38:23'),
(485, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-27 13:38:29'),
(486, NULL, 'Unknown', 'Signed up', '2025-06-27 14:16:51'),
(487, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-27 14:18:20'),
(488, 2, 'aash100227@gmail.com', 'Logged out', '2025-06-27 14:18:40'),
(489, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-27 14:46:46'),
(490, 2, 'aash100227@gmail.com', 'Logged out', '2025-06-27 14:50:13'),
(491, 2, 'aash100227@gmail.com', 'Logged in', '2025-06-27 14:50:32'),
(492, 2, 'aash100227@gmail.com', 'Logged out', '2025-06-27 14:58:27'),
(493, 2, 'aash100227@gmail.com', 'Logged out', '2025-06-27 16:39:24'),
(494, NULL, 'Unknown', 'Signed up', '2025-06-29 13:12:41'),
(495, NULL, 'Unknown', 'Verified email', '2025-06-29 13:13:08'),
(498, 6, 'hakd857@gmail.com', 'Logged in', '2025-06-29 13:25:46'),
(499, 6, 'hakd857@gmail.com', 'Submitted a catch report', '2025-06-29 13:29:54'),
(500, 6, 'hakd857@gmail.com', 'Logged out', '2025-06-29 13:31:32'),
(501, NULL, 'Unknown', 'Requested password reset', '2025-06-29 13:32:16');

-- --------------------------------------------------------

--
-- Table structure for table `catch_predictions`
--

DROP TABLE IF EXISTS `catch_predictions`;
CREATE TABLE IF NOT EXISTS `catch_predictions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `species` varchar(255) DEFAULT NULL,
  `predicted_best_time` datetime DEFAULT NULL,
  `predicted_quantity` int NOT NULL,
  `confidence` int DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_catch_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `catch_predictions`
--

INSERT INTO `catch_predictions` (`id`, `species`, `predicted_best_time`, `predicted_quantity`, `confidence`, `date`, `last_updated`, `created_at`, `user_id`) VALUES
(23, 'Talakitok (Giant Trevally)', '2025-05-08 00:00:00', 0, 1, '2025-05-01 15:56:49', '2025-05-01 15:56:49', '2025-05-01 15:56:49', NULL),
(24, 'Sapsap (Slipmouth)', '2025-05-24 00:00:00', 0, 1, '2025-05-01 16:05:42', '2025-05-01 16:05:42', '2025-05-01 16:05:42', NULL),
(25, 'Talakitok (Giant Trevally)', '2025-05-10 00:00:00', 0, 1, '2025-05-03 14:01:55', '2025-05-03 14:01:55', '2025-05-03 14:01:55', NULL),
(26, 'Lapu-Lapu (Grouper)', '2025-05-10 00:00:00', 0, 1, '2025-05-03 14:40:14', '2025-05-03 14:40:14', '2025-05-03 14:40:14', NULL),
(27, 'Salay-salay (Yellowtail Scad)', '2025-06-05 00:00:00', 0, 1, '2025-05-03 14:40:40', '2025-05-03 14:40:40', '2025-05-03 14:40:40', NULL),
(28, 'Tamban (Sardine)', '2025-06-05 00:00:00', 0, 1, '2025-05-03 14:41:01', '2025-05-03 14:41:01', '2025-05-03 14:41:01', NULL),
(29, 'Pangasius (Cream Dory)', '2025-05-26 00:00:00', 0, 1, '2025-05-03 14:41:21', '2025-05-03 14:41:21', '2025-05-03 14:41:21', NULL),
(30, 'Biya (Gobies)', '2025-11-18 00:00:00', 0, 1, '2025-05-03 14:41:47', '2025-05-03 14:41:47', '2025-05-03 14:41:47', NULL),
(31, 'Martiniko (Climbing Perch)', '2025-03-01 00:00:00', 0, 1, '2025-05-03 14:42:12', '2025-05-03 14:42:12', '2025-05-03 14:42:12', NULL),
(32, 'Talakitok (Giant Trevally)', '2022-11-18 00:00:00', 0, 1, '2025-05-03 14:42:30', '2025-05-03 14:42:30', '2025-05-03 14:42:30', NULL),
(33, 'Dalag (Mudfish)', '2025-07-06 00:00:00', 0, 1, '2025-06-29 13:29:54', '2025-06-29 13:29:54', '2025-06-29 13:29:54', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `catch_reports`
--

DROP TABLE IF EXISTS `catch_reports`;
CREATE TABLE IF NOT EXISTS `catch_reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `species` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `status` enum('Under Review','Approved','Flagged') DEFAULT 'Under Review',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `method_of_fishing` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_catch_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `catch_reports`
--

INSERT INTO `catch_reports` (`id`, `user_id`, `species`, `quantity`, `location`, `status`, `date`, `method_of_fishing`) VALUES
(35, 6, 'Talakitok (Giant Trevally)', 12, 'Dyan', 'Under Review', '2025-05-01 00:00:00', 'Bottom Trawling'),
(36, 6, 'Sapsap (Slipmouth)', 77, 'Romblon', 'Under Review', '2025-05-17 00:00:00', 'Purse Seine'),
(37, 6, 'Talakitok (Giant Trevally)', 9, 'hnj', 'Under Review', '2025-05-03 00:00:00', 'Longline Fishing'),
(38, 6, 'Lapu-Lapu (Grouper)', 333, 'qeqeq', 'Flagged', '2025-05-03 00:00:00', 'Bottom Trawling'),
(39, 6, 'Salay-salay (Yellowtail Scad)', 11, 'Romblon', 'Approved', '2025-05-29 00:00:00', 'Bottom Trawling'),
(40, 6, 'Tamban (Sardine)', 88, 'Fish Pond ng MinSU', 'Under Review', '2025-05-29 00:00:00', 'Purse Seine'),
(41, 6, 'Pangasius (Cream Dory)', 9, 'River Bend', 'Under Review', '2025-05-19 00:00:00', 'Cast Net'),
(42, 6, 'Biya (Gobies)', 12, 'sdadsad', 'Approved', '2025-11-11 00:00:00', 'Longline Fishing'),
(43, 6, 'Martiniko (Climbing Perch)', 132, 'Romblon', 'Under Review', '2025-02-22 00:00:00', 'Fish Trap'),
(44, 6, 'Talakitok (Giant Trevally)', 22, 'djakjdoqi', 'Flagged', '2022-11-11 00:00:00', 'Bottom Trawling'),
(45, 6, 'Dalag (Mudfish)', 12, 'Fish Pond ng MinSU', 'Under Review', '2025-06-29 00:00:00', 'Lift net');

--
-- Triggers `catch_reports`
--
DROP TRIGGER IF EXISTS `update_catch_predictions`;
DELIMITER $$
CREATE TRIGGER `update_catch_predictions` AFTER INSERT ON `catch_reports` FOR EACH ROW BEGIN
    INSERT INTO catch_predictions (species, predicted_best_time, confidence)
    VALUES (
        NEW.species, 
        DATE_ADD(NEW.date, INTERVAL 7 DAY), -- Example: Predicts next best time 7 days later
        0.9
    )
    ON DUPLICATE KEY UPDATE 
        predicted_best_time = VALUES(predicted_best_time),
        confidence = VALUES(confidence);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `climate_events`
--

DROP TABLE IF EXISTS `climate_events`;
CREATE TABLE IF NOT EXISTS `climate_events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) DEFAULT NULL,
  `event_type` enum('Typhoon','Flood','Drought','Storm Surge') DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `severity` enum('Low','Moderate','Severe','Extreme') DEFAULT NULL,
  `estimated_damage` decimal(10,2) DEFAULT NULL,
  `affected_area` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_climate_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=225 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `climate_events`
--

INSERT INTO `climate_events` (`id`, `event_name`, `event_type`, `event_date`, `severity`, `estimated_damage`, `affected_area`, `created_at`, `user_id`) VALUES
(1, 'Unknown Weather Event', '', '2025-03-16', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:31:48', NULL),
(2, 'Unknown Weather Event', '', '2025-03-17', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:31:48', NULL),
(3, 'Unknown Weather Event', '', '2025-03-18', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:31:48', NULL),
(4, 'Unknown Weather Event', '', '2025-03-19', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:31:48', NULL),
(5, 'Unknown Weather Event', '', '2025-03-20', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:31:48', NULL),
(6, 'Unknown Weather Event', '', '2025-03-21', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:31:48', NULL),
(7, 'Unknown Weather Event', '', '2025-03-22', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:31:48', NULL),
(8, 'Unknown Weather Event', '', '2025-03-16', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:32:00', NULL),
(9, 'Unknown Weather Event', '', '2025-03-17', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:32:00', NULL),
(10, 'Unknown Weather Event', '', '2025-03-18', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:32:00', NULL),
(11, 'Unknown Weather Event', '', '2025-03-19', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:32:00', NULL),
(12, 'Unknown Weather Event', '', '2025-03-20', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:32:00', NULL),
(13, 'Unknown Weather Event', '', '2025-03-21', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:32:00', NULL),
(14, 'Unknown Weather Event', '', '2025-03-22', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:32:00', NULL),
(15, 'Partly Cloudy', '', '2025-03-16', '', 50000.00, 'Calapan, Philippines', '2025-03-15 16:41:57', NULL),
(16, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:41:57', NULL),
(17, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:41:57', NULL),
(18, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:41:57', NULL),
(19, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:41:57', NULL),
(20, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:41:57', NULL),
(21, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:41:57', NULL),
(22, 'Partly Cloudy', '', '2025-03-16', '', 50000.00, 'Calapan, Philippines', '2025-03-15 16:42:26', NULL),
(23, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:42:26', NULL),
(24, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:42:26', NULL),
(25, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:42:26', NULL),
(26, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:42:26', NULL),
(27, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:42:26', NULL),
(28, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:42:26', NULL),
(29, 'Partly Cloudy', '', '2025-03-16', '', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:42', NULL),
(30, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43', NULL),
(31, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43', NULL),
(32, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43', NULL),
(33, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43', NULL),
(34, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43', NULL),
(35, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43', NULL),
(36, 'Partly Cloudy', '', '2025-03-16', '', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43', NULL),
(37, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43', NULL),
(38, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43', NULL),
(39, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43', NULL),
(40, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43', NULL),
(41, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43', NULL),
(42, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43', NULL),
(43, 'Partly Cloudy', '', '2025-03-16', '', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43', NULL),
(44, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43', NULL),
(45, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43', NULL),
(46, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43', NULL),
(47, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43', NULL),
(48, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43', NULL),
(49, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43', NULL),
(50, 'Partly Cloudy', '', '2025-03-16', '', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:53', NULL),
(51, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:53', NULL),
(52, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:53', NULL),
(53, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:53', NULL),
(54, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:53', NULL),
(55, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:53', NULL),
(56, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:53', NULL),
(57, 'Partly Cloudy', '', '2025-03-16', 'Low', 0.00, 'Calapan, Philippines', '2025-03-15 16:58:50', NULL),
(58, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:58:50', NULL),
(59, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:58:50', NULL),
(60, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:58:50', NULL),
(61, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:58:50', NULL),
(62, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:58:50', NULL),
(63, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:58:50', NULL),
(64, 'Partly Cloudy', '', '2025-03-16', 'Low', 0.00, 'Calapan, Philippines', '2025-03-15 17:08:59', NULL),
(65, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:08:59', NULL),
(66, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:08:59', NULL),
(67, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:08:59', NULL),
(68, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:08:59', NULL),
(69, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:08:59', NULL),
(70, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:08:59', NULL),
(71, 'Partly Cloudy', '', '2025-03-16', 'Low', 0.00, 'Calapan, Philippines', '2025-03-15 17:15:36', NULL),
(72, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:15:36', NULL),
(73, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:15:36', NULL),
(74, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:15:36', NULL),
(75, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:15:36', NULL),
(76, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:15:36', NULL),
(77, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:15:36', NULL),
(78, 'Partly Cloudy', '', '2025-03-16', 'Low', 0.00, 'Calapan, Philippines', '2025-03-15 17:19:22', NULL),
(79, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:19:22', NULL),
(80, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:19:22', NULL),
(81, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:19:22', NULL),
(82, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:19:22', NULL),
(83, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:19:22', NULL),
(84, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:19:22', NULL),
(85, 'Partly Cloudy', '', '2025-03-16', 'Low', 0.00, 'Calapan, Philippines', '2025-03-15 17:21:51', NULL),
(86, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:21:51', NULL),
(87, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:21:51', NULL),
(88, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:21:51', NULL),
(89, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:21:51', NULL),
(90, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:21:51', NULL),
(91, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:21:51', NULL),
(92, 'Thunderstorm', 'Typhoon', '2025-04-05', 'Severe', 100000.00, 'Calapan, Philippines', '2025-04-05 06:02:56', NULL),
(93, 'Slight Rain Showers', 'Storm Surge', '2025-04-06', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-04-05 06:02:56', NULL),
(94, 'Slight Rain Showers', 'Storm Surge', '2025-04-07', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-04-05 06:02:56', NULL),
(95, 'Slight Rain Showers', 'Storm Surge', '2025-04-08', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-04-05 06:02:56', NULL),
(96, 'Fog', '', '2025-04-09', 'Low', 50000.00, 'Calapan, Philippines', '2025-04-05 06:02:56', NULL),
(97, 'Partly Cloudy', '', '2025-04-10', 'Low', 0.00, 'Calapan, Philippines', '2025-04-05 06:02:56', NULL),
(98, 'Overcast', '', '2025-04-11', '', 0.00, 'Calapan, Philippines', '2025-04-05 06:02:56', NULL),
(99, 'Fog', '', '2025-04-06', 'Low', 50000.00, 'Calapan, Philippines', '2025-04-06 13:28:28', NULL),
(100, 'Overcast', '', '2025-04-07', '', 0.00, 'Calapan, Philippines', '2025-04-06 13:28:28', NULL),
(101, 'Slight Rain Showers', 'Storm Surge', '2025-04-08', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-04-06 13:28:28', NULL),
(102, 'Fog', '', '2025-04-09', 'Low', 50000.00, 'Calapan, Philippines', '2025-04-06 13:28:28', NULL),
(103, 'Fog', '', '2025-04-10', 'Low', 50000.00, 'Calapan, Philippines', '2025-04-06 13:28:28', NULL),
(104, 'Mainly Clear', '', '2025-04-11', '', 0.00, 'Calapan, Philippines', '2025-04-06 13:28:28', NULL),
(105, 'Overcast', '', '2025-04-12', '', 0.00, 'Calapan, Philippines', '2025-04-06 13:28:28', NULL),
(106, 'Fog', '', '2025-04-06', 'Low', 50000.00, 'Calapan, Philippines', '2025-04-06 13:28:31', NULL),
(107, 'Overcast', '', '2025-04-07', '', 0.00, 'Calapan, Philippines', '2025-04-06 13:28:31', NULL),
(108, 'Slight Rain Showers', 'Storm Surge', '2025-04-08', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-04-06 13:28:31', NULL),
(109, 'Fog', '', '2025-04-09', 'Low', 50000.00, 'Calapan, Philippines', '2025-04-06 13:28:31', NULL),
(110, 'Fog', '', '2025-04-10', 'Low', 50000.00, 'Calapan, Philippines', '2025-04-06 13:28:31', NULL),
(111, 'Mainly Clear', '', '2025-04-11', '', 0.00, 'Calapan, Philippines', '2025-04-06 13:28:31', NULL),
(112, 'Overcast', '', '2025-04-12', '', 0.00, 'Calapan, Philippines', '2025-04-06 13:28:31', NULL),
(113, 'Overcast', '', '2025-05-24', '', 0.00, 'Calapan, Philippines', '2025-05-24 12:45:49', NULL),
(114, 'Slight Rain Showers', 'Storm Surge', '2025-05-25', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-05-24 12:45:49', NULL),
(115, 'Overcast', '', '2025-05-26', '', 0.00, 'Calapan, Philippines', '2025-05-24 12:45:49', NULL),
(116, 'Slight Rain Showers', 'Storm Surge', '2025-05-27', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-05-24 12:45:49', NULL),
(117, 'Fog', '', '2025-05-28', 'Low', 50000.00, 'Calapan, Philippines', '2025-05-24 12:45:49', NULL),
(118, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-05-29', 'Severe', 200000.00, 'Calapan, Philippines', '2025-05-24 12:45:49', NULL),
(119, 'Thunderstorm', 'Typhoon', '2025-05-30', 'Severe', 100000.00, 'Calapan, Philippines', '2025-05-24 12:45:49', NULL),
(120, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-05-31', 'Severe', 200000.00, 'Calapan, Philippines', '2025-05-31 11:30:28', NULL),
(121, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-01', 'Severe', 200000.00, 'Calapan, Philippines', '2025-05-31 11:30:28', NULL),
(122, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-02', 'Severe', 200000.00, 'Calapan, Philippines', '2025-05-31 11:30:28', NULL),
(123, 'Thunderstorm', 'Typhoon', '2025-06-03', 'Severe', 100000.00, 'Calapan, Philippines', '2025-05-31 11:30:28', NULL),
(124, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-04', 'Severe', 200000.00, 'Calapan, Philippines', '2025-05-31 11:30:28', NULL),
(125, 'Thunderstorm', 'Typhoon', '2025-06-05', 'Severe', 100000.00, 'Calapan, Philippines', '2025-05-31 11:30:28', NULL),
(126, 'Thunderstorm', 'Typhoon', '2025-06-06', 'Severe', 100000.00, 'Calapan, Philippines', '2025-05-31 11:30:28', NULL),
(127, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-05-31', 'Severe', 200000.00, 'Calapan, Philippines', '2025-05-31 11:32:53', NULL),
(128, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-01', 'Severe', 200000.00, 'Calapan, Philippines', '2025-05-31 11:32:53', NULL),
(129, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-02', 'Severe', 200000.00, 'Calapan, Philippines', '2025-05-31 11:32:53', NULL),
(130, 'Thunderstorm', 'Typhoon', '2025-06-03', 'Severe', 100000.00, 'Calapan, Philippines', '2025-05-31 11:32:53', NULL),
(131, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-04', 'Severe', 200000.00, 'Calapan, Philippines', '2025-05-31 11:32:53', NULL),
(132, 'Thunderstorm', 'Typhoon', '2025-06-05', 'Severe', 100000.00, 'Calapan, Philippines', '2025-05-31 11:32:53', NULL),
(133, 'Thunderstorm', 'Typhoon', '2025-06-06', 'Severe', 100000.00, 'Calapan, Philippines', '2025-05-31 11:32:53', NULL),
(134, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-02', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-02 03:59:37', NULL),
(135, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-03', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-02 03:59:37', NULL),
(136, 'Thunderstorm', 'Typhoon', '2025-06-04', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-02 03:59:37', NULL),
(137, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-05', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-02 03:59:37', NULL),
(138, 'Thunderstorm', 'Typhoon', '2025-06-06', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-02 03:59:37', NULL),
(139, 'Thunderstorm', 'Typhoon', '2025-06-07', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-02 03:59:37', NULL),
(140, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-08', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-02 03:59:37', NULL),
(141, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-02', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-02 03:59:37', NULL),
(142, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-03', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-02 03:59:37', NULL),
(143, 'Thunderstorm', 'Typhoon', '2025-06-04', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-02 03:59:38', NULL),
(144, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-05', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-02 03:59:38', NULL),
(145, 'Thunderstorm', 'Typhoon', '2025-06-06', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-02 03:59:38', NULL),
(146, 'Thunderstorm', 'Typhoon', '2025-06-07', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-02 03:59:38', NULL),
(147, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-08', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-02 03:59:38', NULL),
(148, 'Thunderstorm', 'Typhoon', '2025-06-20', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-20 14:17:52', NULL),
(149, 'Thunderstorm', 'Typhoon', '2025-06-21', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-20 14:17:52', NULL),
(150, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-22', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-20 14:17:52', NULL),
(151, 'Thunderstorm', 'Typhoon', '2025-06-23', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-20 14:17:52', NULL),
(152, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-24', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-20 14:17:52', NULL),
(153, 'Slight Rain Showers', 'Storm Surge', '2025-06-25', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-06-20 14:17:52', NULL),
(154, 'Slight Rain Showers', 'Storm Surge', '2025-06-26', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-06-20 14:17:52', NULL),
(155, 'Thunderstorm', 'Typhoon', '2025-06-25', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:07:20', NULL),
(156, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-26', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-25 03:07:20', NULL),
(157, 'Thunderstorm', 'Typhoon', '2025-06-27', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:07:20', NULL),
(158, 'Slight Rain Showers', 'Storm Surge', '2025-06-28', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-06-25 03:07:20', NULL),
(159, 'Thunderstorm', 'Typhoon', '2025-06-29', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:07:20', NULL),
(160, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-30', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-25 03:07:20', NULL),
(161, 'Thunderstorm', 'Typhoon', '2025-07-01', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:07:20', NULL),
(162, 'Thunderstorm', 'Typhoon', '2025-06-25', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(163, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-26', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(164, 'Thunderstorm', 'Typhoon', '2025-06-27', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(165, 'Thunderstorm', 'Typhoon', '2025-06-25', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(166, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-26', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(167, 'Thunderstorm', 'Typhoon', '2025-06-27', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(168, 'Slight Rain Showers', 'Storm Surge', '2025-06-28', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(169, 'Slight Rain Showers', 'Storm Surge', '2025-06-28', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(170, 'Thunderstorm', 'Typhoon', '2025-06-25', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(171, 'Thunderstorm', 'Typhoon', '2025-06-29', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(172, 'Thunderstorm', 'Typhoon', '2025-06-29', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(173, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-26', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(174, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-30', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(175, 'Thunderstorm', 'Typhoon', '2025-07-01', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(176, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-30', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(177, 'Thunderstorm', 'Typhoon', '2025-06-27', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(178, 'Thunderstorm', 'Typhoon', '2025-07-01', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(179, 'Slight Rain Showers', 'Storm Surge', '2025-06-28', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(180, 'Thunderstorm', 'Typhoon', '2025-06-29', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(181, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-30', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(182, 'Thunderstorm', 'Typhoon', '2025-07-01', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(183, 'Thunderstorm', 'Typhoon', '2025-06-25', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(184, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-26', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(185, 'Thunderstorm', 'Typhoon', '2025-06-27', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(186, 'Slight Rain Showers', 'Storm Surge', '2025-06-28', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(187, 'Thunderstorm', 'Typhoon', '2025-06-29', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(188, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-30', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(189, 'Thunderstorm', 'Typhoon', '2025-07-01', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:23:53', NULL),
(190, 'Thunderstorm', 'Typhoon', '2025-06-25', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:26:04', NULL),
(191, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-26', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-25 03:26:04', NULL),
(192, 'Thunderstorm', 'Typhoon', '2025-06-27', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:26:04', NULL),
(193, 'Slight Rain Showers', 'Storm Surge', '2025-06-28', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-06-25 03:26:04', NULL),
(194, 'Thunderstorm', 'Typhoon', '2025-06-29', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:26:04', NULL),
(195, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-30', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-25 03:26:04', NULL),
(196, 'Thunderstorm', 'Typhoon', '2025-07-01', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-25 03:26:04', NULL),
(197, 'Thunderstorm', 'Typhoon', '2025-06-26', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-26 12:55:17', NULL),
(198, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-27', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-26 12:55:17', NULL),
(199, 'Thunderstorm', 'Typhoon', '2025-06-28', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-26 12:55:17', NULL),
(200, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-29', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-26 12:55:17', NULL),
(201, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-30', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-26 12:55:17', NULL),
(202, 'Thunderstorm', 'Typhoon', '2025-07-01', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-26 12:55:17', NULL),
(203, 'Slight Rain Showers', 'Storm Surge', '2025-07-02', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-06-26 12:55:17', NULL),
(204, 'Thunderstorm', 'Typhoon', '2025-06-26', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-26 12:57:42', NULL),
(205, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-27', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-26 12:57:42', NULL),
(206, 'Thunderstorm', 'Typhoon', '2025-06-28', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-26 12:57:42', NULL),
(207, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-29', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-26 12:57:42', NULL),
(208, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-30', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-26 12:57:42', NULL),
(209, 'Thunderstorm', 'Typhoon', '2025-07-01', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-26 12:57:42', NULL),
(210, 'Slight Rain Showers', 'Storm Surge', '2025-07-02', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-06-26 12:57:42', NULL),
(211, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-27', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-27 13:12:38', NULL),
(212, 'Thunderstorm', 'Typhoon', '2025-06-28', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-27 13:12:38', NULL),
(213, 'Overcast', '', '2025-06-29', '', 0.00, 'Calapan, Philippines', '2025-06-27 13:12:38', NULL),
(214, 'Thunderstorm with Slight Hail', 'Typhoon', '2025-06-30', 'Severe', 200000.00, 'Calapan, Philippines', '2025-06-27 13:12:39', NULL),
(215, 'Slight Rain Showers', 'Storm Surge', '2025-07-01', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-06-27 13:12:39', NULL),
(216, 'Overcast', '', '2025-07-02', '', 0.00, 'Calapan, Philippines', '2025-06-27 13:12:39', NULL),
(217, 'Overcast', '', '2025-07-03', '', 0.00, 'Calapan, Philippines', '2025-06-27 13:12:39', NULL),
(218, 'Slight Rain Showers', 'Storm Surge', '2025-06-29', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-06-29 13:25:03', NULL),
(219, 'Thunderstorm', 'Typhoon', '2025-06-30', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-29 13:25:03', NULL),
(220, 'Thunderstorm', 'Typhoon', '2025-07-01', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-29 13:25:03', NULL),
(221, 'Thunderstorm', 'Typhoon', '2025-07-02', 'Severe', 100000.00, 'Calapan, Philippines', '2025-06-29 13:25:03', NULL),
(222, 'Slight Rain Showers', 'Storm Surge', '2025-07-03', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-06-29 13:25:03', NULL),
(223, 'Overcast', '', '2025-07-04', '', 0.00, 'Calapan, Philippines', '2025-06-29 13:25:03', NULL),
(224, 'Overcast', '', '2025-07-05', '', 0.00, 'Calapan, Philippines', '2025-06-29 13:25:03', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `climate_event_losses`
--

DROP TABLE IF EXISTS `climate_event_losses`;
CREATE TABLE IF NOT EXISTS `climate_event_losses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `event_type` enum('Storm','Typhoon','Flood','Red Tide','Other') NOT NULL,
  `date` date NOT NULL,
  `species_lost` varchar(100) DEFAULT NULL,
  `estimated_loss_kg` decimal(10,2) DEFAULT NULL,
  `estimated_loss_value` decimal(10,2) DEFAULT NULL,
  `description` text,
  `location` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `image_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `climate_event_losses`
--

INSERT INTO `climate_event_losses` (`id`, `user_id`, `event_type`, `date`, `species_lost`, `estimated_loss_kg`, `estimated_loss_value`, `description`, `location`, `created_at`, `image_path`) VALUES
(1, 6, 'Flood', '2025-05-07', 'tilapia', 77.00, 88.00, 'ihuih', 'Romblon', '2025-05-02 13:58:10', NULL),
(2, 6, 'Typhoon', '2025-05-08', 'tilapia', 77.00, 88.00, 'ygy', 'Romblon', '2025-05-02 14:14:11', NULL),
(3, 6, 'Typhoon', '2025-05-31', 'isda', 34.00, 65.00, 'lkfilajl', 'Fish Pond', '2025-05-31 11:40:05', NULL),
(4, 6, 'Flood', '2025-06-15', 'isda', 34.00, 65.00, 'kjhuoh', 'Fish Pond', '2025-06-15 06:32:35', '/uploads/proofImage-1749969155918-808321958.jpg'),
(5, 6, 'Flood', '2025-06-15', 'isda', 34.00, 65.00, 'hhio', 'Fish Pond', '2025-06-15 06:37:47', '/uploads/proofImage-1749969467162-236086002.jpg'),
(6, 6, 'Storm', '2025-06-11', 'isda', 43.00, 233.00, 'madami nawala', 'River Bend', '2025-06-29 13:26:24', '/uploads/proofImage-1751203584950-510161306.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `enforcement_logs`
--

DROP TABLE IF EXISTS `enforcement_logs`;
CREATE TABLE IF NOT EXISTS `enforcement_logs` (
  `id` int NOT NULL,
  `incident` varchar(100) NOT NULL,
  `violation` varchar(100) NOT NULL,
  `penalty` varchar(100) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `enforcement_logs`
--

INSERT INTO `enforcement_logs` (`id`, `incident`, `violation`, `penalty`, `date`) VALUES
(0, 'Incident #001', 'Overfishing', 'Warning', '2025-02-10');

-- --------------------------------------------------------

--
-- Table structure for table `fisherfolk`
--

DROP TABLE IF EXISTS `fisherfolk`;
CREATE TABLE IF NOT EXISTS `fisherfolk` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fishing_methods` varchar(119) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contact_info` varchar(100) NOT NULL,
  `fishing_zone` varchar(119) NOT NULL,
  `license_number` varchar(119) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `user_id` int DEFAULT NULL,
  `number` int NOT NULL,
  `date_registered` date NOT NULL,
  `civil_status` varchar(50) NOT NULL,
  `barangay` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_fisherfolk_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `fisherfolk`
--

INSERT INTO `fisherfolk` (`id`, `fishing_methods`, `address`, `contact_info`, `fishing_zone`, `license_number`, `created_at`, `first_name`, `middle_name`, `last_name`, `user_id`, `number`, `date_registered`, `civil_status`, `barangay`) VALUES
(1, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 13:55:00', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(2, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 13:55:44', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(3, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 13:56:17', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(4, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 13:56:56', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(5, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 13:57:04', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(6, 'Fish net', '', '', 'Puerto Galera', '12345', '2025-02-17 13:57:11', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(7, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:20:16', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(8, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:21:37', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(9, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:28:15', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(10, 'Fish net', '', '', 'Puerto Galera', '12345', '2025-02-17 14:28:31', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(11, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:32:41', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(12, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:34:20', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(13, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:35:27', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(14, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:37:40', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(15, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:38:21', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(16, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:38:51', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(17, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:38:59', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(18, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:42:48', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(19, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:54:14', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(20, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:56:08', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(21, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 15:13:13', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(22, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 15:26:31', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(23, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 15:29:30', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(24, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-23 07:29:53', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(25, 'Fish net', '', '', 'Fish Pond', '01101101', '2025-02-24 07:35:27', '', NULL, '', NULL, 0, '0000-00-00', '', ''),
(26, 'Fish net', 'San Isidro', 'aash100227@gmail.com', 'Puerto Galera', '01101101', '2025-03-02 12:31:50', 'Darylld', 'Cataquis', 'Tupas', NULL, 0, '0000-00-00', '', ''),
(27, 'Fish Farming', 'Wawa, Romblon', 'N/A', 'Wawa', '2024-175205000-7803', '2025-06-19 16:08:12', 'Lady May', 'Catapang de Leon', '', NULL, 28, '2024-02-20', 'Single', 'Wawa'),
(28, 'Fish Farming', 'Silonay, Romblon', 'N/A', 'Silonay', '2024-175205000-7804', '2025-06-19 16:08:12', 'Walter', 'Dinglasan Alo', '', NULL, 29, '2024-02-20', 'Married', 'Silonay'),
(29, 'Fish Farming', 'Baruyan, Romblon', 'N/A', 'Baruyan', '2024-175205000-7805', '2025-06-19 16:08:12', 'Benjamin', 'Porcadela Ponsones Jr', '', NULL, 30, '2024-02-20', 'Married', 'Baruyan'),
(30, 'Fish Farming', 'Calero, Romblon', 'N/A', 'Calero', '2024-175205000-7806', '2025-06-19 16:08:12', 'Anna Marie', 'Reyes', '', NULL, 31, '2024-02-20', 'Single', 'Calero'),
(31, 'Fish Farming', 'Pag-asa, Romblon', 'N/A', 'Pag-asa', '2024-175205000-7807', '2025-06-19 16:08:12', 'Juan Carlos', 'Dela Cruz', '', NULL, 32, '2024-02-20', 'Married', 'Pag-asa'),
(32, 'Fish Farming', 'San Isidro, Romblon', 'N/A', 'San Isidro', '2024-175205000-7808', '2025-06-19 16:08:12', 'Maria Elena', 'Santos', '', NULL, 33, '2024-02-20', 'Single', 'San Isidro'),
(33, 'Fish Farming', 'Nabulao, Romblon', 'N/A', 'Nabulao', '2024-175205000-7809', '2025-06-19 16:08:12', 'Pedro Jose', 'Lim', '', NULL, 34, '2024-02-20', 'Married', 'Nabulao'),
(34, 'Fish Farming', 'Macatoc, Romblon', 'N/A', 'Macatoc', '2024-175205000-7810', '2025-06-19 16:08:12', 'Sofia Grace', 'Torres', '', NULL, 35, '2024-02-20', 'Single', 'Macatoc'),
(35, 'Fish Farming', 'Lumangbayan, Romblon', 'N/A', 'Lumangbayan', '2024-175205000-7811', '2025-06-19 16:08:12', 'Ricardo Paul', 'Gomez', '', NULL, 36, '2024-02-20', 'Married', 'Lumangbayan'),
(36, 'Fish Farming', 'Talisay, Romblon', 'N/A', 'Talisay', '2024-175205000-7812', '2025-06-19 16:08:12', 'Lourdes Ana', 'Cruz', '', NULL, 37, '2024-02-20', 'Single', 'Talisay'),
(37, 'Fish Farming', 'Balete, Romblon', 'N/A', 'Balete', '2024-175205000-7813', '2025-06-19 16:08:12', 'Miguel Angel', 'Reyes', '', NULL, 38, '2024-02-20', 'Married', 'Balete'),
(38, 'Fish Farming', 'Agpanabat, Romblon', 'N/A', 'Agpanabat', '2024-175205000-7814', '2025-06-19 16:08:12', 'Elena Rose', 'Santos', '', NULL, 39, '2024-02-20', 'Single', 'Agpanabat'),
(39, 'Fish Farming', 'Cabulo, Romblon', 'N/A', 'Cabulo', '2024-175205000-7815', '2025-06-19 16:08:12', 'Jose Manuel', 'Dela Cruz', '', NULL, 40, '2024-02-20', 'Married', 'Cabulo'),
(40, 'Fish Farming', 'Panggalaan, Romblon', 'N/A', 'Panggalaan', '2024-175205000-7816', '2025-06-19 16:08:12', 'Carmela Joy', 'Torres', '', NULL, 41, '2024-02-20', 'Single', 'Panggalaan'),
(41, 'Fish Farming', 'Matabang, Romblon', 'N/A', 'Matabang', '2024-175205000-7817', '2025-06-19 16:08:12', 'Antonio Luis', 'Lim', '', NULL, 42, '2024-02-20', 'Married', 'Matabang'),
(42, 'Fish Farming', 'Sabang, Romblon', 'N/A', 'Sabang', '2024-175205000-7818', '2025-06-19 16:08:12', 'Isabel Clara', 'Reyes', '', NULL, 43, '2024-02-20', 'Single', 'Sabang'),
(43, 'Fish Farming', 'Alad, Romblon', 'N/A', 'Alad', '2024-175205000-7819', '2025-06-19 16:08:12', 'Fernando Ray', 'Gomez', '', NULL, 44, '2024-02-20', 'Married', 'Alad'),
(44, 'Fish Farming', 'Lumbang, Romblon', 'N/A', 'Lumbang', '2024-175205000-7820', '2025-06-19 16:08:12', 'Lucia Marie', 'Santos', '', NULL, 45, '2024-02-20', 'Single', 'Lumbang'),
(45, 'Fish Farming', 'Poblacion, Romblon', 'N/A', 'Poblacion', '2024-175205000-7821', '2025-06-19 16:08:12', 'Victor Hugo', 'Dela Cruz', '', NULL, 46, '2024-02-20', 'Married', 'Poblacion'),
(46, 'Fish Farming', 'Cogon, Romblon', 'N/A', 'Cogon', '2024-175205000-7822', '2025-06-19 16:08:12', 'Rosa Linda', 'Torres', '', NULL, 47, '2024-02-20', 'Single', 'Cogon'),
(47, 'Fish Farming', 'Tubigan, Romblon', 'N/A', 'Tubigan', '2024-175205000-7823', '2025-06-19 16:08:12', 'Eduardo Paul', 'Lim', '', NULL, 48, '2024-02-20', 'Married', 'Tubigan'),
(48, 'Fish Farming', 'Malinao, Romblon', 'N/A', 'Malinao', '2024-175205000-7824', '2025-06-19 16:08:12', 'Teresa Ana', 'Reyes', '', NULL, 49, '2024-02-20', 'Single', 'Malinao'),
(49, 'Fish Farming', 'Tigbao, Romblon', 'N/A', 'Tigbao', '2024-175205000-7825', '2025-06-19 16:08:12', 'Ramon Jose', 'Gomez', '', NULL, 50, '2024-02-20', 'Married', 'Tigbao'),
(50, 'Fish Farming', 'Bunga, Romblon', 'N/A', 'Bunga', '2024-175205000-7826', '2025-06-19 16:08:12', 'Beatriz Rose', 'Santos', '', NULL, 51, '2024-02-20', 'Single', 'Bunga'),
(51, 'Fish Farming', 'Dalahican, Romblon', 'N/A', 'Dalahican', '2024-175205000-7827', '2025-06-19 16:08:12', 'Carlos Miguel', 'Dela Cruz', '', NULL, 52, '2024-02-20', 'Married', 'Dalahican'),
(52, 'Fish Farming', 'San Antonio, Romblon', 'N/A', 'San Antonio', '2024-175205000-7828', '2025-06-19 16:08:12', 'Juliana Faith', 'Torres', '', NULL, 53, '2024-02-20', 'Single', 'San Antonio'),
(53, 'Fish Farming', 'Bagumbayan, Romblon', 'N/A', 'Bagumbayan', '2024-175205000-7829', '2025-06-19 16:08:12', 'Leonardo Ray', 'Lim', '', NULL, 54, '2024-02-20', 'Married', 'Bagumbayan'),
(54, 'Fish Farming', 'Cahilim, Romblon', 'N/A', 'Cahilim', '2024-175205000-7830', '2025-06-19 16:08:12', 'Catalina Joy', 'Reyes', '', NULL, 55, '2024-02-20', 'Single', 'Cahilim'),
(55, 'Fish Farming', 'Ligaya, Romblon', 'N/A', 'Ligaya', '2024-175205000-7831', '2025-06-19 16:08:12', 'Rafael Luis', 'Gomez', '', NULL, 56, '2024-02-20', 'Married', 'Ligaya'),
(56, 'Fish Farming', 'Mahabang Parang, Romblon', 'N/A', 'Mahabang Parang', '2024-175205000-7832', '2025-06-19 16:08:12', 'Patricia Ana', 'Santos', '', NULL, 57, '2024-02-20', 'Single', 'Mahabang Parang'),
(57, 'Fish Farming', 'Tayuman, Romblon', 'N/A', 'Tayuman', '2024-175205000-7833', '2025-06-19 16:08:12', 'Gabriel Jose', 'Dela Cruz', '', NULL, 58, '2024-02-20', 'Married', 'Tayuman'),
(58, 'Fish Farming', 'Pinagtongulan, Romblon', 'N/A', 'Pinagtongulan', '2024-175205000-7834', '2025-06-19 16:08:12', 'Valeria Rose', 'Torres', '', NULL, 59, '2024-02-20', 'Single', 'Pinagtongulan'),
(59, 'Fish Farming', 'Balaybay, Romblon', 'N/A', 'Balaybay', '2024-175205000-7835', '2025-06-19 16:08:12', 'Emilio Paul', 'Lim', '', NULL, 60, '2024-02-20', 'Married', 'Balaybay'),
(60, 'Fish Farming', 'Malaya, Romblon', 'N/A', 'Malaya', '2024-175205000-7836', '2025-06-19 16:08:12', 'Esperanza Joy', 'Reyes', '', NULL, 61, '2024-02-20', 'Single', 'Malaya'),
(61, 'Fish Farming', 'San Roque, Romblon', 'N/A', 'San Roque', '2024-175205000-7837', '2025-06-19 16:08:12', 'Salvador Ray', 'Gomez', '', NULL, 62, '2024-02-20', 'Married', 'San Roque'),
(62, 'Fish Farming', 'Canubing, Romblon', 'N/A', 'Canubing', '2024-175205000-7838', '2025-06-19 16:08:12', 'Dolores Ana', 'Santos', '', NULL, 63, '2024-02-20', 'Single', 'Canubing'),
(63, 'Fish Farming', 'Tagumpay, Romblon', 'N/A', 'Tagumpay', '2024-175205000-7839', '2025-06-19 16:08:12', 'Hector Luis', 'Dela Cruz', '', NULL, 64, '2024-02-20', 'Married', 'Tagumpay'),
(64, 'lambat', 'San Isidro', 'aash100227@gmail.com', 'Puerto Galera', '01101101', '2025-06-19 16:25:57', 'Darylld', 'Cataquis', 'Tupas', NULL, 21, '2025-06-20', 'single', 'minolo'),
(65, 'Fish net', 'Parang', 'zyggizyg72@gmail.com', 'dhjdahaj', '01101101', '2025-06-26 15:29:25', 'Cleofe', '', 'Lyn', NULL, 99, '2025-06-26', 'Divorced', 'dhdslkjjis'),
(66, 'Fish net', 'San Isidro', 'aash100227@gmail.com', 'dhjdahaj', '01101101', '2025-06-27 14:23:33', 'Darylld', 'Cataquis', 'Tupas', NULL, 6, '2025-06-17', 'Single', 'dhdslkjjis'),
(67, 'Fish net', 'San Isidro', 'aash100227@gmail.com', 'dhjdahaj', '01101101', '2025-06-29 13:14:13', 'Darylld', 'Cataquis', 'Tupaz', NULL, 6, '2025-06-17', 'Single', 'dhdslkjjis');

-- --------------------------------------------------------

--
-- Table structure for table `fishing_activity`
--

DROP TABLE IF EXISTS `fishing_activity`;
CREATE TABLE IF NOT EXISTS `fishing_activity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `location` varchar(255) NOT NULL,
  `method` varchar(255) NOT NULL,
  `trip_duration` int GENERATED ALWAYS AS (timestampdiff(MINUTE,`start_time`,`end_time`)) STORED,
  `weather` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `fishing_activity`
--

INSERT INTO `fishing_activity` (`id`, `date`, `start_time`, `end_time`, `location`, `method`, `weather`, `created_at`, `user_id`) VALUES
(1, '2025-03-19', '19:59:00', '20:59:00', 'River Bend', 'Fishing Net', 'Rainy', '2025-03-08 11:00:05', NULL),
(2, '2025-06-20', '21:31:00', '21:33:00', 'River Bend', 'Fishing Net', 'Rainy', '2025-06-29 13:30:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `fish_species`
--

DROP TABLE IF EXISTS `fish_species`;
CREATE TABLE IF NOT EXISTS `fish_species` (
  `id` int NOT NULL AUTO_INCREMENT,
  `common_name` varchar(255) NOT NULL,
  `scientific_name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `habitat` text,
  `fishing_method` text,
  `regulations` text,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_fish_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `fish_species`
--

INSERT INTO `fish_species` (`id`, `common_name`, `scientific_name`, `description`, `habitat`, `fishing_method`, `regulations`, `image_url`, `created_at`, `user_id`) VALUES
(3, 'Isda', 'ndjasbd', 'sejhfa', 'snfkjabf', 'kjbfkjab', 'sjbfkjs', '/uploads/image-1743352522641.png', '2025-03-30 16:35:22', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `harvest_production`
--

DROP TABLE IF EXISTS `harvest_production`;
CREATE TABLE IF NOT EXISTS `harvest_production` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `fish_type` varchar(100) NOT NULL,
  `weight` decimal(10,2) NOT NULL,
  `unit` enum('kg','pcs') NOT NULL DEFAULT 'kg',
  `ownership` enum('Owned','Leased') NOT NULL DEFAULT 'Owned',
  `source_of_fry` varchar(255) NOT NULL DEFAULT 'Unknown',
  `market_destination` varchar(255) NOT NULL DEFAULT 'Unknown',
  `remarks` varchar(255) NOT NULL DEFAULT 'N/A',
  `location` varchar(255) NOT NULL,
  `date_harvested` date NOT NULL,
  `date_reported` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_harvest_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `harvest_production`
--

INSERT INTO `harvest_production` (`id`, `user_id`, `fish_type`, `weight`, `unit`, `ownership`, `source_of_fry`, `market_destination`, `remarks`, `location`, `date_harvested`, `date_reported`) VALUES
(1, 6, 'uhu', 444.00, 'kg', 'Owned', 'Unknown', 'Unknown', 'N/A', 'Romblon', '2025-04-29', '2025-05-01 15:38:00'),
(2, 6, 'uhu', 444.00, 'kg', 'Owned', 'Unknown', 'Unknown', 'N/A', 'Romblon', '2025-05-20', '2025-05-02 14:40:33'),
(3, 6, 'uhu', 123.00, 'kg', 'Leased', 'jhda', 'fsjflkj', 'jdklsajkl', '', '2025-06-22', '2025-06-22 13:32:08'),
(4, 6, 'dalag', 45.00, 'pcs', 'Leased', 'jhda', 'fsjflkj', 'jdklsajkl', '', '2025-06-22', '2025-06-29 13:31:03');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `password` varchar(191) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT '0',
  `verification_token` varchar(191) DEFAULT NULL,
  `reset_token` varchar(191) DEFAULT NULL,
  `reset_token_expiry` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `is_verified`, `verification_token`, `reset_token`, `reset_token_expiry`) VALUES
(2, 'Darylld Tupas', 'aash100227@gmail.com', '$2b$10$RGm0i5v0jFwG05CDp662buNhUP52soZGZ0iVVHnIM2Aack/t6Iy66', 'admin', 1, NULL, NULL, NULL),
(6, 'Cloyd', 'hakd857@gmail.com', '$2b$10$MX.yS4cra4AkGn8P4I1hAuxpwg5srXLIDVMv1j7QS2QgiGlvaOUy2', 'user', 1, NULL, NULL, NULL),
(7, 'sakit', 'zyggizyg72@gmail.com', '$2b$10$x.xkoLJo3xjJHd2QATOEyOZgtgbGOQqKuXJy6b9ZnWyKlmTqw/g9m', 'user', 1, NULL, NULL, NULL),
(8, 'Lyndsay Anne C. Cleofe', 'lyndsayannecleofe13@gmail.com', '$2b$10$ELwg1tUX/LZF8Ar4QKvE1.Nyf1BmAabS6wNcXd5G5qFOwJmu6/ZhW', 'user', 0, 'fabfcea7dc4b9a98eb1630bb83125ab4acb65f5ab9f286ebac174b374edf8f4f', NULL, NULL),
(9, 'Pitong Gatang', 'pitonggatang@gmail.com', '$2b$10$XSy1PvRkfHFRUMtRxDG6t.fh3Pi97spWnHyKvuZZNuwfrjzOrWX.K', 'user', 0, '5d0a007bc023d9e948a9dc4413d89dc2e80b998d1f589577b48e7621c1a564ff', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `violations`
--

DROP TABLE IF EXISTS `violations`;
CREATE TABLE IF NOT EXISTS `violations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `violation_type` varchar(255) NOT NULL,
  `details` text,
  `status` enum('Pending','Resolved','Reviewed') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `specific_violation` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `violations`
--

INSERT INTO `violations` (`id`, `user_id`, `violation_type`, `details`, `status`, `created_at`, `updated_at`, `specific_violation`, `location`) VALUES
(2, 6, 'dynamite fishing', 'kidjaoidja', 'Pending', '2025-04-05 10:20:13', '2025-04-05 10:20:13', '', ''),
(3, 6, 'dynamite fishing', 'njdoado', 'Resolved', '2025-04-05 10:20:21', '2025-04-05 11:29:34', '', ''),
(4, 2, 'lambating', 'djoasdo', 'Reviewed', '2025-04-05 10:21:56', '2025-06-15 08:18:28', '', ''),
(5, 6, 'dynamite fishing', 'jjioj', 'Reviewed', '2025-04-05 10:46:42', '2025-06-27 12:48:40', '', ''),
(6, 6, 'aadjakl', 'fjlasnlas', 'Pending', '2025-04-05 10:54:30', '2025-04-05 10:54:30', '', ''),
(7, 7, 'djaidji', 'dajid', 'Reviewed', '2025-04-05 11:26:24', '2025-04-05 11:26:30', '', ''),
(8, 6, 'djaidji', 'aASDSDS', 'Pending', '2025-04-07 07:11:43', '2025-04-07 07:11:43', '', ''),
(9, 6, 'dynamite fishing', 'dqwdwqqw', 'Pending', '2025-04-07 08:53:10', '2025-04-07 08:53:10', '', ''),
(10, 6, 'dynamite fishing', 'nakasira ng corals', 'Pending', '2025-06-15 08:26:35', '2025-06-15 08:26:35', 'Naghagis ng dinamita', 'Masipit'),
(11, 6, 'dynamite fishing', 'jhhjhk', 'Pending', '2025-06-27 12:49:52', '2025-06-27 12:49:52', 'Naghagis ng dinamita', 'Tabing Dagat'),
(12, 6, 'dynamite fishing', 'kll', 'Pending', '2025-06-27 13:18:01', '2025-06-27 13:18:01', 'Naghagis ng dinamita', 'Dyan'),
(13, 2, 'lambating', 'jdakd', 'Pending', '2025-06-27 13:33:47', '2025-06-27 13:33:47', 'umihi sabay nanlambat', 'dyan'),
(14, 2, 'dynamite fishing', 'destroying marine life at a high cost', 'Reviewed', '2025-06-29 13:23:51', '2025-06-29 13:24:01', 'nakasira ng corals', 'Sa patchoka');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `aquaculture_facilities`
--
ALTER TABLE `aquaculture_facilities`
  ADD CONSTRAINT `fk_aqua_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD CONSTRAINT `audit_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `catch_predictions`
--
ALTER TABLE `catch_predictions`
  ADD CONSTRAINT `fk_catch_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `catch_reports`
--
ALTER TABLE `catch_reports`
  ADD CONSTRAINT `catch_reports_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `climate_events`
--
ALTER TABLE `climate_events`
  ADD CONSTRAINT `fk_climate_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `climate_event_losses`
--
ALTER TABLE `climate_event_losses`
  ADD CONSTRAINT `climate_event_losses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `fisherfolk`
--
ALTER TABLE `fisherfolk`
  ADD CONSTRAINT `fk_fisherfolk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `fishing_activity`
--
ALTER TABLE `fishing_activity`
  ADD CONSTRAINT `fishing_activity_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `fish_species`
--
ALTER TABLE `fish_species`
  ADD CONSTRAINT `fk_fish_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `harvest_production`
--
ALTER TABLE `harvest_production`
  ADD CONSTRAINT `harvest_production_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id`) REFERENCES `violations` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `violations`
--
ALTER TABLE `violations`
  ADD CONSTRAINT `violations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

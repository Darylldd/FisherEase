-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 05, 2025 at 05:56 AM
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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `aquaculture_facilities`
--

INSERT INTO `aquaculture_facilities` (`id`, `facility_name`, `location`, `species`, `capacity`, `owner`, `contact_info`, `created_at`) VALUES
(1, 'Cloyd Pond', 'Romblon', 'koi', 'Puerto Galera', 'cloyd fesalbon', '898989989', '2025-02-17 14:26:21');

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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=163 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(125, 4, 'zyggizyg72@gmail.com', 'Logged in', '2025-03-16 16:55:55'),
(126, 4, 'zyggizyg72@gmail.com', 'Logged out', '2025-03-16 16:56:01'),
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
(162, 2, 'aash100227@gmail.com', 'Logged in', '2025-03-30 16:47:28');

-- --------------------------------------------------------

--
-- Table structure for table `catch_predictions`
--

DROP TABLE IF EXISTS `catch_predictions`;
CREATE TABLE IF NOT EXISTS `catch_predictions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `species` varchar(255) DEFAULT NULL,
  `predicted_best_time` datetime DEFAULT NULL,
  `predicted_quantity` decimal(10,2) NOT NULL,
  `confidence` float DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `catch_predictions`
--

INSERT INTO `catch_predictions` (`id`, `species`, `predicted_best_time`, `predicted_quantity`, `confidence`, `date`, `last_updated`, `created_at`) VALUES
(11, 'Lapu-Lapu (Grouper)', '2025-03-11 00:00:00', 0.00, 0.9, '2025-03-02 16:47:44', '2025-03-02 16:47:44', '2025-03-02 16:47:44'),
(10, 'Sapsap (Slipmouth)', '2025-03-20 00:00:00', 0.00, 0.9, '2025-03-02 12:07:11', '2025-03-02 12:07:11', '2025-03-02 12:07:11'),
(9, 'Danggit (Rabbitfish)', '2025-03-25 00:00:00', 0.00, 0.9, '2025-03-02 11:59:56', '2025-03-02 11:59:56', '2025-03-02 11:59:56'),
(12, 'Talakitok (Giant Trevally)', '2025-03-11 00:00:00', 0.00, 0.9, '2025-03-02 17:35:40', '2025-03-02 17:35:40', '2025-03-02 17:35:40'),
(13, 'Alumahan (Indian Mackerel)', '2025-03-14 00:00:00', 0.00, 0.9, '2025-03-02 17:37:18', '2025-03-02 17:37:18', '2025-03-02 17:37:18'),
(14, 'Tilapia (Nile Tilapia, Red Tilapia, Blue Tilapia)', '2025-03-11 00:00:00', 0.00, 0.9, '2025-03-03 07:15:52', '2025-03-03 07:15:52', '2025-03-03 07:15:52'),
(15, 'Bakoko (Black Pomfret)', '2025-03-13 00:00:00', 0.00, 0.9, '2025-03-03 07:54:13', '2025-03-03 07:54:13', '2025-03-03 07:54:13'),
(16, 'Lapu-Lapu (Grouper)', '2025-03-15 00:00:00', 0.00, 0.9, '2025-03-08 06:55:26', '2025-03-08 06:55:26', '2025-03-08 06:55:26'),
(17, 'Sapsap (Slipmouth)', '2025-03-27 00:00:00', 0.00, 0.9, '2025-03-08 07:00:37', '2025-03-08 07:00:37', '2025-03-08 07:00:37'),
(18, 'Lapu-Lapu (Grouper)', '2025-03-18 00:00:00', 0.00, 0.9, '2025-03-08 08:00:12', '2025-03-08 08:00:12', '2025-03-08 08:00:12'),
(19, 'Lapu-Lapu (Grouper)', '2025-04-04 00:00:00', 0.00, 0.9, '2025-03-08 08:49:40', '2025-03-08 08:49:40', '2025-03-08 08:49:40'),
(20, 'Talakitok (Giant Trevally)', '2025-03-24 00:00:00', 0.00, 0.9, '2025-03-16 16:50:57', '2025-03-16 16:50:57', '2025-03-16 16:50:57'),
(21, 'Tamban (Sardine)', '2025-03-28 00:00:00', 0.00, 0.9, '2025-03-16 16:57:17', '2025-03-16 16:57:17', '2025-03-16 16:57:17');

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
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `catch_reports`
--

INSERT INTO `catch_reports` (`id`, `user_id`, `species`, `quantity`, `location`, `status`, `date`, `method_of_fishing`) VALUES
(33, 7, 'Tamban (Sardine)', 24, 'Fish Pond ng MinSU', 'Under Review', '2025-03-21 00:00:00', 'Longline Fishing'),
(32, 6, 'Talakitok (Giant Trevally)', 23, 'River Bend', 'Under Review', '2025-03-17 00:00:00', 'Longline Fishing'),
(31, 6, 'Lapu-Lapu (Grouper)', 12, 'Fish Pond ng MinSU', 'Under Review', '2025-03-28 00:00:00', 'Spearfishing');

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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `climate_events`
--

INSERT INTO `climate_events` (`id`, `event_name`, `event_type`, `event_date`, `severity`, `estimated_damage`, `affected_area`, `created_at`) VALUES
(1, 'Unknown Weather Event', '', '2025-03-16', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:31:48'),
(2, 'Unknown Weather Event', '', '2025-03-17', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:31:48'),
(3, 'Unknown Weather Event', '', '2025-03-18', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:31:48'),
(4, 'Unknown Weather Event', '', '2025-03-19', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:31:48'),
(5, 'Unknown Weather Event', '', '2025-03-20', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:31:48'),
(6, 'Unknown Weather Event', '', '2025-03-21', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:31:48'),
(7, 'Unknown Weather Event', '', '2025-03-22', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:31:48'),
(8, 'Unknown Weather Event', '', '2025-03-16', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:32:00'),
(9, 'Unknown Weather Event', '', '2025-03-17', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:32:00'),
(10, 'Unknown Weather Event', '', '2025-03-18', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:32:00'),
(11, 'Unknown Weather Event', '', '2025-03-19', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:32:00'),
(12, 'Unknown Weather Event', '', '2025-03-20', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:32:00'),
(13, 'Unknown Weather Event', '', '2025-03-21', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:32:00'),
(14, 'Unknown Weather Event', '', '2025-03-22', 'Low', 50000.00, 'Calapan, Philippines', '2025-03-15 16:32:00'),
(15, 'Partly Cloudy', '', '2025-03-16', '', 50000.00, 'Calapan, Philippines', '2025-03-15 16:41:57'),
(16, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:41:57'),
(17, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:41:57'),
(18, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:41:57'),
(19, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:41:57'),
(20, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:41:57'),
(21, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:41:57'),
(22, 'Partly Cloudy', '', '2025-03-16', '', 50000.00, 'Calapan, Philippines', '2025-03-15 16:42:26'),
(23, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:42:26'),
(24, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:42:26'),
(25, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:42:26'),
(26, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:42:26'),
(27, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:42:26'),
(28, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:42:26'),
(29, 'Partly Cloudy', '', '2025-03-16', '', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:42'),
(30, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43'),
(31, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43'),
(32, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43'),
(33, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43'),
(34, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43'),
(35, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43'),
(36, 'Partly Cloudy', '', '2025-03-16', '', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43'),
(37, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43'),
(38, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43'),
(39, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43'),
(40, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43'),
(41, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43'),
(42, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43'),
(43, 'Partly Cloudy', '', '2025-03-16', '', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43'),
(44, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43'),
(45, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43'),
(46, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43'),
(47, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43'),
(48, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43'),
(49, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:43'),
(50, 'Partly Cloudy', '', '2025-03-16', '', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:53'),
(51, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:53'),
(52, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:53'),
(53, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:53'),
(54, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:53'),
(55, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:53'),
(56, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:49:53'),
(57, 'Partly Cloudy', '', '2025-03-16', 'Low', 0.00, 'Calapan, Philippines', '2025-03-15 16:58:50'),
(58, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:58:50'),
(59, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:58:50'),
(60, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:58:50'),
(61, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:58:50'),
(62, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:58:50'),
(63, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 16:58:50'),
(64, 'Partly Cloudy', '', '2025-03-16', 'Low', 0.00, 'Calapan, Philippines', '2025-03-15 17:08:59'),
(65, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:08:59'),
(66, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:08:59'),
(67, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:08:59'),
(68, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:08:59'),
(69, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:08:59'),
(70, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:08:59'),
(71, 'Partly Cloudy', '', '2025-03-16', 'Low', 0.00, 'Calapan, Philippines', '2025-03-15 17:15:36'),
(72, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:15:36'),
(73, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:15:36'),
(74, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:15:36'),
(75, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:15:36'),
(76, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:15:36'),
(77, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:15:36'),
(78, 'Partly Cloudy', '', '2025-03-16', 'Low', 0.00, 'Calapan, Philippines', '2025-03-15 17:19:22'),
(79, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:19:22'),
(80, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:19:22'),
(81, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:19:22'),
(82, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:19:22'),
(83, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:19:22'),
(84, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:19:22'),
(85, 'Partly Cloudy', '', '2025-03-16', 'Low', 0.00, 'Calapan, Philippines', '2025-03-15 17:21:51'),
(86, 'Slight Rain Showers', 'Storm Surge', '2025-03-17', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:21:51'),
(87, 'Slight Rain Showers', 'Storm Surge', '2025-03-18', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:21:51'),
(88, 'Slight Rain Showers', 'Storm Surge', '2025-03-19', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:21:51'),
(89, 'Slight Rain Showers', 'Storm Surge', '2025-03-20', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:21:51'),
(90, 'Slight Rain Showers', 'Storm Surge', '2025-03-21', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:21:51'),
(91, 'Slight Rain Showers', 'Storm Surge', '2025-03-22', 'Moderate', 50000.00, 'Calapan, Philippines', '2025-03-15 17:21:51');

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
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `fisherfolk`
--

INSERT INTO `fisherfolk` (`id`, `fishing_methods`, `address`, `contact_info`, `fishing_zone`, `license_number`, `created_at`, `first_name`, `middle_name`, `last_name`) VALUES
(1, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 13:55:00', '', NULL, ''),
(2, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 13:55:44', '', NULL, ''),
(3, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 13:56:17', '', NULL, ''),
(4, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 13:56:56', '', NULL, ''),
(5, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 13:57:04', '', NULL, ''),
(6, 'Fish net', '', '', 'Puerto Galera', '12345', '2025-02-17 13:57:11', '', NULL, ''),
(7, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:20:16', '', NULL, ''),
(8, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:21:37', '', NULL, ''),
(9, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:28:15', '', NULL, ''),
(10, 'Fish net', '', '', 'Puerto Galera', '12345', '2025-02-17 14:28:31', '', NULL, ''),
(11, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:32:41', '', NULL, ''),
(12, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:34:20', '', NULL, ''),
(13, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:35:27', '', NULL, ''),
(14, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:37:40', '', NULL, ''),
(15, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:38:21', '', NULL, ''),
(16, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:38:51', '', NULL, ''),
(17, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:38:59', '', NULL, ''),
(18, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:42:48', '', NULL, ''),
(19, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:54:14', '', NULL, ''),
(20, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 14:56:08', '', NULL, ''),
(21, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 15:13:13', '', NULL, ''),
(22, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 15:26:31', '', NULL, ''),
(23, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-17 15:29:30', '', NULL, ''),
(24, 'Fish Farming', '', '', 'Romblon', '01', '2025-02-23 07:29:53', '', NULL, ''),
(25, 'Fish net', '', '', 'Fish Pond', '01101101', '2025-02-24 07:35:27', '', NULL, ''),
(26, 'Fish net', 'San Isidro', 'aash100227@gmail.com', 'Puerto Galera', '01101101', '2025-03-02 12:31:50', 'Darylld', 'Cataquis', 'Tupas');

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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `fishing_activity`
--

INSERT INTO `fishing_activity` (`id`, `date`, `start_time`, `end_time`, `location`, `method`, `weather`, `created_at`) VALUES
(1, '2025-03-19', '19:59:00', '20:59:00', 'River Bend', 'Fishing Net', 'Rainy', '2025-03-08 11:00:05');

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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `fish_species`
--

INSERT INTO `fish_species` (`id`, `common_name`, `scientific_name`, `description`, `habitat`, `fishing_method`, `regulations`, `image_url`, `created_at`) VALUES
(3, 'Isda', 'ndjasbd', 'sejhfa', 'snfkjabf', 'kjbfkjab', 'sjbfkjs', '/uploads/image-1743352522641.png', '2025-03-30 16:35:22');

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
  `location` varchar(255) NOT NULL,
  `date_harvested` date NOT NULL,
  `date_reported` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `is_verified`, `verification_token`, `reset_token`, `reset_token_expiry`) VALUES
(2, 'Darylld Tupas', 'aash100227@gmail.com', '$2b$10$RGm0i5v0jFwG05CDp662buNhUP52soZGZ0iVVHnIM2Aack/t6Iy66', 'admin', 1, NULL, NULL, NULL),
(7, 'sakit', 'zyggizyg72@gmail.com', '$2b$10$x.xkoLJo3xjJHd2QATOEyOZgtgbGOQqKuXJy6b9ZnWyKlmTqw/g9m', 'user', 1, NULL, NULL, NULL),
(6, 'Cloyd', 'hakd857@gmail.com', '$2b$10$MX.yS4cra4AkGn8P4I1hAuxpwg5srXLIDVMv1j7QS2QgiGlvaOUy2', 'user', 1, NULL, NULL, NULL);

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
  `status` enum('Pending','Resolved') DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `violations`
--

INSERT INTO `violations` (`id`, `user_id`, `violation_type`, `details`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'dynamite fishing', 'corals destroyed', 'Pending', '2025-03-08 14:56:24', '2025-03-08 14:56:51');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

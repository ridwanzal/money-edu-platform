-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 21, 2025 at 11:54 PM
-- Server version: 8.0.39
-- PHP Version: 8.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_payungmadinah`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `id` int NOT NULL,
  `credential` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `role` int NOT NULL,
  `created_at` datetime NOT NULL,
  `udpated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`id`, `credential`, `password`, `role`, `created_at`, `udpated_at`) VALUES
(1, 'admin', '$2a$12$j/iA8EdMvGnDBRUFeyHQUuaQjivrHXzqDqzpZNySGMjbB.m.PQ2Um', 1, '2023-01-05 04:06:03', '2023-01-05 04:06:03');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int NOT NULL,
  `author_id` int NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `tag` text NOT NULL,
  `thumbnail` text NOT NULL,
  `slug` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int NOT NULL,
  `service_id` varchar(1) NOT NULL,
  `nama_lengkap` varchar(128) NOT NULL,
  `phone` text NOT NULL,
  `email` varchar(128) NOT NULL,
  `budget_est` varchar(1) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('6faNYDll1cwaQf2uggTI1JfF7O6eCkVD', 1747816209, '{\"cookie\":{\"originalMaxAge\":1800000,\"expires\":\"2025-05-21T08:16:54.534Z\",\"httpOnly\":true,\"path\":\"/\"},\"loggedin\":true,\"credential\":\"admin\",\"messageAuth\":\"Login Success\"}'),
('_VEc_Ne7-Vb28epyHlzZCaA-yV1R9lM-', 1747815315, '{\"cookie\":{\"originalMaxAge\":1800000,\"expires\":\"2025-05-21T07:45:35.640Z\",\"httpOnly\":true,\"path\":\"/\"},\"loggedin\":true,\"credential\":\"admin\",\"messageAuth\":\"Login Success\"}'),
('iC2wSAE1vgSkyImZMgqZcSgYm6sx7P1f', 1747813233, '{\"cookie\":{\"originalMaxAge\":1800000,\"expires\":\"2025-05-21T07:10:40.765Z\",\"httpOnly\":true,\"path\":\"/\"},\"loggedin\":true,\"credential\":\"admin\",\"messageAuth\":\"Login Success\"}');

-- --------------------------------------------------------

--
-- Table structure for table `uploads`
--

CREATE TABLE `uploads` (
  `id` int NOT NULL,
  `filename` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `uploads`
--

INSERT INTO `uploads` (`id`, `filename`, `created_at`) VALUES
(5, '1747807515413.png', '2025-05-21 06:05:15'),
(6, '1747807519326.png', '2025-05-21 06:05:19'),
(7, '1747813693768.jpg', '2025-05-21 07:48:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `uploads`
--
ALTER TABLE `uploads`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1977;

--
-- AUTO_INCREMENT for table `uploads`
--
ALTER TABLE `uploads`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

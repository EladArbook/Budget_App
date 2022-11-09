-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2022 at 07:39 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wallet`
--

-- --------------------------------------------------------

--
-- Table structure for table `incomes`
--

CREATE TABLE `incomes` (
  `incomeId` int(10) NOT NULL,
  `amount` int(10) NOT NULL,
  `description` text NOT NULL,
  `category` int(10) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `incomes`
--

INSERT INTO `incomes` (`incomeId`, `amount`, `description`, `category`, `date`) VALUES
(63, 6800, 'march', 1, '2022-11-09'),
(64, 600, 'b-day', 2, '2022-11-09'),
(65, 7100, 'april', 3, '2022-11-09'),
(69, 7200, 'may', 1, '2022-11-09'),
(73, 1, '123', 3, '2022-11-09');

-- --------------------------------------------------------

--
-- Table structure for table `income_categories`
--

CREATE TABLE `income_categories` (
  `category_id` int(10) NOT NULL,
  `category_name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `income_categories`
--

INSERT INTO `income_categories` (`category_id`, `category_name`) VALUES
(1, 'salary'),
(2, 'gift'),
(3, 'refund'),
(4, 'other');

-- --------------------------------------------------------

--
-- Table structure for table `outcomes`
--

CREATE TABLE `outcomes` (
  `outcomeId` int(10) NOT NULL,
  `amount` int(10) NOT NULL,
  `description` text NOT NULL,
  `category` int(10) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `outcomes`
--

INSERT INTO `outcomes` (`outcomeId`, `amount`, `description`, `category`, `date`) VALUES
(0, 9999, 'patched', 1, '2022-10-28'),
(1, 1500, 'putted', 2, '2022-10-28');

-- --------------------------------------------------------

--
-- Table structure for table `outcome_categories`
--

CREATE TABLE `outcome_categories` (
  `category_id` int(10) NOT NULL,
  `category_name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `outcome_categories`
--

INSERT INTO `outcome_categories` (`category_id`, `category_name`) VALUES
(1, 'food'),
(2, 'clothes'),
(3, 'transports'),
(4, 'rent'),
(5, 'entertain'),
(6, 'other');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `incomes`
--
ALTER TABLE `incomes`
  ADD PRIMARY KEY (`incomeId`),
  ADD KEY `category` (`category`);

--
-- Indexes for table `income_categories`
--
ALTER TABLE `income_categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `outcomes`
--
ALTER TABLE `outcomes`
  ADD PRIMARY KEY (`outcomeId`),
  ADD KEY `category` (`category`);

--
-- Indexes for table `outcome_categories`
--
ALTER TABLE `outcome_categories`
  ADD PRIMARY KEY (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `incomes`
--
ALTER TABLE `incomes`
  MODIFY `incomeId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `incomes`
--
ALTER TABLE `incomes`
  ADD CONSTRAINT `incomes_ibfk_1` FOREIGN KEY (`category`) REFERENCES `income_categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `outcomes`
--
ALTER TABLE `outcomes`
  ADD CONSTRAINT `outcomes_ibfk_1` FOREIGN KEY (`category`) REFERENCES `outcome_categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

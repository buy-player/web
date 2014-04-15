-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-11-2013 a las 16:38:14
-- Versión del servidor: 5.6.11
-- Versión de PHP: 5.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `buyplayersoccer`
--
CREATE DATABASE IF NOT EXISTS `buyplayersoccer` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `buyplayersoccer`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE IF NOT EXISTS `contacto` (
  `id` int(11) NOT NULL,
  `id_jugador` int(11) NOT NULL,
  `id_cazatalento` int(11) NOT NULL,
  `estado_contacto_id` int(11) NOT NULL,
  `fecha_contacto` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_contacto_Usuario1_idx` (`id_jugador`),
  KEY `fk_contacto_Usuario2_idx` (`id_cazatalento`),
  KEY `fk_contacto_estado_contacto1_idx` (`estado_contacto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_contacto`
--

CREATE TABLE IF NOT EXISTS `estado_contacto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `estado_contacto`
--

INSERT INTO `estado_contacto` (`id`, `nombre`) VALUES
(1, 'INGRESADO'),
(2, 'ESPERA'),
(3, 'RECHAZADO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticia`
--

CREATE TABLE IF NOT EXISTS `noticia` (
  `id` int(11) NOT NULL,
  `fecha_publicacion` date NOT NULL,
  `titulo` varchar(50) CHARACTER SET latin1 NOT NULL,
  `descripcion` varchar(1000) CHARACTER SET latin1 NOT NULL,
  `imagen` varchar(300) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `noticia`
--

INSERT INTO `noticia` (`id`, `fecha_publicacion`, `titulo`, `descripcion`, `imagen`) VALUES
(1, '2013-10-30', 'ALERTA ATENCION', 'Estamos programando para salir adelante', 'http://jjj.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patrocinador`
--

CREATE TABLE IF NOT EXISTS `patrocinador` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) CHARACTER SET latin1 NOT NULL,
  `imagen` varchar(300) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `patrocinador`
--

INSERT INTO `patrocinador` (`id`, `nombre`, `imagen`) VALUES
(1, 'Adidas', 'http://adidas.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuairio`
--

CREATE TABLE IF NOT EXISTS `tipo_usuairio` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_usuairio`
--

INSERT INTO `tipo_usuairio` (`id`, `nombre`) VALUES
(1, 'ADMIN'),
(2, 'CAZATALENTOS'),
(3, 'JUGADOR');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) CHARACTER SET latin1 NOT NULL,
  `apellidos` varchar(200) CHARACTER SET latin1 NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `email` varchar(45) NOT NULL,
  `telefono` int(11) NOT NULL,
  `celular` int(15) DEFAULT NULL,
  `imagen` varchar(300) CHARACTER SET latin1 DEFAULT NULL,
  `password` varchar(300) CHARACTER SET latin1 NOT NULL,
  `tipo` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `password_recuperacion` varchar(300) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_Usuario_tipo_usuairio_idx` (`tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellidos`, `fecha_nacimiento`, `email`, `telefono`, `celular`, `imagen`, `password`, `tipo`, `estado`, `password_recuperacion`) VALUES
(1, 'ADMIN', 'ADMIN', '2013-10-28', 'ROCHYAGUILAR@GMAIL.COM', 8876248, 2147483647, NULL, '12345', 1, 1, '0000'),
(2, 'Cristian ', 'Perez', '2010-05-04', 'perea@gmail.com', 8765432, 312290989, 'j.jpg', '123456', 3, 0, '123456'),
(3, 'Cochyas', 'Restrepo', '2000-10-01', 'rochy@gmail.com', 8787828, 310909897, 'c.jpg', '123456', 2, 0, '123456'),
(4, 'fernando ', 'torres', '2013-11-05', 'torres@gmail.com', 8598422, 2147483647, 'j.jpg', '123456', 3, 0, '123456'),
(5, 'radamel', 'falcao', '2013-11-01', 'rada@gmail.com', 9879797, 2147483647, 'j.jpg', '123456', 3, 0, '123456'),
(6, 'fernando ', 'torres', '2013-11-05', 'niñotorres@gmail.com', 8598422, 312983822, 'j.jpg', '123456', 3, 0, '123456'),
(7, 'dorlan', 'pabon', '2013-11-01', 'pabon@gmail.com', 9879797, 312299999, 'j.jpg', '123456', 3, 0, '123456'),
(8, 'andres', 'iniesta', '2013-11-01', 'iniesta@gmail.com', 9879797, 312299999, 'j.jpg', '123456', 3, 0, '123456'),
(9, 'juan guillermo ', 'cuadrado', '2013-11-01', 'cuadrado@gmail.com', 9879797, 312299999, 'j.jpg', '123456', 3, 0, '123456'),
(10, 'diego', 'costa', '2013-11-01', 'costa@gmail.com', 9879797, 312299999, 'j.jpg', '123456', 3, 0, '123456'),
(11, 'juan alberto', 'yepes', '2013-11-01', 'yepes@gmail.com', 9879797, 312299999, 'j.jpg', '123456', 3, 0, '123456'),
(12, 'david', 'ospina', '2013-11-01', 'ospina@gmail.com', 9879797, 312299999, 'j.jpg', '123456', 3, 0, '123456'),
(13, 'David', 'villa', '2013-11-01', 'villa@gmail.com', 9879797, 312299999, 'j.jpg', '123456', 3, 0, '123456'),
(14, 'carlos', 'valderrama', '2013-11-01', 'valderrama@gmail.com', 9879797, 312299999, 'j.jpg', '123456', 3, 0, '123456'),
(15, 'fernando ', 'torres', '2013-11-05', 'torres_caza@gmail.com', 8598422, 312983822, 'j.jpg', '123456', 2, 0, '123456'),
(16, 'dorlan', 'pabon', '2013-11-01', 'pabon_caza@gmail.com', 9879797, 312299999, 'j.jpg', '123456', 2, 0, '123456'),
(17, 'andres', 'iniesta', '2013-11-01', 'iniesta_caza@gmail.com', 9879797, 312299999, 'j.jpg', '123456', 2, 0, '123456'),
(18, 'juan guillermo ', 'cuadrado', '2013-11-01', 'cuadrado_caza@gmail.com', 9879797, 312299999, 'j.jpg', '123456', 2, 0, '123456'),
(19, 'diego', 'costa', '2013-11-01', 'costa_caza@gmail.com', 9879797, 312299999, 'j.jpg', '123456', 2, 0, '123456'),
(20, 'juan alberto', 'yepes', '2013-11-01', 'yepes_caza@gmail.com', 9879797, 312299999, 'j.jpg', '123456', 2, 0, '123456'),
(21, 'david', 'ospina', '2013-11-01', 'ospi_caza@gmail.com', 9879797, 312299999, 'j.jpg', '123456', 2, 0, '123456'),
(22, 'David', 'villa', '2013-11-01', 'villa_caza@gmail.com', 9879797, 312299999, 'j.jpg', '123456', 2, 0, '123456'),
(23, 'carlos', 'valderrama', '2013-11-01', 'pibe_caza@gmail.com', 9879797, 312299999, 'j.jpg', '123456', 2, 0, '123456');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_jugador`
--

CREATE TABLE IF NOT EXISTS `usuario_jugador` (
  `id` int(11) NOT NULL,
  `peso` float NOT NULL,
  `estatura` float NOT NULL,
  `video` varchar(300) CHARACTER SET latin1 NOT NULL,
  `puntuacion_promedio` float DEFAULT NULL,
  `cantidad_puntuacion` int(11) DEFAULT NULL,
  `Usuario_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Usuario_Jugador_Usuario1_idx` (`Usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD CONSTRAINT `fk_contacto_estado_contacto1` FOREIGN KEY (`estado_contacto_id`) REFERENCES `estado_contacto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_contacto_Usuario1` FOREIGN KEY (`id_jugador`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_contacto_Usuario2` FOREIGN KEY (`id_cazatalento`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_Usuario_tipo_usuairio` FOREIGN KEY (`tipo`) REFERENCES `tipo_usuairio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario_jugador`
--
ALTER TABLE `usuario_jugador`
  ADD CONSTRAINT `fk_Usuario_Jugador_Usuario1` FOREIGN KEY (`Usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

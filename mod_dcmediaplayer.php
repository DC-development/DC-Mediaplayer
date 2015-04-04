<?php

/**
 * DC-Mediaplayer Module Entry Point
 * 
 * @package    DCDevelopment.Joomla3.Modules
 * @subpackage Modules
 * @license    GNU/GPL, see LICENSE.php
 * @link       http://www.dc-development.de
 * mod_dcmediaplayer is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */

defined('_JEXEC') or die;

require_once dirname(__FILE__) . '/helper.php';

$files = ModDCMediaPlayerHelper::getFiles($params);

require JModuleHelper::getLayoutPath('mod_dcmediaplayer' , 'default');
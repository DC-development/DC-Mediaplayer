<?php

/**
 * DC-Mediaplayer Helper
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

class ModDCMediaPlayerHelper
{
    /**
     * Retrieves the hello message
     *
     * @param   array  $params An object containing the module parameters
     *
     * @access public
     */

    public static function getFiles($params)
    {
        jimport( 'joomla.filesystem.folder' );
        $searchPath = "./".$params->get('folder', 'images/dc-mediaplayer');
        $files = JFolder::files($searchPath,'.mp3');
        
        return $files;
    }
}
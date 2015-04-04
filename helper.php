<?php

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
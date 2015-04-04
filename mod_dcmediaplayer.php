<?php

defined('_JEXEC') or die;

require_once dirname(__FILE__) . '/helper.php';

$files = ModDCMediaPlayerHelper::getFiles($params);

require JModuleHelper::getLayoutPath('mod_dcmediaplayer' , 'default');
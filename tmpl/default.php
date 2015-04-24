<?php
/**
 * DC-Mediaplayer Default Template
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

defined('_JEXEC') or die; ?>

<div id="dcMediaPlayer" class="default">
    <h2 id='trackListTitle'><?php echo $params->get('title', 'DC-Mediaplayer'); ?></h2>

    <ul id='trackList'>
        <?php
        foreach($files as $key=>$value){
            
            $title = str_replace("_"," ",$value);
            $title = str_replace("-"," ",$title);
            $title = str_replace(".mp3"," ",$title);
            
            echo "<li class='tracklist-item'>".$title."<audio id='track_".$key."'>".
			"<source src='".$params->get('folder', 'images/dc-mediaplayer')."/".$value."' type='audio/mpeg'></source>".
			"</audio></li>";
        }
        ?>
    </ul>

    <div class="controls">
        <div class="player-search-bar">
            <div class="load-bar">
                <div class="player-bar">
                    <div class="player-head"><i class="fa fa-arrows-h"></i></div>
                </div>
            </div>
        </div>
        <button class="player-control" id="btnPrevious">
            <i></i>
        </button>
        <button class="player-control hidden" id="btnPause">
            <i></i>
        </button>
        <button class="player-control"  id="btnPlay">
            <i></i>
        </button>
        <button class="player-control" id="btnNext">
            <i></i>
        </button>
        
        <button class="player-control" id="btnVolumeUp">
            <i></i>
        </button>
        <button class="player-control" id="btnVolumeDown">
            <i></i>
        </button>
    </div>
    <div class="disclaimer"><a href="http://www.dc-development.de" target="_blank">&copy; By DC-Development</a></div>
</div>
<?php

JHtml::_('jquery.framework');

$document = JFactory::getDocument();
$document->addStyleSheet("./modules/mod_dcmediaplayer/stylesheets/themes/".$params->get('theme'),'text/css',"screen");
$document->addScript("./modules/mod_dcmediaplayer/js/player.js");

?>

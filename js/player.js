jQuery( document ).ready(function($) {

    var dcMediaPlayer = dcMediaPlayer || {};

    dcMediaPlayer = {
        "activeElement": {},
        "currentTime": 0,
        "loading": false,
        "playing": false,
        "entryCount": $(".tracklist-item").length-1,
        "activeElementId": function(){
            id = this.activeElement.attr("id").split('_')[1];
            var ret = parseInt(id);
            return ret;
        }
    }

    dcMediaPlayer.setTrack = function(e) {
        var newElement = $("#track_"+e);
        this.activeElement = newElement;
        $(".tracklist-item").removeClass("active");
        newElement.parents("li").addClass("active");
        newElement.trigger('play');
        dcMediaPlayer.playing = true;
        $("#btnPause").removeClass("hidden");
        $("#btnPlay").addClass("hidden");
    }

    dcMediaPlayer.skip = function(e) {
        var currentId = this.activeElementId();
        var listCount = this.entryCount;
        var newId = currentId+e;
        this.activeElement.trigger("pause");
        if(newId < 0){
            var newId = listCount;
            this.setTrack(newId);
        }
        else if(newId > listCount){
            var newId = 0;
            this.setTrack(newId);
        }else {
            this.setTrack(newId);
        }
    }
 
    $(".tracklist-item").click(function(){
        $(".tracklist-item").removeClass("active");
        $(this).addClass("active");
        var currentElement = $(this).find("audio");
        currentElement.trigger('play');
        dcMediaPlayer.activeElement = currentElement;
        $("#btnPause").removeClass("hidden");
        $("#btnPlay").addClass("hidden");
    });
    
    var player = player || {}
    player.volume = 10;

    $("#btnPlay").click(function(e){
        e.preventDefault();
        dcMediaPlayer.activeElement.trigger('play');
        $(this).addClass("hidden");
        $("#btnPause").removeClass("hidden");
    });

    $("#btnPrevious").click(function(e){
        e.preventDefault();
        dcMediaPlayer.skip(-1);
    });

    $("#btnNext").click(function(e){
        e.preventDefault();
        dcMediaPlayer.skip(1);
    });

    $("#btnPause").click(function(e){
        e.preventDefault();
        dcMediaPlayer.activeElement.trigger('pause');
        dcMediaPlayer.playing = false;
        $(this).addClass("hidden");
        $("#btnPlay").removeClass("hidden");
    });

    $("#btnVolumeUp").click(function(e){
        e.preventDefault();
        if(player.volume<10)player.volume += 1;
        $(".tracklist-item").find('audio').prop('volume', player.volume/10);
    });

    $("#btnVolumeDown").click(function(e){
        e.preventDefault();
        if(player.volume>0)player.volume -= 1;
        $(".tracklist-item").find('audio').prop('volume', player.volume/10);
    });

    window.setInterval(function(){
        if(dcMediaPlayer.activeElement.prop){
            var currentTime = dcMediaPlayer.activeElement.prop("currentTime");
            var duration = dcMediaPlayer.activeElement.prop("duration");
            $(".player-bar").css("width", currentTime/duration*100+"%");
            $(".load-bar").css("width", dcMediaPlayer.activeElement.prop("buffered").end("buffered")/duration*100+"%");
        }
    }, 250);

    document.addEventListener('play', function(e){
        var audios = document.getElementsByTagName('audio');
        for(var i = 0, len = audios.length; i < len;i++){
            if(audios[i] != e.target){
                audios[i].pause();
                audios[i].currentTime=0;
            }
        }
    }, true);

    dcMediaPlayer.setTrack(0);
    $("#btnPause").addClass("hidden");
    $("#btnPlay").removeClass("hidden");
    dcMediaPlayer.activeElement.trigger('pause');
    // dcMediaPlayer.init();

});
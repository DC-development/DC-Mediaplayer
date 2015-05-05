jQuery( document ).ready(function($) {

    var dcMediaPlayer = dcMediaPlayer || {};

    dcMediaPlayer = {
        "activeElement": {},
        "currentTime": 0,
        "loading": false,
        "volume" : 10,
        "playing": false,
        "randomPlayback" : false,
        "playedRandomly" : [],
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
        if(dcMediaPlayer.randomPlayback===true){
            var newId = dcMediaPlayer.shuffle();
        }else{
            var newId = currentId+e;
        }
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
    
    dcMediaPlayer.shuffle = function() {
        var trackCount = dcMediaPlayer.entryCount+1;
        var newRandom = dcMediaPlayer.activeElementId();

        if($.inArray(newRandom, dcMediaPlayer.playedRandomly)<0){
            dcMediaPlayer.playedRandomly.push(newRandom);
        }
        while($.inArray(newRandom, dcMediaPlayer.playedRandomly)>-1){
            var newRandom = Math.floor((Math.random() * trackCount));
        }
        if(dcMediaPlayer.playedRandomly.length<dcMediaPlayer.entryCount){
            dcMediaPlayer.playedRandomly.push(newRandom); 
        }else{
            dcMediaPlayer.playedRandomly = [];
        }
        //console.log(dcMediaPlayer.playedRandomly);
        return newRandom
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
    
    //Volume buttons are  disabled by css at the moment
    $("#btnVolumeUp").click(function(e){
        e.preventDefault();
        if(dcMediaPlayer.volume<10)dcMediaPlayer.volume += 1;
        $(".tracklist-item").find('audio').prop('volume', dcMediaPlayer.volume/10);
    });
    
    $("#btnVolumeDown").click(function(e){
        e.preventDefault();
        if(dcMediaPlayer.volume>0)dcMediaPlayer.volume -= 1;
        $(".tracklist-item").find('audio').prop('volume', dcMediaPlayer.volume/10);
    });

    //Initialize the player
    dcMediaPlayer.setTrack(0);
    $("#btnPause").addClass("hidden");
    $("#btnPlay").removeClass("hidden");
    dcMediaPlayer.activeElement.trigger('pause');
    
    //Update the player time-bar
    window.setInterval(function(){
        if(dcMediaPlayer.activeElement.prop){
            var currentTime = dcMediaPlayer.activeElement.prop("currentTime");
            var duration = dcMediaPlayer.activeElement.prop("duration");
            var percentagePlayed = currentTime/duration*100;
            var percentageBuffered = dcMediaPlayer.activeElement.prop("buffered").end("buffered")/duration*100
            $(".player-bar").css("width", percentagePlayed+"%");
            $(".load-bar").css("width", percentageBuffered+"%");
            //Skip to next track when current track reaches end
            if( percentagePlayed == 100){
                dcMediaPlayer.activeElement.trigger('pause');
                if(dcMediaPlayer.randomPlayback===true) {
                    var newRandom = dcMediaPlayer.shuffle();
                    dcMediaPlayer.setTrack(newRandom);
                }else{
                    dcMediaPlayer.skip(1);
                }  
            }
        }
    }, 250);
    
    //Pause all others on play-event and set back time to 0
    document.addEventListener('play', function(e){
        var audios = document.getElementsByTagName('audio');
        for(var i = 0, len = audios.length; i < len;i++){
            if(audios[i] != e.target){
                audios[i].pause();
                audios[i].currentTime=0;
            }
        }
    }, true);
});

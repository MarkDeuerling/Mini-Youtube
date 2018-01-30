
document.addEventListener("DOMContentLoaded", function(){
    // controls();
    genericControl();

});
/*
//not in use
function controls () {
    var video = document.getElementsByTagName("video")[0];
    var playPause = document.getElementById("play_pause");
    var timeSlide = document.getElementById("time_slide");
    var volume = document.getElementById("volume");
    var fullScreen = document.getElementById("full_screen");

    //play button controlling
    playPause.addEventListener("click", function(){
        if(video.paused) {
            video.play();
            playPause.innerText = "Pause";
        } else {
          video.pause();
          playPause.innerText = "Play";
        }
    });

    //handle video time slider(position is % 0 - 100)
    video.addEventListener("timeupdate", function(){
        // time slide position in %(p%) is p * 100 / G
        timeSlide.value =  video.currentTime * 100 / video.duration;

        if(video.currentTime == video.duration)
            playPause.innerText = "Play";
    });

    //time slider controlling
    timeSlide.addEventListener("change", function(){
        // video time (p) is G / 100 * p%
        video.currentTime = video.duration * .01 * timeSlide.value;
    });

    volume.addEventListener("change", function(){
        video.volume = volume.value;
    });
}
*/

// function for each video html5 element create a control
function genericControl () {

    var video = document.getElementsByTagName("video");
    var controlDiv = document.getElementsByClassName("controls");

    var videoControl = "<div class='video_control'>" +
        "<button class='play_pause'>Play</button>" +
        "<input type='range' class='time_slide' value='0'>" +
        "<label>Volume</label>" +
        "<input type='range' class='volume' value='1' min='0' max='1' step='.1'>" +
        "</div>";
    for(var i = 0; i < video.length; i++){
        video[i].insertAdjacentHTML('afterend', videoControl);
        //controlDiv[i].innerHTML += videoControl;
        control(video[i], i);
    }
}

// the actuale function to create the control for video html5 element
function control (video, index) {
   // var video = document.getElementsByTagName("video")[index];
    var playPause = document.getElementsByClassName("play_pause")[index];
    var timeSlide = document.getElementsByClassName("time_slide")[index];
    var volume = document.getElementsByClassName("volume")[index];
    //var fullScreen = document.getElementsByClassName("full_screen")[index];

    //play button controlling
    playPause.addEventListener("click", function(){
        if(video.paused) {
            video.play();
            playPause.innerText = "Pause";
        } else {
            video.pause();
            playPause.innerText = "Play";
        }
    });

    //handle video time slider(position is % 0 - 100)
    video.addEventListener("timeupdate", function(){
        // time slide position in %(p%) is p * 100 / G
        timeSlide.value =  video.currentTime * 100 / video.duration;

        if(video.currentTime == video.duration)
            playPause.innerText = "Play";
    });

    //time slider controlling
    timeSlide.addEventListener("change", function(){
        // video time (p) is G / 100 * p%
        video.currentTime = video.duration * .01 * timeSlide.value;
    });

    volume.addEventListener("change", function(){
        video.volume = volume.value;
    });
}
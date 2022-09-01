Peterpan="";
Hp="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
scorerightWrist=0;
function preload(){
   Peterpan.isPlaying();
   
}
function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill("#f55d5d");
    stroke("#f55d5d");
    if(scoreleftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        inNumberleftWristY=Number(leftWristY);
        remove_decimals=floor(inNumberleftWristY);
        Peterpan=remove_decimals/500;
        document.getElementById("Peterpan").innerHTML="Song playing= "+Peterpan;
        song.loadSound(Peterpan);
        Hp.stop();

    }
    if(scorerightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        inNumberrightWristY=Number(rightWristY);
        remove_decimals=floor(inNumberrightWristY);
        Hp=remove_decimals/500;
        document.getElementById("Hp").innerHTML="Song playing= "+Hp;
        song.loadSound(Hp);
        Peterpan.stop();

    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("Posenet is intialized.");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreleftWrist=results[0].pose.keypoints[9].score;
        console.log("Score left wrist= "+scoreleftWrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left Wrist X- "+leftWristX+" Left Wrist Y- "+leftWristY);
        scorerightWrist=results[0].pose.keypoints[10].score;
        console.log("Score right wrist= "+scorerightWrist);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right Wrist X- "+rightWristX+" Right Wrist Y- "+rightWristY);
    }
}
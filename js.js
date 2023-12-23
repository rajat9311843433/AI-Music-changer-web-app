song1 = "";
song2 = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
scoreleftWristX = 0;
var status = "";
status_right = ""
scoreRightWristX = 0;

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(550, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is initialized!");
}

function draw() {
    image(video, 0, 0, 550, 500);
    fill("red");
    stroke("red");

    var status = song1.isPlaying()
    if (scoreleftWristX > 0.2) {
        circle(leftWristx, leftWristy, 20);
        song2.stop();

        if (status == false) {
            song1.play();
            document.getElementById("song_name").innerHTML = "Song name: Bones";
        }
    }

    status_right = song2.isPlaying()
    if (scoreRightWristX > 0.2) {
        circle(rightWristx, rightWristy, 20);
        song1.stop();

        if (status_right == false) {
            song2.play();
            document.getElementById("song_name").innerHTML = "Song name: Enemy";
        }
    }
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreleftWristX = results[0].pose.keypoints[9].score;
        scoreRightWristX = results[0].pose.keypoints[10].score;
        console.log("Score Left Wrist X = " + scoreleftWristX + "Score Right Wrist X = " + scoreRightWristX )
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristx + " Left Wrist Y = " + leftWristy);

        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristx + " Right Wrist Y = " + rightWristy);
    }
}
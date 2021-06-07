var ball;
var database;
var pos;

function setup(){
    database = firebase.database (); //connect to DB

    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    
    var dbNode = database.ref ("Ball/Position");//Refer the position of the ball to the database
    dbNode.on ("value", readPosition, showError);

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        //changePosition(-1,0);
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        //changePosition(1,0);
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        //changePosition(0,-1);
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        //changePosition(0,+1);
        writePosition(0,1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function readPosition(data){
    pos = data.val();  // get position from DB
    console.log(pos.x);
    console.log(pos.y);
    //assign back to ball sprite
    ball.x = pos.x;  
    ball.y = pos.y;
    
}

function showError(){
    console.log("An Error Has Occured");

}

function writePosition(x,y){
    var dbNode = database.ref ("Ball/Position");//Write the position of the ball
    dbNode.set({ x:ball.x + x , y:ball.y + y });

}
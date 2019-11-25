$( document ).ready(function() {

  //talk to the canvas in the html
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var ball

  setInterval(draw, 10);

  //drag and drop coordinates
  var x1
  var x2
  var y1
  var y2

  $( "#canvas" ).mousedown(function(canvas) {
    var offset = $(this).offset();
    x1 = event.clientX-offset.left
    y1 = event.clientY-offset.top
  });

  $( "#canvas" ).mouseup(function(canvas) {
    var offset = $(this).offset();
    x2 = event.clientX-offset.left
    y2 = event.clientY-offset.top
    ball = new Ball(x1,y1,'black',15,'A')
    ball.giveVelocity(x1,y1,x2,y2)
  });



  function draw() {

    //clear the board
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.rect(200, 700, 100, 100);
    ctx.stroke();
    //draw the ball
    drawBall(ball)


  };

  function drawBall(ball) {
    if(ball.isStill==false) {
      //update position
      ball.position()
      x = ball.xPos
      y = ball.yPos
      //actually draw the ball
      ctx.fillStyle = ball.colour;
      ctx.beginPath();
      ctx.arc(x, y, ball.radius, 0, 2 * Math.PI);
      ctx.fill()
      ctx.stroke();
      //label the ball
      ctx.font = "17px Arial";
      ctx.fillStyle = "red";
      ctx.fillText(ball.letter,x+5,y+30)
    }



  };

});

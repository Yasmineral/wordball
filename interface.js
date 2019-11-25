$( document ).ready(function() {


  let game = new Game();

  //talk to the canvas in the html
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  //draw every 0.1 seconds
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
    ball = new Ball(x1,y1,'green',15,game.letters[game.counter])
    ball.giveVelocity(x1,y1,x2,y2)
  });



  function draw() {
    //clear the board
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw word hole
    ctx.beginPath();
    ctx.rect(game.tLeftCorner[0], game.tRightCorner[1], game.tRightCorner[0]-game.tLeftCorner[0], game.bRightCorner[1]-game.tLeftCorner[1]);
    ctx.stroke();
    ctx.fillStyle = 'black'
    ctx.fill()
    //draw the ball
    drawBall(ball)
  };

  function drawBall(ball) {
    if(ball.isStill==false) {
      //update position
      ball.position()
      game.isBallinHole(ball)

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

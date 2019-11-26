$( document ).ready(function() {

  let game = new Game();
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let interval

  function playBall(ball) {
    interval = setInterval(draw,10);
    ///////////////////////////
    //DRAG AND DROP DETECTION//
    ///////////////////////////
    let x1;
    let x2;
    let y1;
    let y2;
    $( "#canvas" ).mousedown(function(canvas) {
      let offset = $(this).offset();
      x1 = event.clientX-offset.left;
      y1 = event.clientY-offset.top;
    });
    $( "#canvas" ).mouseup(function(canvas) {
      let offset = $(this).offset();
      x2 = event.clientX-offset.left;
      y2 = event.clientY-offset.top;
      ball.giveVelocity(x1,y1,x2,y2)
    });
    ///////////////////
    //BALL ANIMATION//
    //////////////////
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      game.isBallinHole(ball)
      checkGameOver()
      drawRectangle()
      if(ball.isDone == true) {
        ball = game.currentBall()
      }
      else {
        drawBall(ball)
        // game.tick(ball)
      };
    };

    function drawRectangle() {
      ctx.beginPath();
      ctx.rect(game.tLeftCorner[0], game.tRightCorner[1], game.tRightCorner[0]-game.tLeftCorner[0], game.bRightCorner[1]-game.tLeftCorner[1]);
      ctx.stroke();
      ctx.fillStyle = 'black'
      ctx.fill();
    };

    function drawBall(ball) {
      ball.position()
      x = ball.xPos
      y = ball.yPos
      ctx.fillStyle = ball.colour;
      ctx.beginPath();
      ctx.arc(x, y, ball.radius, 0, 2 * Math.PI);
      ctx.fill()
      ctx.stroke();
      ctx.font = "17px Arial";
      ctx.fillStyle = "red";
      ctx.fillText(ball.letter,x+5,y+30)
    };
  };

  function checkGameOver() {
    if(game.isGameOver()==true) {
      clearInterval(interval)
      $("#app").text(game.word)
      $("#canvas").hide()
      $("#timer").hide()
    };
  };

  playBall(game.currentBall())


});

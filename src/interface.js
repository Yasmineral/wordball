$( document ).ready(function() {

  let holeArray = [
    new Hole(200,200,1,30),
    new Hole(300,200,1,30),
    new Hole(100,100,2,25),
    new Hole(400,100,2,25),
    new Hole(250,50,5,25)
  ];

  let game = new Game(holeArray);
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let interval;

  var timeLeft = 10;
    var elem = document.getElementById('timer');

    var timerId = setInterval(countdown, 1000);

    function countdown() {
      if (timeLeft == 0) {
        game.forceGameOver()
      } else {
        $('#timer').text(timeLeft + ' seconds remaining');
        timeLeft--;
      }
    }

  function playBall(ball) {
    countdown()
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
      console.log('running')
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      game.isBallinScoreHole(ball)
      game.isBallinWordHole(ball)
      game.isBallInTheAbyss(ball)

      checkGameOver()

      drawRectangle()
      drawHoles(game.holeArray)

      if(ball.isDone == true) {
        ball = game.currentBall()
      }
      else {
        drawBall(ball)
      };
    };

    function drawHoles(array) {
        array.forEach(function drawHole(item) {
          ctx.fillStyle = 'black';
          ctx.beginPath();
          ctx.arc(item.xPos,item.yPos, item.radius, 0, 2 * Math.PI);
          ctx.fill();
          ctx.stroke();
          ctx.font = "17px Arial";
          ctx.fillStyle = "white";
          ctx.fillText("x"+item.score,item.xPos-6,item.yPos);
        }
      );
    };

    function drawRectangle() {
      ctx.beginPath();
      ctx.rect(game.tLeftCorner[0], game.tRightCorner[1], game.tRightCorner[0]-game.tLeftCorner[0], game.bRightCorner[1]-game.tLeftCorner[1]);
      ctx.stroke();
      ctx.fillStyle = 'black';
      ctx.fill();
      ctx.font = "17px Arial";
      ctx.fillStyle = "white";
      ctx.fillText('Throw in here to make a word!',135,750);
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
      ctx.fillText(ball.letter,x+5,y+30);
    };
  };

  function checkGameOver() {
    if(game.isGameOver()==true) {
      clearInterval(interval);
      $("#word").text(game.word);
      $("#canvas").hide();
      $("#timer").hide();
    };
  };

  playBall(game.currentBall());

});

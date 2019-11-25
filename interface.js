$( document ).ready(function() {

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  setInterval(draw, 10);

  var x = 100
  var y = 100

  function draw() {
    //clear the board
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw a circle
    drawBall(x,y)
    //update position
    x+=0
    y+=10
  };

  function drawBall(x,y) {
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2 * Math.PI);
    ctx.fillStyle = "#FF0000";
    ctx.fill()
    ctx.stroke();
  };

});

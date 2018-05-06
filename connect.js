
var player1 = prompt("Player 1, Enter your name, You will be Blue");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("Player 2, Enter your name, You will be Red");
var player2Color = 'rgb(237, 45, 73)';	

if (!player1)
	player1 = "Player 1";
if(!player2)
	player2 = "Player 2";

var game_on = true;
var table = $('table tr');

function reportWin(rowNum,colNum)
{
  console.log("You won starting at this row and column");
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowIndex,colIndex,color)
{
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function returnColor(rowIndex,colIndex)
{
	console.log(table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color'));
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex)
{
  var colorReport = returnColor(5,colIndex);
  for (var  row = 5; row > -1; row--)
  {
    colorReport = returnColor(row,colIndex);
    if (colorReport === 'rgb(128, 128, 128)')
    {
      return row;
    }
  }
}

function colorMatchCheck(one,two,three,four)
{
  if (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !==undefined){
  	console.log("true");
  	return true;
  }
  else{
  	return false;
  }
}

function horizontalWinCheck()
{
  for (var row = 0; row < 6; row++)
  {
    for (var col = 0; col < 4; col++)
    {
        if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1), returnColor(row,col+2), returnColor(row,col+3)))
    	{
          console.log('horiz');
          reportWin(row,col);
          return true;
      }else {
        continue;
      }
    }
  }
}

function vertcialWinCheck()
{
  for (var col = 0; col < 3; col++)
  {
    for (var row = 0; row < 7; row++)
    {
        if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col), returnColor(row+2,col), returnColor(row+3,col)))
    	{
        console.log('vertical');
        reportWin(row,col);
        return true;
      }
      else
      {
          continue;
      }
    }
  }
}

function diagonalWinCheck()
{
  for (var col = 0; col < 5; col++)
  {
    for (var row = 0; row < 7; row++)
    {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1), returnColor(row+2,col+2), returnColor(row+3,col+3)))
      {
        console.log('diag');
        reportWin(row,col);
        return true;
      }
      else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1), returnColor(row-2,col+2), returnColor(row-3,col+3)))
      {
        console.log('diag');
        reportWin(row,col);
        return true;
      }
      else
      {
          continue;
      }
    }
  }
}
/*
function gameEnd(winningPlayer) {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 7; row++) {
      $('h3').fadeOut('fast');
      $('h2').fadeOut('fast');
      $('h1').text(winningPlayer+" has won! Refresh your browser to play again!").css("fontSize", "50px")
    }
  }
}
*/
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1+" it is your turn, pick a column to drop chip.")
$('.board button').on('click',function() {
  var col = $(this).closest("td").index();
  var bottomAvail = checkBottom(col);
  changeColor(bottomAvail,col,currentColor);

  if (horizontalWinCheck() || vertcialWinCheck() || diagonalWinCheck())
  {
	  $('h3').fadeOut('fast');
      $('h2').fadeOut('fast');
      alert(currentName+" You have won the game");
      if (confirm("Play Again?")) {
			location.reload();
		}
		else
		{
			$('h1').text("Refresh your browser to play again!");
		}    	
  }

  currentPlayer = currentPlayer * -1;

  if (currentPlayer === 1)
  {
    currentName = player1;
    $('h3').text(currentName+" it is your turn");
    currentColor = player1Color;
  }
  else
  {
      currentName = player2;
      $('h3').text(currentName+" it is your turn");
      currentColor = player2Color;
  }
})
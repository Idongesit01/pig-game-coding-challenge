/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/*
YOUR 3 CHALLENGES
Chaange the game to follow these rules

1. A Player looses his entire score when he rolls two 6 in a roll. After that, its the next player's
turn.(Hint: Always save the previous dice roll in a separate variable).
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100.
(Hint: you can read that value with the .value property in Javascript. This is a good opportunity to used google to figure this out).
3. Add another dice tothe game , so that there are two dices now. the player looses his current score whenone of them is 1.  (Hint: you 
will need css to position the second dice, so take a look at the css code for the first one)

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;



//using a Math object which is Math. floor (random() * 6) + 1; because i am looing to get a random number between 1 and 6, then adding the floor to give me integer
//dice = Math.floor(Math.random() * 6) + 1;

//document object gives us access to the DOm while using the query selector
//document.querySelector('#current-' + activePlayer).textContent = dice; 
//or
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; uses to set a value

//var x = document.querySelector('#score-0').textContent; used to get a value

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        // we need 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        
        document.getElementById('dice-1').src = 'img/dice-' + dice1 +'.png';
        document.getElementById('dice-2').src = 'img/dice-' + dice2 +'.png';

        //3. update the roundscore IF the rolled number was NOT a 1

        if (dice1 !== 1 && dice2 !== 1){
            //add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore; 
        } else{
            //next player
            nextPlayer();
        }

        /*
        if (dice === 6 && lastDice ===6){
            //player looses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        }else if (dice !== 1){
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore; 
        } else{
            //next player
            nextPlayer();
        }
        lastDice = dice;
        */
    }
    
});

document.querySelector('.btn-hold').addEventListener( 'click', function (){
    if(gamePlaying){
        //add CUREENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        //console.log(input);

        var winningScore;

        //check if there is an input, undefined, 0, null or ' ' are coerced to false and anyhting else is coerced to true
        if (input){
            winningScore = input;
        } else {
            winningScore = 100;
        }

        //check if player won the game
        if ( scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
            }else{
            //next player
            nextPlayer();
        }
    }
});

function nextPlayer(){
     //next player
     activePlayer  === 0 ? activePlayer = 1: activePlayer = 0;
     roundScore = 0;
     /* exact same thing as wrrithing this method is called iternary operatory
     if (activePlayer ===0){
         activePlayer = 1;
     } else {
         activePlayer = 0;
         roundScore = 0;
     }
     */

     document.getElementById('current-0').textContent = '0';
     document.getElementById('current-1').textContent = '0';

     //document.querySelector('.player-0-panel').classList.remove('active');
     //document.querySelector('.player-1-panel').classList.add('active');
     //using toggle instead of add and remove

     document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active');

     document.getElementById('dice-1').style.display = 'none';
     document.getElementById('dice-2').style.display = 'none';
};

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none'; //to access the css and set a value
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};

//we need a state variable, it simply tells us the condition of a system, in this stste it will tell us, if our game is playing or not playing
//e.g gamplaying

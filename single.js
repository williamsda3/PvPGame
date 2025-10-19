// Maybe have it so that if cpu atk is a certain level higher that player, potentially charge again (to bait player block) then if player 





let playerChoice = document.getElementById("playerChoice");
let cpuChoice =document.getElementById("CpuChoice");
let buttATK = document.getElementById("ATK");
let game = document.getElementById("game");
let duel = document.getElementById("Duel");
let p1PWR =  document.getElementById("p1PWR");
let help = document.getElementById("tut");
let p1Wait =  document.getElementById("p1Wait");
let p2Wait =  document.getElementById("p2Wait");
let p1Pic =  document.getElementById("p1Pic");

// Initialize game variables
let playerMove;
let cpuMove;
let chosen = false;
let playerShield = 0;
let opponentShield = 0;
let shieldBreakCount = 0;
let playerAttackPower = 1;
let opponentAttackPower = 1;
let playerHealth = 5;
let opponentHealth = 5;
let playerAttackDamage = 0; 
let smart;
let startGame = document.getElementById("NewGame");
let winner = false;

let gameData = []; // Array to store game data


// Function to record game data
function recordGameData(gameData) {
  const apiUrl = 'https://gamedataserver.onrender.com/saveGameData';

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Data saved on the server:', data);
    })
    .catch(error => {
      console.error('Error saving data:', error);
    });
}



// Connecting to the Firebase Database

function updateStats(){
    
 let gameState = {
    player: { health: opponentHealth, attackPower: opponentAttackPower, blockCount: opponentShield },
    opponent: { health: playerHealth, attackPower: playerAttackPower, blockCount: playerShield },
    winner: false,
  };
 
  if(playerHealth <= 0){
  
    document.getElementById("Name--1").style.color = "#90ee90";
    document.getElementById("p1HP").innerHTML = "You lost";
    document.getElementById("p1PWR").innerHTML = " Unlucky... "; 
    p2Wait.className = "fa-solid fa-face-grin-wink fa-4x";
    p1Wait.className = "fa-solid fa-face-frown-open fa-4x";

    winner = true;
}

else if(opponentHealth <= 0){
   
    document.getElementById("Name--0").style.color = "#90ee90";
    document.getElementById("p2HP").innerHTML = "You lost";
    document.getElementById("p2PWR").innerHTML = " ''L ++'' ";
    p1Wait.className = "fa-solid fa-face-grin-wink fa-4x";
    p2Wait.className = "fa-solid fa-face-sad-tear fa-4x";

    winner = true;
}
if(winner){ 
  gameState.winner = true;
  gameData.push({ cpuMove, playerMove, gameState });
  recordGameData(gameData)
    startGame.innerHTML = "Play Again";
   

    //startGame.onclick = history.go(0);
}

  

    
  gameState = { gameState }
  
  document.getElementById("p1HP").innerHTML =` HP: ${playerHealth}`;
 
  document.getElementById("p2HP").innerHTML =`HP: ${opponentHealth}`;
  p1PWR.innerText = `PWR: ${playerAttackPower}`;
  document.getElementById("p2PWR").innerHTML =` PWR: ${opponentAttackPower}`;
  gameData.push({ cpuMove, playerMove, gameState });

  
}
// Array of move choices
const moveChoices = ["attack", "defend", "charge"]; 
   

// Function to play attack round of the game

function playRound(playerMove, cpuMove,) { 
  // Get the player's move
  
  
    // Get the CPU's Move
   
    
      // Get the CPU's move
      
    
      // Player move logic...
    
    
  
    
  
  
  // Player move logic

// If Player Attacks and CPU Charges
  if(playerMove == "attack" && cpuMove == "charge"){
    opponentHealth -= playerAttackPower;
    playerAttackPower = 1;
    opponentAttackPower++;
    playerShield = 0;
    opponentShield = 0;
}

// If both players Attack
if(playerMove == "attack" && cpuMove == "attack"){
    if(playerAttackPower < opponentAttackPower){
        playerHealth -= (opponentAttackPower - playerAttackPower);
        opponentAttackPower = 1;
        playerAttackPower = 1;
        playerShield = 0;
        opponentShield = 0;
    }
    
    // If the player has more Attack Power than the CPU, CPU will receive the attack difference
    else if(playerAttackPower > opponentAttackPower){
        opponentHealth -= (playerAttackPower - opponentAttackPower);
        opponentAttackPower = 1;
        playerAttackPower = 1;
        playerShield = 0;
        opponentShield = 0;
    }
    else{
        playerAttackPower = 1;
        opponentAttackPower = 1;
        playerShield = 0;
        opponentShield = 0;
    }  
}

// If player Charges and CPU Attacks:
if(playerMove == "charge" && cpuMove == "attack"){
    playerHealth -= opponentAttackPower;
    playerAttackPower++;
    opponentAttackPower = 1;
    playerShield = 0;
    opponentShield = 0;
}

// If player attacks and CPU Defends
if(playerMove == "attack" && cpuMove == "defend"){
    if(opponentShield > 1){
        opponentHealth -= playerAttackPower;
        console.log("CPU shield Broken!");
        playerAttackPower = 1;
        opponentShield++;
        playerShield = 0;
    }
    if(opponentShield == 1){
        playerAttackPower = 1;
        opponentShield++;
        playerShield = 0;
    }
    if(opponentShield < 1){
        playerAttackPower = 1;
        opponentShield++;
        playerShield = 0;
    }
}

// if player Defends and CPU Attacks
if(playerMove == "defend" && cpuMove == "attack"){
    if(playerShield > 1){
        playerHealth -= opponentAttackPower;
        console.log("player shield Broken!");
        opponentShield = 0;
    }
    if(playerShield == 1){
        opponentAttackPower = 1;
        playerShield++;
        opponentShield = 0;
    }
    if(playerShield < 1){
        opponentAttackPower = 1;
        playerShield++;
        opponentShield = 0;
    }
}

//if player Defends and CPU Charges
if(playerMove == "defend" && cpuMove == "charge"){
    if(playerShield > 1){
      console.log("Player shield broken!");
    }
    playerShield++;
    opponentAttackPower++;
    opponentShield = 0;
}

//if player Charges and CPU Defends
if(playerMove == "charge" && cpuMove == "defend"){
    opponentShield++;
    playerAttackPower++;
}

// if both players Charge
if(playerMove == "charge" && cpuMove == "charge"){
    playerAttackPower++;
    opponentAttackPower++;
    playerShield = 0;
    opponentShield = 0;
    console.log("Both players charged!");
}

// if both players Defend
if(playerMove == "defend" && cpuMove == "defend"){
    if(opponentShield > 1){
      console.log("CPU's shield broken!");
    }
    playerShield++;
    opponentShield++;
    console.log("Both players blocked! Nothing happened");
}


if(chosen)
 {console.log("Player chose " + playerMove);
  console.log("CPU chose " + cpuMove);
  console.log("Player health: " + playerHealth);
  console.log("CPU health: " + opponentHealth);
 
  
  console.log("Player health: " + playerHealth);
  console.log("CPU health: " + opponentHealth);
  console.log("-----------------------------------");
}
  if (playerHealth <= 0) {
  console.log("CPU wins!");
   winner = true
  
}
 if (opponentHealth <= 0) {
  console.log("Player wins!");
  winner = true;
  
} updateStats(); 
}


startGame.addEventListener("click", function(){ 
 updateStats();
  if(winner){
    
    startGame.onclick = history.go(0);
    startGame.innerHTML = "Play Again";
}

  document.addEventListener('keyup', function(event) {
    if (event.code === 'KeyW') {
      playerMove = "attack";
      p1Pic.src = "pics/attack.jpg";
      chosen = true;
    }
    if (event.code === 'KeyA') {
      playerMove = "defend";
      p1Pic.src = "pics/block.jpg";

      chosen = true;
    }
    if (event.code === 'KeyD') {
      playerMove = "charge";
      p1Pic.src = "pics/charge.jpg";

      chosen = true;
    }
   /*
     if (smart) {

      // Add CPU predictions in relation to player/s stats (EX. if player HP or PWR is a certain level, chose 'x' more '-%" of the time).
      if(playerShield <= 0) {
        cpuMove = "attack";
      if(opponentAttackPower === 3 || opponentAttackPower === 4 || opponentAttackPower >= 5){
        cpuMove = 'attack' || 'defend';
      }
      //let lastPlayerMoves = playerMove.slice(-2); // Get the last 2 moves by the player
      //let lastPlayerMove = lastPlayerMoves[lastPlayerMoves.length - 1]; // Get the most recent move
      if ( playerMove == "attack") {
        cpuMove = "defend"; // Block the next attack if the player has attacked twice in a row
      } else if ( playerMove == "defend") {
        cpuMove = "charge"; // Charge up if the player has broken through the CPU's shield
      } else if ( playerMove == "charge") {
        cpuMove = "attack"; // Attack if the player has charged up
      }
    } let cpuMoveIndex = Math.floor(Math.random() * 3);
    cpuMove = moveChoices[cpuMoveIndex];
  }
  */ cpuMove;
     
      // if (opponentHealth <= 3 && Math.random() < 0.5) {
      //   cpuMove = "defend";
      // } 
      // if(opponentAttackPower > 2){
      //   cpuMove = "attack";
      // }
      // if(playerShield > 1){
      //   cpuMove = "attack";
      // }
      // else if (opponentHealth > playerHealth && Math.random() < 0.8) {
      //   cpuMove = "attack";
      // } else {
      //   cpuMove = moveChoices[Math.floor(Math.random() * moveChoices.length)];
      // }

















      

// Define the initial game state
let gameState = {
  player: { health: opponentHealth, attackPower: opponentAttackPower, blockCount: opponentShield },
  opponent: { health: playerHealth, attackPower: playerAttackPower, blockCount: playerShield },
  winner: false,
};
  // Function to get the current game state
  function getCurrentGameState() {
    return { ...gameState }; // Return a copy to prevent mutation of the original state
  }


// Function to simulate a move and return the resulting game state
function simulateMove(playerMove, opponentMove, currentState) {
    const { player, opponent } = currentState;
  
    // Create a new opponent state for each simulation
    const newOpponent = { ...opponent };
    const newPlayer = { ...player };
  
    // Simulate the effects of the moves
    switch (playerMove) {
      case "attack":
          if (opponentMove === "attack") {
              const playerDamageDifference = Math.max(0, newOpponent.attackPower - newPlayer.attackPower);
              const opponentDamageDifference = Math.max(0, newPlayer.attackPower - newOpponent.attackPower);
          
              newOpponent.health -= opponentDamageDifference;
              newPlayer.health -= playerDamageDifference;
          
              newOpponent.attackPower = 1;
              newOpponent.blockCount = 0;
              newPlayer.attackPower = 1;
            }
        if (opponentMove === "charge") {
          newOpponent.health -= newPlayer.attackPower;
          newOpponent.attackPower++;
          newOpponent.blockCount = 0
        }
        if (opponentMove === "defend") {
            newOpponent.blockCount++
            if (newOpponent.blockCount > 2){
                newOpponent.health -= newPlayer.attackPower
            }
          }
        newPlayer.attackPower = 1;
        newPlayer.blockCount = 0
        break;
  
      case "defend":
        if (opponentMove === "charge") {
          newOpponent.attackPower++;
          newOpponent.blockCount = 0
        }
        if (opponentMove === "defend") {
            newOpponent.blockCount++
          }
        newPlayer.blockCount++
        if (newPlayer.blockCount > 2){
            newPlayer.health -= newOpponent.attackPower
        }
        break;
  
      case "charge":
        if (opponentMove === "attack") {
          newPlayer.health -= newOpponent.attackPower;
          newOpponent.attackPower = 1;
          newOpponent.blockCount = 0
        }
        if (opponentMove === "charge") {
          newOpponent.attackPower++;
          newOpponent.blockCount = 0
        }
        if (opponentMove === "defend") {
            newOpponent.blockCount++
          }
        newPlayer.attackPower++;
        newPlayer.blockCount = 0
        break;
  
      default:
        console.error("Invalid move");
        break;
    }
    
  
      // Check for a winner
  if (newPlayer.health <= 0 || newOpponent.health <= 0) {
  
    return { player: { ...newPlayer }, opponent: { ...newOpponent }, winner: true };
  }
    // Return the updated game state
    // Store the game data
    
    return { player: { ...newPlayer }, opponent: newOpponent, winner: false };
  }
  

// Function to evaluate the potential outcomes of each move
function evaluateMoves(currentState) {
  const possibleMoves = ["attack", "defend", "charge"];
  const { player, opponent } = currentState;

  // Initialize an object to store evaluations for each move
  const moveEvaluations = {};

  // Iterate through each possible move
  for (const playerMove of possibleMoves) {
    for (const opponentMove of possibleMoves) {
      // Simulate the effects of the player's move and opponent's move
      const nextState = simulateMove(playerMove, opponentMove, currentState);

      // Store the resulting game state for the move trade
      moveEvaluations[`${playerMove} vs ${opponentMove}`] = nextState;
    }
  }

  return moveEvaluations;
}

// Example usage
const initialGameState = getCurrentGameState();
const moveEvaluations = evaluateMoves(initialGameState);


// Function to choose the best move based on the evaluation
// Function to choose the best move based on the evaluation
function chooseBestMove(currentState) {
    const moveEvaluations = evaluateMoves(currentState);
  
    // Initialize variables to track the best move and its score
    let bestMove = null;
    let bestScore = -Infinity; // Start with a low score
  
    // Iterate through each move trade and find the one with the highest score
    for (const moveTrade in moveEvaluations) {
      const score = evaluateMoveScore(moveEvaluations[moveTrade], currentState);
  
      // Include the opportunity to attack in the decision-making process
      if (currentState.opponent.health == 1){
        return 'attack';
      }
      if(currentState.player.health + currentState.player.attackPower<= currentState.opponent.attackPower + 1 && currentState.player.blockCount < 2) {
        return 'defend'
      }
     
      if (evaluateOpportunityToAttack(currentState) === 1 || currentState.player.attackPower > currentState.opponent.health) {
        console.log("attack override");
        return "attack";
      }
  
      if (score > bestScore) {
        bestScore = score;
        bestMove = moveTrade.split(" vs ")[0];
      }
    }
    
    return bestMove;
  }
  
  
  // Function to evaluate the score of a move based on the resulting game state
  // Function to evaluate the potential negative trade dynamically
  function evaluatePotentialNegativeTrade(currentState, resultingState) {
    const { player, opponent } = currentState;
  
    // if( currentState.playerMove === 'charge'){
    //   if(resultingState.playerHealth < resultingState.opponent.health + 2){
    //     return -1
    //   }
    // }
    if(resultingState.player.health <= 0){
      return -10;
    }
    if(resultingState.opponent.health <= 0 && resultingState.player.health > 0){
          return 100;
    }
   
    // If player attacks and opponent defends
    if (currentState.playerMove === 'attack' && currentState.opponentMove === 'defend') {
      // Check if opponent successfully blocked the attack, resetting player's attack power
      if (resultingState.player.attackPower === 1) {
        return -1; // Negative trade
      }
    }

    if(currentState.playerMove === 'defend') {
        if(currentState.player.blockCount >= 2){
              return -10; // Negative trade
        }
      
    }
    
  
    // If player attacks and opponent charges
    if (currentState.playerMove === 'attack' && currentState.opponentMove === 'charge') {
      // Check if opponent gained an advantage in attack power
      if (resultingState.opponent.attackPower > currentState.player.attackPower + currentState.player.health) {
        return -1; // Negative trade
      }
    }
    if (currentState.playerMove === 'attack' && opponent.health == 1){
      return 5; 
    }
    if (currentState.playerMove === 'attack' && player.health == 1){
      if (currentState.opponent.attackPower < currentState.player.attackPower){
          return 5;
      } 
    }
  
    return 0; // No negative trade
  }
  


  // Function to evaluate the score of a move based on the resulting game state
  function evaluateMoveScore(resultingState, currentState) {
    // Factors to consider for scoring:
    // 1. Health difference
    // 2. Attack power difference
    // 3. Potential negative trade
    // 4. Opportunity to attack
    const healthDifference = resultingState.player.health - resultingState.opponent.health;
    const attackPowerDifference = resultingState.player.attackPower - resultingState.opponent.attackPower;
    const potentialNegativeTrade = evaluatePotentialNegativeTrade(currentState, resultingState);
    const opportunityToAttack = evaluateOpportunityToAttack(currentState);
    const opportunityToDefend = evaluateOpportunityToDefend(currentState, resultingState);
    const opportunityToCharge = evaluateOpportunityToCharge(currentState, resultingState);
  
    // Combine factors into an overall score
    const overallScore = healthDifference + attackPowerDifference + potentialNegativeTrade + opportunityToAttack + opportunityToDefend + opportunityToCharge;
  
    return overallScore;
  }
  
  function evaluateOpportunityToCharge(currentState, resultingState) {
    if (currentState.player.health <= currentState.opponent.attackPower) {
       return -1;
    }
     return 0;
  }
  // Function to evaluate the opportunity to attack
  function evaluateOpportunityToAttack(currentState) {
    const { player, opponent } = currentState;
  
    if (player.blockCount >= 2 && opponent.attackPower > player.health){
      return 1;
    }

    // if(currentState.player.health + currentState.player.attackPower<= currentState.opponent.attackPower + 1&& currentState.player.blockCount < 2) {
    //   return 1;
    // }
    // Check if the conditions for attacking are favorable
    if (player.attackPower > opponent.attackPower && player.health > 1) {
      // Introduce slight randomization
      const randomFactor = Math.random(); // Generates a random number between 0 and 1
      const chanceToAttack = .1; // Adjust this value to control the chance of attacking
      if(player.health <= 2){
        return 1;
      }
      if (randomFactor < chanceToAttack) {
        return 1; // Positive opportunity to attack
      }
    }
    if (opponent.health > player.health && opponent.attackPower == player.attackPower){
       return 1; 
    }
    if(opponent.health == 1){
      return 1; 
    }

  
    return 0; // No opportunity to attack
  }

  function evaluateOpportunityToDefend(currentState, resultingState) {
      const { player, opponent } = currentState;
  
      if (currentState.player.health == 1 && currentState.opponent.attackPower > 1){
          return 5;
      }
      // If player attacks and opponent defends
      if (currentState.playerMove === 'defend' && currentState.opponentMove === 'charge') {
       
        if (resultingState.opponent.attackPower > currentState.player.health) {
          return -1; // Negative trade
        }
        
      }
      if (currentState.opponent.attackPower > currentState.player.health + 1) {
          return 1; // Chance to reset opponent's attack
        }
  
    
      return 0; // No negative trade
    }
  
  

    cpuMove = chooseBestMove(gameState);













    playRound(playerMove,cpuMove, smart);
    if (cpuMove === 'attack') {
     
    
      p2Pic.src = "pics/attack.jpg";
      chosen = true;
    }
    if (cpuMove === 'defend') {
      
      

      p2Pic.src = "pics/block.jpg";

      chosen = true;
    }
    if (cpuMove === 'charge') {
      
      

      p2Pic.src = "pics/charge.jpg";

    }
  });
});





// Define the model architecture

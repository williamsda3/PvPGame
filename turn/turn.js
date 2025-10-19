let p1_moves = [];
let p2_moves = [];

class Player {
    constructor() {
        this.name = "Player";
        this.baseHP = 5;
        this.HP = 5
        this.baseATK = 1
        this.ATK = 1;
        this.CRG = 0;
        this.hasCharge = false;
        this.timesATK = 0;
        this.blockCount = 0;
        this.blocking = false;
        this.shield = 0;
        this.attacked = false
    }
    
    removeCharge() {
        this.ATK = this.baseATK;
        if(this.shield <= 0){
            this.blocking = false
            this.shield = 0;
        }
    }
    takeDamage(damage, currentHP){
        
        this.HP -= damage;
    }
    
    block() {
        this.shield ++;
        if(this.shield > 1){
            this.shield = 1;
        }
        if(this.shield <= 0){
            this.blocking = false
            this.shield = 0;
        }
        
    }
    special(){
        if(this.shield <= 0){
            this.blocking = false
            this.shield = 0;
        }
        
        this.ATK ++;
        this.blocking = false
    }
}


function getP1Move(){
   
        p1_moves[0] = prompt("Enter First move");
        p1_moves[1] = prompt("Enter Second move");
        p1_moves[2] = prompt("Enter Third move");
    
}

function getP2Move(){
    
        p2_moves[0] = prompt("Enter First move");
        p2_moves[1] = prompt("Enter Second move");
        p2_moves[2] = prompt("Enter Third move");
    
}

let player1 = new Player()
let player2 = new Player()


getP1Move();
getP2Move();
console.log(p1_moves);
console.log(p2_moves);

function battle(){
    for (let i = 0; i < 3; i++) {
        if (player1[i] == "a" && player2[i] == "a") {
            console.log("Both players attacked!");
    }
    if (player1[i] == "a" && player2[i] == "a") {
        console.log("Both players attacked!");
}
    if (player1[i] == "a" && player2[i] == "a") {
        console.log("Both players attacked!");
}
    if (player1[i] == "a" && player2[i] == "a") {
        console.log("Both players attacked!");
}
    if (player1[i] == "c" && player2[i] == "c") {
        console.log("Both players attacked!");
}
    if (player1[i] == "d" && player2[i] == "d") {
        console.log("Both players attacked!");
}
    if (player1[i] == "a" && player2[i] == "c") {
        console.log("Both players attacked!");
}
    if (player1[i] == "a" && player2[i] == "d") {
        console.log("Both players attacked!");
}
    if (player1[i] == "a" && player2[i] == "a") {
        console.log("Both players attacked!");
}
    if (player1[i] == "a" && player2[i] == "a") {
        console.log("Both players attacked!");
}
    if (player1[i] == "a" && player2[i] == "a") {
        console.log("Both players attacked!");
}
}
}


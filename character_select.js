let characterButtons = document.querySelectorAll('.character button');
let characterSection = document.getElementById('.player1-section');

let player1 = {
    character : 'none',
    selected : false
}
let player2 = {
    character : 'none',
    selected: false
}

function selectCharacter(player, character) {
    
    if (player === 'Player1') {
        if (character === 'Tank') {
            player1['character'] = 'Tank'
        } else if (character === 'Flame') {
            player1['character'] = 'Flame'
        } else if (character === 'Shadow') {
            player1['character'] = 'Shadow'
        } else if (character === 'Default') {
            player1['character'] = 'Default'
        }
        player1['selected'] = true
       

    }  
    if (player === 'Player2') {
        if (character === 'Tank') {
            player2['character'] = 'Tank'
        } else if (character === 'Flame') {
            player2['character'] = 'Flame'
        } else if (character === 'Shadow') {
            player2['character'] = 'Shadow'
        } else if (character === 'Default') {
            player2['character'] = 'Default'
        }
        player2['selected'] = true
    }
    if(player1['selected'] && player2['selected']){
    const url = `indexx.html?player1Character=${encodeURIComponent(JSON.stringify(player1['character']))}&player2Character=${encodeURIComponent(JSON.stringify(player2['character']))}`;

    window.location.href = url;
}
}
    // Now you have player1 and player2 instances with the selected characters,
    // you can perform further actions as needed

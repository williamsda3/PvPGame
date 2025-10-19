# server.py
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

games = {}


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/create_game', methods=['POST'])
def create_game():
    player_id = request.form['player_id']
    lobby_code = request.form['lobby_code']
    game_id = f'game_{lobby_code}'

    if game_id in games and games[game_id]['player2'] is None:
        return jsonify({'message': 'Lobby code already in use or game is full'}), 400

    games[game_id] = {'player1': player_id, 'player2': None, 'moves': {}}
    return jsonify({'game_id': game_id})


@app.route('/join_game', methods=['POST'])
def join_game():
    player_id = request.form['player_id']
    lobby_code = request.form['lobby_code']
    game_id = f'game_{lobby_code}'

    if game_id in games and games[game_id]['player2'] is None:
        games[game_id]['player2'] = player_id
        return jsonify({'message': 'Game joined successfully'})
    else:
        return jsonify({'message': 'Game not found or already full'}), 400


@app.route('/make_move', methods=['POST'])
def make_move():
    player_id = request.form['player_id']
    game_id = request.form['game_id']
    move = request.form['move']

    if game_id in games and games[game_id]['player2'] is not None:
        games[game_id]['moves'][player_id] = move
        return jsonify({'message': 'Move recorded'})
    else:
        return jsonify({'message': 'Game not found or not ready'}), 400


@app.route('/get_result', methods=['POST'])
def get_result():
    player_id = request.form['player_id']
    game_id = request.form['game_id']

    if game_id in games and len(games[game_id]['moves']) == 2:
        moves = games[game_id]['moves']
        result = determine_winner(moves)
        return jsonify({'result': result})
    else:
        return jsonify({'message': 'Game not ready or moves not submitted'}), 400


def determine_winner(moves):
    player1_move = moves['player1']
    player2_move = moves['player2']

    if player1_move == player2_move:
        return 'It\'s a tie!'
    elif (
        (player1_move == 'rock' and player2_move == 'scissors')
        or (player1_move == 'scissors' and player2_move == 'paper')
        or (player1_move == 'paper' and player2_move == 'rock')
    ):
        return 'Player 1 wins!'
    else:
        return 'Player 2 wins!'


if __name__ == '__main__':
    app.run(debug=True)

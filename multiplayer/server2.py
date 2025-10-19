import socket
import threading

connected_clients = []
exit_command_received = False

def broadcast(message, sender_addr):
    for client, addr in connected_clients:
        if addr != sender_addr:
            try:
                client.send(message)
            except Exception as e:
                print(f"Error broadcasting to {addr}: {e}")

def handle_client(client_socket, addr):
    global exit_command_received

    connected_clients.append((client_socket, addr))

    try:
        client_socket.send("Welcome to Rock-Paper-Scissors game! Enter your move: rock, paper, or scissors. Type 'exit' to end the game.".encode('utf-8'))

        while not exit_command_received:
            move = client_socket.recv(1024).decode('utf-8')
            
            if move.lower() == 'exit':
                exit_command_received = True
                break

            print(f"{addr} chose: {move}")

            broadcast(f"{addr} chose: {move}".encode('utf-8'), addr)

            if len(connected_clients) == 2:
                # Determine the winner
                player1_move = connected_clients[0][1]
                player2_move = connected_clients[1][1]
                
                if player1_move == player2_move:
                    result = "It's a tie!"
                elif (
                    (player1_move == "rock" and player2_move == "scissors") or
                    (player1_move == "scissors" and player2_move == "paper") or
                    (player1_move == "paper" and player2_move == "rock")
                ):
                    result = f"{connected_clients[0][1]} wins!"
                else:
                    result = f"{connected_clients[1][1]} wins!"

                # Broadcast the result to all clients
                broadcast(result.encode('utf-8'), None)

    except Exception as e:
        print(f"Error handling client {addr}: {e}")

    print(f"Connection from {addr} closed.")
    client_socket.close()
    connected_clients.remove((client_socket, addr))

def start_server():
    global exit_command_received

    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(('0.0.0.0', 9999))
    server.listen(5)
    print("Server listening on port 9999")

    while not exit_command_received:
        client_socket, addr = server.accept()
        print(f"Accepted connection from {addr}")
        client_handler = threading.Thread(target=handle_client, args=(client_socket, addr))
        client_handler.start()

if __name__ == "__main__":
    start_server()

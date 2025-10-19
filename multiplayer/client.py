import socket

def start_client():
    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client.connect(('127.0.0.1', 9999))

    while True:
        message = client.recv(1024).decode('utf-8')
        print(message)

        move = input("Enter your move: rock, paper, or scissors. Type 'exit' to end the game: ")
        client.send(move.encode('utf-8'))

        if move.lower() == 'exit':
            break

if __name__ == "__main__":
    for _ in range(2):
        start_client()

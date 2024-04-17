#include <iostream>
#include <cstring>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <thread> // Include the thread header

const int BUFFER_SIZE = 4096;
const int SERVER_PORT = 5555;

void error(const char *msg)
{
    perror(msg);
    exit(EXIT_FAILURE);
}

int createSocket()
{
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0)
        error("Error creating socket");
    return sock;
}

void bindSocket(int sock, struct sockaddr_in &sin)
{
    if (bind(sock, (struct sockaddr *)&sin, sizeof(sin)) < 0)
        error("Error binding socket");
}

void listenToSocket(int sock)
{
    if (listen(sock, 5) < 0)
        error("Error listening to socket");
}

int acceptClient(int sock, struct sockaddr_in &client_sin)
{
    unsigned int addr_len = sizeof(client_sin);
    int client_sock = accept(sock, (struct sockaddr *)&client_sin, &addr_len);
    if (client_sock < 0)
        error("Error accepting client");
    return client_sock;
}

int receiveData(int client_sock, char *buffer)
{
    int read_bytes = recv(client_sock, buffer, BUFFER_SIZE, 0);
    if (read_bytes < 0)
        error("Error receiving data from client");
    return read_bytes;
}

void sendData(int client_sock, const char *data)
{
    int sent_bytes = send(client_sock, data, strlen(data), 0);
    if (sent_bytes < 0)
        error("Error sending data to client");
}

void closeSocket(int sock)
{
    if (close(sock) < 0)
        error("Error closing socket");
}

void handleClient(int client_sock)
{
    char buffer[BUFFER_SIZE];
    int read_bytes;

    while (true)
    {
        read_bytes = recv(client_sock, buffer, BUFFER_SIZE - 1, 0);

        if (read_bytes < 0)
        {
            error("Error receiving data from client");
        }
        else if (read_bytes == 0)
        {
            std::cout << "Client disconnected\n";
            break;
        }
        else
        {
            buffer[read_bytes] = '\0'; // Null-terminate the received data

            char option = buffer[0];
            std::cout << "Client chose option: " << option << std::endl;

            switch (option)
            {
            case '1':
                std::cout << "Client chose to continue.\n";
                send(client_sock, "continue!", 9, 0);
                break;
            case '2':
                std::cout << "Client chose to close socket.\n";
                send(client_sock, "bye", 4, 0);
                // closeSocket(client_sock); only in not same computer
                return;
            default:
                std::cout << "Invalid option received from client.\n";
            }
        }
    }

    // closeSocket(client_sock); only in not same computer
}

int main()
{
    int sock = createSocket();

    struct sockaddr_in sin;
    memset(&sin, 0, sizeof(sin));
    sin.sin_family = AF_INET;
    sin.sin_addr.s_addr = INADDR_ANY;
    sin.sin_port = htons(SERVER_PORT);

    bindSocket(sock, sin);
    listenToSocket(sock);

    while (true)
    {
        struct sockaddr_in client_sin;
        unsigned int addr_len = sizeof(client_sin);
        int client_sock = accept(sock, (struct sockaddr *)&client_sin, &addr_len);
        if (client_sock < 0)
        {
            error("Error accepting client");
        }

        std::thread client_thread(handleClient, client_sock); // Create a new thread for each client
        client_thread.detach();                               // Detach the thread so it can run independently
    }

    closeSocket(sock);
    return 0;
}

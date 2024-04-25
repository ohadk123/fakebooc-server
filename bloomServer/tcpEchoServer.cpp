#include <iostream>
#include <cstring>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <thread>            // Include the thread header
#include "UserInterection.h" // Include the header file for UserInteraction class
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
    cout << "socket " << sock << " closed" << endl;
    if (close(sock) < 0)
        error("Error closing socket");
}

void doQuit()
{
    exit(0);
}
void handleClient(int client_sock, UserInterection &ui)
{
    char buffer[BUFFER_SIZE];
    int read_bytes;

    while ((read_bytes = recv(client_sock, buffer, BUFFER_SIZE - 1, 0)) > 0)
    {
        buffer[read_bytes] = '\0'; // Null-terminate the received data
        cout << "Received command: " << buffer << endl;

        if (strcmp(buffer, "quit") == 0)
        {
            cout << "Client requested to disconnect." << endl;
            break; // Exit loop and close connection
        }
        std::string commandResponse = ui.InputCommand(buffer);
        if (commandResponse.empty())
        {
            commandResponse = "No response generated";
        }

        sendData(client_sock, commandResponse.c_str());
    }

    if (read_bytes == 0)
    {
        // Client closed connection gracefully
        cout << "Client disconnected, closing connection." << endl;
    }
    else if (read_bytes < 0)
    {
        // Error receiving data
        perror("Error receiving data from client");
    }

    closeSocket(client_sock);
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

    UserInterection ui; // Single instance for all threads

    while (true)
    {

        struct sockaddr_in client_sin;
        unsigned int addr_len = sizeof(client_sin);
        int client_sock = accept(sock, (struct sockaddr *)&client_sin, &addr_len);
        if (client_sock < 0)
        {
            error("Error accepting client");
        }
        cout << "new socket? " << client_sock << endl;
        std::thread client_thread(handleClient, client_sock, std::ref(ui)); // Pass ui by reference
        client_thread.detach();
    }

    closeSocket(sock);
    return 0;
}

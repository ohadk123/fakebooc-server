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
    if (close(sock) < 0)
        error("Error closing socket");
}

void doQuit()
{
    exit(0);
}
<<<<<<< HEAD
void handleClient(int client_sock, UserInterection &ui)
=======
void handleClient(int client_sock, UserInterection ui)
>>>>>>> 060615be59fbe5ae3463062cd3a317ca0e5bf1a1
{
    char buffer[BUFFER_SIZE];
    while (true)
    {
        memset(buffer, 0, BUFFER_SIZE); // Clear buffer at the start of the loop
<<<<<<< HEAD
        int read_bytes = recv(client_sock, buffer, BUFFER_SIZE - 1, 0);

        cout << "received command  read bytes: " << read_bytes << "and buffer is :---&" << buffer << "&----" << endl;

=======
        read_bytes = recv(client_sock, buffer, BUFFER_SIZE - 1, 0);
        cout << "lets see read_bytes: " << read_bytes << " and buffer: " << buffer << " and len is : " << endl;
>>>>>>> 060615be59fbe5ae3463062cd3a317ca0e5bf1a1
        if (read_bytes < 0)
        {
            perror("Error receiving data from client");
            break;
        }
        else if (read_bytes == 0)
        {
            buffer[read_bytes] = '\0'; // Null-terminate the received data

<<<<<<< HEAD
            sendData(client_sock, "quit done");
            closeSocket(client_sock);
            return;
=======
            std::cout << "what is the command to execute: " << buffer << "---" << std::endl;

            std::cout << strcmp(buffer, "quit") << buffer << std::endl;
            if (strcmp(buffer, "quit") == 0)
            {
                std::cout << "its in baby... " << buffer << std::endl;
                doQuit();
            }
            // todo send to bloom filter and receive response from it
            std::string response = ui.InputCommand(buffer);
            cout << "pb here?1212" << endl;
            if (response == "bad")
            {

                std::cout << "Invalid option received from client.\n";
                // todo return error message to client
            }

            if (response.empty())
            {
                cout << "empty" << std::endl;
                response = "done";
            }

            const char *response_data = response.c_str();
            cout << "pb here?18" << endl;
            sendData(client_sock, response_data);
            cout << "pb here?19" << endl;
>>>>>>> 060615be59fbe5ae3463062cd3a317ca0e5bf1a1
        }
        buffer[read_bytes] = '\0'; // Null-terminate the received data

        if (strcmp(buffer, "quit") == 0)
        {
            std::cout << "Client disconnected empty\n";
            sendData(client_sock, "quit");
            closeSocket(client_sock);
            return;
        }
        std::string commandResponse = ui.InputCommand(buffer);
        if (commandResponse.empty())
        {
            commandResponse = "No response generated";
        }
        sendData(client_sock, commandResponse.c_str());
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
<<<<<<< HEAD

    UserInterection ui; // Single instance for all threads
=======

    std::string resp;
    UserInterection ui;

    // resp = ui.InputCommand("8 1 2");
    // cout << resp << endl;
    // resp = ui.InputCommand("1 mamamia");
    // cout << resp << endl;
    // resp = ui.InputCommand("2 mamamia");
    // cout << resp << endl;
>>>>>>> 060615be59fbe5ae3463062cd3a317ca0e5bf1a1

    while (true)
    {
       
        struct sockaddr_in client_sin;
        unsigned int addr_len = sizeof(client_sin);
        int client_sock = accept(sock, (struct sockaddr *)&client_sin, &addr_len);
        if (client_sock < 0)
        {
            error("Error accepting client");
        }

<<<<<<< HEAD
        std::thread client_thread(handleClient, client_sock, std::ref(ui)); // Pass ui by reference
        client_thread.detach();                                             // Detach the thread so it can run independently
=======
        std::thread client_thread(handleClient, client_sock, ui); // Create a new thread for each client
        client_thread.detach();

        // Detach the thread so it can run independently
>>>>>>> 060615be59fbe5ae3463062cd3a317ca0e5bf1a1
    }

    closeSocket(sock);

    return 0;
}

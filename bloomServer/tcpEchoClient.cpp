#include <iostream>
#include <sys/socket.h>
#include <stdio.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>

using namespace std;

const char *ip_address = "127.0.0.1";
const int port_no = 5555;

int main()
{
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0)
    {
        perror("error creating socket");
        return 1;
    }

    struct sockaddr_in sin;
    memset(&sin, 0, sizeof(sin));
    sin.sin_family = AF_INET;
    sin.sin_addr.s_addr = inet_addr(ip_address);
    sin.sin_port = htons(port_no);

    if (connect(sock, (struct sockaddr *)&sin, sizeof(sin)) < 0)
    {
        perror("error connecting to server");
        close(sock);
        return 1;
    }

    char data_addr[4096];
    char buffer[4096];
    int data_len = strlen(data_addr);

    while (true)
    {
        if (fgets(data_addr, sizeof(data_addr), stdin) == NULL)
        {
            perror("error reading user input");
            close(sock);
            return 1;
        } // Check if user wants to quit
        if (strcmp(data_addr, "quit") == 0)
        {
            cout << "Exiting...\n";
            break;
        }
        data_len = strlen(data_addr);
        int sent_bytes = send(sock, data_addr, data_len, 0);
        if (sent_bytes < 0)
        {
            perror("error sending data");
            close(sock);
            return 1;
        }

        int expected_data_len = sizeof(buffer);
        int read_bytes = recv(sock, buffer, expected_data_len - 1, 0);
        buffer[read_bytes] = '\0'; // Null-terminate the received data

        if (read_bytes == 0)
        {
            cout << "Connection closed by server222222\n";
            close(sock);
            return 0;
        }
        if (strcmp(buffer, "bye") == 0)
        {
            cout << "Connection closed by server\n";
            close(sock);
            return 0;
        }
        else if (read_bytes < 0)
        {
            perror("error receiving data");
            close(sock);
            return 1;
        }
        else
        {
            if (strcmp(buffer, "done") != 0)
            {
                cout << buffer << endl;
            }
        }
    }

    close(sock);
    return 0;
}

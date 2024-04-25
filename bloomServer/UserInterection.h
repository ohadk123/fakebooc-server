#ifndef USER_INTERECTION_H
#define USER_INTERECTION_H

#include "InputInspector.h"
#include "BloomFilter.h"
#include <string>
#include <vector>
#include <mutex>

class UserInterection
{
public:
    static std::mutex mtx; // Mutex to protect shared variables like flag
    BloomFilter bfilt;
    int flag = 0;

    UserInterection();
<<<<<<< HEAD
    vector<string> stream(char *input);
=======

    // Method to split a string into a vector of strings (tokens)
    vector<string> stream(char *input);

    // Method to initialize a BloomFilter with given tokens
>>>>>>> 060615be59fbe5ae3463062cd3a317ca0e5bf1a1
    BloomFilter initializeBloomFilter(const std::vector<std::string> &data);
    std::string processCommand(BloomFilter &filter, const std::vector<std::string> &command);
    int run();
    std::string InputCommand(char *input);
};

#endif // USER_INTERECTION_H

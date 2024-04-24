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
    vector<string> stream(char *input);
    BloomFilter initializeBloomFilter(const std::vector<std::string> &data);
    std::string processCommand(BloomFilter &filter, const std::vector<std::string> &command);
    int run();
    std::string InputCommand(char *input);
};

#endif // USER_INTERECTION_H

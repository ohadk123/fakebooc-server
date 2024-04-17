// Guard to prevent multiple inclusions of the header file
#ifndef USER_INTERECTION_H
#define USER_INTERECTION_H

#include "InputInspector.h" // Include InputInspector class definition
#include "BloomFilter.h"    // Include BloomFilter class definition
#include <string>           // Include the string library for string handling
#include <vector>           // Include the vector library for vector handling
using namespace std;        // Use the standard namespace

// Declaration of the UserInterection class
class UserInterection
{
public:
    BloomFilter bfilt;
    int flag;
    // Default constructor
    UserInterection();

    // Method to split a string into a vector of strings (tokens)
    vector<string> stream(const std::string &input);

    // Method to initialize a BloomFilter with given tokens
    BloomFilter initializeBloomFilter(const std::vector<std::string> &data);

    // Method to process commands based on the tokens
    void processCommand(BloomFilter &filter, const std::vector<std::string> &command);

    // Method to run the UserInteraction process
    int run();
    int InputCommand(char *input);
};

// End of the include guard
#endif

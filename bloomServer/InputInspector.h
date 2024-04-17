#ifndef INPUT_INSPECTOR_H
#define INPUT_INSPECTOR_H

#include <iostream>
#include <sstream>
#include <vector>
#include <functional>
#include <unordered_set>
#include <tuple>
#include <string> // Include for std::string
using namespace std;

// InputInspector class for validating and inspecting input strings.
class InputInspector
{
private:
    vector<string> input; // Stores input strings for inspection

    // Helper function to check if a string is a legal digit.
    bool isLegalDigit(const std::string &str);

    // Helper function to check if a string is a positive integer.
    bool isPositiveInteger(const std::string &s);

public:
    // Constructor that takes a vector of input strings.
    InputInspector(vector<string> input);

    // Member function to check if it's the first input in the vector.
    bool isFirstInput();
};

#endif // INPUT_INSPECTOR_H

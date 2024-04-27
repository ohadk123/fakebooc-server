#include "BloomFilter.h"
#include "InputInspector.h"
using namespace std;

// Constructor: Initializes an InputInspector object with a given vector of strings.
InputInspector::InputInspector(vector<string> input)
{
    this->input = input;
}

// Function to check if a string consists of only the digits '1' or '2'.
bool InputInspector::isLegalDigit(const string &str)
{
    // Check if the string is either '1' or '2'. Returns true if it is, false otherwise.
    if (str != "1" && str != "2")
    {
        return false;
    }

    return true;
}

// Function to check if a string represents a valid positive integer.
bool InputInspector::isPositiveInteger(const string &s)
{
    try
    {
        // Attempt to convert the string to an integer.
        int parsedInteger = stoi(s);
        // Check if the parsed integer is greater than 0. If yes, return true.
        if (parsedInteger > 0)
            return true;
    }
    catch (exception &)
    {
        // If conversion to integer fails, return false.
        return false;
    }
    return false; // Return false if parsing or non-positive check fails.
}

// Function to check if the first input in the vector is valid.
bool InputInspector::isFirstInput()
{

    // Check if the input size is less than or equal to 1, return false if so.
    if (input.size() <= 1)
    {
        return false;
    }

    for (int i = 0; i < input.size(); i++)
    {
        // For the first element in the input, check if it's a positive integer.
        if (i == 0)
        {
            if (!isPositiveInteger(input[i]) || input.size() == 1)
            {
                 return false;
            }
        }
        else
        {
            // For other elements, check if they are legal digits ('1' or '2') and positive integers.
            if (!isLegalDigit(input[i]) || !isPositiveInteger(input[i]))
            {
                return false;
            }
        }
    }
    // Return true if all checks pass.
    return true;
}

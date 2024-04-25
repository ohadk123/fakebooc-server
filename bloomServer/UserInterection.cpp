#include "UserInterection.h"

std::mutex UserInterection::mtx; // Initialize the static mutex

// Constructor for UserInteraction class
UserInterection::UserInterection()
{
<<<<<<< HEAD
=======
    flag = 0;
    char *init = "8 1 2";
    InputCommand(init);
>>>>>>> 060615be59fbe5ae3463062cd3a317ca0e5bf1a1
}

// Function to split a string into a vector of strings (tokens)
vector<string> UserInterection::stream(char *input)
{
<<<<<<< HEAD

=======
    cout << "pb here?1" << endl;
>>>>>>> 060615be59fbe5ae3463062cd3a317ca0e5bf1a1
    istringstream iss(input);
    vector<string> tokens;
    string token;
    // Tokenize the input string
    while (iss >> token)
    {
        tokens.push_back(token);
    }
    return tokens;
}

// Function to initialize a BloomFilter with given tokens
BloomFilter UserInterection::initializeBloomFilter(const vector<string> &tokens)
{
    // Check if tokens size is less than 2, return an empty BloomFilter
    if (tokens.size() < 2)
    {
        return BloomFilter();
    }

    vector<int> data;
    // Push first two tokens into the data vector
    data.push_back(stoi(tokens[0]));
    data.push_back(stoi(tokens[1]));

    // Process remaining tokens
    for (int i = 2; i < tokens.size(); i++)
    {
        // Add unique tokens to the data vector
        if (data[1] != stoi(tokens[i]))
        {
            data.push_back(stoi(tokens[i]));
            // Break loop after adding the third unique token
            if (data.size() == 3)
            {
                break;
            }
        }
    }

    return BloomFilter(data);
}

// Function to process commands based on the tokens
std::string UserInterection::processCommand(BloomFilter &bfilt, const vector<string> &tokens)
{
    // Return if tokens are empty
    if (tokens.empty())
        return "badie";

    // Add URL to BloomFilter if command is '1'
    if (tokens[0] == "1" && tokens.size() == 2)
    {
        bfilt.addUrl(tokens[1]);
        return "";
    }
    else
    {
        // Check if URL exists in BloomFilter if command is '2'
        if (tokens[0] == "2" && tokens.size() == 2)
        {
            return bfilt.isUrlExist(tokens[1]);
        }
    }
    return "";
}

std::string UserInterection::InputCommand(char *input)
{
<<<<<<< HEAD
    std::lock_guard<std::mutex> lock(mtx);
=======

>>>>>>> 060615be59fbe5ae3463062cd3a317ca0e5bf1a1
    vector<string> tokens = stream(input);
    cout << "pb here?2" << endl;
    InputInspector input2(tokens);
<<<<<<< HEAD
=======
    cout << "pb here?3"
         << "my flag: " << flag << endl;
>>>>>>> 060615be59fbe5ae3463062cd3a317ca0e5bf1a1
    // Initialize BloomFilter on first input

    if (flag == 0 && input2.isFirstInput())
    {
        flag = 1;

        bfilt = initializeBloomFilter(tokens);

        return "";
    }
    else
    {
<<<<<<< HEAD

        std::string resp = processCommand(bfilt, tokens);
=======
        cout << "pb here?5" << endl;
        std::string resp = processCommand(bfilt, tokens);
        cout << "pb here?6" << endl;
>>>>>>> 060615be59fbe5ae3463062cd3a317ca0e5bf1a1
        // Process commands for subsequent inputs
        return resp;
    }
}

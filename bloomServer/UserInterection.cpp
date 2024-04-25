#include "UserInterection.h"

std::mutex UserInterection::mtx; // Initialize the static mutex

// Constructor for UserInteraction class
UserInterection::UserInterection()
{
}

// Function to split a string into a vector of strings (tokens)
vector<string> UserInterection::stream(char *input)
{

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
int safe_stoi(const string &str)
{
    try
    {
        return std::stoi(str);
    }
    catch (const std::exception &e)
    {
        std::cerr << "Conversion error: " << e.what() << '\n';
        return 0; // Or handle the error in a way that fits your application logic
    }
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
        return "addUrl";
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

    std::lock_guard<std::mutex> lock(mtx);

    vector<string> tokens = stream(input);
    InputInspector input2(tokens);
    // Initialize BloomFilter on first input

    if (flag == 0 && input2.isFirstInput())
    {
        flag = 1;
        bfilt = initializeBloomFilter(tokens);
        cout << "BloomFilter initialized and size is " << bfilt.size << endl;
        return "";
    }
    else
    {

        return processCommand(bfilt, tokens);
        // Process commands for subsequent inputs
    }
}

#ifndef BLOOM_FILTER_H
#define BLOOM_FILTER_H

#include <iostream>
#include <sstream>
#include <vector>
#include <functional>
#include <unordered_set>
#include <tuple>
using namespace std;

// Define the BloomFilter class
class BloomFilter
{
private:
    std::vector<bool> filter;      // Vector of bools to represent the filter
    std::vector<std::string> list; // Vector of URLs
    std::hash<std::string> hashFun; // Hash function for string processing

public:
    int size; // Size of the Bloom filter
    std::vector<int> hashFilters; // Vector to store hash values for filtering

    // Constructors
    BloomFilter(); // Default constructor
    BloomFilter(const std::vector<int> &data); // Constructor with data initialization

    // Member functions
    // Add a URL to the filter
    void addUrl(std::string url);
    // Get the hash index for a given URL based on the hash type
    int getUrlHashIndex(int hashType, string url);

    // Check if a URL exists in the filter
    std::string isUrlExist(std::string url);
    // Helper function for isUrlExist to check if a URL is blacklisted
    bool isUrlBlacklisted(std::string url);
    // Get the list of URLs
    std::vector<std::string> getList();

    // Getters
    // Get the filter vector
    const std::vector<bool> getFilter();
    // Get the list of URLs
    const std::vector<std::string> getUrlList();

    // Overload equality operator for BloomFilter objects comparison
    friend bool operator==(BloomFilter lbf, BloomFilter rbf);
};

#endif // BLOOM_FILTER_H

#include "BloomFilter.h"

// Default constructor. Initializes an invalid Bloom filter with size -1.
BloomFilter::BloomFilter()
{
    size = -1;
}

// Parameterized constructor. Initializes a Bloom filter with the given set of hash filters.
// The first element of the input vector 'data' sets the size of the filter.
// Subsequent elements are added as hash filters.
BloomFilter::BloomFilter(const vector<int> &data)
{
    size = data[0];                 // Set the size of the filter to the first element of the data vector.
    std::vector<std::string> list;  // Local list to store URLs (will be part of the class).
    std::hash<std::string> hashFun; // Hash function for processing URLs.
    for (int i = 1; i < data.size(); i++)
    {
        cout << "my hash code" << data[i] << endl;
        hashFilters.push_back(data[i]); // Store hash filters from the input data.
    }

    filter = std::vector<bool>(size, false); // Initialize the filter with the given size and set all bits to false.
}

// Returns the current state of the filter.
const vector<bool> BloomFilter::getFilter()
{
    return filter;
}

// Returns the list of URLs that have been added to the Bloom filter.
const vector<string> BloomFilter::getUrlList()
{
    return list;
}

// Adds a new URL to the Bloom filter.
// This involves adding the URL to the list and updating the filter bits using the hash functions.
void BloomFilter::addUrl(string url)
{
    cout << "in add url size is: " << size << endl;

    // Create a copy of the existing list
    std::vector<string> newList = list;

    // Add the new URL to the copy of the list
    newList.push_back(url);

    // Update the 'list' member variable to the modified copy
    list = newList;

    // Update the filter for the new URL using the hash functions.
    for (int i = 0; i < hashFilters.size(); i++)
    {
        cout << "in HF size is: " << hashFilters.size() << endl;
        int index = getUrlHashIndex(hashFilters[i], url);

        cout << "and we put in: " << index << endl;

        filter[index] = true;
    }
}

// Calculates the index in the filter for a given URL using a specified hash type.
int BloomFilter::getUrlHashIndex(int hashType, string url)
{
    std::size_t hashCode = hashFun(url); // Use size_t to hold hash values
    std::cout << "Initial hash code: " << hashCode << std::endl;

    // Apply hash function repeatedly as specified by hashType
    for (int i = 1; i < hashType; i++)
    {
        std::cout << "Hash code before re-hash: " << hashCode << std::endl;
        hashCode = hashFun(std::to_string(hashCode)); // Re-hash the hash code
        std::cout << "Hash code after re-hash: " << hashCode << std::endl;
    }

    // Calculate the index, ensuring it's non-negative and within the bounds of 'size'
    int index = static_cast<int>(hashCode % size);
    std::cout << "Final index: " << index << std::endl;
    return index;
}

// Checks if a URL is potentially in the blacklist, based on the filter.
// Returns true if the URL is possibly blacklisted, false otherwise.
bool BloomFilter::isUrlBlacklisted(std::string url)
{
    for (int i = 0; i < hashFilters.size(); i++)
    {
        if (filter[getUrlHashIndex(hashFilters[i], url)] == false)
        {
            return false;
        }
    }

    return true;
}

// Checks if a URL exists in the list and whether it's blacklisted according to the filter.
// Returns "true true" if the URL is in the list and blacklisted, "true false" if in the list but not blacklisted, and "false" if not in the list.
string BloomFilter::isUrlExist(std::string url)
{
    if (isUrlBlacklisted(url) == false)
    {
        return "false";
    }

    for (std::string elem : list)
    {
        if (elem == url)
        {
            return "true true";
        }
    }
    return "true false";
}

// Overloaded equality operator. Checks if two Bloom filters are equal based on their filter and URL list.
bool operator==(BloomFilter lbf, BloomFilter rbf)
{
    bool isFilter = lbf.getFilter() == rbf.getFilter();
    bool isList = lbf.getUrlList() == rbf.getUrlList();
    return isFilter && isList;
}

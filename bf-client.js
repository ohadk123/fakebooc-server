import net from "net";
const ip_address = "127.0.0.1";
const port_no = 5555;

async function checkServer(message) {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();
    let isResponseReceived = false; // Flag to check if response has been received

    client.connect(port_no, ip_address, () => {
      console.log("Connected to server.");
      client.write(message);
    });

    client.on("data", (data) => {
      console.log("Received: " + data);
      isResponseReceived = true; // Set the flag as response is received
      //   client.end(); // Close connection after receiving the response
      client.destroy();
      resolve(data.toString().trim()); // Resolve with the received data
    });

    client.on("close", () => {
      console.log("Connection closed.");
      if (!isResponseReceived) {
        // Only reject if no response has been received
        reject(new Error("Connection closed prematurely"));
      }
    });

    client.on("error", (err) => {
      console.error("Error: " + err.message);
      reject(err); // Reject on actual error
    });
  });
}

function getLink(content) {
  // Define the regex pattern for URLs
  const regex =
    /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|(([^\s()<>]+|(([^\s()<>]+)))))+(?:(([^\s()<>]+|(([^\s()<>]+))))|[^\s`!()[\]{};:'".,<>?«»“”‘’]))/gi;

  // Use the regex to find matches in the content
  const matches = content.match(regex);

  // Return the matches or an empty array if no matches are found
  return matches || [];
}

export default checkServer;

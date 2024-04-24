import net from "net";
const ip_address = "127.0.0.1";
const port_no = 5555;

// Function that establishes a TCP connection and sends a message
async function checkServer(message) {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();

    client.connect(port_no, ip_address, () => {
      console.log("Connected to server.");
      client.write(message);
    });

    client.on("data", (data) => {
      console.log("Received: " + data);
      client.destroy(); // close connection after receiving the response
      resolve(data.toString().trim()); // Resolve with the received data
    });

    client.on("close", () => {
      console.log("Connection closed.");
    });

    client.on("error", (err) => {
      console.error("Error: " + err.message);
      reject(err);
    });
  });
}

export default checkServer;

import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

// Allow to clear the console everytime we run a publisher
console.clear();
// Create a nats connection
const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");
// Publish method of TicketCreatedPublisher class written as promise
  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: "123",
      title: "concert",
      price: 20,
    });
  } catch (e) {
    console.error(e);
  }
});

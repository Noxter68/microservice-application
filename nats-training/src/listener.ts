import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from './events/ticket-created-listener';

// Allow to clear the console everytime we run a listener
console.clear();
// Create a nats connection
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });
// Custom class of an Ticket created event
  new TicketCreatedListener(stan).listen();
});

// Stop the server gracefully and avoid delay
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());


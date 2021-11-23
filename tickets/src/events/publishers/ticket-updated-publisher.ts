import { Publisher, Subjects, TicketUpdatedEvent } from "@nxticket/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}

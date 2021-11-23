import { Publisher, OrderCancelledEvent, Subjects } from "@nxticket/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

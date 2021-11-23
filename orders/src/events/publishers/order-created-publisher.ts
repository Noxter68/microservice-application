import { Publisher, OrderCreatedEvent, Subjects } from '@nxticket/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated
}
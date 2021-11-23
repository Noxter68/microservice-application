import { Publisher, PaymentCreatedEvent, Subjects  } from "@nxticket/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
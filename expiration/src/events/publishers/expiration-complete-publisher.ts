import { Subjects, Publisher, ExpirationCompleteEvent } from '@nxticket/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

}
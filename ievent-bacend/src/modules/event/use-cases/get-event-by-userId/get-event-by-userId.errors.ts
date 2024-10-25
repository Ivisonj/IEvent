import { UseCaseError } from 'src/shared/application/use-case.error';

export namespace GetEventsByUserIdErrors {
  export class EventNotFound extends UseCaseError {
    constructor() {
      super('Evento não encontrado');
    }
  }
}

import { UseCaseError } from 'src/shared/application/use-case.error';

export namespace GetEventByIdError {
  export class EventNotFound extends UseCaseError {
    constructor() {
      super('Evento não encontrado');
    }
  }

  export class Unauthorized extends UseCaseError {
    constructor() {
      super('Não autorizado');
    }
  }
}

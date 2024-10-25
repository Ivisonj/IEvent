import { UseCaseError } from 'src/shared/application/use-case.error';

export namespace CreateEventErrors {
  export class UserNotFound extends UseCaseError {
    constructor() {
      super('Usuário não encontrado');
    }
  }

  export class InvalidDate extends UseCaseError {
    constructor() {
      super('Data inválida');
    }
  }
}

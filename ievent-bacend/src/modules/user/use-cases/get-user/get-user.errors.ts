import { UseCaseError } from 'src/shared/application/use-case.error';

export namespace GetUserErrors {
  export class UserNotFound extends UseCaseError {
    constructor() {
      super('Usuário não encontrado');
    }
  }
}

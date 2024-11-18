import { UseCaseError } from 'src/shared/application/use-case.error';

export namespace GetUserByNameErrors {
  export class UserNotFound extends UseCaseError {
    constructor() {
      super('Usuário não encontrado');
    }
  }
}

import { UseCaseError } from 'src/shared/application/use-case.error';

export namespace DeleteEventError {
  export class EventNotFound extends UseCaseError {
    constructor() {
      super('Evento não encontrado');
    }
  }

  export class YouDoNotHavePermissionToExecuteThisAction extends UseCaseError {
    constructor() {
      super('Você não tem autorização para executar essa ação');
    }
  }
}

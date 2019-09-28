import { Msg } from './msg.model';

export class Chat {
  public readonly uid: string;
  constructor(public readonly msgs: Msg[]) {}
}

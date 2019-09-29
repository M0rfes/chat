import { Msg } from './msg.model';

export class Chat {
  public readonly uid: string = '';
  public readonly msgs: Msg[] = [];
  constructor(public chatName: string) {}
}

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Chat } from '../models/chat.model';
import { Msg } from '../models/msg.model';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private chatCollection: AngularFirestoreCollection<Chat>;
  constructor(private afs: AngularFirestore) {
    this.chatCollection = this.afs.collection('chats');
  }
  chat$(chantName: string) {
    console.log(chantName);
    return this.afs
      .collection<Chat>('chats', ref => ref.where('chatName', '==', chantName))
      .valueChanges()
      .pipe(map(chats => chats[0]));
  }
  async createChat(chatName: string) {
    const { id } = await this.chatCollection.add({
      chatName,
      msgs: [],
      uid: '',
    });
    return await this.chatCollection.doc<Chat>(id).update({ uid: id });
  }
  updateChat(uid: string, newChat: Partial<Chat>) {
    return this.chatCollection.doc(uid).update({ ...newChat });
  }
  addMsg(updatedMsg: Msg[], uid: string) {
    return this.updateChat(uid, { msgs: updatedMsg });
  }
}

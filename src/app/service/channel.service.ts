import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Channel } from '../models/channel.model';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private channelCollection: AngularFirestoreCollection<Channel>;

  constructor(private afs: AngularFirestore, private chatS: ChatService) {
    this.channelCollection = this.afs.collection<Channel>('channels');
  }
  channel$(uid: string) {
    return this.channelCollection.doc<Channel>(uid).valueChanges();
  }
  async createChannel(channel: Channel) {
    console.log(channel);
    const { id } = await this.channelCollection.add({
      ...channel,
    });
    this.chatS.createChat(id);
    return await this.channelCollection.doc<Channel>(id).update({ uid: id });
  }
  updateChannel(id: string, channel: Partial<Channel>) {
    return this.channelCollection.doc<Channel>(id).update({ ...channel });
  }
  findOne(id: string) {
    return this.channelCollection.doc<Channel>(id).valueChanges();
  }
  getALL() {
    return this.channelCollection.valueChanges();
  }
  get(lastId: string) {
    return this.afs
      .collection<Channel>('channels', ref =>
        ref
          .orderBy('uid')
          .startAfter(lastId)
          .limit(10),
      )
      .valueChanges();
  }
  delete(id: string) {
    return this.channelCollection.doc(id).delete();
  }
}

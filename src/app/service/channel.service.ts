import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Channel } from '../models/channel.model';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  channelCollection: AngularFirestoreCollection<Channel>;
  constructor(private afs: AngularFirestore) {
    this.channelCollection = this.afs.collection<Channel>('channels');
  }

  async createChannel(channel: Channel) {
    console.log(channel);
    const { id } = await this.channelCollection.add({
      ...channel,
    });
    return await this.channelCollection.doc<Channel>(id).update({ id });
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
          .orderBy('id')
          .startAfter(lastId)
          .limit(10),
      )
      .valueChanges();
  }
  delete(id: string) {
    return this.channelCollection.doc(id).delete();
  }
}

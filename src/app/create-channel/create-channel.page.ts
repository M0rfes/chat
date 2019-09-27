import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FileUploadService } from '../service/file-upload.service';

import { User } from '../models/user.model';
import { ChannelService } from '../service/channel.service';
import { Channel } from '../models/channel.model';
import { IsNewValidator } from '../util/isNew.validator';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.page.html',
  styleUrls: ['./create-channel.page.scss'],
})
export class CreateChannelPage implements OnInit, OnDestroy {
  @Input() new: boolean;
  @Input() channel?: Channel;
  @Input() user: User;
  form: FormGroup;
  photoURL: string;
  file: File;
  sub: Subscription;

  constructor(
    private modalCon: ModalController,
    private formB: FormBuilder,
    private channelS: ChannelService,
    private LoadingCon: LoadingController,
    private fileUploadS: FileUploadService,
    private afs: AngularFirestore,
  ) {}

  ngOnInit(): void {
    this.photoURL = this.channel
      ? this.channel.photoURL
      : 'https://source.unsplash.com/random';
    const nameVal = [
      [Validators.required, Validators.minLength(5), Validators.maxLength(25)],
      [
        IsNewValidator.field<Channel>(
          this.afs,
          this.channel,
          this.new,
          'channels',
          'name',
        ),
      ],
    ];
    const despVal = [
      [
        Validators.required,
        Validators.minLength(25),
        Validators.maxLength(225),
      ],
    ];
    if (this.new) {
      this.form = this.formB.group({
        name: ['', ...nameVal],
        description: ['', ...despVal],
      });
    } else {
      this.form = this.formB.group({
        name: ['', ...nameVal],
        description: ['', ...despVal],
      });
    }
  }

  onPreview(uri: string) {
    this.photoURL = uri;
  }
  onFile(file: File) {
    this.file = file;
  }
  async closeModal() {
    const modal = await this.modalCon.getTop();
    modal.dismiss();
  }
  private async submit(channel: Channel) {
    if (this.new) {
      return await this.channelS.createChannel(channel);
    } else {
      return await this.channelS.updateChannel(this.channel.uid, channel);
    }
  }
  async onSubmit() {
    this.form.disable();
    console.log('clicked');
    const loading = await this.LoadingCon.create({
      message: 'creating',
      duration: 5000,
    });
    await loading.present();
    if (this.file) {
      const path = `channel/${this.name.value}`;
      this.sub = this.fileUploadS
        .upload(path, this.file)
        .subscribe(async photoURL => {
          const newChannel = new Channel(
            this.name.value,
            this.description.value,
            this.user.uid,
            photoURL,
          );
          console.log(photoURL);
          await this.submit(newChannel);
          await loading.dismiss();
          await this.closeModal();
        });
      return;
    } else {
      const newChannel = new Channel(
        this.name.value,
        this.description.value,
        this.user.uid,
        this.photoURL,
      );
      await this.submit(newChannel);
      await loading.dismiss();
      await this.closeModal();

      return;
    }
  }

  get name() {
    return this.form.get('name');
  }
  get description() {
    return this.form.get('description');
  }
  get profileForm() {
    return this.form;
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

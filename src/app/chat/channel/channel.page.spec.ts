import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelPage } from './channel.page';

describe('ChannelPage', () => {
  let component: ChannelPage;
  let fixture: ComponentFixture<ChannelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

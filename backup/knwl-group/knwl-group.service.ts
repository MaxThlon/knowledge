import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RxStompService} from '@stomp/ng2-stompjs';
import {environment} from '../../environments/environment';
import {KnwlGroup} from './knwl-group';
import {KnwlDataType,
        KnwlData,
        UseKnwlData} from './knwl-data';

@Injectable({
  providedIn: 'root'
})
export class KnwlGroupService {
  //const topicSubscription: Subscription;

  constructor(private rxStompService: RxStompService) {}

  ngOnDestroy() {
    console.log('destroy KnwlGroupService');
    //this.topicSubscription.unsubscribe();
  }
/*
  getKnwlGroupList() {
    this.topicSubscription = this.rxStompService.watch('/user/queue/knwlgroups.updates').subscribe((message: Message) => {
      if (message.body) {
        console.log("got message with body " + message.body);
      } else {
        console.log("got empty message");
      }

      const jsonBody = JSON.parse(message.body);
      const knwlGroupList: KnwlGroup[] = jsonBody["content"];
      const pageable: Pageable = <Pageable>jsonBody["pageable"];
    }
  }*/
  createGroup(){}
  updateGroup (knwlGroup: KnwlGroup){}
}

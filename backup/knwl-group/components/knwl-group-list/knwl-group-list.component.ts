import {Component,
        OnInit,
        ChangeDetectionStrategy} from '@angular/core';
import {Observable,
        BehaviorSubject,
        Subscription} from 'rxjs';
import {CollectionViewer,
        DataSource} from '@angular/cdk/collections';
import {MatDialog} from '@angular/material';
import {Message} from '@stomp/stompjs';
import {RxStompService} from '@stomp/ng2-stompjs';
import {EThlonMenuItemType,
        ThlonMenuItemList} from 'thlon-menu';
import {Pageable} from '../../pageable';
import {KnwlGroup} from '../../knwl-group';
import {KnwlGroupService} from '../../knwl-group.service';
import {ThlonGroupDialogRenameComponent} from '../thlon-group-dialog-rename/thlon-group-dialog-rename.component';

enum EKnwlObjectType {
  KnwlGroup = "KnwlGroup"
}

enum EGroupsCommands {
  CREATE = "CREATE",
  DELETE = "DELETE",
  UPDATE = "UPDATE"
}

export class GroupsCommand {
  eGroupsCommand: EGroupsCommands;
  name: String;
}

@Component({
  selector: 'app-knwl-group-list',
  templateUrl: './knwl-group-list.component.html',
  styleUrls: ['./knwl-group-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KnwlGroupListComponent implements OnInit {
  knwlGroupDataSource: MyDataSource;
  //knwlGroupList$: Observable<KnwlGroup[]> = null;
  selectedKnwlGroup: KnwlGroup = null;
  menuItemList: ThlonMenuItemList;

  constructor(private rxStompService: RxStompService,
              private knwlGroupService: KnwlGroupService) {
    this.knwlGroupDataSource = new MyDataSource(rxStompService);
  }

  ngOnInit() {
    //this.knwlGroupList$ = this.knwlGroupService.getKnwlGroupList ()
  }

  public websocket(event, elem) {
    let groupsCreateCommand: GroupsCommand = new GroupsCommand ();
    groupsCreateCommand.eGroupsCommand = EGroupsCommands.CREATE;
    groupsCreateCommand.name = "New group";

    this.rxStompService.publish({destination: "/app/groups",
                                 body: JSON.stringify(groupsCreateCommand)});
    //this.knwlGroupList$ = this.knwlGroupService.getKnwlGroups();
  }

  onSelect(knwlGroup: KnwlGroup): void {
    this.selectedKnwlGroup = knwlGroup;
    this.menuItemList = this.generateMenuItemList();
  }

  generateMenuItemList () {
    let menuItemList: ThlonMenuItemList;
    if (this.selectedKnwlGroup) {
      menuItemList = [
        {
          menuItemType: EThlonMenuItemType.ServiceMethod,
          translation: "Rename",
          iconName: "create_new_folder",
          serviceType: MatDialog,
          methodName: "open",
          methodParameterArray: [ThlonGroupDialogRenameComponent,
                                 {width: '250px',
                                  data: {group: this.selectedKnwlGroup}}]
        },
        {
          menuItemType: EThlonMenuItemType.ServiceMethod,
          translation: "NewGroup",
          iconName: "create_new_folder",
          serviceType: MatDialog,
          methodName: "open",
          methodParameterArray: [ThlonGroupDialogRenameComponent,
                                 {width: '250px',
                                  data: {titleTranslation: "NewGroup", name: ''}}]
        }
      ];
    }

    return menuItemList;
  }
}

export class MyDataSource extends DataSource<KnwlGroup> {
  private length = 100000;
  private pageSize = 100;
  //private cachedData = Array.from<string>({length: this.length});
  private knwlGroupList: KnwlGroup[] = Array.from<KnwlGroup>({length: 0});
  private pageable: Pageable;
  //private fetchedPages = new Set<number>();
  private dataStream = new BehaviorSubject<KnwlGroup[]>(this.knwlGroupList);
  private topicSubscription: Subscription;
  private subscription = new Subscription();

  constructor(private rxStompService: RxStompService) {
    super ();
  }

  connect(collectionViewer: CollectionViewer): Observable<KnwlGroup[]> {
    this.topicSubscription = this.rxStompService.watch('/user/queue/knwlgroups.updates').subscribe((message: Message) => {
      if (message.body) {
        console.log("got message with body " + message.body);
      } else {
        console.log("got empty message");
      }

      const jsonBody = JSON.parse(message.body);

      for (let group of jsonBody["content"]) {
          this.knwlGroupList.push (<KnwlGroup>group);
      }
      this.pageable = <Pageable>jsonBody["pageable"];

      this.dataStream.next(this.knwlGroupList);
    });

    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
      //const startPage = this.getPageForIndex(range.start);
      //const endPage = this.getPageForIndex(range.end - 1);

      console.log("subscription viewChange " + range.start + " " + range.end);
      //this.rxStompService.publish({destination: "/app/groups"});

    }));

    this.rxStompService.publish({destination: "/app/groups"});

    return this.dataStream;
  }

  disconnect(): void {
    this.subscription.unsubscribe();
    this.topicSubscription.unsubscribe();
  }

  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }
/*
  private fetchPage(page: number) {
    if (this.fetchedPages.has(page)) {
      return;
    }
    this.fetchedPages.add(page);

    let groupsCreateCommand: GroupsCommand = new GroupsCommand ();
    groupsCreateCommand.eGroupsCommand = EGroupsCommands.CREATE;
    groupsCreateCommand.name = "New group";

    this.rxStompService.publish({destination: "/app/groups",
                                 body: JSON.stringify(groupsCreateCommand)});

    // Use `setTimeout` to simulate fetching data from server.
    setTimeout(() => {
      this.cachedData.splice(page * this.pageSize, this.pageSize,
          ...Array.from({length: this.pageSize})
              .map((_, i) => `Item #${page * this.pageSize + i}`));
      this.dataStream.next(this.cachedData);
    }, Math.random() * 1000 + 200);
  }*/
}

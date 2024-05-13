import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DataService } from '../data.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-reorder-list',
  templateUrl: './reorder-list.component.html',
  styleUrls: ['./reorder-list.component.css']
})
export class ReorderListComponent implements OnInit {
  items: string[] = [];
  dates: string[] = [];
  id = 0;
  uniqueIds = new Set<number>();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    const requests = [];

    while (this.uniqueIds.size < 7) {
      let potentialId = Math.floor(Math.random() * 10) + 1;
      if (!this.uniqueIds.has(potentialId)) {
        this.uniqueIds.add(potentialId);
        requests.push(this.dataService.getItemsById(potentialId));
      }
    }

    if (requests.length > 0) {
      forkJoin(requests).subscribe(results => {
        results.forEach(data => {
          this.items.push(data.description);
        });
        console.log(this.items); // Now this will log the fully populated array
      });
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  onButtonClick() {
    console.log('Button was clicked!');
    // Additional logic to perform on button click
  }

}

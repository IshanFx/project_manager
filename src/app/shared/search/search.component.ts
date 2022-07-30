import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  faSearch = faSearch

  search = new FormControl();
  @Output() searchWord = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
    this.search.valueChanges
    .pipe(debounceTime(300))
    .subscribe(value => {
      this.searchWord.emit(value)
    })
  }

}

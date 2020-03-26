import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  user: object;
  editvariable: string;
  constructor(private http: HttpClient) { }

deleteuser(id) {
    this.http.get('http://localhost/operations.php?op=delete&user_id=' + id).subscribe(data => {
      this.retrive();

    },
      error => {
        console.log(error);
      }
    )
  }

  retrive() {
    this.http.get('http://localhost/operations.php?op=retrive').subscribe(data => {
      this.user = data
    },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
    this.editvariable = '/edituser';
    this.retrive();
  }

}

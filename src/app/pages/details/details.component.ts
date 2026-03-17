import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  user: any;
  currentIndex: number = 0;
  totalUsers: number = 0;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.totalUsers = this.dataService.getData().length;
    this.route.paramMap.subscribe(params => {
      this.currentIndex = Number(params.get('id'));
      this.user = this.dataService.getUser(this.currentIndex);
    });
  }

  goBack() {
    this.router.navigate(['/list']);
  }

  goPrev() {
    if (this.currentIndex > 0) {
      this.router.navigate(['/details', this.currentIndex - 1]);
    }
  }

  goNext() {
    if (this.currentIndex < this.totalUsers - 1) {
      this.router.navigate(['/details', this.currentIndex + 1]);
    }
  }

}

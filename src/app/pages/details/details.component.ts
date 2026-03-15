import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  user:any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ){}

  ngOnInit(){

    const id = this.route.snapshot.paramMap.get('id');

    this.user = this.dataService.getUser(Number(id));

  }

  goBack(){

    this.router.navigate(['/list']);

  }

}

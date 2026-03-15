import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as Papa from 'papaparse';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  error = '';
  fileName = '';

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  onFileChange(event: any) {

    const file = event.target.files[0];

    if (!file) {
      this.error = "Please upload a CSV file";
      this.fileName = '';
      return;
    }

    this.fileName = file.name;
    this.error = '';

    Papa.parse(file, {

      header: true,
      skipEmptyLines: true,

      complete: (result: any) => {

        const data = result.data;

        this.dataService.setData(data);

        this.router.navigate(['/list']);
      }

    });

  }

}
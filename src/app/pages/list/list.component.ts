// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { DataService } from '../../services/data.service';

// @Component({
//   selector: 'app-list',
//   templateUrl: './list.component.html',
//   styleUrls: ['./list.component.css']
// })
// export class ListComponent implements OnInit {

//   users: any[] = [];
//   filteredUsers: any[] = [];
//   searchTerm: string = '';

//   avatarColors = [
//     'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//     'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//     'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
//     'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
//     'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
//     'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
//     'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
//   ];

//   constructor(
//     private dataService: DataService,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.users = this.dataService.getData();
//     this.filteredUsers = [...this.users];

//     if(this.users.length === 0){
//       this.router.navigate(['/']);
//     }
//   }

//   filterUsers() {
//     const term = this.searchTerm.toLowerCase().trim();
    
//     if (!term) {
//       this.filteredUsers = [...this.users];
//       return;
//     }

//     this.filteredUsers = this.users.filter(user => 
//       user.name.toLowerCase().includes(term) ||
//       user.phone_number.includes(term) ||
//       user.register_number.toLowerCase().includes(term)
//     );
//   }

//   getOriginalIndex(user: any): number {
//     return this.users.indexOf(user);
//   }

//   getAvatarColor(index: number): string {
//     return this.avatarColors[index % this.avatarColors.length];
//   }

//   openDetails(index: number){
//     this.router.navigate(['/details', index]);
//   }

// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  filterField: string = 'all';
  selectedModel: string = 'all';
  selectedDueRange: string = 'all';
  modelOptions: string[] = [];

  avatarColors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  ];

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.users = this.dataService.getData();
    this.filteredUsers = [...this.users];

    // Extract unique model values from CSV data
    const models = this.users
      .map(u => u.model)
      .filter(m => m && m.trim() !== '');
    this.modelOptions = [...new Set(models)].sort();

    if (this.users.length === 0) {
      this.router.navigate(['/']);
    }
  }

  filterUsers() {
    this.applyFilter();
  }

  applyFilter() {
    const term = this.searchTerm.toLowerCase().trim();

    // Model filter: use dropdown selection
    if (this.filterField === 'model') {
      this.filteredUsers = this.selectedModel === 'all'
        ? [...this.users]
        : this.users.filter(u => u.model === this.selectedModel);
      return;
    }

    // Due date filter: use range selection
    if (this.filterField === 'due_date') {
      if (this.selectedDueRange === 'all') {
        this.filteredUsers = [...this.users];
        return;
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let maxDate = new Date(today);

      if (this.selectedDueRange === '7days')  maxDate.setDate(today.getDate() + 7);
      if (this.selectedDueRange === '3days')  maxDate.setDate(today.getDate() + 3);
      if (this.selectedDueRange === 'month')  maxDate.setMonth(today.getMonth() + 1);
      if (this.selectedDueRange === 'overdue') maxDate = new Date(today);

      this.filteredUsers = this.users.filter(u => {
        if (!u.due_date) return false;
        const due = new Date(u.due_date);
        due.setHours(0, 0, 0, 0);
        if (this.selectedDueRange === 'overdue') return due < today;
        return due >= today && due <= maxDate;
      });
      return;
    }

    if (!term) {
      this.filteredUsers = [...this.users];
      return;
    }

    this.filteredUsers = this.users.filter(user => {
      if (this.filterField === 'all') {
        return (
          user.name.toLowerCase().includes(term) ||
          String(user.phone_number).includes(term) ||
          user.register_number.toLowerCase().includes(term) ||
          (user.due_date && String(user.due_date).toLowerCase().includes(term)) ||
          (user.model && user.model.toLowerCase().includes(term))
        );
      }
      const fieldValue = String(user[this.filterField] ?? '').toLowerCase();
      return fieldValue.includes(term);
    });
  }

  onFilterFieldChange() {
    this.searchTerm = '';
    this.selectedModel = 'all';
    this.selectedDueRange = 'all';
    this.applyFilter();
  }

  getOriginalIndex(user: any): number {
    return this.users.indexOf(user);
  }

  getAvatarColor(index: number): string {
    return this.avatarColors[index % this.avatarColors.length];
  }

  openDetails(index: number){
    this.router.navigate(['/details', index]);
  }

}


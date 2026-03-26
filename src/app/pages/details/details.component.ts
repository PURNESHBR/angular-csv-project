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

  // Messaging
  selectedTemplate: string = 'renewal';
  customMessage: string = '';

  predefinedTemplates: { [key: string]: string } = {
    renewal: 'Dear Customer, We tried reaching you regarding the insurance renewal of your {model}. Please contact us to renew your insurance now.',
    unreachable: 'Dear Customer, We tried reaching you but were unable to connect. Please call us back at your earliest convenience.',
    thankyou: 'Dear Customer, Thank you for renewing your insurance with us. We appreciate your trust and look forward to serving you.'
  };

  get messageText(): string {
    if (this.selectedTemplate === 'custom') return this.customMessage;
    const tpl = this.predefinedTemplates[this.selectedTemplate] || '';
    return tpl.replace('{model}', this.user?.model || 'your vehicle');
  }

  get charCount(): number {
    return this.messageText.length;
  }

  getWhatsAppUrl(): string {
    const phone = String(this.user?.phone_number || '').replace(/\D/g, '');
    const text = encodeURIComponent(this.messageText);
    return `https://api.whatsapp.com/send/?phone=${phone}&text=${text}&type=phone_number&app_absent=0`;
  }

  getSmsUrl(): string {
    const phone = String(this.user?.phone_number || '').replace(/\D/g, '');
    return `sms:${phone}?body=${encodeURIComponent(this.messageText)}`;
  }

  sendWhatsApp(): void {
    window.open(this.getWhatsAppUrl(), '_blank');
  }

  sendSms(): void {
    window.open(this.getSmsUrl(), '_blank');
  }

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

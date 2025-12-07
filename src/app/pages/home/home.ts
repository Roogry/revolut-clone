import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  awards = [
    {
      title: '#3 most downloaded finance app',
      image: 'assets/images/awards/mobile-store.png',
    },
    {
      title: '4.6 out of 5 on Trustpilot',
      image: 'assets/images/awards/trustpilot.png',
    },
    {
      title: 'Best International Payments Provider 2025',
      image: 'assets/images/awards/best-payment.png',
    },
    {
      title: 'Best Consumer Banking Mobile App 2025',
      image: 'assets/images/awards/best-fintech.png',
    },
  ];

  awardBadges = [
    {
      title: 'Customer Satisfaction — Gold',
      image: 'assets/images/awards/cust-satisfaction.png',
    },
    {
      title: 'Consumer Guardian Badge 2025',
      image: 'assets/images/awards/cons-guardian.png',
    },
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  plans = [
    {
      name: 'Standard',
      price: 'Free',
      description:
        'For the financial basics — everything you need for better money management in one place. Sending money abroad or sticking to a budget has never been easier.',
      bg: 'bg-white',
      text: 'text-gray-900',
    },
    {
      name: 'Plus',
      price: '£3.99/month',
      description:
        'For the smart spender — access additional benefits like better limits for spending abroad and insurance for your purchases, on our affordable paid plan.',
      bg: 'bg-white',
      text: 'text-gray-900',
    },
    {
      name: 'Premium',
      price: '£7.99/month',
      description:
        'For elevating every day — access exclusive subscriptions, better savings rates, and exchange unlimited amounts of money.',
      bg: 'bg-white',
      text: 'text-gray-900',
    },
    {
      name: 'Metal',
      price: '£14.99/month',
      description:
        'For the global travellers and traders — relax with travel insurance, enjoy enhanced limits, and subscriptions worth £2,100 annually.',
      bg: 'bg-white',
      text: 'text-gray-900',
    },
    {
      name: 'Ultra',
      price: '£55/month (introductory offer)',
      description:
        'For those seeking the best of Revolut — get exceptional benefits like unlimited airport lounge access, monthly global data, partner subscriptions, and cancellation cover.',
      bg: 'bg-white',
      text: 'text-gray-900',
    },
  ];

  footerLinks = [
    {
      title: 'Plans',
      links: ['Standard', 'Plus', 'Premium', 'Metal', 'Ultra', 'Compare Plans'],
      mdColumn: 1,
      mdRow: 1,
      lgColumn: 3,
      lgRow: 1,
    },
    {
      title: 'Investments',
      links: ['Stocks', 'Stocks & Shares ISA', 'Commodities'],
      mdColumn: 1,
      mdRow: 2,
      lgColumn: 2,
      lgRow: 2,
    },
    {
      title: 'Company',
      links: ['Sustainability', 'Code of Conduct'],
      mdColumn: 1,
      mdRow: 3,
      lgColumn: 5,
      lgRow: 2,
    },
    {
      title: 'Global Finances',
      links: ['International Transfers', 'eSIM Data Plans', 'Lounges', 'Insurance', 'Donations'],
      mdColumn: 2,
      mdRow: 1,
      lgColumn: 4,
      lgRow: 1,
    },
    {
      title: 'Help',
      links: ['Contact Us', 'Help Centre', 'System Status', 'Developers API', 'Site Map'],
      mdColumn: 2,
      mdRow: 2,
      lgColumn: 1,
      lgRow: 1,
    },
    {
      title: 'Accounts',
      links: [
        'Personal Account',
        'Joint Account',
        'Professional Account',
        'Savings Account',
        'For ages 16-17',
        'Parents and guardians',
      ],
      mdColumn: 3,
      mdRow: 1,
      lgColumn: 5,
      lgRow: 1,
    },
    {
      title: 'Security & Protection',
      links: [
        'How We Protect Your Money',
        'Report Lost Device',
        'Learn About Fraud & Scams',
        'Security Bugs',
        'Consumer Security Insight Report',
      ],
      mdColumn: 3,
      mdRow: 2,
      lgColumn: 2,
      lgRow: 1,
    },
    {
      title: 'Smart Spending',
      links: [
        'Cards',
        'Send & Receive',
        'Revolut Pay',
        'Money Management',
        'RevPoints',
        'Linked Accounts',
        'Shops',
      ],
      mdColumn: 4,
      mdRow: 1,
      lgColumn: 6,
      lgRow: 1,
    },
    {
      title: 'Crypto',
      links: ['Crypto', 'Revolut Ramp', 'Revolut X'],
      mdColumn: 4,
      mdRow: 2,
      lgColumn: 1,
      lgRow: 2,
    },
  ];

  gridColumnPlan(index: number) {
    if (index <= this.plans.length - 3) {
      return 'md:col-span-4';
    }

    return 'md:col-span-6';
  }

  get mdColumns() {
    const cols: any[][] = [[], [], [], []];
    this.footerLinks.forEach((link) => {
      // Ensure index is valid (1-4)
      const colIndex = (link.mdColumn || 1) - 1;
      if (cols[colIndex]) {
        cols[colIndex].push(link);
      }
    });
    // Sort by row
    cols.forEach((col) => col.sort((a, b) => (a.mdRow || 0) - (b.mdRow || 0)));
    return cols;
  }

  get lgColumns() {
    const cols: any[][] = [[], [], [], [], [], []];
    this.footerLinks.forEach((link) => {
      // Ensure index is valid (1-6)
      const colIndex = (link.lgColumn || 1) - 1;
      if (cols[colIndex]) {
        cols[colIndex].push(link);
      }
    });
    // Sort by row
    cols.forEach((col) => col.sort((a, b) => (a.lgRow || 0) - (b.lgRow || 0)));
    return cols;
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { fromEvent, throttleTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MegaMenuComponent, MegaMenuData } from '../mega-menu/mega-menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MegaMenuComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly activeTab = signal<string | null>(null);
  protected readonly isMegaMenuHovered = signal(false);
  protected readonly isNavHovered = signal(false);
  protected readonly isScrolled = signal(false);

  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  protected readonly showMegaMenu = computed(() => this.isNavHovered() || this.isMegaMenuHovered());
  protected readonly isMobileMenuOpen = signal(false);
  protected readonly mobileActiveTab = signal<string>('personal');

  protected readonly isHidden = signal(false);
  private lastScrollY = 0;

  constructor() {
    effect(() => {
      if (!this.isNavHovered() && !this.isMegaMenuHovered()) {
        this.activeTab.set(null);
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      fromEvent(this.document, 'scroll')
        .pipe(throttleTime(20), takeUntilDestroyed())
        .subscribe(() => {
          const currentScroll = window.scrollY;

          // Logic for background transparency
          this.isScrolled.set(currentScroll > 50);

          // Logic for hiding/showing header
          if (currentScroll > this.lastScrollY && currentScroll > 200) {
            // Scrolling DOWN and not at the very top
            this.isHidden.set(true);
          } else if (currentScroll < this.lastScrollY) {
            // Scrolling UP
            this.isHidden.set(false);
          }

          this.lastScrollY = currentScroll;
        });
    }
  }

  protected readonly navItems = [
    { id: 'personal', label: 'Personal' },
    { id: 'business', label: 'Business' },
    { id: 'kids', label: 'Kids & Teens' },
    { id: 'company', label: 'Company' },
  ];

  protected readonly menuData: Record<string, MegaMenuData> = {
    personal: {
      header: 'Discover Revolut',
      columns: [
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
          mdColumn: 1,
          mdRow: 1,
          lgColumn: 1,
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
          ],
          mdColumn: 1,
          mdRow: 2,
          lgColumn: 1,
          lgRow: 2,
        },
        {
          title: 'Security & Protection',
          links: [
            'How We Protect Your Money',
            'Report Lost Device',
            'Learn About Fraud & Scams',
            'Consumer Security Insight Report',
          ],
          mdColumn: 1,
          mdRow: 3,
          lgColumn: 2,
          lgRow: 1,
        },
        {
          title: 'Investments',
          links: ['Stocks', 'Stocks & Shares ISA', 'Commodities'],
          mdColumn: 2,
          mdRow: 1,
          lgColumn: 2,
          lgRow: 2,
        },
        {
          title: 'Crypto',
          links: ['Crypto', 'Revolut Ramp', 'Revolut X'],
          mdColumn: 2,
          mdRow: 2,
          lgColumn: 2,
          lgRow: 3,
        },
        {
          title: 'Global Finances',
          links: ['International Transfers', 'eSIM Data Plans'],
          mdColumn: 2,
          mdRow: 3,
          lgColumn: 3,
          lgRow: 1,
        },
        {
          title: 'Help',
          links: ['Contact Us', 'Help Centre', 'System Status'],
          mdColumn: 2,
          mdRow: 4,
          lgColumn: 3,
          lgRow: 2,
        },
        {
          title: 'Plans',
          links: ['Standard', 'Plus', 'Premium', 'Metal', 'Ultra', 'Compare Plans'],
          mdColumn: 1,
          mdRow: 4,
          lgColumn: 4,
          lgRow: 1,
        },
      ],
    },
    business: {
      header: 'Discover Revolut Business',
      columns: [
        {
          title: 'Essentials',
          links: [
            'Multi-Currency Account',
            'Expense Management',
            'Corporate Cards',
            'Money Transfers',
            'Bills',
          ],
          mdColumn: 1,
          mdRow: 1,
          lgColumn: 1,
          lgRow: 1,
        },
        {
          title: 'Treasury',
          links: ['Currency Exchange', 'Savings', 'Crypto'],
          mdColumn: 1,
          mdRow: 2,
          lgColumn: 1,
          lgRow: 2,
        },
        {
          title: 'Accept payments',
          links: [
            'Accept Payments',
            'Revolut Terminal',
            'Payment Links',
            'Revolut Reader',
            'Payment Gateway',
            'Revolut Pay',
            'Point of Sale',
            'Invoices',
            'Revolut Ramp',
          ],
          mdColumn: 1,
          mdRow: 3,
          lgColumn: 2,
          lgRow: 1,
        },
        {
          title: 'Platform',
          links: ['Analytics', 'Business APIs', 'Integrations', 'Rewards'],
          mdColumn: 2,
          mdRow: 1,
          lgColumn: 2,
          lgRow: 2,
        },
        {
          title: 'Revolut People',
          links: ['Platform', 'Performance', 'Recruitment', 'HR'],
          mdColumn: 2,
          mdRow: 2,
          lgColumn: 3,
          lgRow: 1,
        },
        {
          title: 'Solutions',
          links: ['Travel', 'Ecommerce', 'Marketing agencies'],
          mdColumn: 2,
          mdRow: 3,
          lgColumn: 3,
          lgRow: 2,
        },
        {
          title: 'Help & Resources',
          links: [
            'Customer Help',
            'Customer Stories',
            'Business Resources',
            'How we protect your money',
            'System Status',
            'Learn About Fraud & Scams',
            'Whats New',
          ],
          mdColumn: 2,
          mdRow: 3,
          lgColumn: 3,
          lgRow: 3,
        },
        {
          title: 'Plans',
          links: ['Business Account Pricing', 'Payment Acceptance Pricing'],
          mdColumn: 1,
          mdRow: 4,
          lgColumn: 4,
          lgRow: 1,
        },
      ],
    },
    kids: {
      header: '', // No specific header shown in the crop, or we can omit
      columns: [
        { title: '', links: ['For ages 6-15'], mdColumn: 1, mdRow: 1, lgColumn: 1, lgRow: 1 },
        { title: '', links: ['For ages 16-17'], mdColumn: 1, mdRow: 2, lgColumn: 2, lgRow: 1 },
        {
          title: '',
          links: ['Parents and guardians'],
          mdColumn: 2,
          mdRow: 1,
          lgColumn: 3,
          lgRow: 1,
        },
        { title: '', links: ['Help Center'], mdColumn: 2, mdRow: 2, lgColumn: 4, lgRow: 1 },
      ],
    },
    company: {
      header: 'Discover Our Company',
      columns: [
        {
          title: 'General',
          links: ['About Us', 'Blog', 'News & Media', 'Revolut Reviews'],
          mdColumn: 1,
          mdRow: 1,
          lgColumn: 1,
          lgRow: 1,
        },
        {
          title: 'Careers',
          links: [
            'Careers',
            'Working at Revolut',
            'Culture',
            'Talent Programmes',
            'Talent Programmes STEM Champions',
            'Diversity & Inclusion',
            'Relocation with Revolut',
          ],
          mdColumn: 2,
          mdRow: 1,
          lgColumn: 2,
          lgRow: 1,
        },
        {
          title: 'Shareholder Relations',
          links: ['Annual Report 2024', 'Reports and results'],
          mdColumn: 3,
          mdRow: 1,
          lgColumn: 3,
          lgRow: 1,
        },
      ],
    },
  };

  protected readonly activeMenuData = computed(() => {
    const tabId = this.activeTab();
    return tabId ? this.menuData[tabId] : null;
  });

  protected readonly mobileMenuData = computed(() => {
    return this.menuData[this.mobileActiveTab()];
  });

  setActiveTab(id: string | null) {
    this.activeTab.set(id);
  }

  setMobileActiveTab(id: string) {
    this.mobileActiveTab.set(id);
  }

  setMegaMenuHovered(isHovered: boolean) {
    this.isMegaMenuHovered.set(isHovered);
  }

  setIsNavHovered(isHovered: boolean) {
    this.isNavHovered.set(isHovered);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((v) => !v);
  }
}

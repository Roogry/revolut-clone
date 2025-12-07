import { ChangeDetectionStrategy, Component, computed, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { fromEvent, throttleTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
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

    constructor() {
        effect(() => {
            if (!this.isNavHovered() && !this.isMegaMenuHovered()) {
                this.activeTab.set(null);
            }
        });

        if (isPlatformBrowser(this.platformId)) {
            fromEvent(this.document, 'scroll')
                .pipe(
                    throttleTime(20),
                    takeUntilDestroyed()
                )
                .subscribe(() => {
                    const currentScroll = window.scrollY;
                    this.isScrolled.set(currentScroll > 50);
                });
        }
    }

    protected readonly navItems = [
        { id: 'personal', label: 'Personal' },
        { id: 'business', label: 'Business' },
        { id: 'kids', label: 'Kids & Teens' },
        { id: 'company', label: 'Company' },
    ];

    protected readonly menuData: Record<string, { header: string; columns: { title: string; items: string[] }[] }> = {
        personal: {
            header: 'Discover Revolut',
            columns: [
                {
                    title: 'Accounts',
                    items: [
                        'Personal Account',
                        'Joint Account',
                        'Professional Account',
                        'Savings Account',
                        'For ages 16-17',
                        'Parents and guardians',
                    ],
                },
                {
                    title: 'Smart Spending',
                    items: [
                        'Cards',
                        'Send & Receive',
                        'Revolut Pay',
                        'Money Management',
                        'RevPoints',
                        'Linked Accounts',
                    ],
                },
                {
                    title: 'Security & Protection',
                    items: [
                        'How We Protect Your Money',
                        'Report Lost Device',
                        'Learn About Fraud & Scams',
                        'Consumer Security Insight Report',
                    ],
                },
                {
                    title: 'Investments',
                    items: ['Stocks', 'Stocks & Shares ISA', 'Commodities'],
                },
                {
                    title: 'Crypto',
                    items: ['Crypto', 'Revolut Ramp', 'Revolut X'],
                },
                {
                    title: 'Global Finances',
                    items: ['International Transfers', 'eSIM Data Plans'],
                },
                {
                    title: 'Help',
                    items: ['Contact Us', 'Help Centre', 'System Status'],
                },
                {
                    title: 'Plans',
                    items: ['Standard', 'Plus', 'Premium', 'Metal', 'Ultra', 'Compare Plans'],
                },
            ],
        },
        business: {
            header: 'Discover Revolut Business',
            columns: [
                {
                    title: 'Essentials',
                    items: [
                        'Multi-Currency Account',
                        'Expense Management',
                        'Corporate Cards',
                        'Money Transfers',
                        'Bills',
                    ],
                },
                {
                    title: 'Treasury',
                    items: ['Currency Exchange', 'Savings', 'Crypto'],
                },
                {
                    title: 'Accept payments',
                    items: [
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
                },
                {
                    title: 'Revolut People',
                    items: ['Platform', 'Performance', 'Recruitment', 'HR'],
                },
                {
                    title: 'Solutions',
                    items: ['Travel', 'Ecommerce', 'Marketing agencies'],
                },
                {
                    title: 'Plans',
                    items: ['Business Account Pricing', 'Payment Acceptance Pricing'],
                },
            ],
        },
        kids: {
            header: '', // No specific header shown in the crop, or we can omit
            columns: [
                { title: '', items: ['For ages 6-15'] },
                { title: '', items: ['For ages 16-17'] },
                { title: '', items: ['Parents and guardians'] },
                { title: '', items: ['Help Center'] },
            ],
        },
        company: {
            header: 'Discover Our Company',
            columns: [
                {
                    title: 'General',
                    items: ['About Us', 'Blog', 'News & Media', 'Revolut Reviews'],
                },
                {
                    title: 'Careers',
                    items: [
                        'Careers',
                        'Working at Revolut',
                        'Culture',
                        'Talent Programmes',
                        'Talent Programmes STEM Champions',
                        'Diversity & Inclusion',
                        'Relocation with Revolut',
                    ],
                },
                {
                    title: 'Shareholder Relations',
                    items: ['Annual Report 2024', 'Reports and results'],
                },
            ],
        },
    };

    protected readonly activeMenuData = computed(() => {
        const tabId = this.activeTab();
        return tabId ? this.menuData[tabId] : null;
    });

    setActiveTab(id: string | null) {
        this.activeTab.set(id);
    }

    setMegaMenuHovered(isHovered: boolean) {
        this.isMegaMenuHovered.set(isHovered);
    }

    setIsNavHovered(isHovered: boolean) {
        this.isNavHovered.set(isHovered);
    }
}

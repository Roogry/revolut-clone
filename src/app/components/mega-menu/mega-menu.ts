import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MegaMenuColumn {
  title: string;
  links: string[];
  mdColumn: number;
  mdRow: number;
  lgColumn: number;
  lgRow: number;
}

export interface MegaMenuData {
  header: string;
  columns: MegaMenuColumn[];
}

@Component({
  selector: 'app-mega-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mega-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MegaMenuComponent {
  data = input<MegaMenuData | null>(null);

  protected readonly expandedIndex = signal<number | null>(null);

  toggleColumn(index: number) {
    this.expandedIndex.update((currentIndex) => (currentIndex === index ? null : index));
  }

  get mdColumns() {
    const maxColumns =
      this.data()?.columns.reduce((max, col) => Math.max(max, col.mdColumn || 1), 1) ?? 1;
    const cols = Array.from({ length: maxColumns }, () => [] as MegaMenuColumn[]);
    this.data()?.columns.forEach((link) => {
      // Ensure index is valid
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
    const cols: any[][] = [[], [], [], []];
    this.data()?.columns.forEach((link) => {
      // Ensure index is valid
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

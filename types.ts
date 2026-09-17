export type ScrapbookSection =
  | 'about'
  | 'day1'
  | 'day2'
  | 'day3'
  | 'day4'
  | 'slideshow';

export interface SectionItem {
  id: ScrapbookSection;
  label: string;
  iconName?: string;
}

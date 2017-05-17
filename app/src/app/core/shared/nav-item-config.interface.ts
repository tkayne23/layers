import { NavItemType } from './nav-item-type.enum';

export interface NavItemConfig {
  label: string;
  type: NavItemType;
  icon?: string;
  class?: string;
}

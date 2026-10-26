export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  nav: NavItem[];
  footerNav: NavItem[];
};

import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Team', href: getPermalink('/#members') },
    { text: 'Projects', href: getPermalink('/#projects') },
  ],
  actions: [{ text: 'GitHub', href: 'https://github.com/muitneliss', target: '_blank' }],
};

export const footerData = {
  links: [],
  secondaryLinks: [],
  socialLinks: [{ ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/muitneliss' }],
  footNote: 'multnelis · Ho Chi Minh City',
};

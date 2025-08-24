import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Services',
      href: getPermalink('/services'),
      links: [
         { text: 'Academic Support', href: '#academic-support' } ,
         { text: 'Behaviour Consultation', href: '#behaviour-consultation' }
      ],
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    /*{
      text: 'Blog',
      href: getBlogPermalink(),
    },*/
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [{ text: 'Free Consultation', href: getPermalink('/contact'), target: '_self' }],
};


export const footerData = {
  links: [
    {
      title: 'Services',
      links: [
        { text: 'Academic Support', href: '#academic-support' } ,
        { text: 'Behaviour Consultation', href: '#behaviour-consultation' }
      ],
    },
    /*{
      title: 'Support',
      links: [
        { text: 'Docs', href: '#' },
        { text: 'Community Forum', href: '#' },
        { text: 'Professional Services', href: '#' },
        { text: 'Skills', href: '#' },
        { text: 'Status', href: '#' },
      ],
    },*/
    {
      title: 'Company',
      links: [
        { text: 'About', href: '#' },
        { text: 'Blog', href: '#' },
        { text: 'Careers', href: '#' },
        /*{ text: 'Press', href: '#' },
        { text: 'Inclusion', href: '#' },
        { text: 'Social Impact', href: '#' },
        { text: 'Shop', href: '#' },*/
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    North Shore Precision Teaching · All rights reserved.
  `,
};

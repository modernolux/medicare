export const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative py-2 text-[15px] font-medium transition-colors duration-200 hover:text-brand-black after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand-green after:transition-transform after:duration-300 hover:after:scale-x-100 ${
    isActive ? 'text-brand-black after:scale-x-100' : 'text-brand-ink'
  }`;

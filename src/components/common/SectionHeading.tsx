interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  titleClassName?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  titleClassName = 'text-brand-black',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left';
  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className={`text-3xl font-bold sm:text-4xl ${titleClassName}`}>{title}</h2>
      {description && <p className="mt-4 text-base text-brand-muted sm:text-lg">{description}</p>}
    </div>
  );
}

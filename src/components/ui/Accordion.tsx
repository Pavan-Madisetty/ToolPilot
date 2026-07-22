import { useState, ReactNode } from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface AccordionItemProps {
  title: ReactNode;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function AccordionItem({
  title,
  children,
  isOpen = false,
  onToggle,
  className,
}: AccordionItemProps) {
  const [localOpen, setLocalOpen] = useState(false);
  const active = onToggle ? isOpen : localOpen;
  const toggle = onToggle ?? (() => setLocalOpen(!localOpen));

  return (
    <div className={clsx('accordion-card', className)}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={active}
        className="accordion-trigger"
      >
        <span className="pr-4">{title}</span>
        <ChevronDown
          size={18}
          className={clsx(
            'shrink-0 text-[var(--text-tertiary)] transition-transform duration-200',
            {
              'rotate-180': active,
            }
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="accordion-content-wrapper"
          >
            <div className="accordion-content">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export interface AccordionProps {
  items: Array<{
    title: ReactNode;
    content: ReactNode;
  }>;
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className={clsx('accordion-container', className)}>
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          title={item.title}
          isOpen={expandedIndex === idx}
          onToggle={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

export default Accordion;

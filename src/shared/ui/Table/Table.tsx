import {clsx} from 'clsx';
import {type ComponentPropsWithoutRef, forwardRef} from 'react';
import s from './Table.module.scss'

type TableProps = ComponentPropsWithoutRef<'table'>;

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...rest }, ref) => {
    const computedClass = clsx(className, s.table);

    return <table className={computedClass} ref={ref} {...rest} />;
  }
);
Table.displayName = 'Table';


type TableHeaderProps = ComponentPropsWithoutRef<'thead'>;

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...rest }, ref) => {
    const computedClass = clsx(className, s.thead);

    return <thead className={computedClass} ref={ref} {...rest} />;
  }
);
TableHeader.displayName = 'TableHeader';


type TableBodyProps = ComponentPropsWithoutRef<'tbody'>;

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...rest }, ref) => {
    const computedClass = clsx(className, s.tbody);

    return <tbody className={computedClass} ref={ref} {...rest} />;
  }
);
TableBody.displayName = 'TableBody';


type TableRowProps = ComponentPropsWithoutRef<'tr'>;

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...rest }, ref) => {
    const computedClass = clsx(className, s.tr);

    return <tr className={computedClass} ref={ref} {...rest} />;
  }
);
TableRow.displayName = 'TableRow';


type TableHeadProps = ComponentPropsWithoutRef<'th'>;

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...rest }, ref) => {
    const computedClass = clsx(className, s.th);

    return <th className={computedClass} ref={ref} {...rest} />;
  }
);
TableHead.displayName = 'TableHead';


type TableCellProps = ComponentPropsWithoutRef<'td'>;

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...rest }, ref) => {
    const computedClass = clsx(className, s.td);

    return <td className={computedClass} ref={ref} {...rest} />;
  }
);
TableCell.displayName = 'TableCell';


type TableFooterProps = ComponentPropsWithoutRef<'tfoot'>;

export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...rest }, ref) => {
    const computedClass = clsx(className, s.tfoot);

    return <tfoot className={computedClass} ref={ref} {...rest} />;
  }
);
TableFooter.displayName = 'TableFooter';
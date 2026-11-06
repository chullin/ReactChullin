'use client';

import { Card, type CardProps } from '@heroui/react';
import { twMerge } from 'tailwind-merge';

export default function SiteCard({ className, ...props }: CardProps) {
  return (
    <Card
      {...props}
      className={twMerge('rounded-3xl border border-slate-100 bg-white shadow-sm', className)}
    />
  );
}

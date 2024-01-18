import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) => {
  const formattedDate = format(new Date(dateString), 'dd MMM, yyyy');
  return formattedDate;
};

export const getFirstLetter = (name: string | undefined) => {
    return name?.charAt(0);
  };
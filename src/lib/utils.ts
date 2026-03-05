import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: string | number | Date) {
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date));
}

export function truncate(text: string, length: number): string {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}

export function getCollectionSlug(name: string): string {
    if (!name) return '';

    // Short slugs that are already correct — pass through
    const shortSlugs = new Set(['bukhari', 'muslim', 'tirmidhi', 'abudawud', 'nasai', 'ibnmajah', 'malik', 'shamail', 'riyadh', 'adab']);
    if (shortSlugs.has(name.toLowerCase())) return name.toLowerCase();

    const mapping: Record<string, string> = {
        // Bukhari
        'Sahih al-Bukhari': 'bukhari',
        'Sahih al Bukhari': 'bukhari',
        'Sahih Bukhari': 'bukhari',
        'sahih-bukhari': 'bukhari',
        // Muslim
        'Sahih al-Muslim': 'muslim',
        'Sahih Muslim': 'muslim',
        'sahih-muslim': 'muslim',
        // Abu Dawud
        'Sunan Abi Dawud': 'abudawud',
        'Sunan Abu Dawood': 'abudawud',
        'sunan-abu-dawud': 'abudawud',
        // Tirmidhi
        'Jami` at-Tirmidhi': 'tirmidhi',
        'Jami at-Tirmidhi': 'tirmidhi',
        'jami-at-tirmidhi': 'tirmidhi',
        // Nasai
        "Sunan an-Nasa'i": 'nasai',
        'Sunan an-Nasai': 'nasai',
        'sunan-an-nasai': 'nasai',
        // Ibn Majah
        'Sunan Ibn Majah': 'ibnmajah',
        'sunan-ibn-majah': 'ibnmajah',
        // Malik
        'Muwatta Malik': 'malik',
        'muwatta-malik': 'malik',
        // Riyadh as-Saliheen
        'Riyadh as-Saliheen': 'riyadh',
        'Riyad as-Saliheen': 'riyadh',
        'saliheen': 'riyadh',
    };

    if (mapping[name]) return mapping[name];

    // Fallback: slugify
    return name
        .toLowerCase()
        .replace(/[`']/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

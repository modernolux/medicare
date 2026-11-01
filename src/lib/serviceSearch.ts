import type { LucideIcon } from 'lucide-react';
import { DOCTORS, getDoctorDisplayName } from '@/data/doctors';
import { SERVICES } from '@/data/services';
import type { Service } from '@/data/services';
import { SERVICE_HUB_SEARCH_ITEMS } from '@/data/serviceHub';

export interface SearchEntry {
  label: string;
  to: string;
  icon: LucideIcon;
  category: Service | undefined;
}

export interface SearchDoctor {
  label: string;
  specialty: string;
  to: string;
}

export interface SearchIndex {
  entries: SearchEntry[];
  doctors: SearchDoctor[];
}

export interface SearchMatches {
  services: SearchEntry[];
  doctors: SearchDoctor[];
  categories: Service[];
}

export interface TextSegment {
  text: string;
  match: boolean;
}

const MIN_QUERY_LENGTH = 2;
const MAX_SERVICES = 6;
const MAX_DOCTORS = 3;
const MAX_CATEGORIES = 3;
const KONSULTA_PREFIX = '/sherbimet/konsulta/';
const WORD_PATTERN = /[\p{L}\p{N}]+/gu;

type MatchRank = 0 | 1 | 2;

export function normalizeText(value: string): string {
  return Array.from(value, (char) => char.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()).join('');
}

export function tokenizeQuery(query: string): string[] {
  return normalizeText(query).match(WORD_PATTERN) ?? [];
}

export function isSearchableQuery(query: string): boolean {
  return tokenizeQuery(query).join(' ').length >= MIN_QUERY_LENGTH;
}

function editDistance(a: string, b: string): number {
  let previous = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    previous = current;
  }
  return previous[b.length];
}

function wordMatches(token: string, word: string, tolerant: boolean): boolean {
  if (word.startsWith(token)) return true;
  if (!tolerant || token.length < 4) return false;
  return (
    editDistance(token, word.slice(0, token.length)) <= 1 ||
    editDistance(token, word.slice(0, token.length + 1)) <= 1
  );
}

function rankText(text: string, tokens: string[]): MatchRank | null {
  const normalized = normalizeText(text);
  const words = normalized.match(WORD_PATTERN) ?? [];
  if (normalized.startsWith(tokens.join(' '))) return 0;
  if (tokens.every((token) => words.some((word) => word.startsWith(token)))) return 1;
  if (tokens.every((token) => words.some((word) => wordMatches(token, word, true)))) return 2;
  return null;
}

function rankItems<T>(items: T[], textOf: (item: T) => string, tokens: string[]): T[] {
  return items
    .flatMap((item) => {
      const rank = rankText(textOf(item), tokens);
      return rank === null ? [] : [{ item, rank }];
    })
    .sort((a, b) => a.rank - b.rank)
    .map(({ item }) => item);
}

function categoryFor(to: string): Service | undefined {
  if (to.startsWith(KONSULTA_PREFIX)) return SERVICES.find((service) => service.slug === 'konsulta');
  return SERVICES.find((service) => service.path === to);
}

export function buildSearchIndex(): SearchIndex {
  return {
    entries: SERVICE_HUB_SEARCH_ITEMS.map((item) => ({
      label: item.label,
      to: item.to,
      icon: item.icon,
      category: categoryFor(item.to),
    })),
    doctors: DOCTORS.map((doctor) => ({
      label: getDoctorDisplayName(doctor),
      specialty: doctor.specialty,
      to: '/mjeket-tane',
    })),
  };
}

export function searchSiteIndex(query: string, index: SearchIndex): SearchMatches {
  const tokens = tokenizeQuery(query);
  if (tokens.join(' ').length < MIN_QUERY_LENGTH) {
    return { services: [], doctors: [], categories: [] };
  }

  const entries = rankItems(index.entries, (entry) => entry.label, tokens);
  const categories = entries
    .map((entry) => entry.category)
    .filter((category): category is Service => category !== undefined)
    .filter((category, position, all) => all.indexOf(category) === position)
    .slice(0, MAX_CATEGORIES);

  return {
    services: entries.slice(0, MAX_SERVICES),
    doctors: rankItems(index.doctors, (doctor) => `${doctor.label} ${doctor.specialty}`, tokens).slice(0, MAX_DOCTORS),
    categories,
  };
}

export function highlightSegments(text: string, query: string): TextSegment[] {
  const tokens = tokenizeQuery(query);
  const ranges: Array<[number, number]> = [];
  for (const match of text.matchAll(WORD_PATTERN)) {
    const start = match.index ?? 0;
    const word = normalizeText(match[0]);
    const token = tokens.find((candidate) => word.startsWith(candidate));
    if (token) ranges.push([start, start + token.length]);
  }

  const segments: TextSegment[] = [];
  let cursor = 0;
  for (const [start, end] of ranges) {
    if (start > cursor) segments.push({ text: text.slice(cursor, start), match: false });
    segments.push({ text: text.slice(start, end), match: true });
    cursor = end;
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor), match: false });
  return segments;
}

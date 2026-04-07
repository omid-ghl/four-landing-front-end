import { ENV } from './config';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import sanitizeHtml from 'sanitize-html';

export const prettyLog = (obj: any) => {
    return JSON.stringify(obj, null, '\t');
};

// https://g.co/gemini/share/57e06ffd2910
export const truncateString = (str: string, num = 20, ending = '...') => {
    str = String(str);
    if (str.length <= num) {
        return str;
    }
    if (num < ending.length) {
        return str.substring(0, num);
    }
    return str.slice(0, num - ending.length).trim() + ending;
};

export const isDev = () => ENV === 'development';
export const isProd = () => ENV === 'production';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const slugify = (str: string) => {
    return str.toLowerCase().replaceAll(' ', '-');
};

export const jumpTo = (id: string) => {
    const element = document.getElementById(id);

    const headerOffset = 100;
    const elementPosition = element?.getBoundingClientRect().top;
    if (elementPosition) {
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }
};

export const sanitizeHTML = (input: string): string => {
    const allowedTags: string[] = [
        'extralight',
        'light',
        'normal',
        'semibold',
        'bold',
        'black',
    ];
    return sanitizeHtml(input, {
        allowedTags: allowedTags,
        disallowedTagsMode: 'discard',
    });
};

// https://gist.github.com/jjmu15/8646226?permalink_comment_id=2578428#gistcomment-2578428
export function isVisibleInViewport(id: string) {
    const ele = document.getElementById(id);
    if (ele) {
        const { top, bottom } = ele.getBoundingClientRect();
        const vHeight =
            window.innerHeight || document.documentElement.clientHeight;
        return (top > 0 || bottom > 0) && top < vHeight - 500;
    }
    return false;
}

export const parsePotentialJsonString = (str: string): object | string => {
    if (typeof str === 'string') {
        const trimmedStr = str.trim();
        if (trimmedStr !== '') {
            try {
                const jsonObject = JSON.parse(trimmedStr);
                return jsonObject;
            } catch (error) {
                return str;
            }
        }
    }
    return str;
};

export const logDate = () => {
    const d = new Date();
    return d.toUTCString();
};

export const tmpDevTest = (timestamp: number) => {
    return isDev() && Date.now() < timestamp;
};

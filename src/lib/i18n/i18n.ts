import i18next from 'i18next';
import { DEBUG } from '../config';
import { getContent } from '../api/getContent';

export const i18n = async () => {
    const content = await getContent();
    await i18next.init({
        lng: 'en',
        debug: DEBUG,
        resources: {
            // TODO add more (later)
            en: {
                translation: content,
            },
        },
    });
    const t = i18next.t;
    return { t };
};

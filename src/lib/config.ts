// env loader
export const { ENV, API_URL, API_PREFIX, GOOGLE_RECAPTCHA_SITEKEY } =
    import.meta.env;

if (
    !globalThis.window &&
    !import.meta.env.PROD &&
    (!ENV || !API_URL || !API_PREFIX)
) {
    console.warn('environment variables are not set!');
}
// configs
export const DEBUG = import.meta.env.DEBUG === 'true';

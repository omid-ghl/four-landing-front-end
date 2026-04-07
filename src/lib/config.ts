// env loader
export const { ENV, API_URL, API_PREFIX, GOOGLE_RECAPTCHA_SITEKEY } =
    import.meta.env;

if (!globalThis.window && (!ENV || !API_URL || !API_PREFIX)) {
    throw new Error('environment variables are not set!');
}
// configs
export const DEBUG = import.meta.env.DEBUG === 'true';

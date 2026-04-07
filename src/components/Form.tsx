import { useCallback, useRef, useState, type FormEvent } from 'react';
import { type CustomTypeOptions } from 'i18next';
import {
    GoogleReCaptchaProvider,
    GoogleReCaptcha,
} from 'react-google-recaptcha-v3';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Form({
    form,
    GOOGLE_RECAPTCHA_SITEKEY,
    baseUrl,
}: {
    form: CustomTypeOptions['resources']['en']['contacts']['form'];
    GOOGLE_RECAPTCHA_SITEKEY: string;
    baseUrl: string;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [reCaptchaToken, setReCaptchaToken] = useState('');
    const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.delete('g-recaptcha-response');

        try {
            setIsLoading(true);
            const res = await axios.post(baseUrl + '/contacts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-GOOGLE-RECAPTCHA-TOKEN': reCaptchaToken,
                },
            });

            formRef.current?.reset();
            toast.success(
                res?.data?.message ||
                    'Your Message has been Sent Successfully.',
            );
        } catch (error: any) {
            const err = error?.response?.data;
            if (err.error === 'bot_detected') {
                toast.error(`An error occurred. Please try again`);
            } else {
                toast.error(`${error?.response?.data?.message}`);
            }
        } finally {
            setRefreshReCaptcha(!refreshReCaptcha);
            setIsLoading(false);
        }
    };

    const handleCaptchaVerify = useCallback((token: string) => {
        setReCaptchaToken(token);
    }, []);

    return (
        <>
            <GoogleReCaptchaProvider
                reCaptchaKey={GOOGLE_RECAPTCHA_SITEKEY}
                container={{
                    element: 'GoogleReCaptcha',
                    parameters: {},
                }}
            >
                <form
                    className='flex flex-col gap-1'
                    ref={formRef}
                    onSubmit={handleSubmit}
                >
                    <label
                        className='mt-4 mb-1 flex items-center align-middle gap-2'
                        htmlFor='nickname'
                    >
                        <img
                            loading='lazy'
                            src='/icons/required.svg'
                            alt='required icon'
                        />
                        <span>{form.nickname?.title}</span>
                        <span className='bg-orange-100 text-yellow-900 text-[7.5pt] font-bold px-2 rounded-full'>
                            IMPORTANT
                        </span>
                    </label>
                    <input
                        placeholder={form.nickname?.placeholder}
                        className='border border-1 border-neutral-300 rounded-lg p-3'
                        type='text'
                        id='nickname'
                        name='nickname'
                        required
                        disabled={isLoading}
                    ></input>

                    <label
                        className='mt-4 mb-1 flex items-center align-middle gap-2'
                        htmlFor='email'
                    >
                        <img
                            loading='lazy'
                            src='/icons/required.svg'
                            alt='required icon'
                        />
                        <span>{form.email?.title}</span>
                        <span className='bg-orange-100 text-yellow-900 text-[7.5pt] font-bold px-2 rounded-full'>
                            IMPORTANT
                        </span>
                    </label>
                    <input
                        placeholder={form.email?.placeholder}
                        className='border border-1 border-neutral-300 rounded-lg p-3'
                        type='email'
                        id='email'
                        name='email'
                        required
                        disabled={isLoading}
                    ></input>

                    <label
                        className='mt-4 mb-1 flex items-center align-middle gap-2'
                        htmlFor='description'
                    >
                        <img
                            loading='lazy'
                            src='/icons/required.svg'
                            alt='required icon'
                        />
                        <span>{form.description?.title}</span>
                        <span className='bg-orange-100 text-yellow-900 text-[7.5pt] font-bold px-2 rounded-full'>
                            IMPORTANT
                        </span>
                    </label>
                    <textarea
                        placeholder={form.description?.placeholder}
                        className='border border-1 border-neutral-300 rounded-lg p-3'
                        id='description'
                        name='description'
                        disabled={isLoading}
                        rows={4}
                    ></textarea>

                    <GoogleReCaptcha
                        onVerify={handleCaptchaVerify}
                        refreshReCaptcha={refreshReCaptcha}
                    />

                    <button
                        className='mt-4 flex justify-center bg-primary text-white font-bold w-full md:w-1/2 lg:w-5/12 self-end rounded-full py-3'
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <img
                                loading='lazy'
                                className='invert'
                                src='/icons/ring.svg'
                                alt='loading...'
                            />
                        ) : (
                            <> {form.submit?.title}</>
                        )}
                    </button>
                </form>
            </GoogleReCaptchaProvider>
            <Toaster position='bottom-center' />
        </>
    );
}

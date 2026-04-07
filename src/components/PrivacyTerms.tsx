import { useCallback, useEffect, useState } from 'react';
import {
    cn,
    isVisibleInViewport,
    jumpTo,
    sanitizeHTML,
    slugify,
} from '../lib/utils';
import { type CustomTypeOptions } from 'i18next';

export default function PrivacyTerms({
    id,
    obj,
    title,
    lastUpdate,
    gotoRef,
}: {
    id: 'privacy' | 'terms';
    obj:
        | CustomTypeOptions['resources']['en']['privacies']
        | CustomTypeOptions['resources']['en']['terms'];

    title: string;
    lastUpdate: string;
    gotoRef?: string;
}) {
    const [focusedSection, setFocusedSection] = useState('');

    const handleScroll = useCallback(() => {
        obj.toReversed().forEach((item) => {
            const slug = `#${id}-${slugify(item.title || '')}`;
            if (isVisibleInViewport(slug)) {
                setFocusedSection(slug);
            }
        });
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className='flex h-[100%] w-full flex-col md:flex-row gap-6 lg:gap-12'>
            <div className='flex md:w-5/12 flex-col justify-start items-center text-center md:text-start md:items-baseline gap-12 lg:gap-20'>
                <img
                    className='w-1/2 md:w-10/12'
                    src='/images/logo-action.png'
                    alt='four logo in cool effect'
                    decoding='async'
                    loading='lazy'
                />
                <a href={gotoRef}>
                    <div>
                        <h1 className='flex gap-2'>
                            <span
                                className='sanitized-html'
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHTML(title),
                                }}
                            />
                        </h1>
                        <p className='text-gray-500 text-sm'>{lastUpdate}</p>
                        {gotoRef && (
                            <p className='text-black text-sm mt-4 flex items-center gap-1'>
                                {'Read Privacies'}
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='currentColor'
                                    viewBox='0 0 24 24'
                                    className='w-5 h-5'
                                >
                                    <path d='M10 17l5-5-5-5v10z' />
                                </svg>
                            </p>
                        )}
                    </div>
                </a>
                <ol className='sticky text-left mr-auto top-[100px] uppercase list-decimal pl-4'>
                    {Array.isArray(obj)
                        ? obj?.map((item) => {
                              const slug = `#${id}-${slugify(item.title || '')}`;
                              return (
                                  <li
                                      key={item.title}
                                      className={cn(
                                          focusedSection === slug
                                              ? 'md:text-primary'
                                              : '',
                                      )}
                                  >
                                      <a
                                          onClick={() => {
                                              jumpTo(slug);
                                              //   setFocusedSection(slug);
                                          }}
                                          href={slug}
                                      >
                                          {item?.title}
                                      </a>
                                      <ol className='my-1 list-decimal pl-4 lg:pl-8'>
                                          {Array.isArray(item.description) &&
                                              item.description.map(
                                                  (item2: {
                                                      title?: string;
                                                      description?: string;
                                                  }) => {
                                                      const slug2 = `#${id}-${slugify(item2.title || '')}`;
                                                      return (
                                                          <li
                                                              key={item2.title}
                                                              className={cn(
                                                                  focusedSection ===
                                                                      slug2
                                                                      ? 'md:text-primary'
                                                                      : 'text-neutral-700',
                                                              )}
                                                          >
                                                              <a
                                                                  onClick={() => {
                                                                      jumpTo(
                                                                          slug2,
                                                                      );
                                                                      //   setFocusedSection(
                                                                      //       slug2,
                                                                      //   );
                                                                  }}
                                                                  href={slug2}
                                                              >
                                                                  {item2?.title}
                                                              </a>
                                                          </li>
                                                      );
                                                  },
                                              )}
                                      </ol>
                                  </li>
                              );
                          })
                        : obj}
                </ol>
            </div>
            <div className='flex flex-col w-full md:w-7/12 justify-end align-middle items-end'>
                <div className='flex flex-col gap-6 w-full md:w-3/4'>
                    {Array.isArray(obj)
                        ? obj?.map((item) => {
                              return (
                                  <div key={item.title}>
                                      <h2
                                          id={`#${id}-${slugify(item.title || '')}`}
                                      >
                                          {item?.title}
                                      </h2>
                                      {Array.isArray(item?.description) ? (
                                          item.description.map(
                                              (item2: {
                                                  title?: string;
                                                  description?: string;
                                              }) => {
                                                  return (
                                                      <div
                                                          key={item2.title}
                                                          className='my-2'
                                                      >
                                                          <h3
                                                              id={`#${id}-${slugify(item2.title || '')}`}
                                                              className='text-neutral-700'
                                                          >
                                                              {item2?.title}
                                                          </h3>
                                                          <p>
                                                              {
                                                                  item2?.description
                                                              }
                                                          </p>
                                                      </div>
                                                  );
                                              },
                                          )
                                      ) : (
                                          <p>{item?.description}</p>
                                      )}
                                  </div>
                              );
                          })
                        : obj}
                </div>
            </div>
        </div>
    );
}

import { useCallback, useEffect, useState } from 'react';
import { cn, isVisibleInViewport, jumpTo, slugify } from '../lib/utils';

const navLinks = [
    'home',
    'faq',
    'privacy',
    'terms',
    'download',
    // 'testimonial',
    'contacts',
];

export default function Nav() {
    const [focusedSection, setFocusedSection] = useState(slugify(navLinks[0]));
    const [isSticky, setIsSticky] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [isInHomeSection, setIsInHomeSection] = useState(true);
    const [isInDownloadSection, setIsInDownloadSection] = useState(false);

    useEffect(() => {
        if (!Array.isArray(navLinks)) {
            return;
        }
        navLinks.forEach((item) => {
            if (window.location.href.includes(slugify(item))) {
                setFocusedSection(item);
            }
        });
        setIsSticky(window.scrollY > 0);
        setIsInHomeSection(isVisibleInViewport('home'));
        setIsInDownloadSection(isVisibleInViewport('download'));
        // if (isDev()) jumpTo('testimonial');
    }, []);

    let touchstartX: number, touchendX: number;
    const SWIPE_THRESHOLD = 80;
    let isScrolling = false;
    let scrollTimeout: any;

    const handleScroll = useCallback(() => {
        isScrolling = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 100);
        setIsSticky(window.scrollY > 0);
        setIsInHomeSection(isVisibleInViewport('home'));
        setIsInDownloadSection(isVisibleInViewport('download'));
        navLinks.forEach((item) => {
            if (isVisibleInViewport(item)) {
                setFocusedSection(item);
                return;
            }
        });
    }, []);

    function handleGesture() {
        const diffX = touchendX - touchstartX;

        const isInDisabledArea = isVisibleInViewport('testimonial-items');
        if (Math.abs(diffX) > SWIPE_THRESHOLD) {
            if (diffX > 0 && !isInDisabledArea) {
                setOpenDrawer(true);
            } else {
                setOpenDrawer(false);
            }
        }
    }

    useEffect(() => {
        const handleTouchStart = (event: any) => {
            if (isScrolling) return;
            touchstartX = event.changedTouches[0].screenX;
        };

        const handleTouchEnd = (event: any) => {
            if (isScrolling) return;
            touchendX = event.changedTouches[0].screenX;
            handleGesture();
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('touchstart', handleTouchStart, false);
        window.addEventListener('touchend', handleTouchEnd, false);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [handleScroll]);

    return (
        <>
            <header
                id='header'
                className={cn(
                    'fixed -top-1 left-0 z-50 py-5 sm:py-6 lg:pb-3 w-full px-0 md:px-0 lg:16 2xl:px-[20rem]',
                    isSticky ? ' bg-white shadow-md' : '',
                    '',
                )}
            >
                <nav>
                    <ul
                        className={cn(
                            'flex align-middle md:gap-3 lg:gap-8 uppercase px-8 md:px-16 justify-center items-center',
                        )}
                    >
                        <li className='lg:invisible lg:hidden flex cursor-pointer gap-2'>
                            {/* hamburger */}
                            <button
                                className='mt-1'
                                onClick={() => setOpenDrawer(!openDrawer)}
                            >
                                {[0, 1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className='w-7 h-[0.15rem] rounded-full bg-neutral-800 my-[0.30rem]'
                                    ></div>
                                ))}
                            </button>
                            {/* four brand */}
                            <div
                                className={cn(
                                    !isInHomeSection
                                        ? 'opacity-100'
                                        : 'opacity-0',
                                    'transition-all flex items-center gap-2',
                                )}
                            >
                                <a
                                    onClick={() => {
                                        jumpTo('#home');
                                    }}
                                    href='#home'
                                    className='ml-2'
                                >
                                    <img
                                        className='w-7 h-auto'
                                        src='/images/logo-primary.png'
                                        alt='four logo'
                                    />
                                </a>
                                <a
                                    onClick={() => {
                                        jumpTo('#home');
                                    }}
                                    href='#home'
                                >
                                    <img
                                        className='w-10 h-auto'
                                        src='/images/logo-typography-black.png'
                                        alt='four typography'
                                    />
                                </a>
                            </div>
                        </li>

                        <li className={cn('hidden lg:flex mb-3')}>
                            <a
                                className='flex gap-2 items-end'
                                onClick={() => {
                                    jumpTo(`#${slugify('home')}`);
                                }}
                                href={`#home`}
                            >
                                <img
                                    className='w-7 h-auto'
                                    src='/images/logo-primary.png'
                                    alt='four logo'
                                />
                            </a>
                        </li>

                        {/* links */}
                        {Array.isArray(navLinks)
                            ? navLinks.map((item: string) => {
                                  if (item === 'home' || item === 'download') {
                                      return;
                                  }

                                  return (
                                      <li
                                          key={item}
                                          className={cn(
                                              focusedSection === item
                                                  ? 'text-primary'
                                                  : 'text-neutral-800',
                                              'hidden lg:flex transition-colors',
                                          )}
                                      >
                                          <a
                                              className='flex flex-col items-end'
                                              onClick={() => {
                                                  jumpTo(`#${slugify(item)}`);

                                                  if (item === 'privacy') {
                                                      console.log(item);
                                                      window.open(
                                                          '/privacies',
                                                          '_blank',
                                                      );
                                                  }
                                              }}
                                              href={`#${slugify(item)}`}
                                          >
                                              {item}

                                              <div
                                                  className={cn(
                                                      item.length > 3
                                                          ? 'w-8'
                                                          : 'w-4',
                                                      focusedSection === item
                                                          ? 'opacity-100'
                                                          : 'opacity-0',
                                                      `h-[0.2rem] mt-1 rounded-full bg-primary transition-opacity`,
                                                  )}
                                              ></div>
                                          </a>
                                      </li>
                                  );
                              })
                            : navLinks}
                        {/* download */}
                        <li
                            className={cn(
                                'opacity-0 ml-auto lg:flex -mt-[7px] bg-black text-white leading-9 px-3 rounded-sm border-2 border-black transition-all',
                                isInHomeSection ? '' : 'lg:opacity-100',
                                isInDownloadSection
                                    ? 'bg-transparent text-black'
                                    : '',
                            )}
                        >
                            <a
                                className='flex flex-col items-end'
                                onClick={() => {
                                    jumpTo(`#download`);
                                }}
                                href={`#download`}
                            >
                                Download
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* drawer */}
            <ul
                className={cn(
                    'lg:invisible fixed z-50 w-full h-full top-0 left-0 backdrop-blur-lg bg-white bg-opacity-90 uppercase transition-all duration-300 ease-in-out transform -translate-x-full opacity-0',
                    openDrawer ? '-translate-x-0 opacity-100' : '',
                )}
            >
                <li className='flex justify-center sm:justify-normal cursor-pointer '>
                    <button
                        onClick={() => setOpenDrawer(false)}
                        className='p-5 m-4 mt-20 sm:ml-12 sm:mt-6 sm:mb-2 rounded-full hover:bg-neutral-200'
                    >
                        <img
                            className='w-5 h-auto'
                            src='/icons/cross.svg'
                            alt='close icon'
                        />
                    </button>
                </li>
                {Array.isArray(navLinks)
                    ? navLinks.map((item: string) => {
                          return (
                              <li
                                  key={item}
                                  onClick={() => {
                                      jumpTo(`#${slugify(item)}`);
                                      setOpenDrawer(!openDrawer);
                                  }}
                                  className={cn(
                                      focusedSection === item
                                          ? 'text-primary'
                                          : 'text-neutral-600',
                                      'flex flex-col text-center sm:text-left sm:px-16 hover:bg-black hover:bg-opacity-5 font-bold sm:font-semibold',
                                  )}
                              >
                                  <a
                                      className='py-4'
                                      href={`#${slugify(item)}`}
                                  >
                                      {item}
                                  </a>
                              </li>
                          );
                      })
                    : navLinks}
            </ul>
        </>
    );
}

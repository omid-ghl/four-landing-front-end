import { useEffect, useState } from 'react';
import { type CustomTypeOptions } from 'i18next';

const StarRating = ({ rating }: { rating: any }) => {
    rating = Number(rating);

    return (
        <div className='flex gap-1 mb-1'>
            {[1, 2, 3, 4, 5].map((i) => {
                const diffRI = rating - i;
                return (
                    <img
                        key={i}
                        src={
                            rating >= i
                                ? '/icons/star-fill.svg'
                                : diffRI === -0.5
                                  ? '/icons/star-half.svg'
                                  : '/icons/star-outline.svg'
                        }
                        alt={i <= rating ? 'Filled Star' : 'Outlined Star'}
                        className='w-[1.2rem] h-[1.2rem]'
                    />
                );
            })}
        </div>
    );
};

const Paragraphs = ({
    length,
    current,
    onItemClick,
}: {
    length: number;
    current: number;
    onItemClick: (i: number) => void;
}) => {
    const array: number[] = [];

    for (let i = 0; i <= length - 1; ++i) {
        array.push(i);
    }

    return (
        <div className='flex gap-3 mx-auto lg:mx-0'>
            {array.map((i) => {
                return (
                    <img
                        onClick={() => {
                            onItemClick(i);
                        }}
                        key={i}
                        src={
                            i === current
                                ? '/icons/paragraph-primary.svg'
                                : '/icons/paragraph.svg'
                        }
                        alt={
                            i === current
                                ? 'primary paragraph icon'
                                : 'paragraph icon'
                        }
                        className='w-auto h-[2.5rem] lg:h-[3.3rem] cursor-pointer'
                    />
                );
            })}
        </div>
    );
};

const Emoji = ({ rate }: { rate: any }) => {
    let name,
        background = 'bg-white';

    rate = Number(rate);

    switch (rate) {
        case 1:
            name = 'grimacing-face';
            break;
        case 2:
            name = 'slightly-frowning-face';
            break;
        case 3:
            name = 'grinning-face-with-big';
            break;
        case 3.5:
            name = 'fire';
            break;
        case 4:
            name = 'partying-face';
            break;
        case 4.5:
            name = 'star-struck';
            break;
        case 5:
            name = 'glowing-star';
            background = 'bg-white';
            break;

        default:
            name = 'grinning-face-with-big';
            background = 'bg-white';
            break;
    }

    return (
        <div
            className={`absolute top-8 -right-3 sm:-right-7 md:-right-10 p-3 rounded-lg shadow-xl ${background}`}
        >
            <img
                src={`/emojis/${name}.png`}
                alt={`${name.replaceAll('-', ' ')} emoji`}
                className='w-8 md:w-10 lg:w-12 h-auto'
            />
        </div>
    );
};

// const Indicator = ({
//     length,
//     current,
//     onItemClick,
// }: {
//     length: number;
//     current: number;
//     onItemClick: (i: number) => void;
// }) => {
//     const array: number[] = [];

//     for (let i = 0; i <= length - 1; ++i) {
//         array.push(i);
//     }

//     return (
//         <div className='flex mx-auto lg:mx-0 w-full justify-center mt-9'>
//             {array.map((i) => {
//                 return (
//                     <button
//                         className={`p-[0.30rem] m-1 bg-transparent`}
//                         key={i}
//                         aria-label={`show item ${i}`}
//                         onClick={() => {
//                             onItemClick(i);
//                         }}
//                     >
//                         <div
//                             className={`w-2 h-2 rounded-full ${current === i ? 'bg-neutral-500' : 'bg-neutral-300'}`}
//                         ></div>
//                     </button>
//                 );
//             })}
//         </div>
//     );
// };

const Testimonials = ({
    testimonials,
}: {
    testimonials: CustomTypeOptions['resources']['en']['landing']['testimonial']['testimonials'];
}) => {
    const slides = testimonials;
    const [currentIndex, setCurrentIndex] = useState(0);

    let interval: any;
    useEffect(() => {
        interval = setInterval(() => {
            nextSlide();
        }, 15000);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + slides.length) % slides.length,
        );
    };

    let touchstartX: number, touchendX: number;
    const SWIPE_THRESHOLD = 20;

    function handleGesture() {
        const deltaX = touchendX - touchstartX;

        if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
            clearInterval(interval);
            if (deltaX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
    }

    useEffect(() => {
        const handleTouchStart = (event: any) => {
            touchstartX = event.changedTouches[0].screenX;
        };

        const handleTouchEnd = (event: any) => {
            touchendX = event.changedTouches[0].screenX;
            handleGesture();
        };

        window.addEventListener('touchstart', handleTouchStart, false);
        window.addEventListener('touchend', handleTouchEnd, false);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return (
        <div className='relative w-full'>
            <div className='w-full overflow-hidden'>
                <div
                    className='flex transition-transform duration-300'
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {Array.isArray(slides)
                        ? slides.map((slide, index) => (
                              <div
                                  id='testimonial-items'
                                  key={index}
                                  className='min-w-full flex flex-col xl:flex-row items-center justify-center gap-10 lg:px-14'
                              >
                                  <div className='relative'>
                                      <img
                                          className='object-cover w-56 max-w-56 h-56 max-h-56 lg:w-72 lg:h-72 lg:max-w-72 lg:max-h-72 rounded-xl'
                                          src={slide.image}
                                          alt='four user'
                                      />
                                      <Emoji rate={slide.rate} />
                                  </div>
                                  <div className='lg:ml-20 flex flex-col gap-6 lg:gap-10'>
                                      <Paragraphs
                                          current={currentIndex}
                                          length={slides.length}
                                          onItemClick={(i) => {
                                              clearInterval(interval);

                                              setCurrentIndex(i);
                                          }}
                                      />
                                      <p>{slide.description}</p>
                                      <div>
                                          <StarRating rating={slide.rate} />
                                          <cite>{slide.name}</cite>
                                      </div>
                                  </div>

                                  {/* <h2 className='text-2xl font-bold'>{slide.name}</h2> */}
                              </div>
                          ))
                        : slides}
                </div>
            </div>
            <button
                onClick={() => {
                    clearInterval(interval);
                    prevSlide();
                }}
                className='absolute left-0 top-1/2 transform -translate-y-1/2  p-2 rounded-full'
            >
                <img
                    className='w-3 h-auto rotate-180'
                    src={`/icons/arrow-right.svg`}
                    alt='arrow right icon'
                />
            </button>
            <button
                onClick={() => {
                    clearInterval(interval);
                    nextSlide();
                }}
                className='absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full'
            >
                <img
                    className='w-3 h-auto'
                    src={`/icons/arrow-right.svg`}
                    alt='arrow right icon'
                />
            </button>
            {/* <Indicator
                current={currentIndex}
                length={slides.length}
                onItemClick={(i) => {
                    setCurrentIndex(i);
                    clearInterval(interval);
                }}
            /> */}
        </div>
    );
};

export default Testimonials;

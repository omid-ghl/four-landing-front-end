import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export default function Faq({ title = '', description = '' }) {
    return (
        <Accordion type='single' collapsible>
            <AccordionItem value='title'>
                <AccordionTrigger>
                    <div className='flex gap-4'>
                        <img
                            className='w-5 h-auto'
                            src='/icons/quote.svg'
                            alt='quote icon'
                            loading='lazy'
                        />
                        {title}
                    </div>
                </AccordionTrigger>
                <AccordionContent className='my-4 border-l border-l-neutral-200 ml-8 mt-0 pt-6 pl-10'>
                    {description}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

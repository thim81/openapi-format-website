import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight, Expand } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type PlaygroundSlide = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

type PlaygroundCarouselProps = {
  slides: PlaygroundSlide[];
  className?: string;
};

export default function PlaygroundCarousel({
  slides,
  className,
}: PlaygroundCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogIndex, setDialogIndex] = React.useState(0);
  const pointerStartRef = React.useRef<{ x: number; y: number } | null>(null);

  React.useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    const onReInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();

    emblaApi.on('reInit', onReInit);
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('reInit', onReInit);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const activeDialogSlide = slides[dialogIndex];

  const openDialog = (index: number) => {
    setDialogIndex(index);
    setDialogOpen(true);
  };

  const showPreviousDialogSlide = () => {
    setDialogIndex((currentIndex) => (currentIndex - 1 + slides.length) % slides.length);
  };

  const showNextDialogSlide = () => {
    setDialogIndex((currentIndex) => (currentIndex + 1) % slides.length);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>, index: number) => {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;

    if (!start) {
      return;
    }

    const deltaX = Math.abs(event.clientX - start.x);
    const deltaY = Math.abs(event.clientY - start.y);

    if (deltaX < 8 && deltaY < 8) {
      openDialog(index);
    }
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div className={cn('relative', className)}>
          <div className='overflow-hidden' ref={emblaRef}>
            <div className='flex'>
              {slides.map((slide, index) => (
                <div className='min-w-0 shrink-0 grow-0 basis-full pl-0' key={slide.src}>
                  <article className='overflow-hidden rounded-3xl border bg-card shadow-sm'>
                    <div className='border-b bg-muted/30 p-3 md:p-4'>
                      <div
                        className='group relative block w-full overflow-hidden rounded-2xl border bg-background shadow-sm'
                        onPointerDown={handlePointerDown}
                        onPointerUp={(event) => handlePointerUp(event, index)}
                      >
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          className='h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]'
                          loading='lazy'
                        />
                        <button
                          type='button'
                          onClick={() => openDialog(index)}
                          className='absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                          aria-label={`Open large view for ${slide.title}`}
                        >
                          <Expand className='h-3.5 w-3.5' />
                          Enlarge
                        </button>
                      </div>
                    </div>
                    <div className='flex flex-col gap-2 p-5 md:p-6'>
                      <div className='flex items-center justify-between gap-4'>
                        <h3 className='text-lg font-semibold md:text-xl'>{slide.title}</h3>
                        <span className='shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground'>
                          {selectedIndex + 1}/{slides.length}
                        </span>
                      </div>
                      <p className='text-sm leading-6 text-muted-foreground md:text-base'>
                        {slide.description}
                      </p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-5 flex items-center justify-between gap-4'>
            <div className='flex items-center gap-2'>
              <Button
                type='button'
                variant='outline'
                size='icon'
                className='h-9 w-9 rounded-full'
                onClick={() => emblaApi?.scrollPrev()}
                aria-label='Previous playground screenshot'
              >
                <ArrowLeft className='h-4 w-4' />
              </Button>
              <Button
                type='button'
                variant='outline'
                size='icon'
                className='h-9 w-9 rounded-full'
                onClick={() => emblaApi?.scrollNext()}
                aria-label='Next playground screenshot'
              >
                <ArrowRight className='h-4 w-4' />
              </Button>
            </div>

            <div className='flex flex-wrap items-center justify-end gap-2'>
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  type='button'
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={cn(
                    'h-2.5 rounded-full transition-all',
                    selectedIndex === index
                      ? 'w-8 bg-primary'
                      : 'w-2.5 bg-border hover:bg-muted-foreground/50',
                  )}
                  aria-label={`Go to playground screenshot ${index + 1}`}
                  aria-current={selectedIndex === index ? 'true' : undefined}
                />
              ))}
            </div>
          </div>
        </div>

        <DialogContent className='w-[min(96vw,1400px)] max-w-[1400px] border-none bg-background p-4 sm:rounded-2xl md:p-6'>
          <DialogTitle className='pr-10 text-left text-lg md:text-xl'>
            {activeDialogSlide.title}
          </DialogTitle>
          <DialogDescription className='text-left text-sm leading-6 md:text-base'>
            {activeDialogSlide.description}
          </DialogDescription>

          <div className='mt-2 overflow-hidden rounded-2xl border bg-muted/20'>
            <img
              src={activeDialogSlide.src}
              alt={activeDialogSlide.alt}
              className='max-h-[75vh] w-full object-contain'
            />
          </div>

          <div className='flex items-center justify-between gap-4'>
            <div className='text-sm text-muted-foreground'>
              {dialogIndex + 1} / {slides.length}
            </div>
            <div className='flex items-center gap-2'>
              <Button
                type='button'
                variant='outline'
                size='icon'
                className='h-10 w-10 rounded-full'
                onClick={showPreviousDialogSlide}
                aria-label='Show previous large screenshot'
              >
                <ArrowLeft className='h-4 w-4' />
              </Button>
              <Button
                type='button'
                variant='outline'
                size='icon'
                className='h-10 w-10 rounded-full'
                onClick={showNextDialogSlide}
                aria-label='Show next large screenshot'
              >
                <ArrowRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

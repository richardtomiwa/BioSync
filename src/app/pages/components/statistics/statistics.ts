import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

@Component({
  selector: 'app-statistics',
  styleUrl: './statistics.scss',
  templateUrl: './statistics.html',
  imports:[]
})
export class Statistics implements AfterViewInit, OnDestroy {
  @ViewChild('swiperRef') swiperRef!: ElementRef<HTMLDivElement>;
  @ViewChild('arcWrap') arcWrap!: ElementRef<HTMLDivElement>;
  @ViewChild('carouselRef') carouselRef!: ElementRef<HTMLDivElement>;
  @ViewChild('meterStack') meterStack!: ElementRef<HTMLDivElement>;

  private hasAnimated = false;
  private swiper?: Swiper;
  private swiperObserver?: IntersectionObserver;
  private carouselObserver?: IntersectionObserver;
  private meterObserver?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    this.observeSwiper();
    this.observeCarousel();
    this.observeMeters();

    const wrap = this.arcWrap?.nativeElement;
    if (!wrap) {
      return;
    }

    const maybeStart = () => {
      const rect = wrap.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight + 80 && rect.bottom > -80;

      if (isVisible && !this.hasAnimated) {
        this.startArcAnimation();
      }
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            maybeStart();
            observer.disconnect();
          }
        });
      }, { threshold: 0.2 });

      observer.observe(wrap);
    }

    maybeStart();
  }

  ngOnDestroy(): void {
    this.swiperObserver?.disconnect();
    this.carouselObserver?.disconnect();
    this.meterObserver?.disconnect();
    this.swiper?.destroy(true, true);
  }

  private observeSwiper(): void {
    const element = this.swiperRef?.nativeElement;
    if (!element) {
      return;
    }

    const start = () => {
      if (this.swiper) {
        return;
      }

      this.swiper = new Swiper(element, {
        modules: [EffectCards],
        effect: 'cards',
        speed: 450,
        slidesPerView: 1,
        cardsEffect: {
          perSlideOffset: 12,
          perSlideRotate: 1,
          slideShadows: false,
        },
        grabCursor: true,
        initialSlide: 1,
        watchOverflow: true,
      });
      this.swiperObserver?.disconnect();
    };

    if (!('IntersectionObserver' in window)) {
      start();
      return;
    }

    this.swiperObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        start();
      }
    }, { rootMargin: '200px 0px' });
    this.swiperObserver.observe(element);
  }

  private observeCarousel(): void {
    const element = this.carouselRef?.nativeElement;
    if (!element) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      element.classList.add('is-running');
      return;
    }

    this.carouselObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        element.classList.toggle('is-running', entry.isIntersecting);
      });
    }, { threshold: 0, rootMargin: '120px 0px' });
    this.carouselObserver.observe(element);
  }

  private observeMeters(): void {
    const element = this.meterStack?.nativeElement;
    if (!element) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      element.classList.add('is-animated');
      return;
    }

    this.meterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        element.classList.toggle('is-animated', entry.isIntersecting);
      });
    }, { threshold: 0, rootMargin: '120px 0px' });
    this.meterObserver.observe(element);
  }

  private startArcAnimation(): void {
    if (this.hasAnimated) {
      return;
    }

    const wrap = this.arcWrap?.nativeElement;
    if (!wrap) {
      return;
    }

    const progress = wrap.querySelector('.progress') as SVGPathElement | null;
    const dot = wrap.querySelector('.dot') as SVGCircleElement | null;
    if (!progress || !dot) {
      return;
    }

    const targetPercentage = 68;
    const totalLength = progress.getTotalLength();
    const end = progress.getPointAtLength((targetPercentage / 100) * totalLength);

    // Calculate SVG geometry once; CSS handles the frame-by-frame drawing.
    dot.setAttribute('cx', end.x.toFixed(2));
    dot.setAttribute('cy', end.y.toFixed(2));
    this.hasAnimated = true;
    wrap.classList.add('is-animated');
  }
}

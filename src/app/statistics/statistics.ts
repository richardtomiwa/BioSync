import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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
export class Statistics implements AfterViewInit {
  @ViewChild('swiperRef') swiperRef!: ElementRef<HTMLDivElement>;
  @ViewChild('arcWrap') arcWrap!: ElementRef<HTMLDivElement>;

  private hasAnimated = false;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    new Swiper(this.swiperRef.nativeElement, {
      modules: [EffectCards],
      effect: 'cards',
      cardsEffect:{
        perSlideOffset:15,
        slideShadows:false,
        perSlideRotate:4,
      },
      grabCursor: true,
      loop: false,
      centeredSlides:true,
      initialSlide:1,
    });

    const wrap = this.arcWrap?.nativeElement;
    if (!wrap) {
      return;
    }

    const maybeStart = () => {
      const rect = wrap.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight + 80 && rect.bottom > -80;

      if (isVisible && !this.hasAnimated) {
        this.animateArc();
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

  private animateArc(): void {
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

    const pathLength = 100;
    const targetPercentage = 68;
    const totalLength = progress.getTotalLength();
    const start = progress.getPointAtLength(0);
    const duration = 1200;

    progress.style.strokeDasharray = `0 ${pathLength}`;
    dot.setAttribute('cx', start.x.toFixed(2));
    dot.setAttribute('cy', start.y.toFixed(2));

    this.hasAnimated = true;
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const ratio = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - ratio, 3);
      const visiblePercentage = targetPercentage * eased;

      progress.style.strokeDasharray = `${visiblePercentage} ${pathLength}`;

      const point = progress.getPointAtLength((visiblePercentage / 100) * totalLength);
      dot.setAttribute('cx', point.x.toFixed(2));
      dot.setAttribute('cy', point.y.toFixed(2));

      if (ratio < 1) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
  }
}

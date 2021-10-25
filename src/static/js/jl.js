import smoothscroll from 'smoothscroll-polyfill';
import tinybounce from 'tinybounce';
import initWuolah from './wuolah';
import Touch from './touch';

const { documentElement } = document;

export default class JL {
  constructor() {
    this.scrollLock = documentElement.classList.contains('lock-scroll');
    this.meta = document.querySelector('[name="theme-color"]');
    this.scroller = document.querySelector('.site-content');
    this.sections = gsap.utils.toArray('.section');
    this.images = [];
    this.isTransitioning = false;
    this.monogramPlayed = false;
    this.sectionIndex = 0;
    this.maxSection = this.sections.length - 1;
    this.mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.modeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.scrollDuration = this.mediaQuery.matches ? 0 : 1;
    this.defaultMetaColor = JL.getDefaultBackground();

    smoothscroll.polyfill();

    if (this.scrollLock) {
      gsap.set(this.scroller, { force3D: true });
      this.sections.forEach((section, i) => {
        section.setAttribute('aria-hidden', (i > 0).toString());
        section.setAttribute('aria-roledescription', 'slide');
        section.setAttribute(
          'aria-label',
          `${i + 1} / ${this.sections.length}`
        );
        this.images.push(gsap.utils.toArray('img', section));
      });

      this.getBounds();
      this.handleSectionChange();

      // Bounds fail some times upon refreshing
      setTimeout(this.handleResize.bind(this), 250);
    } else {
      gsap.registerPlugin(ScrollTrigger);

      this.sections.forEach(section => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: '+=500',
          onEnter: this.handleScrollEnter.bind(this),
          onEnterBack: this.handleScrollEnter.bind(this),
        });
      });
    }

    this.bindEvents();
    this.initMonogram();
    initWuolah();
  }

  bindEvents() {
    if (this.scrollLock) {
      document.body.addEventListener('keydown', this.handleKeydown.bind(this));
      document.body.addEventListener('wheel', this.handleWheel.bind(this), {
        passive: false,
      });
      window.addEventListener(
        'resize',
        tinybounce(this.handleResize.bind(this), 150)
      );
      this.touchPlugin = new Touch(this);
    }

    this.mediaQuery.addEventListener('change', () => {
      this.scrollDuration = this.mediaQuery.matches ? 0 : 1;
    });
    this.modeQuery.addEventListener('change', () => {
      const animation = this.modeQuery.matches
        ? this.darkMonogram
        : this.lightMonogram;
      this.monogram.load(animation);
      this.defaultMetaColor = JL.getDefaultBackground();
    });
    document
      .querySelector('.closing__link')
      .addEventListener('click', this.handleFaceClick.bind(this));
  }

  initMonogram() {
    this.lightMonogram = JSON.parse(window.monogram);
    this.darkMonogram = JSON.parse(
      window.monogram
        .replace(/"k":\[0,0,0,1]/g, '"k":[1,1,1,1]')
        .replace(
          /"k":\[0\.9764705882352941,0\.9686274509803922,0\.9607843137254902,1]/g,
          '"k":[0.14901960784313725,0.14901960784313725,0.14901960784313725,1]'
        )
    );
    const monogram = document.querySelector('.monogram__player');
    const [section] = this.sections;
    const isReducedMotion = this.mediaQuery.matches;
    const animation = this.modeQuery.matches
      ? this.darkMonogram
      : this.lightMonogram;
    section.classList.remove('visible');
    this.syncMetaColorToSection(section);

    monogram.addEventListener('ready', () => {
      if (this.monogramPlayed) {
        monogram.seek('99%');
        return;
      }

      const time = isReducedMotion ? 250 : 1250;

      if (isReducedMotion) {
        monogram.classList.add('fadeIn');
        monogram.seek('99%');
      } else {
        monogram.play();
      }

      setTimeout(() => {
        section.classList.add('visible');
        monogram.parentElement.addEventListener(
          'transitionend',
          () => {
            monogram.parentElement.classList.add('has-finished');
          },
          { once: true }
        );
      }, time);

      if (!this.monogramPlayed) {
        this.monogramPlayed = true;
      }
    });

    monogram.load(animation);
    this.monogram = monogram;
  }

  handleFaceClick(event) {
    event.preventDefault();

    if (this.scrollLock) {
      this.goToFirst();
    } else {
      window.scrollTo({
        top: 0,
        behavior: this.mediaQuery.matches ? 'auto' : 'smooth',
      });
    }
  }

  handleScrollEnter({ isActive, trigger }) {
    if (!isActive) {
      return;
    }

    const section = trigger.closest('.section');
    this.syncMetaColorToSection(section);
    section.classList.add('visible');
  }

  handleResize() {
    this.getBounds();
    const { top } = this.currentSection;
    const duration = this.scrollDuration ? 0.3 : 0;

    gsap.to(this.scroller, {
      duration,
      y: top * -1,
      ease: 'none',
    });
  }

  handleKeydown(event) {
    switch (event.code) {
      case 'Space':
        if (event.shiftKey) {
          this.goToPrev();
        } else {
          this.goToNext();
        }
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        this.goToNext();
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        this.goToPrev();
        break;
      case 'Home':
        this.goToFirst();
        break;
      case 'End':
        this.goToLast();
        break;
      default:
    }
  }

  handleWheel(event) {
    if (this.isTransitioning) {
      event.preventDefault();
      return;
    }

    // WebSlides <3
    const linesToPx = event.deltaMode * 40;
    const { deltaY: wheelDeltaY } = event;
    const isGoingUp = wheelDeltaY < 0;

    if (Math.abs(wheelDeltaY + linesToPx) >= 40) {
      if (isGoingUp) {
        this.goToPrev();
      } else {
        this.goToNext();
      }

      event.preventDefault();
    }
  }

  getBounds() {
    const offset = gsap.getProperty(this.scroller, 'y') * -1;
    this.bounds = this.sections.map(section => ({
      section,
      top: section.getBoundingClientRect().top + offset,
    }));
  }

  handleSectionChange() {
    const { section } = this.currentSection;
    this.syncMetaColorToSection(section);
    section.classList.add('visible');
    section.setAttribute('aria-hidden', 'false');
    const links = Array.from(section.querySelectorAll('a'));
    links.forEach(link => link.setAttribute('tabindex', '0'));
    const nextImages = this.images[this.sectionIndex + 1];

    if (Array.isArray(nextImages)) {
      nextImages.forEach(image => {
        image.loading = 'eager';
      });
      this.images[this.sectionIndex + 1] = null;
    }
  }

  goToSection() {
    this.isTransitioning = true;
    const { top } = this.currentSection;
    setTimeout(() => this.handleSectionChange(), 500);

    gsap.to(this.scroller, {
      duration: this.scrollDuration,
      y: top * -1,
      ease: 'power1',
      onComplete: () => {
        setTimeout(() => {
          this.isTransitioning = false;
        }, 250);
      },
    });
  }

  clearTransition() {
    const { section } = this.currentSection;

    setTimeout(() => {
      const links = Array.from(section.querySelectorAll('a'));
      section.setAttribute('aria-hidden', 'true');
      links.forEach(link => link.setAttribute('tabindex', '-1'));
    }, 1000);
  }

  goToFirst() {
    if (!this.isTransitioning && this.sectionIndex !== 0) {
      this.clearTransition();
      this.sectionIndex = 0;
      this.goToSection();
    }
  }

  goToLast() {
    if (!this.isTransitioning && this.sectionIndex < this.maxSection) {
      this.clearTransition();
      this.sectionIndex = this.maxSection;
      this.goToSection();
    }
  }

  goToNext() {
    if (!this.isTransitioning && this.sectionIndex < this.maxSection) {
      this.clearTransition();
      this.sectionIndex += 1;
      this.goToSection();
    }
  }

  goToPrev() {
    if (!this.isTransitioning && this.sectionIndex > 0) {
      this.clearTransition();
      this.sectionIndex -= 1;
      this.goToSection();
    }
  }

  syncMetaColorToSection(section) {
    const theme = section.dataset.theme || this.defaultMetaColor;
    this.meta.setAttribute('content', `#${theme}`);
  }

  get currentSection() {
    return this.bounds[this.sectionIndex];
  }

  static getDefaultBackground() {
    return getComputedStyle(documentElement)
      .getPropertyValue('--color-background')
      .replace('#', '');
  }
}

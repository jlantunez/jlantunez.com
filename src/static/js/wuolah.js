let listening = false;

export default function initWuolah() {
  if (listening) {
    return;
  }

  const Speeds = [2.5, 2, 1.15];

  gsap.utils.toArray('.file').forEach(file => {
    const progress = file.querySelector('.file__percent');
    const bar = file.querySelector('.bar__value');
    bar.style.width = '0%';
    // eslint-disable-next-line no-bitwise
    const speedIndex = (Math.random() * Speeds.length) | 0;
    const duration = Speeds[speedIndex];
    Speeds.splice(speedIndex, 1);
    progress.textContent = '0%';

    listening = true;
    file.addEventListener(
      'transitionend',
      () => {
        listening = false;
        gsap.to(bar, {
          width: '100%',
          duration,
          ease: 'none',
          onUpdate: function onUpdate() {
            progress.textContent = `${Math.round(this.progress() * 100)}%`;
          },
        });
      },
      {
        once: true,
      }
    );
  });
}

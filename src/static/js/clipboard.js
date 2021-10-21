import Clipboard from 'clipboard';

const VISIBLE_CLASS = 'is-visible';

function clearTooltip(event) {
  const element = event.currentTarget;
  element.classList.remove(VISIBLE_CLASS);

  setTimeout(() => {
    if (!element.classList.contains(VISIBLE_CLASS)) {
      element.removeAttribute('aria-label');
    }
  }, 350);
}

function showTooltip(element) {
  const msg = element.dataset.tooltipText;
  element.classList.add(VISIBLE_CLASS);
  element.setAttribute('aria-label', msg);
}

export default function initClipboard() {
  const clipboardButton = document.querySelector('[data-clipboard-text]');

  if (clipboardButton) {
    clipboardButton.classList.add('tooltip');
    clipboardButton.addEventListener('mouseleave', clearTooltip);
    clipboardButton.addEventListener('blur', clearTooltip);
    clipboardButton.addEventListener('click', event => {
      event.preventDefault();
    });
    window.test = clipboardButton;

    const button = new Clipboard(clipboardButton);

    button.on('success', event => {
      showTooltip(event.trigger);
    });
  }
}

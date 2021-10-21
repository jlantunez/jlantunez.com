import initClipboard from './clipboard';
import JL from './jl';

(() => {
  initClipboard();
  window.jl = new JL();
})();

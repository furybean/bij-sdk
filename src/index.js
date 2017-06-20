import storage from './storage';

const bindEvent = function(record, maxDuration, maxJump) {
  const STOP_STRING = 'stop';
  window.addEventListener('beforeunload', function(event) {
    if (Date.now() - record.updated < maxDuration && record.count >= maxJump) {
      event.returnValue = STOP_STRING;
      return STOP_STRING;
    }
  });
};

export default {
  init(options = {}) {
    const breakMode = options.breakMode || 'jump';
    const jumpTo = options.jumpTo;
    const maxDuration = options.maxDuration || 5000;
    const maxJump = options.maxJump || 5;
    const source = options.source || location.href;

    const record = storage.inc(source, document.referrer, duration);

    if (breakMode === 'unload') {
      bindEvent(record, maxDuration, maxJump);
    } else {
      if (!jumpTo) {
        throw new Error('[BIJ] jumpTo is required when breakMode equals to jump.');
      }

      if (Date.now() - record.updated < maxDuration && record.count >= maxJump) {
        window.location.href = jumpTo;
      }
    }
  }
};

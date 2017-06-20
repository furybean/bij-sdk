const STORAGE_KEY = 'BIJ_STORAGE_KEY';

export default {
  inc(source, referer, duration = 5000) {
    const sourceRecords = this.get(source);
    let record = sourceRecords[referer];

    const now = Date.now();
    if (!record) {
      record = sourceRecords[referer] = {
        count: 1,
        updated: null
      };
    } else {
      if (now - record.updated < duration) {
        record.count++;
      } else {
        record.count = 1;
      }
    }

    record.updated = now;

    this.set(source, sourceRecords);

    return record;
  },
  set(source, records) {
    const allRecordsString = sessionStorage.getItem(STORAGE_KEY) || '';
    let allRecords;
    try {
      allRecords = JSON.parse(allRecordsString);
    } catch (e) {
      allRecords = {};
    }
    allRecords[source] = records;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(allRecords));
  },
  get(source) {
    const allRecordsString = sessionStorage.getItem(STORAGE_KEY);
    try {
      const result = JSON.parse(allRecordsString);
      return (result || {})[source] || {};
    } catch (e) {
      return {};
    }
  }
};

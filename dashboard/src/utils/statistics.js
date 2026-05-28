export function computeStats(data, columns) {
  const stats = {};

  for (const col of columns) {
    const values = data.map(row => row[col]).filter(v => v !== null && v !== undefined && v !== '');
    if (values.length === 0) {
      stats[col] = { count: 0, type: 'empty' };
      continue;
    }

    const numericCount = values.filter(v => !isNaN(Number(v))).length;
    const type = numericCount >= values.length * 0.8 ? 'number' : 'string';

    if (type === 'number') {
      const nums = values.map(Number).sort((a, b) => a - b);
      const sum = nums.reduce((a, b) => a + b, 0);
      const mean = sum / nums.length;
      const mid = Math.floor(nums.length / 2);
      const median = nums.length % 2 === 0 ? (nums[mid - 1] + nums[mid]) / 2 : nums[mid];
      const min = nums[0];
      const max = nums[nums.length - 1];
      const variance = nums.reduce((s, n) => s + (n - mean) ** 2, 0) / nums.length;
      const stdDev = Math.sqrt(variance);

      stats[col] = {
        type: 'number',
        count: nums.length,
        sum: round(sum),
        mean: round(mean),
        median: round(median),
        min: round(min),
        max: round(max),
        stdDev: round(stdDev),
      };
    } else {
      const freq = {};
      for (const v of values) {
        const key = String(v);
        freq[key] = (freq[key] || 0) + 1;
      }
      const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
      const mostCommon = sorted[0]?.[0] || '';
      const uniqueCount = sorted.length;
      const emptyCount = data.length - values.length;

      stats[col] = {
        type: 'string',
        count: values.length,
        uniqueCount,
        mostCommon,
        emptyCount,
      };
    }
  }

  return stats;
}

function round(n) {
  return Math.round(n * 100) / 100;
}

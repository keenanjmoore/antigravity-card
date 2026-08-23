import fs from 'fs';
import path from 'path';

export interface BenchmarkRecord {
  name: string;
  opsPerSec?: number;
  latencyMs?: number;
  unit: string;
}

export class BenchmarkReporter {
  private static results: BenchmarkRecord[] = [];
  private static historyFile = path.resolve('benchmarks/history.json');

  public static record(record: BenchmarkRecord) {
    this.results.push(record);
  }

  public static printSummaryAndSave() {
    let previousRun: BenchmarkRecord[] = [];
    if (fs.existsSync(this.historyFile)) {
      try {
        const raw = fs.readFileSync(this.historyFile, 'utf8');
        previousRun = JSON.parse(raw);
      } catch {
        previousRun = [];
      }
    }

    console.info('\n═══════════════════════════════════════════════════════════════════════════════════════');
    console.info('📊 HISTORICAL BENCHMARK DELTA REPORT (CURRENT BUILD vs PREVIOUS BUILD)');
    console.info('═══════════════════════════════════════════════════════════════════════════════════════');

    for (const cur of this.results) {
      const prev = previousRun.find(p => p.name === cur.name);

      if (cur.opsPerSec !== undefined) {
        if (prev && prev.opsPerSec !== undefined) {
          const delta = cur.opsPerSec - prev.opsPerSec;
          const pct = ((delta / prev.opsPerSec) * 100).toFixed(1);
          const sign = delta >= 0 ? '+' : '';
          const icon = delta >= 0 ? '🚀' : '⚠️';
          console.info(
            ` ${icon} ${cur.name.padEnd(44)} : ${cur.opsPerSec.toLocaleString()} ops/s (Prev: ${prev.opsPerSec.toLocaleString()} | Delta: ${sign}${pct}% | ${sign}${delta.toLocaleString()} ops/s)`
          );
        } else {
          console.info(
            ` ⚡ ${cur.name.padEnd(44)} : ${cur.opsPerSec.toLocaleString()} ops/s (Baseline established)`
          );
        }
      } else if (cur.latencyMs !== undefined) {
        if (prev && prev.latencyMs !== undefined) {
          const delta = cur.latencyMs - prev.latencyMs;
          const pct = ((delta / prev.latencyMs) * 100).toFixed(1);
          const sign = delta <= 0 ? '' : '+';
          const icon = delta <= 0 ? '🚀' : '⚠️';
          console.info(
            ` ${icon} ${cur.name.padEnd(44)} : ${cur.latencyMs.toFixed(4)}ms (Prev: ${prev.latencyMs.toFixed(4)}ms | Delta: ${sign}${pct}%)`
          );
        } else {
          console.info(
            ` ⚡ ${cur.name.padEnd(44)} : ${cur.latencyMs.toFixed(4)}ms (Baseline established)`
          );
        }
      }
    }

    console.info('═══════════════════════════════════════════════════════════════════════════════════════\n');

    // Save current run as new history
    try {
      const dir = path.dirname(this.historyFile);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(this.historyFile, JSON.stringify(this.results, null, 2), 'utf8');
    } catch (err: any) {
      console.warn('Could not save benchmark history:', err.message);
    }
  }
}

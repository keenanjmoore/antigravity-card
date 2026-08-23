import fs from 'fs';
import path from 'path';

export interface BenchmarkRecord {
  name: string;
  opsPerSec?: number;
  latencyMs?: number;
  unit: string;
}

export interface HistorySnapshot {
  timestamp: string;
  results: BenchmarkRecord[];
}

export class BenchmarkReporter {
  private static results: BenchmarkRecord[] = [];
  private static historyFile = path.resolve('benchmarks/history.json');

  public static record(record: BenchmarkRecord) {
    this.results.push(record);
  }

  private static formatVal(record?: BenchmarkRecord): string {
    if (!record) return '-';
    if (record.opsPerSec !== undefined) {
      const ops = record.opsPerSec;
      if (ops >= 1_000_000) {
        return `${(ops / 1_000_000).toFixed(2)}M ops/s`;
      } else if (ops >= 1_000) {
        return `${(ops / 1_000).toFixed(1)}k ops/s`;
      }
      return `${ops} ops/s`;
    }
    if (record.latencyMs !== undefined) {
      const ms = record.latencyMs;
      if (ms < 0.01) {
        return `${ms.toFixed(4)}ms`;
      }
      return `${ms.toFixed(2)}ms`;
    }
    return '-';
  }

  public static printSummaryAndSave() {
    let snapshots: HistorySnapshot[] = [];
    if (fs.existsSync(this.historyFile)) {
      try {
        const raw = fs.readFileSync(this.historyFile, 'utf8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // If old flat format, convert
          if (parsed.length > 0 && (parsed[0].name !== undefined)) {
            snapshots = [{ timestamp: new Date(Date.now() - 120000).toISOString(), results: parsed }];
          } else {
            snapshots = parsed;
          }
        }
      } catch {
        snapshots = [];
      }
    }

    // Get the last 3 historical revisions
    const rev1 = snapshots.length >= 1 ? snapshots[snapshots.length - 1] : undefined;
    const rev2 = snapshots.length >= 2 ? snapshots[snapshots.length - 2] : undefined;
    const rev3 = snapshots.length >= 3 ? snapshots[snapshots.length - 3] : undefined;

    console.info('\n┌───────────────────────────────────────┬──────────────┬──────────────┬──────────────┬──────────────┬──────────────┬──────────────┬───────┐');
    console.info('│ 📊 MULTI-REVISION BENCHMARK STATS     │ Rev -3       │ Rev -2       │ Rev -1       │ Current      │ 1-Rev Delta  │ Overall Gain │ Trend │');
    console.info('├───────────────────────────────────────┼──────────────┼──────────────┼──────────────┼──────────────┼──────────────┼──────────────┼───────┤');

    for (const cur of this.results) {
      const r1 = rev1?.results?.find(p => p.name === cur.name);
      const r2 = rev2?.results?.find(p => p.name === cur.name);
      const r3 = rev3?.results?.find(p => p.name === cur.name);

      const val3 = this.formatVal(r3).padEnd(12);
      const val2 = this.formatVal(r2).padEnd(12);
      const val1 = this.formatVal(r1).padEnd(12);
      const valCur = this.formatVal(cur).padEnd(12);

      let delta1Str = '-'.padEnd(12);
      let overallStr = '-'.padEnd(12);
      let trendIcon = '⚡';

      if (cur.opsPerSec !== undefined) {
        if (r1?.opsPerSec !== undefined) {
          const delta = cur.opsPerSec - r1.opsPerSec;
          const pct = ((delta / r1.opsPerSec) * 100).toFixed(1);
          const sign = delta >= 0 ? '+' : '';
          delta1Str = `${sign}${pct}%`.padEnd(12);
          trendIcon = delta >= 0 ? '🚀' : '⚠️';
        }
        const oldest = r3 || r2 || r1;
        if (oldest?.opsPerSec !== undefined) {
          const deltaAll = cur.opsPerSec - oldest.opsPerSec;
          const pctAll = ((deltaAll / oldest.opsPerSec) * 100).toFixed(1);
          const signAll = deltaAll >= 0 ? '+' : '';
          overallStr = `${signAll}${pctAll}%`.padEnd(12);
        }
      } else if (cur.latencyMs !== undefined) {
        if (r1?.latencyMs !== undefined && r1.latencyMs > 0) {
          const delta = cur.latencyMs - r1.latencyMs;
          const pct = ((delta / r1.latencyMs) * 100).toFixed(1);
          const sign = delta <= 0 ? '' : '+';
          delta1Str = `${sign}${pct}%`.padEnd(12);
          trendIcon = delta <= 0 ? '🚀' : '⚠️';
        }
        const oldest = r3 || r2 || r1;
        if (oldest?.latencyMs !== undefined && oldest.latencyMs > 0) {
          const deltaAll = cur.latencyMs - oldest.latencyMs;
          const pctAll = ((deltaAll / oldest.latencyMs) * 100).toFixed(1);
          const signAll = deltaAll <= 0 ? '' : '+';
          overallStr = `${signAll}${pctAll}%`.padEnd(12);
        }
      }

      const metricName = cur.name.padEnd(37);
      console.info(`│ ${metricName} │ ${val3} │ ${val2} │ ${val1} │ ${valCur} │ ${delta1Str} │ ${overallStr} │ ${trendIcon}     │`);
    }

    console.info('└───────────────────────────────────────┴──────────────┴──────────────┴──────────────┴──────────────┴──────────────┴──────────────┴───────┘\n');

    // Append current snapshot and keep last 10
    const currentSnapshot: HistorySnapshot = {
      timestamp: new Date().toISOString(),
      results: this.results,
    };
    snapshots.push(currentSnapshot);
    if (snapshots.length > 10) {
      snapshots = snapshots.slice(snapshots.length - 10);
    }

    try {
      const dir = path.dirname(this.historyFile);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(this.historyFile, JSON.stringify(snapshots, null, 2), 'utf8');
    } catch (err: any) {
      console.warn('Could not save benchmark history:', err.message);
    }
  }
}

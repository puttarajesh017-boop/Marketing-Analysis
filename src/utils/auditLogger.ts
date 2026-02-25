export function auditLogger(action: string) {
  const timestamp = new Date().toISOString();
  console.log(`[AUDIT] ${timestamp} - ${action}`);
}

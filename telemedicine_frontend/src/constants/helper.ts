export function getTodayDateWithTime(time: string): string {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    const datetimeStr = `${dateStr}T${time}`;
    return datetimeStr;
  }
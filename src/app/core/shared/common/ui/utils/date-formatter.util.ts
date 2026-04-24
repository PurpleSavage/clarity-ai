/**
 * Utilidad estática para el formateo de fechas.
 * No requiere ser inyectada en el constructor.
 */
export class DateFormatter {

  private static readonly locale = 'es-PE';

  /**
   * Transforma una fecha a formato corto numérico.
   * @example "22/04/2026"
   */
  static toShortDate(date: Date | string): string {
    const d = new Date(date);
    return new Intl.DateTimeFormat(this.locale).format(d);
  }

  /**
   * Transforma una fecha a un formato largo y descriptivo.
   * @example "miércoles, 22 de abril de 2026"
   */
  static toLongDate(date: Date | string): string {
    const d = new Date(date);
    return new Intl.DateTimeFormat(this.locale, {
      dateStyle: 'full'
    }).format(d);
  }

  /**
   * Obtiene la hora en formato de 12 horas con AM/PM.
   * @example "12:25 PM"
   */
  static toTime12h(date: Date | string): string {
    const d = new Date(date);
    return new Intl.DateTimeFormat(this.locale, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(d);
  }

  /**
   * Formato específico para sistemas (YYYY-MM-DD).
   * @example "2026-04-22"
   */
  static toISODate(date: Date | string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  /**
   * Formato personalizado con mes abreviado.
   * @example "22 abr. 2026"
   */
  static toAbbreviatedDate(date: Date | string): string {
    const d = new Date(date);
    return new Intl.DateTimeFormat(this.locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(d);
  }

  /**
   * Calcula el tiempo transcurrido de forma relativa (hace X tiempo).
   * @example "hace 5 minutos", "ayer"
   */
  static toRelativeTime(date: Date | string): string {
    const d = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

    const rtf = new Intl.RelativeTimeFormat(this.locale, { numeric: 'auto' });

    if (Math.abs(diffInSeconds) < 60) return rtf.format(-diffInSeconds, 'second');
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (Math.abs(diffInMinutes) < 60) return rtf.format(-diffInMinutes, 'minute');
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (Math.abs(diffInHours) < 24) return rtf.format(-diffInHours, 'hour');
    
    const diffInDays = Math.floor(diffInHours / 24);
    return rtf.format(-diffInDays, 'day');
  }
}
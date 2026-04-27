export const ErrorType = {
  AUTH: { code: 'AUTH_ERROR', label: 'Autenticación' },
  DATABASE: { code: 'DATABASE_ERROR', label: 'Base de Datos' },
  VALIDATION: { code: 'VALIDATION_ERROR', label: 'Validación' },
  UNKNOWN: { code: 'UNKNOWN_ERROR', label: 'Error Desconocido' },
} as const;

export type ErrorTypeKey = keyof typeof ErrorType;
export type ErrorTypeValue = typeof ErrorType[ErrorTypeKey];

export class AppError extends Error {
  public readonly title: string;
  public readonly type: ErrorTypeValue;

  constructor(message: string, title: string, type: ErrorTypeValue) {
    super(message);
    this.name = this.constructor.name;
    this.title = title;
    this.type = type;
    
    // Asegura que el prototipo sea el correcto para instanceof
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
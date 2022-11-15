export class AppError extends Error {
    statusCode;
  
    constructor(message: string, statusCode: number, ) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
  }
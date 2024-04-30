import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export function checkIsPageLast(totalNumber: number, limit: number, currentPage: number): boolean {
  return currentPage === Math.ceil(totalNumber / limit);
}

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object'
    && error != null
    && 'message' in error
    && typeof error.message === 'string'
  );
}

export function serverErrorHandler(error: unknown): string {
  let message = '';
  if (isFetchBaseQueryError(error)) {
    message += 'error' in error ? error.error : JSON.stringify(error.data);
  } else if (isErrorWithMessage(error)) {
    message += error.message;
  }
  return message;
}

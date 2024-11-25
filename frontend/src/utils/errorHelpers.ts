// src/utils/errorHelpers.ts
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

/**
 * Type for custom error with message
 */
interface ErrorWithMessage {
  data: {
    message: string;
  };
}

/**
 * Type guard to check if the error has a specific message structure
 */
export function isErrorWithMessage(
  error: unknown
): error is ErrorWithMessage {
  const candidate = error as ErrorWithMessage;
  return (
    candidate !== null &&
    typeof candidate === 'object' &&
    'data' in candidate &&
    typeof candidate.data === 'object' &&
    candidate.data !== null &&
    'message' in candidate.data &&
    typeof candidate.data.message === 'string'
  );
}

/**
 * Type guard to check if the error is a FetchBaseQueryError
 */
export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return (
    typeof error === 'object' &&
    error != null &&
    'status' in error
  );
}

/**
 * Type guard to check if the error is a SerializedError
 */
export function isSerializedError(
  error: unknown
): error is SerializedError {
  const candidate = error as SerializedError;
  return (
    candidate !== null &&
    typeof candidate === 'object' &&
    'message' in candidate &&
    (typeof candidate.message === 'string' || candidate.message === undefined)
  );
}

/**
 * Helper function to extract error message from different error types
 */
export function getErrorMessage(
  error: unknown,
  fallback: string = 'An error occurred'
): string {
  // Handle null/undefined
  if (!error) {
    return 'An unknown error occurred';
  }

  // Handle FetchBaseQueryError
  if (isFetchBaseQueryError(error)) {
    // Check for error with message structure
    if (isErrorWithMessage(error)) {
      return error.data.message;
    }
    
    // Handle error.data as string
    if (typeof error.data === 'string') {
      return error.data;
    }

    // Handle error.error as string
    if ('error' in error && typeof error.error === 'string') {
      return error.error;
    }

    // Handle status code based error
    return `Error ${error.status}: ${JSON.stringify(error.data)}`;
  }

  // Handle SerializedError
  if (isSerializedError(error)) {
    return error.message || fallback;
  }

  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }

  // If we can't determine the error format, return fallback
  return fallback;
}

/**
 * Custom hook for handling API errors
 */
export function useErrorHandler() {
  return {
    handleError: (error: unknown): string => {
      return getErrorMessage(error);
    },
    isApiError: (error: unknown): boolean => {
      return isFetchBaseQueryError(error) || isSerializedError(error);
    }
  };
}
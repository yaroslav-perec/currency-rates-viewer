import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

/**
 * Common union type for all RTK Query errors.
 */
export type ApiError = FetchBaseQueryError | SerializedError;

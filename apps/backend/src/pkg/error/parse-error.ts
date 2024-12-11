export function parseError(
  error: unknown,
): Record<string, unknown> | undefined {
  if (error === null || error === undefined) {
    return undefined;
  }

  if (typeof error === "object") {
    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    }
    return error as Record<string, unknown>;
  }

  if (typeof error === "string") {
    return {
      message: error,
    };
  }
}

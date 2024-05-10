export function camelToSnakeCase(str : string) {
    return str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
  };
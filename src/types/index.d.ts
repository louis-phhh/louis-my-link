export {}

declare global {

  type Dictionary<V = object> = {
    [key: string]: V | undefined
  };
}

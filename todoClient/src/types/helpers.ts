export type Helpers<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];
export interface ColoredItemsProps {
  color: string;
  hoverColor: string;
}

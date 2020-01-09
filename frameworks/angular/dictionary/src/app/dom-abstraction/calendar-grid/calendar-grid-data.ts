export interface CalendarGridCell<T> {
  id: string;
  date: Date;
  value: T;
}
export interface CalendarGridRow<T> {
  label: string;
  cells: CalendarGridCell<T>[];
  node: CalendarGridRow<any>; // <any> Least restrictive: If it's nested it might be a different shape.
}

/**
 * Returns a single rows property (for now).
 * Expectation: Additional fields will be required e.g. preferences, flags, etc.
 */
export interface CalendarGridData {
  rows: CalendarGridRow<any>[];
}

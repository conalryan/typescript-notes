import { CalendarGridCell, CalendarGridRow, CalendarGridData } from "./calendar-grid-data";

export const strCells = (): CalendarGridCell<string>[] => {
  return [
    {id: 'A', date: new Date(2019, 9, 1, 0, 0, 0, 0), value: '1'},
    {id: 'A', date: new Date(2019, 9, 2, 0, 0, 0, 0), value: '2'},
    {id: 'A', date: new Date(2019, 9, 3, 0, 0, 0, 0), value: '3'},
    {id: 'A', date: new Date(2019, 9, 4, 0, 0, 0, 0), value: '3'},
    {id: 'A', date: new Date(2019, 9, 5, 0, 0, 0, 0), value: '3'},
    {id: 'A', date: new Date(2019, 9, 6, 0, 0, 0, 0), value: '3'},
    {id: 'A', date: new Date(2019, 9, 7, 0, 0, 0, 0), value: '3'},
    {id: 'A', date: new Date(2019, 9, 8, 0, 0, 0, 0), value: '3'},
    {id: 'A', date: new Date(2019, 9, 9, 0, 0, 0, 0), value: '3'},
    {id: 'A', date: new Date(2019, 9, 10, 0, 0, 0, 0), value: '3'},
    {id: 'A', date: new Date(2019, 9, 11, 0, 0, 0, 0), value: '3'}
  ];
};

export const numCells = (): CalendarGridCell<number>[] => {
  return [
    {id: 'B', date: new Date(2019, 9, 1, 0, 0, 0, 0), value: 4},
    {id: 'B', date: new Date(2019, 9, 2, 0, 0, 0, 0), value: 5},
    {id: 'B', date: new Date(2019, 9, 3, 0, 0, 0, 0), value: 6}
  ];
}

export const calendarGridRows = (): CalendarGridRow<any>[] => {
  return [
    {
      label: 'Row 1',
      cells: strCells(),
      node: undefined
    },
    {
      label: 'Row2',
      cells: numCells(),
      node: undefined
    }
  ];
};

export const calendarGridData = (): CalendarGridData => {
  return {
    rows: calendarGridRows()
  };
};

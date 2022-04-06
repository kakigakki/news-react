export interface IMenu {
  id: number;
  title: string;
  key: string;
  pagepermisson?: number;
  routepermission?: number;
  grade: number;
  children: IMenu[];
}

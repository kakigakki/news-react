export interface IRights {
  id: number;
  title: string;
  key: string;
  pagepermisson?: number;
  routepermission?: number;
  grade: number;
  rightId?: number;
  children?: IRights[];
}

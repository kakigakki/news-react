/* eslint-disable no-unused-vars */
export interface IRight {
  id: number;
  title: string;
  key: string;
  pagepermisson?: number;
  routepermission?: number;
  grade: number;
  rightId?: number;
  children?: IRight[];
}

export enum ERole {
  SUPER_ADMIN = 1,
  REGION_ADMIN,
  REGION_EIDTOR,
}
export interface IRole {
  id: number;
  roleName: string;
  roleType: ERole;
  rights: string[];
}

export enum logActionEnum {
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export class CreateLogDto {
  action: logActionEnum;
  createdBy: string;
  entity: string;
  entityId: string;
  snapshot?: JSON;
}

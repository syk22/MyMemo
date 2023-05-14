export type ToDoFormat = {
  value: string;
  readonly id: number;
  isDone: boolean;
  isRemoved: boolean;
  isModifing: boolean;
  readonly createdDateTime: Date;
  lastModifiedDateTime?: Date;
  doneDateTime?: Date;
  removedDateTime?: Date;
};

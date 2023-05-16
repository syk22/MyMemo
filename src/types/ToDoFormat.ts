export type ToDoFormat = {
  value?: string;
  todoText?: string;
  readonly id: number;
  isDone: boolean;
  isClosed: boolean;
  isModifing: boolean;
  readonly createdDateTime?: Date;
  lastModifiedDateTime?: Date;
  doneDateTime?: Date | undefined;
  closedDateTime?: Date | undefined;
};

import { Column, ObjectIdColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class University {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;
}

import { Exclude } from "class-transformer"
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm"

@Entity("users")
class User {
  @Column()
  name: string

  @Column({unique: true})
  email: string 

  @Column()
  @Exclude()
  password: string

  @Column()
  isAdm: boolean

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @PrimaryGeneratedColumn("uuid")
  id: string
}

export { User }

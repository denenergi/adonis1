import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'todos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.string('name', 50).notNullable()
      table.string('descriptions', 500)

      table.text('file')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
import type { HttpContext } from '@adonisjs/core/http'
import Todo from '../models/todo.js'
import { todoValidator } from '../validator/todo.js'
import app from '@adonisjs/core/services/app'
import { unlink } from 'node:fs/promises'

export default class TodosController {

  async index({ request, response }: HttpContext) {
    const todos = await Todo.all()
    return response.status(200).json({ data: todos })
  }

  async show({ request, response }: HttpContext) {
    const todo = await Todo.find(request.param('id'))

    return response.status(200).json({ data: todo })
  }

  async store({ request, response }: HttpContext) {
    const {name, descriptions, file} = await request.validateUsing(todoValidator)
    try {
      const todo = new Todo()
      todo.name = name
      todo.descriptions = descriptions
      if (file) {
        await file.move(app.makePath('storage/files'))
        todo.file = `files/${file.clientName}`
      }
      await todo.save()
      return response.status(200).json({ message: "Created", data: todo })

    } catch (err) {
      response.badRequest(err.messages)
    }
  }

  async update({ request, response }: HttpContext) {
    const {name, descriptions, file} = await request.validateUsing(todoValidator)
    try {
      const todo = await Todo.findOrFail(request.param('id'))
      todo.name = name
      todo.descriptions = descriptions
      if (file?.clientName !== todo.file ) {
        await unlink(app.makePath('storage', todo.file))
        await file?.move(app.makePath('storage/files'))
        todo.file = `files/${file?.clientName}`
      }
      await todo.save()
      return response.status(200).json({ message: "Edited", data: todo })
    } catch (err) {
      response.badRequest(err.messages)
    }
  }

  async destroy({ request, response }: HttpContext) {
    const todo = await Todo.findOrFail(request.param('id'))
    await todo.delete()
    await unlink(app.makePath('storage', todo.file))
    return response.status(200).json({ message: "Deleted", data: todo })
  }
}
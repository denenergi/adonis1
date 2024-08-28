// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from "@adonisjs/core/http";
import app from "@adonisjs/core/services/app";

export default class FilesController {
    async show({response, params}: HttpContext) {
        return response.download(app.makePath('storage/files', params.filename))
    }
}
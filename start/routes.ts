import router from '@adonisjs/core/services/router'
import FilesController from '../app/controllers/files_controller.js'

router.get('/home', async ({inertia}) => {
    return inertia.render('home')
})

router.get('/', async ({inertia}) => {
    return inertia.render('home')
})

router.get('files/filename', '#controllers/files_controller')


router.resource('todos', '#controllers/todos_controller')


import router from '@adonisjs/core/services/router'

router.get('/home', async ({inertia}) => {
    return inertia.render('home')
})

router.get('/', async ({inertia}) => {
    return inertia.render('home')
})

router.resource('todos', '#controllers/todos_controller')


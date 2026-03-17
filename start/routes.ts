/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UsersController from '#controllers/users_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

/* Unauthenticated routes */
router.on('/login').renderInertia('login/index').use(middleware.guest())

/* Authenticated routes */
router.on('/').renderInertia('home').use(middleware.auth())
router.on('/account').renderInertia('account').use(middleware.auth())

router.group(() => {
	router.group(() => {
		router.post('/register', new UsersController().register)
		router.post('/login', new UsersController().login)
	}).use(middleware.guest())

	router.group(() => {
		router.post('/logout', new UsersController().logout)
		router.post('/change-personal-data', new UsersController().changePersonalData)
		router.post('/change-password', new UsersController().changePassword)
	}).use(middleware.auth())
}).prefix('/api')

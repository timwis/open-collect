import ViewSwitcher from 'ampersand-view-switcher'

import Router from './router'

const container = document.getElementById('main')
const pageSwitcher = new ViewSwitcher(container)

const appRouter = new Router({pageSwitcher: pageSwitcher})
appRouter.history.start({pushState: false})

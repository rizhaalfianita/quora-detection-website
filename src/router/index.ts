import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import DatasetView from '@/views/Dataset/DatasetView.vue'
import DataTrainView from '@/views/Dataset/DataTrainView.vue'
import DataTestView from '@/views/Dataset/DataTestView.vue'
import ClassificationView from '@/views/ClassificationView.vue'
import VisualizationView from '@/views/VisualizationView.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      title: 'Dashboard'
    }
  },
  {
    path: '/dataset',
    name: 'dataset',
    component: DatasetView,
    meta: {
      title: 'Dataset'
    }
  },
  {
    path: '/dataset/data-train',
    name: 'dataTrain',
    component: DataTrainView,
    meta: {
      title: 'Data Train'
    }
  },
  {
    path: '/dataset/data-test',
    name: 'dataTest',
    component: DataTestView,
    meta: {
      title: 'Data Test'
    }
  },
  {
    path: '/classification',
    name: 'classification',
    component: ClassificationView,
    meta: {
      title: 'Classification'
    }
  },
  {
    path: '/visualization',
    name: 'Visualization',
    component: VisualizationView,
    meta: {
      title: 'Visualization'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Quora - Insincere Question Detection System`
  next()
})

export default router

<template>
  <aside class="barraizquierda a">
    <ul class="menu bg-base-500 text-white">
<li>
  <router-link to="/proyectos" class="text-white hover:underline">
    Proyectos
  </router-link>
</li>


      <li v-for="proyecto in store.projects" :key="proyecto.id">
        <details>
          <summary>{{ proyecto.name }}</summary>
          <ul>
            <li>
              <RouterLink
                class="pl-4 hover:underline"
                :to="{ name: 'ProyectoTareas', params: { id: proyecto.id } }"
                >
                Ver tareas
              </RouterLink>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { useProjectsStore } from '@/stores/projectsStore'
import { RouterLink } from 'vue-router'

const store = useProjectsStore()
</script>

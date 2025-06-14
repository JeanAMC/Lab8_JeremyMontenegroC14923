<template>
  <div class="overflow-x-auto text-white">
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Proyectos</th>
          <th>Tareas</th>
          <th>Completado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(proyecto, index) in store.projects" :key="proyecto.id">
          <th>{{ index + 1 }}</th>
          <td>{{ proyecto.name }}</td>
          <td>{{ obtenerTareasCompletadas(proyecto) }}</td>
          <td class="w-1/3">
            <div class="w-full">
              <progress
                class="progress progress-success w-full"
                :value="calcularProgreso(proyecto)"
                max="100"
              ></progress>
              <small>{{ calcularProgreso(proyecto) }}%</small>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useProjectsStore } from '@/stores/projectsStore'

const store = useProjectsStore()

function obtenerTareasCompletadas(proyecto) {
  return proyecto.tareas.filter(tarea => tarea.completado == false).length
}

function calcularProgreso(proyecto) {
  const total = proyecto.tareas.length
  if (total === 0) return 0

  const completadas = proyecto.tareas.filter(t => t.completado).length
  return Math.round((completadas / total) * 100)
}
</script>

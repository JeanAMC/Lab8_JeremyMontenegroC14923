<template>
  <div class="overflow-x-auto text-white">
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Proyectos</th>
          <th>Tareas</th>
          <th>Completado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(proyecto, index) in store.projects" :key="proyecto.id">
          <th>{{ index + 1 }}</th>
          <td @dblclick="empezarEdicion(proyecto)">
            <template v-if="proyectoEditandoId === proyecto.id">
              <input
                v-model="nombreEditado"
                @keyup.enter="guardarEdicion(proyecto)"
                @blur="guardarEdicion(proyecto)"
                class="input input-sm w-full text-black"
                autofocus
              />
            </template>
            <template v-else>
              {{ proyecto.name }}
            </template>
          </td>
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
          <td>
            <button
              class="btn btn-sm btn-error"
              @click="eliminarProyecto(proyecto.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<script setup>
import { useProjectsStore } from '@/stores/projectsStore'
import { ref  } from 'vue'
const store = useProjectsStore()
const proyectoEditandoId = ref(null)
const nombreEditado = ref('')

function empezarEdicion(proyecto) {
  proyectoEditandoId.value = proyecto.id
  nombreEditado.value = proyecto.name
}

function guardarEdicion(proyecto) {
  if (nombreEditado.value.trim()) {
    store.updateProject(proyecto.id, nombreEditado.value)
  }
  proyectoEditandoId.value = null
}

function eliminarProyecto(proyectoId) {
  if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
    store.deleteProject(proyectoId)
  }
}


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

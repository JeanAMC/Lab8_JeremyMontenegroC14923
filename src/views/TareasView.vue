<template>
  <div class="p-4 text-white">
    <h2 class="text-xl font-bold mb-4">Tareas del proyecto: {{ proyecto?.name }}</h2>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Completado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tarea, index) in proyecto?.tareas" :key="tarea.id">
          <td>{{ index + 1 }}</td>
          <td>{{ tarea.nombre }}</td>
                <td>    
                <span v-if="tarea.completado" class="text-green-400 font-semibold">
                    {{ tarea.fecha}}
                </span>
                <button 
                    v-else 
                    class="btn btn-sm btn-success"
                    @click="completarTarea(tarea.id)"
                >
                    Marcar como completada
                </button>
                </td>

        </tr>

        <tr>
          <td>-</td>
          <td>
            <input
              v-model="nuevaTarea.nombre"
              @keyup.enter="agregarTarea"
              class="input w-full bg-base-500 text-black border-none focus:outline-none focus:ring-0"
              placeholder="Nueva tarea"
            />
          </td>
          <td>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



<script setup>
import { useRoute } from 'vue-router'
import { reactive } from 'vue'
import { useProjectsStore } from '@/stores/projectsStore'

const route = useRoute()
const store = useProjectsStore()

const proyecto = store.projects.find(p => p.id === route.params.id)

const nuevaTarea = reactive({
  nombre: ''
})

function agregarTarea() {
  if (!nuevaTarea.nombre.trim()) return

  store.addTaskToProject(proyecto.id, nuevaTarea.nombre)
  nuevaTarea.nombre = ''
}

function completarTarea(tareaId) {
  const tarea = proyecto?.tareas.find(t => t.id === tareaId)
  if (tarea) {
    tarea.completado = true
    tarea.fecha = new Date().toISOString().split('T')[0]
  }
}
</script>

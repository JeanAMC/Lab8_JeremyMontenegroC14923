import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export interface Tarea {
  id: string
  nombre: string
  completado: boolean
  fecha?: string
}

export interface Project {
  id: string
  name: string
  tareas: Tarea[]  
}

const STORAGE_KEY = 'projects'

function loadProjectsFromLocalStorage(): Project[] {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>(loadProjectsFromLocalStorage())

  watch(
    projects,
    (newProjects) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProjects))
    },
    { deep: true }
  )

  function addProject(data: { name: string }) {
    projects.value.push({
      id: uuidv4(),
      name: data.name,
      tareas: []
    })
  }

  function deleteTaskFromProject(projectId: string, taskId: string) {
    const proyecto = projects.value.find(p => p.id === projectId)
    if (!proyecto) return

    proyecto.tareas = proyecto.tareas.filter(t => t.id !== taskId)
  }

  function addTaskToProject(projectId: string, nombre: string) {
    const project = projects.value.find(p => p.id === projectId)
    if (project) {
      project.tareas.push({
        id: uuidv4(),
        nombre,
        completado: false,
        fecha: new Date().toISOString().split('T')[0]
      })
    }
  }

  function updateTask(projectId: string, taskId: string, nuevoNombre: string) {
    const proyecto = projects.value.find(p => p.id === projectId)
    if (!proyecto) return

    const tarea = proyecto.tareas.find(t => t.id === taskId)
    if (tarea) {
      tarea.nombre = nuevoNombre
    }
  }

  function updateProject(projectId: string, nuevoNombre: string) {
    const proyecto = projects.value.find(p => p.id === projectId)
    if (proyecto) {
      proyecto.name = nuevoNombre
    }
  }

  function deleteProject(projectId: string) {
    projects.value = projects.value.filter(p => p.id !== projectId)
  }

  return {
    projects,
    addProject,
    addTaskToProject,
    updateTask, 
    updateProject,
    deleteTaskFromProject,
    deleteProject
  }
})

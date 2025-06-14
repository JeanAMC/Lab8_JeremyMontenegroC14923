import { defineStore } from 'pinia'
import { ref } from 'vue'
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



export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])

  function addProject(data: { name: string;}) {
    projects.value.push({
      id: uuidv4(),
      name: data.name,
      tareas: []
    })
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

  return {
    projects,
    addProject,
    addTaskToProject
  }
})


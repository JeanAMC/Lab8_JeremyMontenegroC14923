<template>
  <div v-if="open" class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg mb-4">Agregar Proyecto</h3>

      <div class="form-control mb-2">
        <label class="label">Proyecto</label>
        <input v-model="form.proyecto" class="input input-bordered" />
      </div>

      <div class="modal-action">
        <button class="btn btn-primary" @click="handleAdd">Agregar</button>
        <button class="btn" @click="handleClose">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useProjectsStore } from '@/stores/projectsStore'

const props = defineProps({
  open: Boolean
})

const emit = defineEmits(['close'])

const form = ref({
  proyecto: ''
})

const store = useProjectsStore()

function handleAdd() {
  if (form.value.proyecto) {
    store.addProject({
      name: form.value.proyecto,

    })
    resetForm()
    emit('close')
  }
}

function handleClose() {
  resetForm()
  emit('close')
}

function resetForm() {
  form.value = {
    proyecto: '',
  }
}
</script>

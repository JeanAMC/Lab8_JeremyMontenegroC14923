<template>

<TopBar/>
<div class="container h-screen flex flex-col">
<FabButton @open-modal="showModal = true"/>
<CustomModal :open="showModal" @close="showModal = false" @add-item="addItem" />
  <Aside/>
  <div class="contenido b"> 
<RouterView v-slot="{ Component }">
  <component :is="Component" v-if="Component" :tableData="tableData" />
</RouterView>

  
  </div>
</div>

</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import TopBar from '@/components/icons/TopBar.vue'
import FabButton from '@/components/icons/FabButton.vue'
import Aside from '@/components/icons/Aside.vue'
import CustomModal from '@/components/icons/CustomModal.vue'


export default {
  components: {
    TopBar,
    FabButton,
    Aside,
    CustomModal
  },
  data() {
    return {
      showModal: false,
      tableData: []
    }
  },
  methods: {
    addItem(nuevo) {
      this.tableData.push({
        id: uuidv4(),
        ...nuevo
      })
      this.showModal = false
    }
  }
}

</script>
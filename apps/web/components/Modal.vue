<script setup lang="ts">
import { ref } from 'vue'

type ModalProps = {
  buttonText?: string
}

const props = withDefaults(defineProps<ModalProps>(), {
  buttonText: '打开弹窗'
})

const isModalVisible = ref(false)

const openModal = () => {
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
}
</script>

<template>
  <div>
    <button 
      @click="openModal" 
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {{ buttonText }}
    </button>

    <div 
      v-if="isModalVisible" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeModal"
    >
      <div 
        class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative"
        @click.stop
      >
        <button 
          @click="closeModal" 
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        
        <slot>
          <h2 class="text-xl font-bold mb-4">默认弹窗标题</h2>
          <p>这是默认的弹窗内容。你可以通过插槽自定义内容。</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const { apiCaller } = useApiCaller();

const isRecording = ref(false);
const mediaRecorder = ref<MediaRecorder | null>(null);
const audioChunks = ref<Blob[]>([]);
const audioUrl = ref(''); // 用于存储音频URL

// 将Blob转换为base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // 获取base64字符串，并去掉前缀 "data:audio/wav;base64,"
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};


// 处理录音权限和初始化
const initRecorder = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.value = new MediaRecorder(stream);

    mediaRecorder.value.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.value.push(event.data);
      }
    };

    mediaRecorder.value.onstop = async () => {
      // 将录音数据转换为 WAV 格式的 Blob
      const audioBlob = new Blob(audioChunks.value, { type: 'audio/wav' });
      
      try {
        // 转换为base64
        const base64Audio = await blobToBase64(audioBlob);
        console.log(1111111, base64Audio);
        
        // 发送base64格式的音频数据到后端
        const result = await apiCaller.ai.generateProductNames.query({
          audio: base64Audio,
        });
        console.log('AI 分析结果:', result);

        // 下载转换后的音频文件
      } catch (error) {
        console.error('发送录音失败:', error);
      }

      // 清空录音数据，为下次录音做准备
      audioChunks.value = [];
    };

  } catch (error) {
    console.error('无法获取麦克风权限:', error);
  }
};

// 开始/停止录音
const toggleRecording = async () => {
  if (!mediaRecorder.value) {
    await initRecorder();
  }

  if (mediaRecorder.value) {
    if (!isRecording.value) {
      mediaRecorder.value.start();
      isRecording.value = true;
      // 清除之前的音频URL
      if (audioUrl.value) {
        URL.revokeObjectURL(audioUrl.value);
        audioUrl.value = '';
      }
    } else {
      mediaRecorder.value.stop();
      isRecording.value = false;
    }
  }
};
</script>

<template>
  <section class="py-24">
    <div class="container">
      <div class="flex flex-col items-center gap-4">
        <!-- 录音按钮 -->
        <button
          @click="toggleRecording"
          class="rounded-lg px-6 py-3 transition-colors"
          :class="isRecording 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'"
        >
          {{ isRecording ? '停止录音' : '开始录音' }}
        </button>

        <!-- 录音状态显示 -->
        <div v-if="isRecording" class="animate-pulse text-red-500">
          正在录音...
        </div>

        <!-- 音频播放器 -->
        <audio v-if="audioUrl" controls :src="audioUrl" class="mt-4">
          您的浏览器不支持音频播放
        </audio>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
<script setup lang="ts">
  import { ref } from "vue";

  const { apiCaller } = useApiCaller();
  const selectedFile = ref<File | null>(null);
  const uploadStatus = ref("");
  const isUploading = ref(false);

  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      selectedFile.value = input.files[0];
    }
  };

  const uploadFile = async () => {
    if (!selectedFile.value) {
      uploadStatus.value = "请先选择音频文件";
      return;
    }

    isUploading.value = true;
    uploadStatus.value = "上传中...";

    try {
      const formData = new FormData();
      formData.append("file", selectedFile.value);

      const response = await fetch("/api/ai/score", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.code !== 200) {
        uploadStatus.value = `上传失败：${result.message}`;
        return;
      }
      uploadStatus.value = `上传成功！文件名: ${result.filename}`;
      selectedFile.value = null;

      const res = await apiCaller.ai.generateProductNames.query({
        audio: result.filename,
      });

      console.log(111111, res);
    } catch (error) {
      uploadStatus.value = `上传出错：${(error as Error).message}`;
    } finally {
      isUploading.value = false;
    }
  };

  const TASK_TYPES = [
    "DAILY_CHECKIN",
    "JOIN_DISCORD",
    "JOIN_TELEGRAM",
    "SHARE_DISCORD",
    "SHARE_TELEGRAM",
  ] as const;
  type TaskType = (typeof TASK_TYPES)[number];

  const submitTasks = async (type: TaskType) => {
    const res = await apiCaller.task.submitTasks.mutate({
      taskType: type,
    }).catch((error) => {
      console.error(error.message);
    });
    console.log(222222, res);
  };
  // 余额
  let balanceInquiry = await apiCaller.billing.balanceInquiry.useQuery();
  const drawal = async () => {
    const res = await apiCaller.billing.withdrawBalance.mutate();
    console.log(res);
    balanceInquiry = await apiCaller.billing.balanceInquiry.useQuery();
  }
  

</script>

<template>
  <section class="py-24">
    <div class="container">
      <div class="mx-auto max-w-md">
        <div class="mb-6">
          <input
            type="file"
            accept="audio/*"
            @change="handleFileChange"
            class="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>

        <div class="mb-4">
          <span v-if="selectedFile" class="text-sm text-gray-600">
            已选择文件: {{ selectedFile.name }}
          </span>
        </div>

        <button
          @click="uploadFile"
          :disabled="!selectedFile || isUploading"
          class="w-full rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {{ isUploading ? "上传中..." : "上传音频文件" }}
        </button>

        <div
          v-if="uploadStatus"
          class="mt-4 rounded-lg p-4"
          :class="{
            'bg-green-100 text-green-700': uploadStatus.includes('成功'),
            'bg-red-100 text-red-700':
              uploadStatus.includes('失败') || uploadStatus.includes('错误'),
            'bg-blue-100 text-blue-700': uploadStatus.includes('上传中'),
          }"
        >
          {{ uploadStatus }}
        </div>
      </div>
    </div>
    <div class="container">
      <div class="mx-auto max-w-md">
        <button
          v-for="type in TASK_TYPES"
          :key="type"
          @click="submitTasks(type)"
          class="mt-3 w-full rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          任务: {{ type }}
        </button>
      </div>
    </div>
    <div class="container">
      <div class="mx-auto max-w-md">
        <br />
        余额:
        {{ balanceInquiry.data }}
        <button
          @click="drawal"
          class="mt-3 w-full rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          提现
        </button>
      </div>
    </div>
  </section>
</template>

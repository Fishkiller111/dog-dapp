
<template>
    <div class="audio-recorder">
      <canvas v-show="state.isRecording" ref="visualizer" width="600" height="200" class="waveform"></canvas>

      <!-- <div class="controls">
        <button
          @click="toggleRecording"
          :class="{ 'recording': state.isRecording }"
        >
          {{ state.isRecording ? '停止录音' : '开始录音' }}
        </button>

        <button
          v-if="state.audioUrl"
          @click="playAudio"
          :disabled="state.isPlaying"
          class="play-button"
        >
          {{ state.isPlaying ? '播放中...' : '播放录音' }}
        </button>

        <button
          v-if="state.audioUrl"
          @click="downloadAudio"
          class="download-button"
        >
          下载录音
        </button>
      </div> -->

      <!-- <audio ref="audioPlayer" :src="state.audioUrl"></audio> -->
    </div>
  </template>

  <script setup lang="ts">
  import { ref, onBeforeUnmount } from 'vue'

  // 定义接口
  interface AudioRecorderState {
    isRecording: boolean
    isPlaying: boolean
    audioUrl: string
    mediaRecorder: MediaRecorder | null
    audioChunks: Blob[]
    audioContext: AudioContext | null
    analyser: AnalyserNode | null
    dataArray: Uint8Array | null
    animationId: number | null
  }

  interface AudioVisualSettings {
    waveformColor: string
    backgroundColor: string
    fftSize: number
    smoothingTimeConstant: number
  }


    interface AudioEmits {
        audioResult: string;
    }

    const emits = defineEmits<AudioEmits>();

      const state = ref<AudioRecorderState>({
        isRecording: false,
        isPlaying: false,
        audioUrl: '',
        mediaRecorder: null,
        audioChunks: [],
        audioContext: null,
        analyser: null,
        dataArray: null,
        animationId: null
      })

      const visualSettings: AudioVisualSettings = {
        waveformColor: '#fbf8f5',
        backgroundColor: '#F6F6F8',
        fftSize: 4096,
        smoothingTimeConstant: 0.8
      }

      const visualizer = ref<HTMLCanvasElement | null>(null)
      const audioPlayer = ref<HTMLAudioElement | null>(null)

      const minSecond: number = 3
      const maxSecond: number = 10
      let currentSecond: number = 0
      let voiceTimer: string | number | NodeJS.Timeout | null | undefined = null

      // 初始化录音设备
      const initRecording = async (): Promise<void> => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

          state.value.audioContext = new window.AudioContext()
          state.value.analyser = state.value.audioContext.createAnalyser()

          // 配置分析器节点
          state.value.analyser.fftSize = visualSettings.fftSize
          state.value.analyser.smoothingTimeConstant = visualSettings.smoothingTimeConstant

          const source = state.value.audioContext.createMediaStreamSource(stream)
          source.connect(state.value.analyser)

          state.value.dataArray = new Uint8Array(state.value.analyser.frequencyBinCount)

          // 配置 MediaRecorder
          state.value.mediaRecorder = new MediaRecorder(stream)

          state.value.mediaRecorder.ondataavailable = (event: BlobEvent): void => {
            state.value.audioChunks.push(event.data)
          }

          state.value.mediaRecorder.onstop = (): void => {
            const audioBlob = new Blob(state.value.audioChunks, { type: 'audio/wav' })
            if (state.value.audioUrl) {
              URL.revokeObjectURL(state.value.audioUrl)
            }
            state.value.audioUrl = URL.createObjectURL(audioBlob) as string;
            state.value.audioChunks = []
            if (currentSecond < minSecond) {
                clearVoiceTimer()
                alert(`最少录制${minSecond}s`)
            } else {
                emits('audioResult', state.value.audioUrl)
            }
          }

        } catch (error) {
          console.error('Error accessing microphone:', error)
          alert('无法访问麦克风，请确保已授予权限')
        }
      }

      // 绘制波形
      const drawWaveform = (): void => {
        if (!visualizer.value || !state.value.analyser || !state.value.dataArray) return

        const canvasCtx = visualizer.value.getContext('2d')
        if (!canvasCtx) return

        const width = visualizer.value.width
        const height = visualizer.value.height

        const draw = (): void => {
          state.value.animationId = requestAnimationFrame(draw)

          state.value.analyser!.getByteTimeDomainData(state.value.dataArray!)

          // 设置背景
          canvasCtx.fillStyle = visualSettings.backgroundColor
          canvasCtx.fillRect(0, 0, width, height)

          // 创建渐变
          const gradient = canvasCtx.createLinearGradient(0, 0, 0, height)
          gradient.addColorStop(0, visualSettings.waveformColor)
          gradient.addColorStop(1, '#D2B48C')

          canvasCtx.lineWidth = 2
          canvasCtx.strokeStyle = gradient

          // 绘制波形
          canvasCtx.beginPath()
          const sliceWidth = width / state.value.dataArray!.length
          let x = 0

          for (let i = 0; i < state.value.dataArray!.length; i++) {
            const v = state.value.dataArray![i] / 128.0
            const y = v * height / 2

            if (i === 0) {
              canvasCtx.moveTo(x, y)
            } else {
              const prevX = x - sliceWidth
              const prevY = (state.value.dataArray![i - 1] / 128.0) * height / 2
              const curX = x
              const curY = y
              const midX = (prevX + curX) / 2
              canvasCtx.quadraticCurveTo(prevX, prevY, midX, (prevY + curY) / 2)
            }

            x += sliceWidth
          }

          canvasCtx.lineTo(width, height / 2)
          canvasCtx.stroke()

          // 绘制倒影
          canvasCtx.save()
          canvasCtx.globalAlpha = 0.2
          canvasCtx.translate(0, height)
          canvasCtx.scale(1, -0.3)
          canvasCtx.stroke()
          canvasCtx.restore()
        }

        draw()
      }



      // 切换录音状态
      const toggleRecording = async (): Promise<void> => {
        if (!state.value.isRecording) {
          if (!state.value.mediaRecorder) {
            await initRecording()
          }
          state.value.mediaRecorder?.start()
          state.value.isRecording = true
          computeVoiceTimer()
          drawWaveform()
        } else {
          state.value.mediaRecorder?.stop()
          state.value.isRecording = false
          clearVoiceTimer(false)
          if (state.value.animationId) {
            cancelAnimationFrame(state.value.animationId)
          }
        }
      }

      const clearVoiceTimer = (clean = true):void => {
        if (voiceTimer) {
            clean && (currentSecond = 0);
            clearInterval(voiceTimer)
        } else {
            currentSecond = 0
        }
      }
      const computeVoiceTimer = (): void => {
        clearVoiceTimer()
        voiceTimer = setInterval(() => {
            currentSecond++
            if (currentSecond >= maxSecond && state.value.isRecording) {
                clearVoiceTimer(false)
                toggleRecording()
            }
            console.log('currentSecond===', currentSecond)
        }, 1000);

      }

      // 播放音频
      const playAudio = (): void => {
        if (!audioPlayer.value) return

        if (audioPlayer.value.paused) {
          state.value.isPlaying = true
          audioPlayer.value.play()
          audioPlayer.value.onended = () => {
            state.value.isPlaying = false
          }
        } else {
          audioPlayer.value.pause()
          state.value.isPlaying = false
        }
      }

      // 下载音频
      const downloadAudio = (): void => {
        if (state.value.audioUrl) {
          const a = document.createElement('a')
          a.href = state.value.audioUrl
          a.download = `recording-${new Date().toISOString()}.wav`
          a.click()
        }
      }

      // 清理资源
      onBeforeUnmount(() => {
        if (state.value.animationId) {
          cancelAnimationFrame(state.value.animationId)
        }
        if (state.value.audioContext) {
          state.value.audioContext.close()
        }
        if (state.value.audioUrl) {
          URL.revokeObjectURL(state.value.audioUrl)
        }
      })


      defineExpose({
        toggleRecording
      })

  </script>

  <style scoped>
  .audio-recorder {
    border-radius: 12px;
    max-width: 800px;
    margin: 0 auto;
    /* background-color: #fbf8f5; */
    /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); */
  }

  .waveform {
    width: 100%;
    height: 200px;
    /* background: #fbf8f5; */
    margin-bottom: 20px;
    border-radius: 8px;
    /* border: 1px solid #E8E0D8; */
  }

  .controls {
    display: flex;
    gap: 12px;
    justify-content: center;
  }

  button {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    background: #fbf8f5;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  button:hover {
    background: #9e8462;
    transform: translateY(-1px);
  }

  button:disabled {
    background: #E8E0D8;
    cursor: not-allowed;
    transform: none;
  }

  button.recording {
    background: #C1876B;
    animation: pulse 2s infinite;
  }

  button.play-button {
    background: #6B8E23;
  }

  button.download-button {
    background: #4A708B;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(193, 135, 107, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(193, 135, 107, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(193, 135, 107, 0);
    }
  }
  </style>
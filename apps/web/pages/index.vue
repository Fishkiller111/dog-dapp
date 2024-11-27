
<script setup lang="ts">
  import AOS from "aos";
  import "aos/dist/aos.css";

  import { CalendarCheck } from 'lucide-vue-next'
  import { useToast } from "@/modules/ui/components/toast";

  const { apiCaller } = useApiCaller();

  const { toast, dismiss: dismissToast } = useToast();

  type balanceInquiryType = {withdrawable: number; pending: number; completed: number}

const audioRecorder = ref(null)
const isRecording = ref(false)
const showConfirmation = ref(false);
const isUploading = ref(false)
const isWithdraw = ref(false)
const balanceInquiry = ref<balanceInquiryType>({
    withdrawable: 0,
    pending: 0,
    completed: 0
})

onMounted(() => {
    AOS.init({
        once: true,
    });
    fetchBalance()
})

const fetchBalance = async () => {
    const { data } = await apiCaller.billing.balanceInquiry.useQuery();
    balanceInquiry.value = data as unknown as balanceInquiryType;
}

const handleToggleVoice = (): void => {
    console.log(audioRecorder.value)
    isRecording.value = !isRecording.value
    audioRecorder.value?.toggleRecording()
}

const handleWithDraw = async () => {
    try {
        isWithdraw.value = true
        const res = await apiCaller.billing.withdrawBalance.mutate();
        console.log(res);
        const {data } = await apiCaller.billing.balanceInquiry.useQuery();
        balanceInquiry.value = data as unknown as balanceInquiryType;
        toast({
            variant: "success",
            title: `Success!`,
        });
    } catch (error) {
        console.log(error)
        toast({
            variant: "error",
            title: `${(error as Error).message}`,
        });
        isWithdraw.value = false

    }
}

const handleAudioResult = async (audioRes: Blob) => {
    console.log('voice result ===', audioRes)
    try {
     const file = new File([audioRes], "voice.wav", { type: audioRes.type });
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/ai/score", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.code !== 200) {
        toast({
            variant: "error",
            title: result.message,
        });
        return;
      }
      const res = await apiCaller.ai.generateProductNames.query({
        audio: result.filename,
      });
      if (res) {
        toast({
            variant: "success",
            title: `Upload Success!`,
        });
        balanceInquiry.value.withdrawable += res.score
      }

    } catch (error) {
        toast({
            variant: "error",
            title: `${(error as Error).message}`,
        });
    } finally {
      isUploading.value = false;
    }
}


const handleTab = async (type: string) => {
    const comeSoon = ['Trade', 'Stake']
    if (comeSoon.includes(type)) {
        toast({
            variant: "default",
            title: 'Coming Soon!',
        });
        return
    }
    if (type === 'Invitation') 
showConfirmation.value = true

    if (type === 'Daily') {
        fetchScore('DAILY_CHECKIN')
    }
    if (type === 'Discord') {
        fetchScore('JOIN_DISCORD')
    }
    if (type === 'Telegram') {
        fetchScore('JOIN_TELEGRAM')
    }
}

const TASK_TYPES = [
    "DAILY_CHECKIN",
    "JOIN_DISCORD",
    "JOIN_TELEGRAM",
    "SHARE_DISCORD",
    "SHARE_TELEGRAM",
  ] as const;
  type TaskType = (typeof TASK_TYPES)[number];

const fetchScore = (type: TaskType, cb?: Function) => {
    apiCaller.task.submitTasks.mutate({
        taskType: type,
    }).catch((error) => {
        console.error(error.message);
        toast({
            variant: "error",
            title: error.message || 'An error occurred!',
        });
    }).then(res => {
        console.log(res)
        toast({
            variant: "success",
            title: `Success!`,
        });
        fetchBalance()
        typeof cb === 'function' && cb()
    });
}

const handleShare = (type: TaskType): void => {
    console.log('handleShare', type)
    fetchScore(type)
}
  </script>

  <template>
    <div class="relative">
      <MarketingTest />
      <!-- Navbar Dropdown 1 row -->
      <nav
        class="font-inter top-0 z-20 mx-auto mb-12 h-auto w-full bg-white lg:sticky"
        x-data="{isOpen: false, menuOne:false}"
      >
        <!-- CONTAINER -->
        <div
          class="mx-auto flex max-w-7xl flex-col px-5 py-6 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:py-4"
        >
          <!-- SVG LOGO - YOU CAN REPLACE THIS -->
          <a href="/">
            <NuxtImg
                    src="/images/logo.png"
                    alt="Our application"
                    class="block size-16 rounded-xl object-cover dark:hidden"
                />
          </a>
          <!-- MENU CONTENT 1 -->
          <div
            class="mt-14 flex flex-col space-y-8 lg:mt-0 lg:flex lg:flex-row lg:space-x-1 lg:space-y-0"
            x-bind:class="isOpen ? 'show' : 'hidden'"
          >
            <!-- DROPDOWN -->
            <div class="relative flex flex-col">
              <a
                x-on:click.prevent="menuOne = !menuOne"
                href="#"
                class="font-inter flex flex-row rounded-lg font-medium text-[#000000] lg:px-6 lg:py-4 lg:hover:bg-gray-50 lg:hover:text-gray-800"
                x-bind:class="menuOne"
                >IDO
              </a>
            </div>
            <a
              href="#"
              class="font-inter rounded-lg font-medium lg:px-6 lg:py-4 lg:hover:bg-gray-50 lg:hover:text-gray-800"
              >Trade</a
            >
            <a
              href="#"
              class="font-inter rounded-lg pb-8 font-medium lg:px-6 lg:py-4 lg:pb-0 lg:hover:bg-gray-50 lg:hover:text-gray-800"
              >Stake</a
            >
            <a
              href="#"
              class="font-inter rounded-lg pb-8 font-medium lg:px-6 lg:py-4 lg:pb-0 lg:hover:bg-gray-50 lg:hover:text-gray-800"
              >Docs</a
            >
          </div>
          <!-- MENU CONTENT 2 -->
          <div
            class="flex flex-col space-y-8 lg:flex lg:flex-row lg:space-x-3 lg:space-y-0"
            x-bind:class="isOpen ? 'show' : 'hidden'"
          >
            <!-- <a
              href="#"
              class="font-inter rounded-lg lg:px-6 lg:py-4 lg:hover:bg-gray-50 lg:hover:text-gray-800"
              >Sign Up</a
            > -->
            <NuxtLink href="/auth/login">
            <Button
              class="relative mr-5 inline-block rounded-xl bg-[#fbf8f5] px-8 text-center font-semibold text-black [box-shadow:rgb(0,0,0)_6px_6px] hover:border-black md:mr-6"
              >Wallet</Button
            >
            </NuxtLink>
          </div>
          <!-- BURGER MENU -->
          <a
            href="#"
            class="absolute right-5 lg:hidden"
            x-on:click.prevent="isOpen = !isOpen"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.75 12H20.25"
                stroke="#160042"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.75 6H20.25"
                stroke="#160042"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.75 18H20.25"
                stroke="#160042"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>
      </nav>

      <section>
        <!-- Container -->
        <div
          class="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-16 lg:py-24"
          data-aos="fade-up"
          data-aos-duration="900"
        >
          <!-- Component -->
          <div
            class="grid grid-cols-1 items-center justify-center gap-12 sm:gap-20 md:grid-cols-2"
          >
            <!-- Heading Div -->
            <div class="max-w-[720px] lg:max-w-[842px]">

                <NuxtImg
                    src="/images/home.gif"
                    alt="Our application"
                    class="mb-10 block w-full rounded-xl dark:hidden"
                />

                <AudioRecorder ref="audioRecorder" @audioResult="handleAudioResult" />

            <div class="flex items-center">
                <Button
                    class="mb-6 rounded-xl bg-[#fbf8f5] px-8  text-center font-semibold text-black [box-shadow:rgb(0,0,0)_6px_6px] md:mb-10 lg:mb-12" @click="handleToggleVoice"
                    :loading="isUploading"
                    >{{ isUploading ? 'uploading...' : (isRecording ? 'Stop' : 'Record') }}</Button
                >
                <Button
                    class="mb-6 ml-6 rounded-xl bg-[#fbf8f5] px-8  text-center font-semibold text-black [box-shadow:rgb(0,0,0)_6px_6px] md:mb-10 lg:mb-12" @click="handleWithDraw"
                    :loading="isWithdraw"
                    >Withdraw</Button
                >
                </div>
            </div>
            <!-- Image Div -->
            <div
              class="relative left-4 h-full max-h-[562px] w-[85%] overflow-visible md:left-0 md:w-[95%] lg:w-full"
            >
                    <div
                    class="mx-auto  max-w-7xl px-5 md:px-10"
                    data-aos="fade-up"
                    data-aos-duration="900"
                    >
                    <div
                        class="relative mx-auto w-full max-w-7xl   bg-cover bg-center bg-no-repeat px-5 py-10 text-black"
                    >
                        <img src="/images/trade-bg.png" class="absolute left-0 top-0 size-full rounded-[48px] opacity-60" />
                        <div class="relative mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
                        <div class="mb-5  max-w-[720px] lg:mb-10">
                            <h2 class="mb-2 text-2xl font-semibold md:text-2xl">
                                IDO ANNOUNCEMENT
                            </h2>
                            <div class="mx-auto flex max-w-[630px] flex-col items-center justify-center">
                            <p class="mb-2 rounded-lg bg-[#fbf8f5] px-4 py-2 text-black">
                                Powering the Next-Gen Subnet on Bittensor
                            </p>
                            <h3 class="font-semibold">Fundraising Goal</h3>
                            <p class="py-16 text-4xl font-semibold">$TAO <span class="ml-2">{{balanceInquiry.withdrawable || 0}}</span></p>

                            <Button
                            class="ounded-xl bg-[#fbf8f5] px-8 py-4 font-semibold text-black  [box-shadow:rgb(0,0,0)_6px_6px]"
                            >View Details</Button
                        >
                            </div>
                        </div>
                        <div class=" py-8 text-2xl font-semibold lg:mb-10">
                            <span class="rounded-2xl bg-white p-2 [box-shadow:rgb(0,0,0)_6px_6px]">TAO</span> <span class="mx-1 text-xl font-normal">Coming Soon</span> <span class="rounded-2xl bg-white p-2 [box-shadow:rgb(0,0,0)_6px_6px]">WTAO</span>
                        </div>
                        <Button
                            class="mb-4 rounded-xl  bg-[#fbf8f5] px-8 py-4 font-semibold text-black [box-shadow:rgb(0,0,0)_6px_6px]"
                            >Explore Hash</Button
                        >
                        </div>
                    </div>
                    </div>
            </div>
          </div>
        </div>
      </section>



      <section>
        <!-- Container -->
        <div
          class="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-16 lg:py-24"
          data-aos="fade-up"
          data-aos-duration="900"
        >
          <!-- Heading Div -->
          <div class="mx-auto w-full max-w-3xl">
            <!-- Component -->
            <div class="text-center">
              <p class="uppercase text-[#1353fe]">3 easy steps</p>
              <h2 class="text-3xl font-semibold md:text-5xl">
                How it mine
                <span
                  class="bg-[url('https://assets.website-files.com/63904f663019b0d8edf8d57c/639156ce1c70c97aeb755c8a_Rectangle%2010%20(1).svg')] bg-cover bg-center bg-no-repeat px-4 text-white"
                  >$WOOF</span
                >
              </h2>
              <!-- <div class="mx-auto mb-8 mt-4 max-w-[528px] md:mb-12 lg:mb-16">
                <p class="text-[#636262]">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit ut
                  aliquam,purus sit amet luctus magna fringilla urna
                </p>
              </div> -->
            </div>
          </div>
          <!-- How it Works Div -->
          <div
            class="mx-auto grid grid-cols-1 gap-4 sm:justify-items-stretch md:grid-cols-3 lg:gap-8"
            data-aos="fade-up"
            data-aos-duration="900"
          >
            <!-- How it Works Item -->
            <div
              class="relative flex flex-col items-center gap-4 p-8 text-center"
            >
              <div
                class="mb-5 flex max-w-[400px] flex-col items-center justify-center rounded-xl border border-solid border-black bg-white px-8 py-5 [box-shadow:rgb(0,_0,_0)_4px_4px] md:mb-6 lg:mb-8"
              >
                <p class="text-xl font-bold">1</p>
              </div>
              <p class="mb-2 text-xl font-semibold">Share Data</p>
              <p class="text-sm text-[#636262]">
                Connect Wallet, then click the WOOF button to record Dog bark sounds.
              </p>
              <img
                src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639833af1925275b6f0b43e1_Vector%2032.svg"
                alt=""
                class="absolute bottom-[-33%] left-0 right-auto top-auto -z-10 hidden w-96 md:bottom-auto md:left-[136px] md:right-[-50%] md:top-[18%] md:inline-block lg:left-auto"
              />
            </div>
            <!-- How it Works Item -->
            <div
              class="relative flex flex-col items-center gap-4 p-8 text-center"
            >
              <div
                class="mb-5 flex max-w-[400px] flex-col items-center justify-center rounded-xl border border-solid border-black bg-white px-8 py-5 [box-shadow:rgb(0,_0,_0)_4px_4px] md:mb-6 lg:mb-8"
              >
                <p class="text-xl font-bold">2</p>
              </div>
              <p class="mb-2 text-xl font-semibold">WOOF AI</p>
              <p class="text-sm text-[#636262]">
                Evaluate the quality of data based on AI algorithms.
              </p>
              <img
                src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639834731925279c5e0b4ee5_Vector%2033.svg"
                alt=""
                class="absolute bottom-[-33%] left-0 right-auto top-auto -z-10 hidden w-96 md:bottom-auto md:left-[136px] md:right-[-50%] md:top-[10%] md:inline-block lg:left-auto"
              />
            </div>
            <!-- How it Works Item -->
            <div
              class="relative flex flex-col items-center gap-4 p-8 text-center"
            >
              <div
                class="mb-5 flex max-w-[400px] flex-col items-center justify-center rounded-xl border border-solid border-black bg-white px-8 py-5 [box-shadow:rgb(0,_0,_0)_4px_4px] md:mb-6 lg:mb-8"
              >
                <p class="text-xl font-bold">3</p>
              </div>
              <p class="mb-2 text-xl font-semibold">Done!</p>
              <p class="text-sm text-[#636262]">
                $WOOF tokens will be automatically transferred to your linked wallet.
              </p>
            </div>
          </div>
        </div>
      </section>



      <section>
        <!-- Container -->
        <div class="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-16 lg:py-24">
          <!-- Heading Div -->
          <div
            class="mx-auto w-full max-w-3xl text-center"
            data-aos="fade-up"
            data-aos-duration="900"
          >
            <h2 class="text-3xl font-semibold md:text-5xl">
                Unlock More Mining Chances By Completing These
              <span
                class="bg-[url('https://assets.website-files.com/63904f663019b0d8edf8d57c/63915f9749aaab0572c48dae_Rectangle%2018.svg')] bg-cover bg-center bg-no-repeat px-4 text-white"
                >Tasks</span
              >
            </h2>
            <div class="mx-auto mb-8 mt-4 max-w-[528px] md:mb-12 lg:mb-16">
              <!-- <p class="text-[#636262]">
                Lorem ipsum dolor sit amet consectetur adipiscing elit ut
                aliquam,purus sit amet luctus magna fringilla urna
              </p> -->
            </div>
          </div>
          <!-- Features Div -->
          <div
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:gap-12"
            data-aos="fade-up"
            data-aos-duration="900"
          >
            <!-- Feature Item -->
            <div
              class="relative mb-8 flex cursor-pointer flex-col rounded-2xl border border-solid border-black p-8 [box-shadow:rgb(0,_0,_0)_9px_9px] lg:mb-4"
              @click="handleTab('Daily')"
            >
              <div
                class="absolute -top-8 bottom-auto left-auto right-4 flex size-16 flex-col items-center justify-center rounded-full border border-solid border-[#9b9b9b] bg-white [box-shadow:rgb(0,_0,_0)_0px_5px] lg:right-8"
              >
                <CalendarCheck class="relative" color="#000000" />
              </div>
              <p class="mb-4 text-xl font-semibold">Daily Check-In </p>
              <p>
                Curious About Your Dog?
              </p>
              <p>Upload Data Now!</p>



            </div>
            <!-- Feature Item -->
            <div
              class="relative mb-8 flex cursor-pointer flex-col rounded-2xl border border-solid border-black p-8 [box-shadow:rgb(0,_0,_0)_9px_9px] lg:mb-4"
              @click="handleTab('Discord')"
            >
              <div
                class="absolute -top-8 bottom-auto left-auto right-4 flex size-16 flex-col items-center justify-center rounded-full border border-solid border-[#9b9b9b] bg-white [box-shadow:rgb(0,_0,_0)_0px_5px] lg:right-8"
              >
                <svg t="1732542917197" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4283" width="32" height="32"><path d="M404.992 156.992L380 160s-112.128 12.256-194.016 78.016h-0.96l-1.024 0.96c-18.368 16.896-26.368 37.664-39.008 68.032a982.08 982.08 0 0 0-37.984 112C83.264 504.864 64 608.864 64 704v8l4 8c29.632 52 82.24 85.12 131.008 108 48.736 22.88 90.88 35.008 120 36l19.008 0.992 9.984-16.992 35.008-62.016c37.12 8.384 79.872 14.016 128.992 14.016 49.12 0 91.872-5.632 128.992-14.016l35.008 62.016 10.016 16.992 18.976-0.992c29.12-0.992 71.264-13.12 120-36 48.768-22.88 101.376-56 131.008-108l4-8V704c0-95.136-19.264-199.136-43.008-284.992a982.08 982.08 0 0 0-37.984-112c-12.64-30.4-20.64-51.136-39.008-68l-0.992-1.024h-1.024C756.16 172.256 644 160 644 160l-24.992-3.008-9.024 23.008s-9.248 23.36-14.976 50.016A643.04 643.04 0 0 0 512 224c-17.12 0-46.72 1.12-83.008 6.016-5.76-26.656-15.008-50.016-15.008-50.016z m-44 73.024c1.376 4.48 2.752 8.352 4 12-41.376 10.24-85.504 25.856-125.984 50.976l33.984 54.016C356 295.488 475.232 288 512 288c36.736 0 156 7.488 239.008 59.008l33.984-54.016c-40.48-25.12-84.608-40.736-125.984-51.008 1.248-3.616 2.624-7.488 4-12 29.856 6.016 86.88 19.776 133.984 57.024-0.256 0.128 12 18.624 23.008 44.992 11.264 27.136 23.744 63.264 35.008 104 21.632 78.112 38.624 173.248 40 256.992-20.16 30.752-57.504 58.496-97.024 77.024a311.808 311.808 0 0 1-77.984 24.96L704 768c9.504-3.52 18.88-7.36 27.008-11.008 49.248-21.632 76-44.992 76-44.992l-42.016-48s-17.984 16.512-60 35.008C663.04 717.504 598.88 736 512 736s-151.008-18.496-192.992-36.992c-42.016-18.496-60-35.008-60-35.008l-42.016 48s26.752 23.36 76 44.992c8.128 3.648 17.504 7.52 27.008 11.008l-16 27.008a311.808 311.808 0 0 1-78.016-25.024c-39.488-18.496-76.864-46.24-96.96-76.992 1.344-83.744 18.336-178.88 40-256.992a917.216 917.216 0 0 1 34.976-104c11.008-26.368 23.264-44.864 23.008-44.992 47.104-37.248 104.128-51.008 133.984-56.992zM400 448c-24.736 0-46.624 14.112-60 32-13.376 17.888-20 39.872-20 64s6.624 46.112 20 64c13.376 17.888 35.264 32 60 32 24.736 0 46.624-14.112 60-32 13.376-17.888 20-39.872 20-64s-6.624-46.112-20-64c-13.376-17.888-35.264-32-60-32z m224 0c-24.736 0-46.624 14.112-60 32-13.376 17.888-20 39.872-20 64s6.624 46.112 20 64c13.376 17.888 35.264 32 60 32 24.736 0 46.624-14.112 60-32 13.376-17.888 20-39.872 20-64s-6.624-46.112-20-64c-13.376-17.888-35.264-32-60-32z m-224 64c1.76 0 4 0.64 8 6.016 4 5.344 8 14.72 8 25.984 0 11.264-4 20.64-8 26.016-4 5.344-6.24 5.984-8 5.984-1.76 0-4-0.64-8-6.016A44.832 44.832 0 0 1 384 544c0-11.264 4-20.64 8-26.016 4-5.344 6.24-5.984 8-5.984z m224 0c1.76 0 4 0.64 8 6.016 4 5.344 8 14.72 8 25.984 0 11.264-4 20.64-8 26.016-4 5.344-6.24 5.984-8 5.984-1.76 0-4-0.64-8-6.016A44.832 44.832 0 0 1 608 544c0-11.264 4-20.64 8-26.016 4-5.344 6.24-5.984 8-5.984z" p-id="4284"></path></svg>
              </div>
              <p class="mb-4 text-xl font-semibold">Join Discord </p>
              <p>
                Join The Official Discord Channel To Stay Updated With The Latest News.
                Stay With Us!

              </p>

            </div>
            <!-- Feature Item -->
            <div
              class="relative mb-8 flex cursor-pointer flex-col rounded-2xl border border-solid border-black p-8 [box-shadow:rgb(0,_0,_0)_9px_9px] lg:mb-4"
              @click="handleTab('Trade')"
            >
              <div
                class="absolute -top-8 bottom-auto left-auto right-4 flex size-16 flex-col items-center justify-center rounded-full border border-solid border-[#9b9b9b] bg-white [box-shadow:rgb(0,_0,_0)_0px_5px] lg:right-8"
              >
                <svg t="1732543112136" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6541" width="32" height="32"><path d="M386.327273 709.818182c4.654545-11.636364 9.309091-23.272727 9.309091-34.909091 0-39.563636-30.254545-69.818182-69.818182-69.818182 0-13.963636-9.309091-23.272727-23.272727-23.272727s-23.272727 9.309091-23.272728 23.272727h-46.545454c-13.963636 0-23.272727 9.309091-23.272728 23.272727s9.309091 23.272727 23.272728 23.272728v139.636363c-13.963636 0-23.272727 9.309091-23.272728 23.272728s9.309091 23.272727 23.272728 23.272727h46.545454c0 13.963636 9.309091 23.272727 23.272728 23.272727s23.272727-9.309091 23.272727-23.272727h23.272727c39.563636 0 69.818182-30.254545 69.818182-69.818182 0-25.6-13.963636-46.545455-32.581818-58.181818zM279.272727 651.636364h46.545455c13.963636 0 23.272727 9.309091 23.272727 23.272727s-9.309091 23.272727-23.272727 23.272727h-46.545455v-46.545454z m69.818182 139.636363h-69.818182v-46.545454h69.818182c13.963636 0 23.272727 9.309091 23.272727 23.272727s-9.309091 23.272727-23.272727 23.272727z" p-id="6542"></path><path d="M807.563636 363.054545c4.654545-18.618182 6.981818-39.563636 6.981819-60.50909 0-167.563636-134.981818-302.545455-302.545455-302.545455S209.454545 134.981818 209.454545 302.545455c0 44.218182 9.309091 86.109091 27.927273 123.345454C102.4 456.145455 0 577.163636 0 721.454545c0 167.563636 134.981818 302.545455 302.545455 302.545455 100.072727 0 188.509091-48.872727 244.363636-125.672727 48.872727 34.909091 109.381818 55.854545 174.545454 55.854545 167.563636 0 302.545455-134.981818 302.545455-302.545454 0-137.309091-90.763636-251.345455-216.436364-288.581819zM256 302.545455c0-141.963636 114.036364-256 256-256s256 114.036364 256 256c0 16.290909-2.327273 32.581818-4.654545 48.872727-13.963636 0-27.927273-2.327273-41.89091-2.327273h-4.654545c4.654545-13.963636 4.654545-30.254545 4.654545-46.545454 0-116.363636-93.090909-209.454545-209.454545-209.454546s-209.454545 93.090909-209.454545 209.454546c0 44.218182 13.963636 86.109091 37.236363 118.690909-11.636364-2.327273-25.6-2.327273-37.236363-2.327273h-18.618182c-16.290909-34.909091-27.927273-74.472727-27.927273-116.363636z m279.272727-23.272728h-46.545454c-13.963636 0-23.272727-9.309091-23.272728-23.272727s9.309091-23.272727 23.272728-23.272727h69.818182c13.963636 0 23.272727-9.309091 23.272727-23.272728s-9.309091-23.272727-23.272727-23.272727h-23.272728c0-13.963636-9.309091-23.272727-23.272727-23.272727s-23.272727 9.309091-23.272727 23.272727c-39.563636 0-69.818182 30.254545-69.818182 69.818182s30.254545 69.818182 69.818182 69.818182h46.545454c13.963636 0 23.272727 9.309091 23.272728 23.272727s-9.309091 23.272727-23.272728 23.272727h-69.818182c-13.963636 0-23.272727 9.309091-23.272727 23.272728s9.309091 23.272727 23.272727 23.272727h23.272728c0 9.309091 6.981818 18.618182 16.290909 20.945454-9.309091 11.636364-18.618182 20.945455-27.927273 32.581819-30.254545-20.945455-65.163636-37.236364-102.4-46.545455C344.436364 395.636364 325.818182 351.418182 325.818182 302.545455c0-102.4 83.781818-186.181818 186.181818-186.181819s186.181818 83.781818 186.181818 186.181819c0 16.290909-2.327273 32.581818-6.981818 48.872727-32.581818 2.327273-62.836364 11.636364-90.763636 23.272727 2.327273-6.981818 4.654545-16.290909 4.654545-25.6 0-39.563636-30.254545-69.818182-69.818182-69.818182z m-69.818182 532.945455c-32.581818 58.181818-93.090909 95.418182-162.90909 95.418182-102.4 0-186.181818-83.781818-186.181819-186.181819s83.781818-186.181818 186.181819-186.181818c48.872727 0 90.763636 18.618182 123.345454 48.872728-4.654545 20.945455-6.981818 44.218182-6.981818 67.490909 0 58.181818 16.290909 114.036364 46.545454 160.581818zM302.545455 977.454545C160.581818 977.454545 46.545455 863.418182 46.545455 721.454545s114.036364-256 256-256c55.854545 0 107.054545 18.618182 148.945454 48.872728-6.981818 13.963636-13.963636 27.927273-18.618182 44.218182-34.909091-27.927273-81.454545-46.545455-130.327272-46.545455-116.363636 0-209.454545 93.090909-209.454546 209.454545s93.090909 209.454545 209.454546 209.454546c74.472727 0 139.636364-39.563636 176.872727-97.745455 9.309091 13.963636 20.945455 25.6 32.581818 37.236364-46.545455 62.836364-123.345455 107.054545-209.454545 107.054545z m418.90909-69.818181c-141.963636 0-256-114.036364-256-256s114.036364-256 256-256 256 114.036364 256 256-114.036364 256-256 256z" p-id="6543"></path><path d="M721.454545 442.181818c-116.363636 0-209.454545 93.090909-209.454545 209.454546s93.090909 209.454545 209.454545 209.454545 209.454545-93.090909 209.454546-209.454545-93.090909-209.454545-209.454546-209.454546z m0 395.636364c-102.4 0-186.181818-83.781818-186.181818-186.181818s83.781818-186.181818 186.181818-186.181819 186.181818 83.781818 186.181819 186.181819-83.781818 186.181818-186.181819 186.181818z" p-id="6544"></path><path d="M628.363636 628.363636l93.090909 46.545455 93.09091-46.545455-93.09091-116.363636z" p-id="6545"></path><path d="M628.363636 651.636364l93.090909 139.636363 93.09091-139.636363-93.09091 46.545454z" p-id="6546"></path></svg>
              </div>
              <p class="mb-4 text-xl font-semibold">Trade</p>
              <p>
                Coming Soon!
              </p>
            </div>
            <!-- Feature Item -->
            <div
              class="relative mb-8 flex cursor-pointer flex-col rounded-2xl border border-solid border-black p-8 [box-shadow:rgb(0,_0,_0)_9px_9px] lg:mb-4"
              @click="handleTab('Invitation')"
            >
              <div
                class="absolute -top-8 bottom-auto left-auto right-4 flex size-16 flex-col items-center justify-center rounded-full border border-solid border-[#9b9b9b] bg-white [box-shadow:rgb(0,_0,_0)_0px_5px] lg:right-8"
              >
                <svg t="1732543166582" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8533" width="32" height="32"><path d="M767.39744 724.66816 888.99744 724.66816C906.670528 724.66816 920.99744 738.9952 920.99744 756.66816 920.99744 774.34112 906.670528 788.66816 888.99744 788.66816L767.39744 788.66816 767.39744 916.66816C767.39744 934.34112 753.070528 948.66816 735.39744 948.66816 717.724288 948.66816 703.39744 934.34112 703.39744 916.66816L703.39744 788.66816 568.99744 788.66816C551.324288 788.66816 536.99744 774.34112 536.99744 756.66816 536.99744 738.9952 551.324288 724.66816 568.99744 724.66816L703.39744 724.66816 703.39744 596.66816C703.39744 578.9952 717.724288 564.66816 735.39744 564.66816 753.070528 564.66816 767.39744 578.9952 767.39744 596.66816L767.39744 724.66816ZM605.232384 596.34432C665.477632 548.98624 686.912832 474.82496 686.912832 384.75584L686.912832 265.7088C686.912832 174.07168 582.894336 96 469.585088 96 356.294592 96 252.257408 174.07808 252.257408 265.7088L252.257408 384.75584C252.257408 472.39744 273.685696 548.07296 333.743232 596.19008L336.4944 552.36416 167.421824 656.04096C162.620992 657.98336 152.057024 664.12928 141.308864 673.15968 118.316928 692.4768 104.989824 716.95744 109.765056 746.24256L109.415232 791.94944C109.415232 831.72288 141.692288 864 181.451968 864L359.056 864C373.878848 864 385.895168 851.984 385.895168 837.16096 385.895168 822.33792 373.878848 810.32192 359.056 810.32192L181.451968 810.32192C171.33792 810.32192 163.09344 802.07744 163.09344 791.94944L163.09344 741.9232C161.583296 730.48832 165.850688 722.6496 175.838272 714.25792 182.248896 708.87232 188.843776 705.03552 192.518592 703.37216L364.554752 598.12416C380.398656 588.40896 381.810432 565.91936 367.30592 554.29824 323.342656 519.07584 305.93568 457.60192 305.93568 384.75584L305.93568 265.7088C305.93568 207.61728 383.138304 149.67808 469.585088 149.67808 556.04992 149.67808 633.23456 207.6096 633.23456 265.7088L633.23456 384.75584C633.23456 459.89888 615.971776 519.62432 572.058944 554.144 557.29472 565.7504 560.497088 592.144 574.794688 598.23296 586.32384 607.0016 605.232384 596.34432 605.232384 596.34432Z" fill="#2c2c2c" p-id="8534"></path></svg>
              </div>
              <p class="mb-4 text-xl font-semibold">Invitation</p>
              <p>
                Telegram Invitation
              </p>
              <p>Discord Invitation</p>

            </div>
            <!-- Feature Item -->
            <div
              class="relative mb-8 flex cursor-pointer flex-col rounded-2xl border border-solid border-black p-8 [box-shadow:rgb(0,_0,_0)_9px_9px] lg:mb-4"
              @click="handleTab('Telegram')"
            >
              <div
                class="absolute -top-8 bottom-auto left-auto right-4 flex size-16 flex-col items-center justify-center rounded-full border border-solid border-[#9b9b9b] bg-white [box-shadow:rgb(0,_0,_0)_0px_5px] lg:right-8"
              >
                <!-- <img
                  src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639158557ac2b528531836f1_image%203-3.png"
                  alt=""
                  class="relative z-10 inline-block h-8"
                />
                <div
                  class="absolute z-0 h-8 w-8 rounded-full border border-[#c0d1ff] bg-[#c0d1ff]"
                ></div> -->
                <svg t="1732543001265" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5324" width="32" height="32"><path d="M834.24 127.872a95.168 95.168 0 0 0-29.856 7.136h-0.128c-9.12 3.616-52.48 21.856-118.4 49.504l-236.224 99.488c-169.504 71.36-336.128 141.632-336.128 141.632l1.984-0.768s-11.488 3.776-23.488 12a64.96 64.96 0 0 0-18.752 18.144c-5.888 8.64-10.624 21.856-8.864 35.52 2.88 23.104 17.856 36.96 28.608 44.608 10.88 7.744 21.248 11.36 21.248 11.36h0.256l156.256 52.64c7.008 22.496 47.616 156 57.376 186.752 5.76 18.368 11.36 29.856 18.368 38.624 3.392 4.48 7.36 8.224 12.128 11.232a35.808 35.808 0 0 0 7.872 3.392l-1.6-0.384c0.48 0.128 0.864 0.512 1.216 0.64 1.28 0.352 2.144 0.48 3.776 0.736 24.736 7.488 44.608-7.872 44.608-7.872l1.12-0.896 92.256-84 154.624 118.624 3.52 1.504c32.224 14.144 64.864 6.272 82.112-7.616 17.376-13.984 24.128-31.872 24.128-31.872l1.12-2.88 119.488-612.128c3.392-15.104 4.256-29.248 0.512-42.976a57.824 57.824 0 0 0-24.992-33.504 59.904 59.904 0 0 0-34.144-8.64z m-3.232 65.6c-0.128 2.016 0.256 1.792-0.64 5.664v0.352l-118.368 605.76c-0.512 0.864-1.376 2.752-3.744 4.64-2.496 1.984-4.48 3.232-14.88-0.896l-189.12-144.992-114.24 104.128 24-153.28 308.992-288c12.736-11.84 8.48-14.336 8.48-14.336 0.896-14.528-19.232-4.256-19.232-4.256l-389.632 241.376-0.128-0.64-186.752-62.88v-0.128l-0.48-0.096a8.64 8.64 0 0 0 0.96-0.384l1.024-0.512 0.992-0.352s166.752-70.272 336.256-141.632c84.864-35.744 170.368-71.744 236.128-99.52 65.76-27.616 114.368-47.872 117.12-48.96 2.624-1.024 1.376-1.024 3.264-1.024z" p-id="5325"></path></svg>
              </div>
              <p class="mb-4 text-xl font-semibold">Join Telegram</p>
              <p>
                Join The Official Telegram Channel For The Latest Updates And $WOOF Price Information.
              </p>

            </div>
            <!-- Feature Item -->
            <div
              class="relative mb-8 flex cursor-pointer flex-col rounded-2xl border border-solid border-black p-8 [box-shadow:rgb(0,_0,_0)_9px_9px] lg:mb-4"
              @click="handleTab('Stake')"
            >
              <div
                class="absolute -top-8 bottom-auto left-auto right-4 flex size-16 flex-col items-center justify-center rounded-full border border-solid border-[#9b9b9b] bg-white [box-shadow:rgb(0,_0,_0)_0px_5px] lg:right-8"
              >
                <svg t="1732543204061" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9717" width="32" height="32"><path d="M512 801.416533l-0.238933 3.822934-0.341334 2.184533C503.569067 846.4384 420.352 887.466667 303.4112 887.466667c-119.0912 0-203.195733-42.564267-208.315733-82.2272l-0.273067-3.822934v-52.736c35.669333 36.693333 115.6096 62.293333 208.554667 62.293334 61.405867 0 117.077333-11.127467 158.1056-29.252267l8.362666-3.8912 9.659734-5.051733 7.543466-4.437334 7.304534-4.778666 5.973333-4.437334c2.321067-1.809067 4.5056-3.652267 6.5536-5.495466l5.12-4.949334v52.736zM589.1072 136.533333c187.630933 0 339.933867 152.302933 339.933867 339.933867s-152.302933 339.933867-339.968 339.933867c-16.7936 0-33.348267-1.2288-49.493334-3.584l0.8192-5.666134 0.273067-5.7344v-314.4704c-38.229333-58.026667-117.316267-87.005867-237.226667-87.005866-15.701333 0-31.1296 0.7168-46.08 2.116266C291.293867 250.1632 426.973867 136.533333 589.073067 136.533333zM512 705.809067c0 2.6624-0.375467 5.290667-1.092267 7.953066l-1.570133 4.676267-2.286933 4.642133-2.1504 3.515734-3.857067 5.085866-3.549867 3.925334-4.164266 3.9936-4.437334 3.754666-6.894933 5.12-4.266667 2.8672-5.563733 3.413334-10.376533 5.563733-12.288 5.632-10.308267 4.096-13.448533 4.573867c-33.4848 10.5472-75.195733 17.237333-122.368 17.237333-119.0912 0-203.195733-42.564267-208.315734-82.193067l-0.273066-3.857066v-52.701867c35.669333 36.693333 115.6096 62.2592 208.554666 62.2592 20.138667 0 39.662933-1.194667 58.231467-3.447467l17.169067-2.423466c17.5104-2.833067 34.065067-6.587733 49.322666-11.1616l15.189334-4.983467 8.8064-3.310933 9.284266-3.857067 9.4208-4.437333 8.874667-4.642134 3.584-2.048 7.509333-4.676266 6.621867-4.642134 3.140267-2.389333 6.3488-5.290667 5.12-4.949333v52.701867z m0-95.573334a31.402667 31.402667 0 0 1-1.365333 9.0112 38.468267 38.468267 0 0 1-1.8432 4.846934c-2.594133 5.7344-6.826667 11.4688-12.424534 17.066666-1.877333 1.877333-3.959467 3.754667-6.212266 5.597867l-6.007467 4.642133-8.157867 5.461334-4.9152 2.901333-8.430933 4.539733-8.021333 3.822934-16.725334 6.826666-12.0832 4.096-12.936533 3.754667-6.9632 1.774933-13.653333 3.072-15.086934 2.798934-11.332266 1.706666-13.550934 1.604267-23.04 1.809067c-8.430933 0.443733-17.066667 0.682667-25.873066 0.682666-119.0912 0-203.195733-42.530133-208.315734-82.193066l-0.273066-3.822934v-52.804266c35.669333 36.693333 115.6096 62.293333 208.554666 62.293333 88.814933 0 165.6832-23.278933 203.502934-57.344l5.12-4.949333v52.804266z m101.444267-336.349866h-48.810667v210.602666l148.992 148.992 34.269867-34.6112-134.4512-134.417066V273.885867z m-298.666667 326.621866l-11.400533 0.136534c-5.905067 0-11.741867-0.1024-17.442134-0.341334l-13.789866-0.682666c-105.984-6.826667-177.3568-47.854933-177.3568-84.992 0-33.109333 56.558933-69.2224 143.701333-81.6128l13.585067-1.706667 13.994666-1.297067 16.1792-1.024 9.045334-0.273066c3.9936-0.1024 8.021333-0.136533 12.0832-0.136534 122.948267 0 208.622933 45.329067 208.622933 86.016 0 39.424-80.418133 83.217067-197.2224 85.9136z" fill="#302B3C" p-id="9718"></path></svg>
              </div>
              <p class="mb-4 text-xl font-semibold">Stake</p>
              <p>
                Coming Soon!
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer Standard Email V2 -->
      <section class="overflow-hidden bg-[#fbf8f5]">
        <div class="flex w-screen flex-col px-6 py-20 lg:px-10 xl:px-24">
          <!-- TOP CONTAINER -->
          <div class="flex flex-col lg:flex-row lg:justify-between">
            <!-- LEFT DIV -->
            <div class="flex flex-col lg:mr-20">
              <!-- LOGO -->
              <a
                href="#"
                class="mb-12 inline-block max-w-full font-bold text-[#1353fe]"
              >
              <NuxtImg
                    src="/images/logo.png"
                    alt="Our application"
                    class="block size-20 rounded-xl object-cover dark:hidden"
                />
              </a>
              <p class="font-inter my-4 max-w-[350px] text-base font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit ut al
              </p>
              <!-- NEWSLETTER & EMAIL -->
              <div class="flex flex-col">
                <div>
                  <h3 for="email" class="font-inter mb-4 mt-8 font-medium">
                    EMAIL US
                  </h3>
                  <p class="font-inter text-base">support@flowspark.co</p>
                </div>
              </div>
            </div>
            <!-- RIGHT DIV -->
            <div class="mt-7 max-w-[700px] grow lg:flex lg:flex-row">
              <!-- FOOTER LINKS -->
              <div
                class="flex grow flex-row flex-wrap lg:flex-nowrap lg:items-start"
              >
                <!-- LINK BLOCK -->
                <div
                  class="my-5 mr-8 flex max-w-[500px] grow basis-[100px] flex-col space-y-5 lg:my-0 lg:mr-0"
                >
                  <h2 class="font-inter font-medium">IDO</h2>
                  <a href="" class="font-inter font-light text-gray-500">Trade</a>
                  <a href="" class="font-inter font-light text-gray-500">Stake</a>
                  <a href="" class="font-inter font-light text-gray-500">Docs</a>
                </div>
              </div>
            </div>
          </div>
          <!-- BOTTOM CONTAINER -->
          <div class="mt-20 lg:flex lg:flex-row-reverse lg:justify-between">
            <!-- SOCIAL MEDIA ICONS -->
            <div class="mb-8 mt-6 flex flex-row lg:my-0">
              <a href="" class="mr-4 transition hover:text-gray-400">
                <svg
                  class="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2.25C9.4791 2.25005 7.05619 3.22647 5.23968 4.97439C3.42317 6.72231 2.35426 9.10586 2.25723 11.6249C2.1602 14.1439 3.0426 16.6026 4.71928 18.4851C6.39595 20.3676 8.73657 21.5275 11.25 21.7214V14.2501H9C8.80109 14.2501 8.61032 14.1711 8.46967 14.0304C8.32902 13.8898 8.25 13.699 8.25 13.5001C8.25 13.3012 8.32902 13.1104 8.46967 12.9698C8.61032 12.8291 8.80109 12.7501 9 12.7501H11.25V10.5001C11.2509 9.70472 11.5673 8.94218 12.1297 8.37977C12.6921 7.81736 13.4546 7.501 14.25 7.50009H15.75C15.9489 7.50009 16.1397 7.57911 16.2803 7.71976C16.421 7.86041 16.5 8.05118 16.5 8.25009C16.5 8.449 16.421 8.63977 16.2803 8.78042C16.1397 8.92107 15.9489 9.00009 15.75 9.00009H14.25C13.8523 9.00054 13.471 9.15872 13.1898 9.43993C12.9086 9.72114 12.7505 10.1024 12.75 10.5001V12.7501H15C15.1989 12.7501 15.3897 12.8291 15.5303 12.9698C15.671 13.1104 15.75 13.3012 15.75 13.5001C15.75 13.699 15.671 13.8898 15.5303 14.0304C15.3897 14.1711 15.1989 14.2501 15 14.2501H12.75V21.7214C15.2634 21.5275 17.604 20.3676 19.2807 18.4851C20.9574 16.6026 21.8398 14.1439 21.7427 11.6249C21.6457 9.10587 20.5768 6.72232 18.7603 4.9744C16.9438 3.22649 14.5209 2.25006 12 2.25Z"
                  />
                </svg>
              </a>
              <a href="" class="mx-4 transition hover:text-gray-400">
                <svg
                  class="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  />
                  <path
                    d="M16.125 2.625H7.875C6.4831 2.62658 5.14865 3.18021 4.16443 4.16443C3.18021 5.14865 2.62658 6.4831 2.625 7.875V16.125C2.62658 17.5169 3.18021 18.8513 4.16443 19.8356C5.14865 20.8198 6.4831 21.3734 7.875 21.375H16.125C17.5169 21.3734 18.8513 20.8198 19.8356 19.8356C20.8198 18.8513 21.3734 17.5169 21.375 16.125V7.875C21.3734 6.4831 20.8198 5.14865 19.8356 4.16443C18.8513 3.18021 17.5169 2.62658 16.125 2.625ZM12 16.5C11.11 16.5 10.24 16.2361 9.49993 15.7416C8.75991 15.2471 8.18314 14.5443 7.84254 13.7221C7.50195 12.8998 7.41283 11.995 7.58647 11.1221C7.7601 10.2492 8.18868 9.44736 8.81802 8.81802C9.44736 8.18868 10.2492 7.7601 11.1221 7.58647C11.995 7.41283 12.8998 7.50195 13.7221 7.84254C14.5443 8.18314 15.2471 8.75991 15.7416 9.49993C16.2361 10.24 16.5 11.11 16.5 12C16.4987 13.1931 16.0241 14.3369 15.1805 15.1805C14.3369 16.0241 13.1931 16.4987 12 16.5ZM16.875 8.25C16.6525 8.25 16.435 8.18402 16.25 8.0604C16.065 7.93679 15.9208 7.76109 15.8356 7.55552C15.7505 7.34995 15.7282 7.12375 15.7716 6.90552C15.815 6.68729 15.9222 6.48684 16.0795 6.3295C16.2368 6.17217 16.4373 6.06502 16.6555 6.02162C16.8738 5.97821 17.1 6.00049 17.3055 6.08564C17.5111 6.17078 17.6868 6.31498 17.8104 6.49998C17.934 6.68499 18 6.9025 18 7.125C18 7.42337 17.8815 7.70952 17.6705 7.9205C17.4595 8.13147 17.1734 8.25 16.875 8.25Z"
                  />
                </svg>
              </a>
              <a href="" class="mx-4 transition hover:text-gray-400">
                <svg
                  class="fill-current"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.5952 12.4998C22.1776 11.988 22.5489 11.2779 22.6367 10.5076C22.7245 9.73723 22.5226 8.96177 22.0703 8.33205C21.618 7.70233 20.9476 7.2634 20.1895 7.10064C19.4315 6.93788 18.64 7.06293 17.969 7.45147V5.46854C17.9694 4.83357 17.7763 4.21356 17.4153 3.69117C17.0544 3.16878 16.5427 2.76884 15.9486 2.54466C15.3546 2.32048 14.7063 2.28271 14.0902 2.4364C13.4741 2.59009 12.9195 2.92793 12.5003 3.40487C11.9885 2.82243 11.2784 2.45118 10.5081 2.36336C9.73772 2.27555 8.96225 2.47744 8.33253 2.92976C7.70282 3.38208 7.26388 4.05249 7.10112 4.81054C6.93836 5.5686 7.06342 6.36009 7.45197 7.03104H5.46904C4.83406 7.03063 4.21405 7.22379 3.69166 7.58476C3.16927 7.94573 2.76933 8.45736 2.54515 9.05144C2.32097 9.64552 2.28321 10.2938 2.4369 10.9099C2.59059 11.526 2.92843 12.0806 3.40538 12.4998C2.82293 13.0115 2.45168 13.7217 2.36386 14.492C2.27603 15.2624 2.47792 16.0378 2.93024 16.6676C3.38257 17.2973 4.05297 17.7362 4.81103 17.899C5.56909 18.0617 6.36059 17.9367 7.03154 17.5481V19.531C7.03113 20.166 7.22428 20.786 7.58525 21.3084C7.94622 21.8308 8.45785 22.2307 9.05193 22.4549C9.64602 22.6791 10.2943 22.7169 10.9104 22.5632C11.5265 22.4095 12.0811 22.0717 12.5003 21.5947C13.012 22.1772 13.7222 22.5484 14.4925 22.6362C15.2629 22.724 16.0383 22.5221 16.668 22.0698C17.2978 21.6175 17.7367 20.9471 17.8995 20.189C18.0622 19.431 17.9372 18.6395 17.5486 17.9685H19.5315C20.1665 17.969 20.7865 17.7758 21.3089 17.4148C21.8313 17.0539 22.2312 16.5422 22.4554 15.9481C22.6796 15.3541 22.7174 14.7058 22.5637 14.0897C22.41 13.4736 22.0721 12.919 21.5952 12.4998ZM8.59404 5.46854C8.59404 5.05414 8.75866 4.65671 9.05168 4.36369C9.34471 4.07066 9.74214 3.90604 10.1565 3.90604C10.5709 3.90604 10.9684 4.07066 11.2614 4.36369C11.5544 4.65671 11.719 5.05414 11.719 5.46854V7.03104H10.1565C9.74228 7.03057 9.34513 6.8658 9.05221 6.57287C8.75928 6.27995 8.59451 5.8828 8.59404 5.46854ZM3.90654 10.156C3.90701 9.74179 4.07178 9.34463 4.36471 9.05171C4.65763 8.75879 5.05478 8.59402 5.46904 8.59354H10.1565C10.5708 8.59402 10.9679 8.75879 11.2609 9.05171C11.5538 9.34463 11.7186 9.74179 11.719 10.156V11.7185H5.46904C5.05478 11.7181 4.65763 11.5533 4.36471 11.2604C4.07178 10.9675 3.90701 10.5703 3.90654 10.156ZM16.4065 19.531C16.4065 19.9454 16.2419 20.3429 15.9489 20.6359C15.6559 20.9289 15.2584 21.0935 14.844 21.0935C14.4296 21.0935 14.0322 20.9289 13.7392 20.6359C13.4462 20.3429 13.2815 19.9454 13.2815 19.531V17.9685H14.844C15.2583 17.969 15.6554 18.1338 15.9484 18.4267C16.2413 18.7196 16.4061 19.1168 16.4065 19.531ZM19.5315 16.406H14.844C14.4298 16.4056 14.0326 16.2408 13.7397 15.9479C13.4468 15.655 13.282 15.2578 13.2815 14.8435V13.281H19.5315C19.9459 13.281 20.3434 13.4457 20.6364 13.7387C20.9294 14.0317 21.094 14.4291 21.094 14.8435C21.094 15.2579 20.9294 15.6554 20.6364 15.9484C20.3434 16.2414 19.9459 16.406 19.5315 16.406Z"
                  />
                </svg>
              </a>
              <a href="" class="mx-4 transition hover:text-gray-400">
                <svg
                  class="fill-current"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.9883 7.58391L21.0426 10.5297C20.4545 17.354 14.6994 22.6565 7.81089 22.6565C6.39249 22.6565 5.22357 22.4316 4.33651 21.9881C3.62063 21.6301 3.32738 21.246 3.25461 21.1367C3.18933 21.0388 3.14702 20.9274 3.13083 20.8108C3.11464 20.6943 3.12499 20.5755 3.16112 20.4635C3.19724 20.3515 3.2582 20.2491 3.33945 20.164C3.42069 20.0789 3.52012 20.0132 3.63031 19.9718C3.65544 19.9624 5.95923 19.0775 7.44821 17.3929C6.52206 16.7334 5.70694 15.9305 5.0335 15.0145C3.69483 13.1977 2.27901 10.0427 3.13598 5.32923C3.16148 5.18895 3.22489 5.05833 3.31932 4.95152C3.41376 4.8447 3.53562 4.76577 3.67171 4.72326C3.8078 4.68075 3.95293 4.67629 4.09137 4.71037C4.22981 4.74445 4.35629 4.81575 4.4571 4.91657C4.49153 4.9509 7.74246 8.15592 11.7166 9.19118L11.7171 8.59361C11.7256 7.34276 12.2303 6.14644 13.1204 5.26759C14.0105 4.38874 15.2132 3.89929 16.4641 3.90682C17.2766 3.91808 18.0724 4.1399 18.7737 4.55063C19.4749 4.96136 20.0576 5.54694 20.4649 6.25019L23.4359 6.25024C23.5904 6.25024 23.7414 6.29606 23.8699 6.3819C23.9984 6.46774 24.0985 6.58975 24.1577 6.73251C24.2168 6.87526 24.2323 7.03234 24.2021 7.18389C24.172 7.33543 24.0976 7.47464 23.9883 7.58391Z"
                  />
                </svg>
              </a>
            </div>
            <p class="font-inter text-sm text-gray-500 lg:mt-0">
              © Copyright 2021. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>

    <!-- <MarketingTest /> -->

    <AlertDialog
    :open="showConfirmation"
    @update:open="(open: boolean) => (showConfirmation = open)"
  >
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="text-destructive">
            Invitation
        </AlertDialogTitle>
        <AlertDialogDescription>
            Telegram Invitation Or Discord Invitation
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <Button
          variant="secondary"
          @click="
            handleShare('SHARE_TELEGRAM');
            showConfirmation = false;
          "
        >
        Telegram
        </Button>
        <Button
          variant="default"
          @click="
            handleShare('SHARE_DISCORD');
            showConfirmation = false;
          "
        >
        Discord
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  </template>

  

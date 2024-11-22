<script lang="tsx">
  import { ethers } from "ethers";

  const { apiCaller } = useApiCaller();
  
  export const oAuthProviders: {
    [key: string]: { name: string; icon: Component };
  } = {
    google: {
      name: "MetaMask",
      icon: ({ ...props }) => {
        return (
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5193"
            width="256"
            height="256"
          >
            <path
              d="M964.3008 31.0784l-384.3072 301.568 71.4752-177.664 312.832-123.904z"
              fill="#E17726"
              p-id="5194"
            ></path>
            <path
              d="M77.9264 31.0784L458.752 335.4624 390.656 154.9312 77.9264 31.0784z m748.032 699.2384L723.712 896l218.9312 63.9488 62.72-225.9456-179.4048-3.584z m-788.6848 3.584l62.3104 225.9968 218.5728-63.9488-101.888-165.632-178.9952 3.584z"
              fill="#E27625"
              p-id="5195"
            ></path>
            <path
              d="M306.3296 450.4064l-60.7744 97.28 216.6784 10.4448-7.2192-247.296-148.6848 139.5712z m429.568 0l-150.9376-142.336-4.9664 250.112 216.6784-10.4448-60.8256-97.3312z m-417.792 445.4912l131.1744-67.1744-112.896-93.2352-18.2784 160.4096z m274.8416-67.1744l130.7648 67.1744-17.8688-160.4096-112.896 93.2352z"
              fill="#E27625"
              p-id="5196"
            ></path>
            <path
              d="M723.6608 895.8976l-130.816-67.1744 10.7008 90.112-1.1776 38.144 121.2928-61.0816z m-405.6064 0l121.6512 61.1328-0.768-38.1952 10.24-90.112-131.072 67.1744z"
              fill="#D5BFB2"
              p-id="5197"
            ></path>
            <path
              d="M442.0096 675.9936l-108.6976-33.792 76.8-37.376 31.8976 71.168z m158.1568 0l31.8976-71.168 77.1584 37.376-109.056 33.792z"
              fill="#233447"
              p-id="5198"
            ></path>
            <path
              d="M318.1568 895.9488l19.0464-165.632-120.8832 3.584 101.888 162.048z m386.9696-165.632l18.6368 165.632 102.1952-162.048-120.832-3.584z m91.648-182.5792l-216.7296 10.4448 20.1728 117.8112 31.8976-71.168 77.1584 37.376 87.5008-94.464z m-463.36 94.5152l76.7488-37.376 31.8976 71.168 20.1728-117.8624-216.6784-10.4448 87.808 94.5152z"
              fill="#CC6228"
              p-id="5199"
            ></path>
            <path
              d="M245.504 547.7376l90.8288 187.8016-3.072-93.2864-87.7568-94.5152z m463.7184 94.5152l-3.4304 93.2864 90.8288-187.8016-87.3984 94.5152z m-247.04-84.0704l-20.1728 117.8112 25.4464 139.1616 5.7344-183.3984-11.008-73.5744z m117.76 0l-10.5984 73.216 5.3248 183.7568 25.4464-139.1616-20.1216-117.76z"
              fill="#E27525"
              p-id="5200"
            ></path>
            <path
              d="M600.1664 675.9424l-25.4464 139.1616 18.2272 13.6192 112.8448-93.2864 3.4304-93.2352-109.056 33.792z m-266.8544-33.792l3.072 93.2864 112.8448 93.2864 18.2784-13.6192-25.4464-139.1616-108.7488-33.792z"
              fill="#F5841F"
              p-id="5201"
            ></path>
            <path
              d="M602.4192 957.0304l1.1776-38.1952-9.8816-8.8576H448.512l-9.5232 8.8576 0.768 38.1952-121.6512-61.1328 42.5984 36.9664 86.3232 63.232h147.8144l86.6816-63.232 42.1888-36.9664-121.2928 61.1328z"
              fill="#C0AC9D"
              p-id="5202"
            ></path>
            <path
              d="M592.9472 828.7232l-18.2272-13.6192H467.5584l-18.2784 13.6192-10.24 90.112 9.5232-8.8576h145.2032l9.8816 8.8576-10.7008-90.112z"
              fill="#161616"
              p-id="5203"
            ></path>
            <path
              d="M980.736 352.3584l32.256-166.4-48.64-154.88-371.3536 291.5328 142.9504 127.8464 201.8304 62.3616 44.4416-55.1424-19.4048-14.848 30.8224-29.7472-23.552-19.3024 30.72-24.9344-20.0704-16.4864zM29.3376 185.856l32.6656 166.4-20.8896 16.5376 31.1296 24.9344-23.552 19.3024 30.8224 29.7472-19.456 14.8992 44.544 55.04 201.8304-62.3104 142.848-127.8464L78.0288 31.0784l-48.64 154.8288z"
              fill="#763E1A"
              p-id="5204"
            ></path>
            <path
              d="M937.728 512.6656l-201.8304-62.3104 60.8256 97.3312-90.8288 187.7504 120.1152-1.5872h179.4048l-67.6864-221.184zM306.3808 450.3552l-201.8304 62.3104-67.2768 221.184h179.0464l120.1152 1.5872-90.88-187.7504 60.8256-97.28z m273.664 107.776l12.9536-235.6224 58.5216-167.68H390.8096L449.2288 322.56l12.9536 235.6224 4.9664 73.984 0.3584 182.9376h107.1616l0.4096-182.9376 4.9152-73.984z"
              fill="#F5841F"
              p-id="5205"
            ></path>
          </svg>
        );
      },
    },
  };
</script>

<script setup lang="tsx">
  const props = defineProps<{
    provider: string;
  }>();

  const providerData = computed(() => {
    return oAuthProviders[props.provider as keyof typeof oAuthProviders];
  });

  const walletAddress = ref<string>("");
  const isConnecting = ref<boolean>(false);
  const login = async () => {
    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      alert("请安装 MetaMask!");
      return
    }

    try {
      isConnecting.value = true;
      // 创建 provider
      const provider = new ethers.providers.Web3Provider(ethereum);
      // 请求连接钱包
      await provider.send("eth_requestAccounts", []);
      // 获取 signer
      const signer = provider.getSigner();
      // 获取地址
      const address = await signer.getAddress();
      walletAddress.value = address;
    } catch (error) {
      console.error("连接错误:", error);
      alert("连接失败");
    } finally {
      isConnecting.value = false;
    }
    await apiCaller.auth.loginWithAddress.mutate({
      walletAddress: walletAddress.value,
    });

    navigateTo("/");
  };
</script>

<template>
  <Button asChild variant="outline" type="button">
    <div @click="login">
      <component
        v-if="providerData.icon"
        :is="providerData.icon"
        class="mr-2 size-4 opacity-70"
      />
      {{ $t("auth.continueWithProvider", { provider: providerData.name }) }}
    </div>
  </Button>
  <div>钱包地址: {{ walletAddress }}</div>
</template>

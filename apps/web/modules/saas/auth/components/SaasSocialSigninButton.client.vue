<script lang="tsx">
  import { ethers } from "ethers";
  import { ref } from 'vue';

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
  type SaveResult = {
  saved: boolean
  existed: boolean
  uploaded: boolean
 }
  type AddressStorage = {
  taoAddress: string
  timestamp: number
  uploaded?: boolean
  r2ObjectKey?: string  // 新增R2对象键值
 }
 // R2上传函数
 const uploadToR2 = async (address: string): Promise<{success: boolean, objectKey?: string}> => {
  try {
    const response = await fetch('/api/r2/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address })
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      objectKey: data.objectKey
    };
  } catch (error) {
    console.error('Upload failed:', error);
    return {
      success: false
    };
  }
 };

 // 保存地址函数
 const saveAddress = async (address: string): Promise<SaveResult> => {
  try {
    const storageKey = 'verified_tao_addresses'
    const existingData = localStorage.getItem(storageKey)
    let addresses: AddressStorage[] = []

    if (existingData) {
      addresses = JSON.parse(existingData)
      const existingAddress = addresses.find(item => item.taoAddress === address)
      if (existingAddress) {
        return {
          saved: true,
          existed: true,
          uploaded: !!existingAddress.uploaded
        }
      }
    }

    // 上传新地址到R2
    const {success: uploaded, objectKey} = await uploadToR2(address)
    
    const newAddress: AddressStorage = {
      taoAddress: address,
      timestamp: Date.now(),
      uploaded,
      r2ObjectKey: objectKey
    }
    
    addresses.push(newAddress)
    localStorage.setItem(storageKey, JSON.stringify(addresses))
    
    return {
      saved: true,
      existed: false,
      uploaded
    }
  } catch (error) {
    console.error('Failed to save address:', error)
    return {
      saved: false,
      existed: false,
      uploaded: false
    }
  }
 }

  const props = defineProps<{
    provider: string;
  }>();

  const providerData = computed(() => {
    return oAuthProviders[props.provider as keyof typeof oAuthProviders];
  });
 
  const walletAddress = ref<string>("");
  const isConnecting = ref<boolean>(false);
  const showModal = ref(false);
  const taoAddress = ref('');
  const isValidating = ref(false);

  // 检测是否为移动设备
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  // Deep Link 配置
  const DEEP_LINKS = {
    metamask: (url: string) => `https://metamask.app.link/dapp/${url}`,
    trustwallet: (url: string) => `https://link.trustwallet.com/open_url?url=${url}`,
    tokenPocket: (url: string) => `tpdapp://open?params={"url":"${url}"}`,
  };

  // 获取当前 dApp URL
  const getDappUrl = () => {
    const url = window.location.href;
    // 移除 http:// 或 https:// 
    return url.replace(/^https?:\/\//, '');
  };

  const connectWithDeepLink = () => {
    const dappUrl = getDappUrl();
    // 默认使用 MetaMask deep link
    const deepLink = DEEP_LINKS.metamask(dappUrl);
    
    // 可以添加一个选择钱包的 UI
    // const selectedWallet = 'metamask'; // 或 'trustwallet' 或 'tokenPocket'
    // const deepLink = DEEP_LINKS[selectedWallet](dappUrl);

    // 跳转到钱包
    window.location.href = deepLink;
  };
  const login = async () => {
    isConnecting.value = true;

    try {
      if (isMobile()) {
        const ethereum = (window as any).ethereum;
        
        if (ethereum?.isMetaMask) {
          // 已在钱包内置浏览器中
          const provider = new ethers.providers.Web3Provider(ethereum);
          
          // 切换到指定网络
          try {
            await ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: `0x${(945).toString(16)}` }],
            });
          } catch (error: any) {
            if (error.code === 4902) {
              // 添加网络
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: `0x${(945).toString(16)}`,
                  chainName: 'Opentensor Testnet',
                  nativeCurrency: {
                    name: 'TAO',
                    symbol: 'TAO',
                    decimals: 18
                  },
                  rpcUrls: ['https://evm-testnet.dev.opentensor.ai']
                }]
              });
            }
          }

          // 请求连接钱包
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          walletAddress.value = address;

          // 登录处理
          try {
            await apiCaller.auth.loginWithAddress.mutate({
              walletAddress: address,
            });
            sessionStorage.setItem('__USER_TOKEN__', address);
            navigateTo("/");
          } catch (error) {
            console.error("Login error:", error);
            alert("Login failed");
          }
        } else {
          // 不在钱包内置浏览器中，使用 Deep Link
          connectWithDeepLink();
           // 终止后续操作，等待重定向
        }
      } else {
        // 桌面端处理
        const ethereum = (window as any).ethereum;
        if (!ethereum) {
          alert("Please install MetaMask!");
          return;
        }

        const provider = new ethers.providers.Web3Provider(ethereum);
        
        // 切换网络
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${(945).toString(16)}` }],
          });
        } catch (error: any) {
          if (error.code === 4902) {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: `0x${(945).toString(16)}`,
                chainName: 'Opentensor Testnet',
                nativeCurrency: {
                  name: 'TAO',
                  symbol: 'TAO',
                  decimals: 18
                },
                rpcUrls: ['https://evm-testnet.dev.opentensor.ai']
              }]
            });
          }
        }

        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        // const address = "0xee49640EB7e656D84ba9576b4c277738f25D65d8"
        walletAddress.value = address;

        // 登录处理
        try {
          await apiCaller.auth.loginWithAddress.mutate({
            walletAddress: address,
          });
          sessionStorage.setItem('__USER_TOKEN__', address);
          navigateTo("/");
        } catch (error) {
          console.error("Login error:", error);
          alert("Login failed");
        }
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Connection failed");
    } finally {
      isConnecting.value = false;
    }
  };

  const API_CONFIG = {
  baseUrl: 'https://api.taostats.io/api/account/latest/v1',
  network: 'finney',
  headers: {
    accept: 'application/json',
    Authorization: 'VPi9dwDPcYkkEEsEwDujxbtlWxFFsuiEfXOKWb2C9TNrJVf4e0DLI7MglEIwt9yq'
  }
 };
 const verifyAddressWithAPI = async (address: string): Promise<boolean> => {
  try {
    const url = `${API_CONFIG.baseUrl}?address=${address}&network=${API_CONFIG.network}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: API_CONFIG.headers
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.data && data.data.length > 0;
  } catch (error) {
    console.error('API request failed:', error);
    return false;
  }
 };

  const showVerifyTaoAddressModal = () => {
    showModal.value = true;
  };
  const hideVerifyTaoAddressModal = () => {
    showModal.value = false;
  };
  // 修改验证函数
 const verifyTaoAddress = async () => {
  isValidating.value = true;
  
  try {
    // 1. 检查地址格式
    if (!isValidTaoAddress(taoAddress.value)) {
      alert('Invalid address format, please check and try again');
      return;
    }

    // 2. 检查是否已验证
    const {existed} = await saveAddress(taoAddress.value);
    if (existed) {
      alert('This address has been verified!');
      hideVerifyTaoAddressModal();
      return;
    }

    // 3. 调用API验证
    const isValid = await verifyAddressWithAPI(taoAddress.value);
    if (!isValid) {
      alert('Address verification failed. The address may not exist.');
      return;
    }

    // 4. 保存并上传
    const {saved, uploaded} = await saveAddress(taoAddress.value);
    
    if (saved) {
      alert(uploaded ? 'Address verified successfully and synced!' : 'Address verification successful!');
      hideVerifyTaoAddressModal();
    } else {
      alert('Failed to save address, please try again');
    }

  } catch (error) {
    console.error('Validation Errors:', error);
    alert('An error occurred during verification. Please try again.');
  } finally {
    isValidating.value = false;
  }
 };

 const isValidTaoAddress = (address: string): boolean => {
  if (!address || typeof address !== 'string') {
    return false;
  }
  const taoAddressRegex = /^5[1-9A-HJ-NP-Za-km-z]{47}$/;
  return taoAddressRegex.test(address);
 };
 
</script>

<template>
  <Button asChild variant="outline" type="button" class="rounded-3xl border border-[#0C0E0C] bg-[#fbf8f5] px-6 py-4  font-semibold text-[#0C0E0C] [box-shadow:rgb(0,0,0)_0px_4px]">
    <div @click="login">
      <component
        v-if="providerData.icon"
        :is="providerData.icon"
        class="mr-2 size-4 opacity-70"
      />
      {{ $t("auth.continueWithProvider", { provider: providerData.name }) }}
    </div>
  </Button>
  <!-- <div>钱包地址: {{ walletAddress }}</div> -->

   <Button @click="showVerifyTaoAddressModal" class="mt-2 rounded-3xl border border-[#0C0E0C] bg-[#fbf8f5] px-6 py-4  font-semibold text-[#0C0E0C] [box-shadow:rgb(0,0,0)_0px_4px]">
    Verify your Tao address</Button>

    <div
     v-if="showModal"
     class="fixed inset-0 z-50 flex items-center justify-center rounded-lg border-2"
     >
     <div
        class="rounded-lg bg-white p-6 shadow-lg"
         style="width: 40%; height: 50%;">
       <p class="mb-10 text-xl font-bold">Enter your account coldkey below:</p>
       <input type="text" v-model="taoAddress" placeholder="5h1z15daw......" class="mb-4 w-full rounded-lg border-2 border-gray-300 p-2">
       <div class="flex flex-col items-center justify-center">
       <Button @click="verifyTaoAddress" :disabled="isValidating" class="mt-8 w-[50%] rounded-[20px] border-2 text-black">{{ isValidating ? 'verifing...' : 'verified' }}</Button>
       <Button @click="hideVerifyTaoAddressModal" class="mt-4 w-[50%] rounded-[20px] border-2  text-black">Cancel</Button></div>           
      </div>
    </div>
</template>

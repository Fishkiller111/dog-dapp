
<template>
    <div class="relative">
      <!-- Navbar Dropdown 1 row -->
      <nav
        class="font-inter mx-auto h-auto w-full mb-12 lg:sticky top-0 z-20 bg-[#fff]"
        x-data="{isOpen: false, menuOne:false}"
      >
        <!-- CONTAINER -->
        <div
          class="flex max-w-7xl flex-col px-5 py-6 lg:flex-row lg:items-center lg:justify-between md:px-10 lg:py-4 mx-auto"
        >
          <!-- SVG LOGO - YOU CAN REPLACE THIS -->
          <a href="#">
            <svg
              class="relative"
              width="127"
              height="27"
              viewBox="0 0 127 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.756 7.7488C13.5232 7.80968 14.2294 7.87057 14.9357 7.93146C15.094 7.94363 15.2523 7.96799 15.3863 8.02887C15.6542 8.13847 15.7881 8.35766 15.8125 8.66208C15.8368 9.06393 15.7638 9.44142 15.6176 9.80673C15.4472 10.2451 15.2645 10.6713 15.0575 11.0853C14.5582 12.1082 14.0102 13.1067 13.4136 14.0809C12.2324 15.9805 11.0634 17.868 9.91873 19.792C9.37076 20.7053 8.92021 21.6673 8.40877 22.5927C7.89733 23.5304 7.36154 24.468 6.8501 25.4056C6.57002 25.9293 6.09511 26.185 5.5715 26.3433C4.96264 26.5259 4.32943 26.1606 4.1346 25.5518C3.98847 25.089 3.97629 24.6141 4.15895 24.1757C4.48773 23.3842 4.86522 22.6171 5.24272 21.8499C5.36449 21.6064 5.55932 21.4115 5.80286 21.2654C6.16818 21.0462 6.36301 21.1193 6.46043 21.5211C6.47261 21.5577 6.47261 21.5942 6.49696 21.6916C6.5822 21.5698 6.64309 21.4968 6.69179 21.4115C7.50766 20.0964 8.25047 18.7326 8.92021 17.3322C9.96744 15.1403 11.1364 13.0215 12.3055 10.8905C12.4759 10.5739 12.6829 10.2816 12.8656 9.96504C12.9143 9.8798 12.963 9.80673 13.0239 9.69714C12.5977 9.67278 12.208 9.64843 11.8305 9.62408C11.7209 9.6119 11.6601 9.67278 11.5992 9.7702C11.4531 10.0016 11.3069 10.2329 11.1608 10.4643C10.8564 10.9757 10.4058 11.2071 9.80914 11.1584C9.63866 11.1462 9.456 11.1462 9.28552 11.0975C8.82279 10.9879 8.59143 10.5739 8.7132 10.1112C8.74973 9.97721 8.81061 9.85544 8.8715 9.73367C10.0283 7.66356 11.173 5.60562 12.342 3.54769C12.6829 2.95101 13.0726 2.37868 13.4379 1.78201C13.4866 1.69677 13.5353 1.6237 13.5962 1.51411C13.4257 1.50193 13.304 1.50193 13.17 1.47758C12.8656 1.42887 12.7073 1.25839 12.6708 0.990492C12.6464 0.783481 12.7195 0.649532 12.9143 0.564292C13.0361 0.515584 13.1213 0.430344 13.2187 0.357281C13.3283 0.272041 13.4866 0.186801 13.6328 0.186801C14.2173 0.15027 14.7774 0.125916 15.3497 0.125916C15.5567 0.125916 15.7759 0.162447 15.9829 0.211155C16.4091 0.308572 16.604 0.625178 16.4822 1.0392C16.4213 1.25839 16.3239 1.47758 16.19 1.67241C15.715 2.32998 15.301 3.03625 14.9357 3.77905C14.3147 5.0333 13.6449 6.25101 12.9265 7.44437C12.8778 7.52961 12.8291 7.61485 12.756 7.7488Z"
                fill="black"
              />
              <path
                d="M4.22419 12.741L4.13819 12.311L3.70064 12.3402C3.65961 12.3429 3.61905 12.3457 3.57889 12.3483C3.25783 12.3699 2.96224 12.3898 2.65726 12.4003L2.64924 12.4005L2.64123 12.4011C2.09299 12.4376 1.53795 12.4738 0.9962 12.4979L0.982396 12.4985L0.968647 12.4999C0.880185 12.5087 0.804086 12.5087 0.715687 12.4999C0.603298 12.4883 0.554419 12.4447 0.533493 12.4157C0.512435 12.3865 0.486983 12.3264 0.50743 12.22L0.508414 12.2162L0.515757 12.2051L0.535766 12.1527C1.09518 10.6858 1.49074 9.18764 1.85674 7.69931C2.26997 6.05859 2.69545 4.4174 3.12125 2.78718C3.16238 2.63451 3.20662 2.48108 3.25232 2.32268L3.25292 2.32061C3.29781 2.16498 3.34411 2.00446 3.38758 1.84319C3.43302 1.68568 3.48879 1.59864 3.53939 1.54977C3.58331 1.50734 3.65129 1.46586 3.78513 1.45158C4.00364 1.42969 4.22002 1.40074 4.42652 1.3731C4.45938 1.3687 4.49199 1.36434 4.52432 1.36004C4.76296 1.32832 4.99007 1.29972 5.21699 1.28258C7.4223 1.1477 9.62453 0.90288 11.8032 0.647291C12.3424 0.587402 12.8943 0.5394 13.4347 0.503357C13.5895 0.493764 13.7279 0.504729 13.846 0.536218L13.846 0.536408L13.8596 0.539641C13.9541 0.562026 13.9885 0.606033 14.0026 0.635669C14.0182 0.668677 14.0307 0.732612 13.9922 0.825635C13.9537 0.908689 13.8969 0.992177 13.8088 1.11803L13.8031 1.1261L13.7978 1.13438C13.7387 1.22642 13.6784 1.31924 13.6176 1.41276C13.4595 1.65621 13.2984 1.90441 13.1456 2.15597L13.1456 2.15595L13.1423 2.16147C12.9846 2.42887 12.8285 2.69523 12.6729 2.96066C12.2727 3.6435 11.876 4.32013 11.4658 4.99223C10.8953 5.92686 10.3125 6.86184 9.72818 7.79915C9.56142 8.06115 9.39426 8.31192 9.22378 8.56764L9.46933 8.73133L9.22378 8.56764C9.18029 8.63288 9.13492 8.70926 9.08731 8.78941C9.07197 8.81524 9.0564 8.84145 9.04058 8.86781L8.58623 9.62506H9.46933H9.47004H9.47075H9.47146H9.47217H9.47288H9.47359H9.4743H9.475H9.4757H9.47641H9.47711H9.47781H9.47851H9.47921H9.47991H9.4806H9.4813H9.48199H9.48269H9.48338H9.48407H9.48476H9.48545H9.48614H9.48682H9.48751H9.48819H9.48888H9.48956H9.49024H9.49092H9.4916H9.49228H9.49296H9.49363H9.49431H9.49498H9.49566H9.49633H9.497H9.49767H9.49834H9.49901H9.49967H9.50034H9.50101H9.50167H9.50233H9.50299H9.50365H9.50431H9.50497H9.50563H9.50629H9.50694H9.5076H9.50825H9.50891H9.50956H9.51021H9.51086H9.51151H9.51216H9.5128H9.51345H9.5141H9.51474H9.51538H9.51602H9.51667H9.51731H9.51795H9.51858H9.51922H9.51986H9.52049H9.52113H9.52176H9.52239H9.52303H9.52366H9.52429H9.52492H9.52554H9.52617H9.5268H9.52742H9.52805H9.52867H9.52929H9.52991H9.53053H9.53115H9.53177H9.53239H9.53301H9.53362H9.53424H9.53485H9.53547H9.53608H9.53669H9.5373H9.53791H9.53852H9.53913H9.53974H9.54034H9.54095H9.54155H9.54216H9.54276H9.54336H9.54396H9.54456H9.54516H9.54576H9.54636H9.54695H9.54755H9.54814H9.54874H9.54933H9.54992H9.55052H9.55111H9.5517H9.55228H9.55287H9.55346H9.55405H9.55463H9.55522H9.5558H9.55639H9.55697H9.55755H9.55813H9.55871H9.55929H9.55987H9.56044H9.56102H9.5616H9.56217H9.56275H9.56332H9.56389H9.56446H9.56504H9.56561H9.56618H9.56674H9.56731H9.56788H9.56845H9.56901H9.56958H9.57014H9.5707H9.57127H9.57183H9.57239H9.57295H9.57351H9.57407H9.57463H9.57518H9.57574H9.5763H9.57685H9.57741H9.57796H9.57851H9.57907H9.57962H9.58017H9.58072H9.58127H9.58181H9.58236H9.58291H9.58346H9.584H9.58455H9.58509H9.58563H9.58618H9.58672H9.58726H9.5878H9.58834H9.58888H9.58942H9.58996H9.59049H9.59103H9.59157H9.5921H9.59264H9.59317H9.5937H9.59423H9.59477H9.5953H9.59583H9.59636H9.59689H9.59741H9.59794H9.59847H9.599H9.59952H9.60005H9.60057H9.6011H9.60162H9.60214H9.60266H9.60318H9.6037H9.60422H9.60474H9.60526H9.60578H9.6063H9.60681H9.60733H9.60785H9.60836H9.60888H9.60939H9.6099H9.61042H9.61093H9.61144H9.61195H9.61246H9.61297H9.61348H9.61399H9.61449H9.615H9.61551H9.61601H9.61652H9.61702H9.61753H9.61803H9.61854H9.61904H9.61954H9.62004H9.62054H9.62104H9.62154H9.62204H9.62254H9.62304H9.62354H9.62403H9.62453H9.62502H9.62552H9.62601H9.62651H9.627H9.6275H9.62799H9.62848H9.62897H9.62946H9.62995H9.63044H9.63093H9.63142H9.63191H9.6324H9.63289H9.63337H9.63386H9.63435H9.63483H9.63532H9.6358H9.63628H9.63677H9.63725H9.63773H9.63822H9.6387H9.63918H9.63966H9.64014H9.64062H9.6411H9.64158H9.64205H9.64253H9.64301H9.64349H9.64396H9.64444H9.64491H9.64539H9.64586H9.64634H9.64681H9.64728H9.64776H9.64823H9.6487H9.64917H9.64964H9.65011H9.65058H9.65105H9.65152H9.65199H9.65246H9.65293H9.6534H9.65386H9.65433H9.6548H9.65526H9.65573H9.65619H9.65666H9.65712H9.65759H9.65805H9.65851H9.65898H9.65944H9.6599H9.66036H9.66082H9.66128H9.66175H9.6622H9.66266H9.66312H9.66358H9.66404H9.6645H9.66496H9.66542H9.66587H9.66633H9.66679H9.66724H9.6677H9.66815H9.66861H9.66906H9.66952H9.66997H9.67043H9.67088H9.67133H9.67179H9.67224H9.67269H9.67314H9.67359H9.67404H9.67449H9.67495H9.6754H9.67585H9.6763H9.67674H9.67719H9.67764H9.67809H9.67854H9.67899H9.67943H9.67988H9.68033H9.68077H9.68122H9.68167H9.68211H9.68256H9.683H9.68345H9.68389H9.68434H9.68478H9.68523H9.68567H9.68611H9.68656H9.687H9.68744H9.68788H9.68833H9.68877H9.68921H9.68965H9.69009H9.69053H9.69097H9.69141H9.69185H9.69229H9.69273H9.69317H9.69361H9.69405H9.69449H9.69493H9.69537H9.69581H9.69624H9.69668H9.69712H9.69756H9.69799H9.69843H9.69887H9.69931H9.69974H9.70018H9.70061H9.70105H9.70149H9.70192H9.70236H9.70279H9.70323H9.70366H9.7041H9.70453H9.70496H9.7054H9.70583H9.70627H9.7067H9.70713H9.70757H9.708H9.70843H9.70887H9.7093H9.70973H9.71016H9.7106H9.71103H9.71146H9.71189H9.71233H9.71276H9.71319H9.71362H9.71405H9.71448H9.71491H9.71534H9.71577H9.71621H9.71664H9.71707H9.7175H9.71793H9.71836H9.71879H9.71922H9.71965H9.72008H9.72051H9.72094H9.72137H9.7218H9.72223H9.72266H9.72309H9.72351H9.72394H9.72437H9.7248H9.72523H9.72566H9.72609H9.72652H9.72695H9.72738H9.7278H9.72823H9.72866H9.72909H9.72952H9.72995H9.73037H9.7308H9.73123H9.73166H9.73209H9.73252H9.73294H9.73337H9.7338H9.73421C10.2401 9.63115 10.7458 9.63419 11.2497 9.63723L11.2503 9.63723C11.7559 9.64028 12.2597 9.64331 12.7633 9.64938L12.7633 9.64942H12.7693C12.7958 9.64942 12.8415 9.65444 12.9064 9.66498C13.0003 9.68688 13.0425 9.73238 13.0607 9.76579C13.0794 9.80009 13.0945 9.86158 13.0583 9.95454L13.0576 9.95627C13.0279 10.0336 12.9645 10.1264 12.8573 10.2575L12.8515 10.2646L12.846 10.2718C12.6841 10.4851 12.5186 10.7 12.3519 10.9164C12.0139 11.3553 11.6709 11.8006 11.3424 12.2523C11.0919 12.5952 10.8721 12.9713 10.6821 13.3385C9.6959 15.2135 8.721 17.078 7.75796 18.9675C7.1589 20.1291 6.56671 21.3032 5.97659 22.4731C5.58339 23.2527 5.19112 24.0304 4.79833 24.8014L4.79665 24.8048C4.73152 24.935 4.67495 25.0241 4.61024 25.0889L4.61016 25.0888L4.6031 25.0961C4.54337 25.1584 4.503 25.162 4.48403 25.1617C4.45758 25.1612 4.39776 25.1489 4.31827 25.0765C4.18442 24.9493 4.12998 24.8253 4.12387 24.6788L4.12403 24.6788L4.1232 24.6663C4.11725 24.5771 4.11108 24.4886 4.10495 24.4008C4.07251 23.9356 4.0414 23.4896 4.05113 23.0422L4.05116 23.0405C4.06938 22.0446 4.09671 21.0484 4.12412 20.0495L4.12415 20.0483C4.15153 19.0505 4.17898 18.0501 4.19729 17.0493L4.19729 17.0492C4.21358 16.1452 4.21902 15.2387 4.22445 14.3357C4.22699 13.9121 4.22954 13.4892 4.23319 13.0678C4.24919 12.9963 4.24934 12.9335 4.24663 12.8901C4.2428 12.8289 4.22898 12.7637 4.22507 12.7452C4.22466 12.7433 4.22436 12.7419 4.22419 12.741Z"
                fill="white"
                stroke="black"
              />
              <path
                d="M23.2539 4.68068V18.0444H26.1557V12.6798H34.2313V10.0644H26.1557V7.31525H34.6322V4.68068H23.2539Z"
                fill="black"
              />
              <path
                d="M38.5906 18.0444V4.31795H35.7078V18.0444H38.5906Z"
                fill="black"
              />
              <path
                d="M45.4489 7.14343C42.2034 7.14343 39.4925 8.9189 39.4925 12.6035C39.4925 16.3071 42.2034 18.0444 45.4489 18.0444C48.7135 18.0444 51.4244 16.3644 51.4244 12.6035C51.4244 8.88072 48.7135 7.14343 45.4489 7.14343ZM45.4489 15.4099C43.6353 15.4099 42.3371 14.608 42.3371 12.6035C42.3371 10.5798 43.6353 9.79709 45.4489 9.79709C47.2816 9.79709 48.5798 10.618 48.5798 12.6035C48.5798 14.5317 47.2816 15.4099 45.4489 15.4099Z"
                fill="black"
              />
              <path
                d="M66.518 7.33434L64.0361 15.2189L61.5925 7.33434H58.767L56.3424 15.2189L53.8606 7.33434H50.9397L54.2997 18.0444H58.2325L60.1797 11.7062L62.1461 18.0444H66.0789L69.4389 7.33434H66.518Z"
                fill="black"
              />
              <path
                d="M74.9368 11.5535L74.6887 11.5344C72.8177 11.248 72.4932 10.9807 72.4932 10.5035C72.4932 10.1789 72.8368 9.58709 74.4596 9.58709C76.1396 9.58709 76.865 10.0453 76.865 10.8853V10.9807H79.8241V10.8853C79.8241 9.24345 78.8887 7.27707 74.4596 7.27707C70.3359 7.27707 69.4768 9.05254 69.4768 10.5416C69.4768 12.6798 71.3859 13.3671 74.4596 13.768C74.6123 13.7871 74.765 13.8062 74.9177 13.8253C76.0823 13.9589 77.1132 14.1117 77.1132 14.9135C77.1132 15.6199 76.0059 15.7726 74.8414 15.7726C72.9132 15.7726 72.2259 15.3526 72.2259 14.4362V14.3408H69.2477V14.5508C69.2286 15.1044 69.2286 16.0017 69.9732 16.7462C70.8323 17.6053 72.4932 18.0444 74.9177 18.0444C78.2014 18.0444 80.1105 17.529 80.1105 14.8753C80.1105 12.3362 77.3614 11.9162 74.9368 11.5535Z"
                fill="black"
              />
              <path
                d="M88.1297 7.35343C86.1442 7.35343 84.9224 7.98344 84.1969 8.9189H84.0442V7.35343H81.1423V22.1299H84.0442V16.5744H84.1778C84.9033 17.5099 86.1251 18.0826 88.1297 18.0826C92.6351 18.0826 93.1315 14.1498 93.1315 12.718C93.1315 11.1526 92.6542 7.35343 88.1297 7.35343ZM87.2896 15.5817C84.7696 15.5817 84.2542 14.3408 84.2542 12.718C84.2542 11.2671 84.7696 9.85436 87.2896 9.85436C90.0578 9.85436 90.3633 11.878 90.3633 12.718C90.3633 13.4817 90.0578 15.5817 87.2896 15.5817Z"
                fill="black"
              />
              <path
                d="M102.586 8.9189C101.86 7.96435 100.658 7.33434 98.6722 7.33434C94.1477 7.33434 93.6704 11.1335 93.6704 12.6989C93.6704 14.1308 94.1667 18.0444 98.6531 18.0444C100.677 18.0444 101.899 17.4908 102.624 16.5553H102.72V18.0444H105.621V7.33434H102.72V8.9189H102.586ZM99.5122 15.5626C96.744 15.5626 96.4386 13.4626 96.4386 12.6989C96.4386 11.8589 96.725 9.83527 99.5122 9.83527C102.013 9.83527 102.529 11.248 102.529 12.6989C102.529 14.3217 102.013 15.5626 99.5122 15.5626Z"
                fill="black"
              />
              <path
                d="M112.87 7.33434C111.018 7.33434 110.369 7.88798 109.758 8.9189H109.586V7.33434H106.684V18.0444H109.586V13.2526C109.586 11.8016 110.216 10.1216 112.373 10.1216C113.29 10.1216 114.034 10.2744 114.301 10.3507L114.76 7.62071C114.263 7.50616 113.633 7.33434 112.87 7.33434Z"
                fill="black"
              />
              <path
                d="M126.998 7.33434H122.97L118.255 11.9926V4.26068H115.372V18.0253H118.255V15.9444L120.336 13.8826L123.352 18.0444H126.96L122.455 11.8207L126.998 7.33434Z"
                fill="black"
              />
            </svg>
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
                class="flex flex-row text-[#000000] font-inter font-medium rounded-lg lg:px-6 lg:py-4 lg:hover:bg-gray-50 lg:hover:text-gray-800"
                x-bind:class="menuOne"
                >IDO
              </a>
            </div>
            <a
              href="https://tailwind-css-template-jetpack.vercel.app/Landing%20About"
              class="font-inter font-medium rounded-lg lg:px-6 lg:py-4 lg:hover:bg-gray-50 lg:hover:text-gray-800"
              >Trade</a
            >
            <a
              href="https://tailwind-css-template-jetpack.vercel.app/Landing%20Pricing"
              class="font-inter font-medium rounded-lg pb-8 lg:px-6 lg:py-4 lg:pb-0 lg:hover:bg-gray-50 lg:hover:text-gray-800"
              >Stake</a
            >
            <a
              href="https://tailwind-css-template-jetpack.vercel.app/Landing%20Pricing"
              class="font-inter font-medium rounded-lg pb-8 lg:px-6 lg:py-4 lg:pb-0 lg:hover:bg-gray-50 lg:hover:text-gray-800"
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
            <a
              href="#"
              class="relative mr-5 inline-block rounded-xl border border-[#1353FE] bg-white px-8 py-4 text-center font-semibold text-[#1353FE] [box-shadow:rgb(0,0,0)_6px_6px] hover:border-black md:mr-6"
              >Wallet</a
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
            class="grid grid-cols-1 items-center gap-12 sm:gap-20 md:grid-cols-2"
          >
            <!-- Heading Div -->
            <div class="max-w-[720px] lg:max-w-[842px]">

                <NuxtImg
                    src="/images/home.gif"
                    alt="Our application"
                    class="block w-full rounded-xl mb-4 dark:hidden"
                />

                <AudioRecorder ref="audioRecorder" @audioResult="handleAudioResult" />
              <button
                class="mb-6 inline-block rounded-xl bg-black px-8 py-4 text-center font-semibold text-white [box-shadow:rgb(19,_83,_254)_6px_6px] md:mb-10 lg:mb-12" @click="handleToggleVoice"
                >Submit</button
              >

            </div>
            <!-- Image Div -->
            <div
              class="relative left-4 h-full max-h-[562px] w-[85%] overflow-visible md:left-0 md:w-[95%] lg:w-full"
            >
                    <div
                    class="px-5  md:px-10 max-w-7xl mx-auto"
                    data-aos="fade-up"
                    data-aos-duration="900"
                    >
                    <div
                        class="w-full mx-auto max-w-7xl rounded-[48px] bg-cover bg-center bg-no-repeat py-10 px-5 text-white [box-shadow:rgb(106,_218,_255)_9px_9px] bg-[url('https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/6391a6daa19785eb51dd3666_CTA%20(2)%20(1).svg?alt=media&token=b877deae-f9fb-4f75-ad69-cbc62e593e50')]"
                    >
                        <div class="mx-auto max-w-3xl text-center">
                        <div class="mb-5 max-w-[720px] lg:mb-10">
                            <h2 class="mb-2 text-2xl font-semibold md:text-2xl">
                                IDO ANNOUNCEMENT
                            </h2>
                            <div class="mx-auto max-w-[630px] ">
                            <p class="text-[#e0e0e0] mb-2">
                                Powering the Next-Gen Subnet on Bittensor
                            </p>
                            <h3 class="font-semibold">Fundraising Goal</h3>
                            <p class="text-3xl font-semibold py-20">$TAO <span class="ml-2">1232</span></p>

                            <a
                            href="#"
                            class="inline-block rounded-xl bg-black px-8 py-4 font-semibold text-white [box-shadow:rgb(255,_255,_255)_6px_6px]"
                            >View Details</a
                        >
                            </div>
                        </div>
                        <div class="text-3xl font-semibold mb-5 lg:mb-10">
                            TAO <span class="mx-1 font-normal text-xl">Coming Soon</span>  WTAO
                        </div>
                        <a
                            href="#"
                            class="inline-block rounded-xl bg-black px-8 mb-4 py-4 font-semibold text-white [box-shadow:rgb(255,_255,_255)_6px_6px]"
                            >Explore Hash</a
                        >
                        </div>
                    </div>
                    </div>
            </div>
          </div>
        </div>
      </section>

      <!-- <section>
        <div class="px-5 py-16 md:px-10">
          <div
            class="mx-auto flex w-full max-w-[798px] flex-col rounded-[36px] bg-black py-8 text-white"
            data-aos="fade-up"
            data-aos-duration="900"
          >
            <div
              class="grid h-full w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4 md:gap-0"
            >
              <div
                class="flex flex-col items-center justify-center lg:border-r lg:border-solid lg:border-r-[#c3c0c04d]"
              >
                <h4 class="mb-4 text-2xl font-bold md:text-3xl">200+</h4>
                <p class="text-sm">Blocks</p>
              </div>
              <div
                class="flex flex-col items-center justify-center lg:border-r lg:border-solid lg:border-r-[#c3c0c04d]"
              >
                <h4 class="mb-4 text-2xl font-bold md:text-3xl">45</h4>
                <p class="text-sm">Templates</p>
              </div>
              <div
                class="flex flex-col items-center justify-center lg:border-r lg:border-solid lg:border-r-[#c3c0c04d]"
              >
                <h4 class="mb-4 text-2xl font-bold md:text-3xl">1500+</h4>
                <p class="text-sm">Customers</p>
              </div>
              <div
                class="flex flex-col items-center justify-center lg:border-r lg:border-solid lg:border-r-[#c3c0c04d]"
              >
                <h4 class="mb-4 text-2xl font-bold md:text-3xl">890</h4>
                <p class="text-sm">Support Tickets</p>
              </div>
            </div>
          </div>
        </div>
      </section> -->

      <section>
        <!-- Container -->
        <div
          class="max-w-7xl px-5 py-16 md:px-10 md:py-16 lg:py-24 mx-auto"
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
                  class="bg-cover bg-center bg-no-repeat px-4 text-white bg-[url('https://assets.website-files.com/63904f663019b0d8edf8d57c/639156ce1c70c97aeb755c8a_Rectangle%2010%20(1).svg')]"
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

      <!-- <section>
        <div
          class="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-16 lg:py-24"
          data-aos="fade-up"
          data-aos-duration="900"
        >

          <div
            class="text-center grid grid-cols-1 items-center gap-12 sm:gap-20 lg:grid-cols-2 mx-auto lg:text-left"
          >
            <div class="max-w-[720px]">
              <h2 class="mb-4 text-3xl font-semibold md:text-5xl">
                Make every step
                <span
                  class="bg-cover bg-center px-4 text-white bg-[url('https://assets.website-files.com/63904f663019b0d8edf8d57c/639156ce1c70c97aeb755c8a_Rectangle%2010%20(1).svg')]"
                  >user-centric</span
                >
              </h2>
              <p class="mb-6 max-w-[480px] text-[#636262] md:mb-10 lg:mb-12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                aliquam, purus sit amet luctus venenatis, lectus
              </p>
              <a
                href="#"
                class="inline-block rounded-xl bg-black px-8 py-4 text-center font-semibold text-white [box-shadow:rgb(19,_83,_254)_6px_6px]"
                >Get Started</a
              >
            </div>
            <div
              class="relative left-4 h-full max-h-[560px] w-[85%] overflow-visible md:left-0 md:w-[95%] lg:w-full"
            >
              <img
                src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63915d1cb654acd795a72b12_magicpattern-ixxjruC7Gg4-unsplash.jpg"
                alt=""
                class="relative mx-auto block h-full w-full max-w-[800px] -rotate-[3.5deg] rounded-2xl object-cover"
              />
              <div
                class="absolute bottom-0 left-4 right-0 top-4 -z-10 h-full w-full rounded-2xl bg-black"
              ></div>
            </div>
          </div>
        </div>
      </section> -->

      <!-- <section class="relative">
        <div
          class="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-16 lg:py-24"
          data-aos="fade-up"
          data-aos-duration="900"
        >
          <div
            class="text-center grid grid-cols-1 items-center gap-12 sm:gap-20 lg:grid-cols-2 lg:text-left"
          >
            <div
              class="relative left-4 h-full max-h-[560px] w-[85%] md:left-0 md:w-[95%] lg:w-full"
            >
              <img
                src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63915d1cb654acd795a72b12_magicpattern-ixxjruC7Gg4-unsplash.jpg"
                alt=""
                class="mx-auto block h-full w-full max-w-[800px] rotate-[3.5deg] rounded-2xl object-cover"
              />
              <div
                class="absolute bottom-0 left-[-16px] right-0 top-4 -z-10 h-full w-full rounded-2xl bg-black"
              ></div>
            </div>
            <div class="max-w-[720px] lg:max-w-[842px]">
              <h2 class="mb-4 text-3xl font-semibold md:text-5xl">
                Understand
                <span
                  class="bg-cover bg-center px-4 text-white bg-[url('https://assets.website-files.com/63904f663019b0d8edf8d57c/639156ce1c70c97aeb755c8a_Rectangle%2010%20(1).svg')]"
                  >sales</span
                >
                <span
                  class="bg-cover bg-center px-4 text-white bg-[url('https://assets.website-files.com/63904f663019b0d8edf8d57c/63915f9749aaab0572c48dae_Rectangle%2018.svg')]"
                  >performance</span
                >
                better
              </h2>
              <p class="mb-6 max-w-[480px] text-[#636262] md:mb-10 lg:mb-12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                aliquam, purus sit amet luctus venenatis, lectus
              </p>
              <a
                href="#"
                class="inline-block rounded-xl bg-black px-8 py-4 text-center font-semibold text-white [box-shadow:rgb(19,_83,_254)_6px_6px]"
                >Get Started</a
              >
            </div>
          </div>
        </div>
        <img
          src="https://assets.website-files.com/63904f663019b0d8edf8d57c/6391689c5d1aa134d3ee64ab_Frame%20427322638.svg"
          alt=""
          class="bottom-0 left-auto right-0 top-auto hidden max-[991px]:-z-[1] lg:absolute lg:inline-block"
        />
      </section> -->

      <section>
        <!-- Container -->
        <div class="max-w-7xl px-5 py-16 md:px-10 md:py-16 lg:py-24 mx-auto">
          <!-- Heading Div -->
          <div
            class="mx-auto w-full max-w-3xl text-center"
            data-aos="fade-up"
            data-aos-duration="900"
          >
            <h2 class="text-3xl font-semibold md:text-5xl">
                Unlock More Mining Chances By Completing These
              <span
                class="bg-cover bg-center bg-no-repeat px-4 text-white bg-[url('https://assets.website-files.com/63904f663019b0d8edf8d57c/63915f9749aaab0572c48dae_Rectangle%2018.svg')]"
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
              class="relative mb-8 flex flex-col rounded-2xl border border-solid border-black p-8 [box-shadow:rgb(0,_0,_0)_9px_9px] lg:mb-4 cursor-pointer"
              @click="handleTab('Daily')"
            >
              <div
                class="absolute -top-8 bottom-auto left-auto right-4 flex h-16 w-16 flex-col items-center justify-center rounded-full border border-solid border-[#9b9b9b] bg-white [box-shadow:rgb(0,_0,_0)_0px_5px] lg:right-8"
              >
                <CalendarCheck class="relative" color="#000000" />
              </div>
              <p class="mb-4 text-xl font-semibold">Daily Check-In </p>
              <p>
                Curious About Your Dog?
              </p>
              <p>Upload Data Now!</p>

              <div class="absolute bottom-3 right-3 text-base">0/1</div>

            </div>
            <!-- Feature Item -->
            <div
              class="relative mb-8 flex flex-col rounded-2xl border border-solid border-black p-8 [box-shadow:rgb(0,_0,_0)_9px_9px] lg:mb-4 cursor-pointer"
              @click="handleTab('Discord')"
            >
              <div
                class="absolute -top-8 bottom-auto left-auto right-4 flex h-16 w-16 flex-col items-center justify-center rounded-full border border-solid border-[#9b9b9b] bg-white [box-shadow:rgb(0,_0,_0)_0px_5px] lg:right-8"
              >
                <svg t="1732542917197" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4283" width="32" height="32"><path d="M404.992 156.992L380 160s-112.128 12.256-194.016 78.016h-0.96l-1.024 0.96c-18.368 16.896-26.368 37.664-39.008 68.032a982.08 982.08 0 0 0-37.984 112C83.264 504.864 64 608.864 64 704v8l4 8c29.632 52 82.24 85.12 131.008 108 48.736 22.88 90.88 35.008 120 36l19.008 0.992 9.984-16.992 35.008-62.016c37.12 8.384 79.872 14.016 128.992 14.016 49.12 0 91.872-5.632 128.992-14.016l35.008 62.016 10.016 16.992 18.976-0.992c29.12-0.992 71.264-13.12 120-36 48.768-22.88 101.376-56 131.008-108l4-8V704c0-95.136-19.264-199.136-43.008-284.992a982.08 982.08 0 0 0-37.984-112c-12.64-30.4-20.64-51.136-39.008-68l-0.992-1.024h-1.024C756.16 172.256 644 160 644 160l-24.992-3.008-9.024 23.008s-9.248 23.36-14.976 50.016A643.04 643.04 0 0 0 512 224c-17.12 0-46.72 1.12-83.008 6.016-5.76-26.656-15.008-50.016-15.008-50.016z m-44 73.024c1.376 4.48 2.752 8.352 4 12-41.376 10.24-85.504 25.856-125.984 50.976l33.984 54.016C356 295.488 475.232 288 512 288c36.736 0 156 7.488 239.008 59.008l33.984-54.016c-40.48-25.12-84.608-40.736-125.984-51.008 1.248-3.616 2.624-7.488 4-12 29.856 6.016 86.88 19.776 133.984 57.024-0.256 0.128 12 18.624 23.008 44.992 11.264 27.136 23.744 63.264 35.008 104 21.632 78.112 38.624 173.248 40 256.992-20.16 30.752-57.504 58.496-97.024 77.024a311.808 311.808 0 0 1-77.984 24.96L704 768c9.504-3.52 18.88-7.36 27.008-11.008 49.248-21.632 76-44.992 76-44.992l-42.016-48s-17.984 16.512-60 35.008C663.04 717.504 598.88 736 512 736s-151.008-18.496-192.992-36.992c-42.016-18.496-60-35.008-60-35.008l-42.016 48s26.752 23.36 76 44.992c8.128 3.648 17.504 7.52 27.008 11.008l-16 27.008a311.808 311.808 0 0 1-78.016-25.024c-39.488-18.496-76.864-46.24-96.96-76.992 1.344-83.744 18.336-178.88 40-256.992a917.216 917.216 0 0 1 34.976-104c11.008-26.368 23.264-44.864 23.008-44.992 47.104-37.248 104.128-51.008 133.984-56.992zM400 448c-24.736 0-46.624 14.112-60 32-13.376 17.888-20 39.872-20 64s6.624 46.112 20 64c13.376 17.888 35.264 32 60 32 24.736 0 46.624-14.112 60-32 13.376-17.888 20-39.872 20-64s-6.624-46.112-20-64c-13.376-17.888-35.264-32-60-32z m224 0c-24.736 0-46.624 14.112-60 32-13.376 17.888-20 39.872-20 64s6.624 46.112 20 64c13.376 17.888 35.264 32 60 32 24.736 0 46.624-14.112 60-32 13.376-17.888 20-39.872 20-64s-6.624-46.112-20-64c-13.376-17.888-35.264-32-60-32z m-224 64c1.76 0 4 0.64 8 6.016 4 5.344 8 14.72 8 25.984 0 11.264-4 20.64-8 26.016-4 5.344-6.24 5.984-8 5.984-1.76 0-4-0.64-8-6.016A44.832 44.832 0 0 1 384 544c0-11.264 4-20.64 8-26.016 4-5.344 6.24-5.984 8-5.984z m224 0c1.76 0 4 0.64 8 6.016 4 5.344 8 14.72 8 25.984 0 11.264-4 20.64-8 26.016-4 5.344-6.24 5.984-8 5.984-1.76 0-4-0.64-8-6.016A44.832 44.832 0 0 1 608 544c0-11.264 4-20.64 8-26.016 4-5.344 6.24-5.984 8-5.984z" p-id="4284"></path></svg>
              </div>
              <p class="mb-4 text-xl font-semibold">Join Discord </p>
              <p>
                Join The Official Discord Channel To Stay Updated With The Latest News.
                Stay With Us!

              </p>
              <div class="absolute bottom-3 right-3 text-base">0/1</div>
            </div>
            <!-- Feature Item -->
            <div
              class="relative mb-8 flex flex-col rounded-2xl border border-solid border-black p-8 [box-shadow:rgb(0,_0,_0)_9px_9px] lg:mb-4 cursor-pointer"
              @click="handleTab('Trade')"
            >
              <div
                class="absolute -top-8 bottom-auto left-auto right-4 flex h-16 w-16 flex-col items-center justify-center rounded-full border border-solid border-[#9b9b9b] bg-white [box-shadow:rgb(0,_0,_0)_0px_5px] lg:right-8"
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
              class="relative mb-8 flex flex-col rounded-2xl border border-solid border-black p-8 [box-shadow:rgb(0,_0,_0)_9px_9px] lg:mb-4 cursor-pointer"
              @click="handleTab('Invitation')"
            >
              <div
                class="absolute -top-8 bottom-auto left-auto right-4 flex h-16 w-16 flex-col items-center justify-center rounded-full border border-solid border-[#9b9b9b] bg-white [box-shadow:rgb(0,_0,_0)_0px_5px] lg:right-8"
              >
                <svg t="1732543166582" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8533" width="32" height="32"><path d="M767.39744 724.66816 888.99744 724.66816C906.670528 724.66816 920.99744 738.9952 920.99744 756.66816 920.99744 774.34112 906.670528 788.66816 888.99744 788.66816L767.39744 788.66816 767.39744 916.66816C767.39744 934.34112 753.070528 948.66816 735.39744 948.66816 717.724288 948.66816 703.39744 934.34112 703.39744 916.66816L703.39744 788.66816 568.99744 788.66816C551.324288 788.66816 536.99744 774.34112 536.99744 756.66816 536.99744 738.9952 551.324288 724.66816 568.99744 724.66816L703.39744 724.66816 703.39744 596.66816C703.39744 578.9952 717.724288 564.66816 735.39744 564.66816 753.070528 564.66816 767.39744 578.9952 767.39744 596.66816L767.39744 724.66816ZM605.232384 596.34432C665.477632 548.98624 686.912832 474.82496 686.912832 384.75584L686.912832 265.7088C686.912832 174.07168 582.894336 96 469.585088 96 356.294592 96 252.257408 174.07808 252.257408 265.7088L252.257408 384.75584C252.257408 472.39744 273.685696 548.07296 333.743232 596.19008L336.4944 552.36416 167.421824 656.04096C162.620992 657.98336 152.057024 664.12928 141.308864 673.15968 118.316928 692.4768 104.989824 716.95744 109.765056 746.24256L109.415232 791.94944C109.415232 831.72288 141.692288 864 181.451968 864L359.056 864C373.878848 864 385.895168 851.984 385.895168 837.16096 385.895168 822.33792 373.878848 810.32192 359.056 810.32192L181.451968 810.32192C171.33792 810.32192 163.09344 802.07744 163.09344 791.94944L163.09344 741.9232C161.583296 730.48832 165.850688 722.6496 175.838272 714.25792 182.248896 708.87232 188.843776 705.03552 192.518592 703.37216L364.554752 598.12416C380.398656 588.40896 381.810432 565.91936 367.30592 554.29824 323.342656 519.07584 305.93568 457.60192 305.93568 384.75584L305.93568 265.7088C305.93568 207.61728 383.138304 149.67808 469.585088 149.67808 556.04992 149.67808 633.23456 207.6096 633.23456 265.7088L633.23456 384.75584C633.23456 459.89888 615.971776 519.62432 572.058944 554.144 557.29472 565.7504 560.497088 592.144 574.794688 598.23296 586.32384 607.0016 605.232384 596.34432 605.232384 596.34432Z" fill="#2c2c2c" p-id="8534"></path></svg>
              </div>
              <p class="mb-4 text-xl font-semibold">Invitation</p>
              <p>
                Telegram Invitation
              </p>
              <p>Discord Invitation</p>
              <div class="absolute bottom-3 right-3 text-base">0/1</div>
            </div>
            <!-- Feature Item -->
            <div
              class="relative mb-8 flex flex-col rounded-2xl border border-solid border-black p-8 [box-shadow:rgb(0,_0,_0)_9px_9px] lg:mb-4 cursor-pointer"
              @click="handleTab('Telegram')"
            >
              <div
                class="absolute -top-8 bottom-auto left-auto right-4 flex h-16 w-16 flex-col items-center justify-center rounded-full border border-solid border-[#9b9b9b] bg-white [box-shadow:rgb(0,_0,_0)_0px_5px] lg:right-8"
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
              <div class="absolute bottom-3 right-3 text-base">0/1</div>
            </div>
            <!-- Feature Item -->
            <div
              class="relative mb-8 flex flex-col rounded-2xl border border-solid border-black p-8 [box-shadow:rgb(0,_0,_0)_9px_9px] lg:mb-4 cursor-pointer"
              @click="handleTab('Stake')"
            >
              <div
                class="absolute -top-8 bottom-auto left-auto right-4 flex h-16 w-16 flex-col items-center justify-center rounded-full border border-solid border-[#9b9b9b] bg-white [box-shadow:rgb(0,_0,_0)_0px_5px] lg:right-8"
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
      <section class="bg-black text-white overflow-hidden">
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
                <img
                  src="https://assets.website-files.com/63904f663019b0d8edf8d57c/6399728d302d2471f18b229f_Group%2047874%20(2).svg"
                  alt=""
                  class="inline-block max-h-10"
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
            <div class="mb-8 mt-6 flex flex-row lg:mb-0 lg:mt-0">
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
            handleShare('Telegram');
            showConfirmation = false;
          "
        >
        Telegram
        </Button>
        <Button
          variant=""
          @click="
            handleShare('Discord');
            showConfirmation = false;
          "
        >
        Discord
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  </template>

  <script setup lang="ts">
  import AOS from "aos";
  import "aos/dist/aos.css";
  import { CalendarCheck, TicketsPlane, Handshake, Coins } from 'lucide-vue-next'
  import { useToast } from "@/modules/ui/components/toast";
  const { toast, dismiss: dismissToast } = useToast();


const audioRecorder = ref(null)
const showConfirmation = ref(false);

onMounted(() => {
    AOS.init({
    once: true,
    });
})

const handleToggleVoice = (): void => {
    console.log(audioRecorder.value)
    audioRecorder.value?.toggleRecording()
}

const handleAudioResult = (result: string): void => {
    console.log('voice result ===', result)
}


const handleTab = (type: string): void => {
    const comeSoon = ['Trade', 'Stake']
    if (comeSoon.includes(type)) {
        toast({
            variant: "default",
            title: 'Coming Soon!',
        });
        return
    }
    if (type === 'Invitation') showConfirmation.value = true



}

const handleShare = (type: string): void => {
    console.log('handleShare', type)
}
  </script>

  <style></style>

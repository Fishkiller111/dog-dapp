/*
 * @Author: WGinit wginit@yeah.net
 * @Date: 2024-11-22 21:30:36
 * @LastEditors: WGinit wginit@yeah.net
 * @LastEditTime: 2024-11-22 22:50:19
 * @FilePath: /dog-app-web/apps/web/tailwind.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import baseConfig from "tailwind-config";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  presets: [baseConfig],
  darkMode: "class",
  content: [
    "./layouts/**/*.{vue,ts}",
    "./modules/**/*.{vue,ts}",
    "./pages/**/*.{vue,ts}",
  ],
  safelist: ["ml-2", "ml-4", "ml-6", "ml-8"],
  //   theme: {
  //     colors: {
  //       primary: "#f00",
  //       gray: colors.gray, // 保留 Tailwind 默认的灰色
  //       blue: colors.blue, // 保留 Tailwind 默认的蓝色
  //     },
  //   },
};

export default config;

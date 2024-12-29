import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default" | "marketing" | "saas-app" | "saas-auth"
declare module "../../../../node_modules/.pnpm/nuxt@3.14.159_@parcel+watcher@2.5.0_@types+node@22.9.1_eslint@8.57.0_ioredis@5.4.1_magicast@0_fa7dixccytg3463t3lccksbkhm/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}
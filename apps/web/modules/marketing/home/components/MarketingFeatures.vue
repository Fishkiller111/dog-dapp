<script setup lang="ts">
  import {
    ArrowRightIcon,
    CloudIcon,
    PaperclipIcon,
    PhoneIcon,
    PointerIcon,
    StarIcon,
    UploadIcon,
  } from "lucide-vue-next";
</script>

<template>
  <section class="text-card-foreground py-24">
    <div class="container">
      <div class="text-center">
        <h1 class="text-4xl font-bold lg:text-5xl">
          Features your clients will love
        </h1>
        <p class="text-foreground/60 mt-3 text-lg">
          In this section you can showcase the features of your SaaS.
        </p>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-8">
        <div
          class="bg-card/50 grid items-center gap-8 rounded-2xl border p-8 lg:grid-cols-2 lg:gap-16"
        >
          <div class="bg-primary/10 overflow-hidden rounded-xl p-12">
            <NuxtImg
              src="/images/feature-image.svg"
              class="block dark:hidden"
              alt="Feature 1"
            />
            <NuxtImg
              src="/images/feature-image-dark.svg"
              class="hidden dark:block"
              alt="Feature 1"
            />
          </div>

          <div>
            <h3 class="text-3xl font-bold">Feature A</h3>
            <p class="text-foreground/60 mt-2 leading-normal">
              This is a brilliant feature. And below you can see some reasons
              why. This is basically just a dummy text.
            </p>
            <Button variant="secondary" size="sm" class="mt-4">
              Learn more
              <ArrowRightIcon class="ml-2 size-4" />
            </Button>

            <div class="mt-6 grid grid-cols-2 gap-4">
              <div class="text-card-foreground">
                <StarIcon class="text-highlight size-6 text-3xl" />
                <strong class="mt-2 block">Benefit 1</strong>
                <p class="text-foreground/60">This is a brilliant benefit.</p>
              </div>
              <div class="text-card-foreground">
                <PointerIcon class="text-highlight size-6 text-3xl" />
                <strong class="mt-2 block">Benefit 2</strong>
                <p class="text-foreground/60">This is a brilliant benefit.</p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-card/50 grid items-center gap-8 rounded-2xl border p-8 lg:grid-cols-2 lg:gap-16"
        >
          <div class="bg-primary/10 overflow-hidden rounded-xl p-12 lg:order-2">
            <NuxtImg
              src="/images/feature-image.svg"
              class="block dark:hidden"
              alt="Feature 2"
            />
            <NuxtImg
              src="/images/feature-image-dark.svg"
              class="hidden dark:block"
              alt="Feature 2"
            />
          </div>

          <div class="lg:order-1">
            <h3 class="text-3xl font-bold">Feature B</h3>
            <p class="text-foreground/60 mt-2 leading-normal">
              This is a brilliant feature. And below you can see some reasons
              why. This is basically just a dummy text.
            </p>
            <Button variant="secondary" size="sm" class="mt-4">
              Learn more
              <ArrowRightIcon class="ml-2 size-4" />
            </Button>

            <div class="mt-6 grid grid-cols-2 gap-4">
              <div class="text-card-foreground">
                <UploadIcon class="text-highlight size-6 text-3xl" />
                <strong class="mt-2 block">Benefit 1</strong>
                <p class="text-foreground/60">This is a brilliant benefit.</p>
              </div>
              <div class="text-card-foreground">
                <CloudIcon class="text-highlight size-6 text-3xl" />
                <strong class="mt-2 block">Benefit 2</strong>
                <p class="text-foreground/60">This is a brilliant benefit.</p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-card/50 grid items-center gap-8 rounded-2xl border p-8 lg:grid-cols-2 lg:gap-16"
        >
          <div class="bg-primary/10 overflow-hidden rounded-xl p-12">
            <NuxtImg
              src="/images/feature-image.svg"
              class="block dark:hidden"
              alt="Feature 3"
            />
            <NuxtImg
              src="/images/feature-image-dark.svg"
              class="hidden dark:block"
              alt="Feature 3"
            />
          </div>

          <div>
            <h3 class="text-3xl font-bold">Feature C</h3>
            <p class="text-foreground/60 mt-2 leading-normal">
              This is a brilliant feature. And below you can see some reasons
              why. This is basically just a dummy text.
            </p>
            <Button variant="secondary" size="sm" class="mt-4">
              Learn more
              <ArrowRightIcon class="ml-2 size-4" />
            </Button>

            <div class="mt-6 grid grid-cols-2 gap-4">
              <div class="text-card-foreground">
                <PhoneIcon class="text-highlight size-6 text-3xl" />
                <strong class="mt-2 block">Benefit 1</strong>
                <p class="text-foreground/60">This is a brilliant benefit.</p>
              </div>
              <div class="text-card-foreground">
                <PaperclipIcon class="text-highlight size-6 text-3xl" />
                <strong class="mt-2 block">Benefit 2</strong>
                <p class="text-foreground/60">This is a brilliant benefit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

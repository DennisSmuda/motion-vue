<script setup lang="ts">
import ToggleContent from './ToggleContent.vue'
import { LayoutGroup } from 'motion-v'

const items = [...Array(3)].map((_, i) => ({
  id: i,
  content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Pariatur cumque enim ipsam doloribus quo excepturi aperiam 
            nulla asperiores corporis architecto odio, officiis iusto 
            dolores libero quos voluptatibus, voluptas dicta? Impedit.`,
}))
</script>

<template>
  <main class="p-8  grid grid-cols-1 gap-2 sm:grid-cols-2 w-full">
    <div class="space-y-4">
      <h3 class="text-xl font-semibold">
        1. without LayoutGroup
      </h3>
      <div class="space-y-4">
        <ToggleContent
          v-for="item in items"
          :key="item.id"
          :layout="true"
          :content="item.content"
        />
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-xl font-semibold">
        2. with LayoutGroup
      </h3>
      <LayoutGroup>
        <ToggleContent
          v-for="item in items"
          :key="item.id"
          :layout="true"
          :content="item.content"
        />
      </LayoutGroup>
    </div>
  </main>
</template>

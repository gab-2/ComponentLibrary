<template>
  <article :class="classes" @click="onClick">
    <header v-if="$slots.header" class="sm-card__header">
      <slot name="header" />
    </header>
    <div class="sm-card__body"><slot /></div>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getCardClass } from "@sua-marca-ui/core";

const props = withDefaults(
  defineProps<{ hover?: boolean; interactive?: boolean }>(),
  { hover: false, interactive: false },
);
const emit = defineEmits<{ click: [event: MouseEvent] }>();

const classes = computed(() =>
  getCardClass({ hover: props.hover, interactive: props.interactive }),
);
const onClick = (event: MouseEvent) => emit("click", event);
</script>

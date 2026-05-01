<template>
  <button :class="classes" :disabled="disabled" :type="type">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
  }>(),
  { variant: "primary", size: "md", disabled: false, type: "button" },
);

const classes = computed(() => ["sm-button", `sm-button--${props.variant}`, `sm-button--${props.size}`]);
</script>

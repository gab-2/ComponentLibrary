<template>
  <input :class="classes" :value="modelValue" :placeholder="placeholder" :disabled="disabled" @input="onInput" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{ modelValue?: string; placeholder?: string; disabled?: boolean }>(),
  { modelValue: "", placeholder: "", disabled: false },
);

const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const classes = "sm-input";

const onInput = (event: Event) => emit("update:modelValue", (event.target as HTMLInputElement).value);
</script>

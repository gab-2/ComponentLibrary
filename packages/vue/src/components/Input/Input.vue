<template>
  <div>
    <label v-if="label" :for="resolvedId" class="sm-input-label">{{
      label
    }}</label>
    <input
      :id="resolvedId"
      :class="classes"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-invalid="ariaInvalid"
      @focus="onFocus"
      @blur="onBlur"
      @pointerdown="onPointerDown"
      @keydown="onKeyDown"
      @input="onInput"
    />
    <p v-if="error" class="sm-input-error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
  createFocusOriginTracker,
  getInputAriaInvalid,
  getInputClass,
  type InputSize,
} from "@sua-marca-ui/core";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    placeholder?: string;
    disabled?: boolean;
    size?: InputSize;
    invalid?: boolean;
    error?: string;
    label?: string;
    id?: string;
  }>(),
  {
    modelValue: "",
    placeholder: "",
    disabled: false,
    size: "md",
    invalid: false,
    error: undefined,
    label: undefined,
    id: undefined,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const tracker = createFocusOriginTracker();
const focused = ref(false);
const focusOrigin = ref<"keyboard" | "pointer" | "programmatic">(
  "programmatic",
);
const resolvedId = computed(() => props.id ?? "sm-input");
const resolvedInvalid = computed(() => props.invalid || Boolean(props.error));
const ariaInvalid = computed(() =>
  getInputAriaInvalid({ invalid: props.invalid, error: props.error }),
);
const classes = computed(() =>
  getInputClass({
    size: props.size,
    invalid: resolvedInvalid.value,
    focused: focused.value,
    focusOrigin: focusOrigin.value,
  }),
);

const onInput = (event: Event) =>
  emit("update:modelValue", (event.target as HTMLInputElement).value);
const onPointerDown = () => tracker.onPointerInteraction();
const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Tab") tracker.onKeyboardNavigation();
};
const onFocus = (event: FocusEvent) => {
  focused.value = true;
  focusOrigin.value = tracker.getOrigin();
  emit("focus", event);
};
const onBlur = (event: FocusEvent) => {
  focused.value = false;
  emit("blur", event);
};
</script>

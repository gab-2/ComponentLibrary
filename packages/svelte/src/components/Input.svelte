<script lang="ts">
  import { createFocusOriginTracker, getInputAriaInvalid, getInputClass, type InputSize } from "@sua-marca-ui/core";

  export let id = "sm-input";
  export let label: string | undefined = undefined;
  export let error: string | undefined = undefined;
  export let size: InputSize = "md";
  export let invalid = false;
  export let value = "";
  export let placeholder = "";
  export let disabled = false;

  const tracker = createFocusOriginTracker();
  let focused = false;
  let focusOrigin: "keyboard" | "pointer" | "programmatic" = "programmatic";

  $: resolvedInvalid = invalid || Boolean(error);
  $: classes = getInputClass({ size, invalid: resolvedInvalid, focused, focusOrigin });
  $: ariaInvalid = getInputAriaInvalid({ invalid, error });

  const onPointerDown = () => tracker.onPointerInteraction();
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Tab") tracker.onKeyboardNavigation();
  };
  const onFocus = () => {
    focused = true;
    focusOrigin = tracker.getOrigin();
  };
  const onBlur = () => {
    focused = false;
  };
</script>

<div>
  {#if label}<label class="sm-input-label" for={id}>{label}</label>{/if}
  <input
    {id}
    class={classes}
    bind:value
    {placeholder}
    {disabled}
    aria-invalid={ariaInvalid}
    on:pointerdown={onPointerDown}
    on:keydown={onKeyDown}
    on:focus={onFocus}
    on:blur={onBlur}
  />
  {#if error}<p class="sm-input-error">{error}</p>{/if}
</div>

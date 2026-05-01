<script lang="ts">
  export let variant: "primary" | "secondary" = "primary";
  export let size: "sm" | "md" | "lg" = "md";
  export let disabled = false;
</script>

<button class={`sm-button sm-button--${variant} sm-button--${size}`} {disabled}><slot /></button>

<script lang="ts">
  import { getCardClass } from "@sua-marca-ui/core";

  export let hover = false;
  export let interactive = false;
  $: classes = getCardClass({ hover, interactive });
</script>

<article class={classes}>
  <header class="sm-card__header"><slot name="header" /></header>
  <div class="sm-card__body"><slot /></div>
</article>

<template>
  <article class="sm-card">
    <header v-if="$slots.header" class="sm-card__header"><slot name="header" /></header>
    <div class="sm-card__body"><slot /></div>
  </article>
</template>

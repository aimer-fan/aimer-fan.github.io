<script lang="ts" setup>
import Button from "./Button.vue";
// import sidebar from "../docs/.vitepress/sidebar";
import { getHomeLinkByPrefix } from "../docs/.vitepress/utils/sidebar-helper";
import { useData } from "vitepress";

const { theme } = useData();
const sidebar = theme.value.sidebar;
const link = getHomeLinkByPrefix(sidebar, "/web/");
</script>

<template>
  <div class="home-container">
    <a href="https://www.pixiv.net/artworks/20182174" target="_blank">
      <img class="image-src" src="/images/logo.png" />
    </a>
    <h1 class="title">AimerFanのBlog</h1>
    <p class="sub-title">故不积跬步，无以至千里；不积小流，无以成江海。</p>
    <Button class="start-btn" :href="link">Get Started</Button>
  </div>
</template>

<style scoped>
.home-container {
  margin-top: 8%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.image-src { width: 192px; height: 192px; }
@media (min-width: 640px) { .image-src { width: 256px; height: 256px; } }
@media (min-width: 960px) { .image-src { width: 320px; height: 320px; } }
.title {
  line-height: 64px;
  font-size: 32px;
  color: var(--vp-home-hero-name-color);
  margin-top: 1em;
  font-weight: 700;
}
@media (min-width: 640px) { .title { font-size:48px } }
@media (min-width: 960px) { .title { font-size:56px } }
.sub-title {
  margin-top: 0.8em;
  font-size: 18px;
  color: var(--vp-c-text-1);
  text-align: center;
  padding: 0 4em;
}
@media (min-width: 640px) { .sub-title { font-size: 22px; } }
@media (min-width: 960px) { .sub-title { font-size: 24px; } }

.start-btn {
  margin-top: 4em;
}
</style>

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import playformCompress from '@playform/compress';

// https://astro.build/config
export default defineConfig({
    site: 'https://vabi.io',
    integrations: [
        tailwind({
            applyBaseStyles: false,
        }),
        react(),
        sitemap(),
        playformCompress(),
    ],
    output: 'server',
    adapter: node({
        mode: 'standalone',
    }),
});

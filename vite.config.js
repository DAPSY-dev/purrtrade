import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./setupTests.js'],
        include: ['./resources/js/**/*.test.{ts,tsx}'],
        exclude: [...configDefaults.exclude, './node_modules/**/*'],
    },
});

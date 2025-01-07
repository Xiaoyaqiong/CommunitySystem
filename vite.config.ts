
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'
// import{resolve} from 'path'

// const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  base: "./",
  //   server: {
  //   proxy: {
  //       // 字符串简写写法，其他方法可看vite官网，使用方法与webpack解决跨域一样
  //        '/api': {
  //       target: 'http://27.106.105.56:5000', //目标源，目标服务器，真实请求地址
  //       changeOrigin: true, //支持跨域
  //       // rewrite: (path) => path.replace(/^\/api/, "/api"), //重写真实路径,替换/api
  //     }
  //   }
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // 组件路径别名,语法：别名：resolve(__dirname,'组件原路径')
      // com:resolve(__dirname,'src/component'),
      //静态资源路径别名
      // './image':'src/assets'
      // '@': pathSrc,
    },
  },
  plugins: [
    Vue(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),

        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],

      // dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),

    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],

      // dts: path.resolve(pathSrc, 'components.d.ts'),
    }),

    Icons({
      autoInstall: true,
    }),

    Inspect(),
  ],
})
import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    sitemap: {
        hostname: 'https://endyzhong.me'
    },
    title: "Endy的个人博客",
    description: "专注于分享Linux和开发等技术",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'Home', link: '/'},
            {text: 'About', link: '/about'}
        ],

        sidebar: [
            {
                items: [
                    {text: 'Windows Server运维笔记', link: '/wsdocs/WindowsServerDOCS'},
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/EndyZhong666/EndyBlog'}
        ]
    }
})

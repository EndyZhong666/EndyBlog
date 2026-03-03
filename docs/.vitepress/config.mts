import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    sitemap: {
        hostname: 'https://blog.endyzhong.me'
    },
    title: "Endy的个人博客",
    description: "技术学习记录",
    head: [
        ['meta', {name: 'keywords', content: 'SEO, 学习记录教程'}],
        ['meta', {property: 'og:type', content: 'website'}], // 社交媒体优化 (Open Graph)
        ['link', {rel: 'icon', href: '/favicon.ico'}]
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'Home', link: '/'},
            {text: 'About', link: '/about'}
        ],

        outline: {
            label: '页面导航',
            level: [2, 6]
        },

        docFooter: {
            prev: false,
            next: false
        },

        search: {
            provider: 'local'
        },

        sidebar: [
            {
                text: '运维相关',
                collapsed: false,
                items: [
                    {text: 'Windows Server运维', link: '/wsdocs/WindowsServerDOCS'},
                    {text: 'Linux运维', link: '/linuxdocs/linuxdocs'},
                    {text: '数据通信', link: '/datacomdocs/datacom'},
                ]
            },
            {
                text: '开发相关',
                collapsed: false,
                items: [
                    {text: 'SQL', link: '/sqldocs/sqldocs'},
                    {text: 'Python', link: '/python/pythondocs'},
                    {text: 'C#'},
                    {text: 'TypeScript'},
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/EndyZhong666/EndyBlog'}
        ]
    }
})

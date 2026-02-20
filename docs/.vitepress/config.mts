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
                text:'运维相关',
                items: [
                    {text: 'Windows Server运维', link: '/wsdocs/WindowsServerDOCS'},
                    {text: 'Linux运维', link: '/linuxdocs/linuxdocs'},
                    {text: '数据通信', link: '/datacomdocs/datacom'},
                ]
            },
            {
                text:'开发相关',
                items: [
                    {text: 'SQL',link: '/sqldocs/sqldocs'}
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/EndyZhong666/EndyBlog'}
        ]
    }
})

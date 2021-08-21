import type { SidebarConfig } from '@vuepress/theme-default'

const commonSidebar = [
	{
		text: "Getting Started",
		children: [
			'/main/Getting-Started.md'
		]
	},
	{
		text: "APIs - Stable",
		children: [
			'/apis/stable/Command.md',
			'/apis/stable/Message.md',
			'/apis/stable/Registration.md',
		]
	},
	{
		text: "APIs - Experimental",
		children: [
			'/apis/experimental/Serialization.md'
		]
	}
]

const sidebar: SidebarConfig = {
	'/apis/': commonSidebar,
	'/main/': commonSidebar
}

module.exports = {
	title: "Kambrik",
	base: "/KambrikDocs/",
	head: [['link', { rel: 'icon', href: 'images/favicon-32x32.png' }]],
	themeConfig: {
		navbar: [
			{
				text: "Getting Started",
				link: "/main/Getting-Started"
			},
			{
				text: "APIs",
				link: "/apis/stable/",
				children: [
					{
						text: "Stable",
						children: [
							{
								text: "Command API",
								link: "/apis/stable/Command"
							},
							{
								text: "Message API",
								link: "/apis/stable/Message"
							},
							{
								text: "Registration API",
								link: "/apis/stable/Registration"
							},
						]
					},
					{
						text: "Experimental",
						children: [
							{
								text: "Serialization API",
								link: "/apis/experimental/Serialization"
							}
						]
					}
				]
			},
			{
				text: "Extensions",
				link: "/extensions/"
			},
			{
				text: "Changelog",
				link: "https://github.com/ejektaflex/Kambrik/blob/master/CHANGELOG.md"
			},
			{
				text: "GitHub",
				link: "https://github.com/ejektaflex/Kambrik"
			},
		],
		sidebar: sidebar
	}
}
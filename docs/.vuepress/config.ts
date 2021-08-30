import type { SidebarConfig } from '@vuepress/theme-default'

const commonSidebar = [
	{
		text: "Getting Started",
		children: [
			'/main/Getting-Started.md',
			'/main/Philosophy.md',
			'/main/Builtin-Commands.md'
		]
	},
	{
		text: "DSLs",
		children: [
			'/apis/dsl/Command.md',
			'/apis/dsl/Text.md'
		]
	},
	{
		text: "Features",
		children: [
			'/apis/feature/Registration.md',
		]
	},
	{
		text: "Serialization",
		children: [
			'/apis/serial/Serialization.md',
			'/apis/serial/Message.md',
		]
	},
	{
		text: "Experimental APIs",
		children: [
			'/apis/experimental/Serialization.md',
			'/apis/experimental/Persistence.md',
		]
	}
]


const sidebar: SidebarConfig = {
	'/apis/': commonSidebar,
	'/main/': commonSidebar//,
	//'/dokka/': dokkaSidebar
}

module.exports = {
	title: "Kambrik",
	description: "A Kotlin Library Mod for Fabric",
	themeConfig: {
		logo: '/images/android-chrome-192x192.png',
		repo: 'https://github.com/ejektaflex/KambrikDocs/',
		docsDir: '/docs/',
		navbar: [
			{
				text: "Getting Started",
				link: "/main/Getting-Started"
			},
			{
				text: "APIs",
				link: "/apis/",
				children: [
					{
						text: "DSLs",
						children: [
							{
								text: "Command DSL",
								link: "/apis/dsl/Command"
							},
							{
								text: "Text Builder DSL",
								link: "/apis/dsl/Text"
							}
						]
					},
					{
						text: "Features",
						children: [
							{
								text: "Registration API",
								link: "/apis/feature/Registration"
							},
						]
					},
					{
						text: "Serialization",
						children: [
							{
								text: "Serialization API",
								link: "/apis/serial/Serialization"
							},
							{
								text: "Message API",
								link: "/apis/serial/Message"
							}
						]
					},
					{
						text: "Experimental",
						children: [
							{
								text: "NBT Serialization API",
								link: "/apis/experimental/Serialization"
							},
							{
								text: "Persistence API",
								link: "/apis/experimental/Persistence"
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
			}
		],
		sidebar: sidebar
	}
}
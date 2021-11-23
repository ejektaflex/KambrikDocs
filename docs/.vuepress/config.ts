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
			'/apis/feature/Keybinds.md',
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

const dokkaSidebar = [
	{
		text: "Dokka",
		link: '/dokka'
	},
	{
		text: "Kambrik",
		link: '/dokka/-kambrik/io.ejekta.kambrik',
		children: [
			{
				text: "Command",
				link: '/dokka/-kambrik/io.ejekta.kambrik.command'
			},
			{
				text: "Ext",
				link: '/dokka/-kambrik/io.ejekta.kambrik.ext',
				children: [
					{
						text: "Client",
						link: '/dokka/-kambrik/io.ejekta.kambrik.ext.client'
					},
					{
						text: "Fapi",
						link: '/dokka/-kambrik/io.ejekta.kambrik.ext.fapi'
					},
					{
						text: "Internal",
						link: '/dokka/-kambrik/io.ejekta.kambrik.ext.internal'
					},
				]
			}
		]
	}
]

const bountifulSidebar = [
	{
		text: 'Bountiful',
		link: '/mods/bountiful',
		children: [
			{
				text: 'Data File Structure',
				link: '/mods/bountiful/wiki/FileStructure'
			},
			{
				text: 'Customizing Bounties',
				link: '/mods/bountiful/wiki/CustomizingBounties'
			}
		]
	}
]


const sidebar: SidebarConfig = {
	'/apis/': commonSidebar,
	'/main/': commonSidebar,
	'/dokka': dokkaSidebar,
	'/mods/bountiful': bountifulSidebar
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
							{
								text: "Keybind API",
								link: "/apis/feature/Keybinds"
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
			// {
			// 	text: "Extensions",
			// 	link: "/extensions/"
			// },
			
			// {
			// 	text: "Dokka",
			// 	link: "/dokka/"
			// },
			{
				text: "Mods",
				children: [
					{
						text: "Bountiful",
						link: "/mods/bountiful/"
					}
				]
			},
			{
				text: "Changelog",
				link: "https://github.com/ejektaflex/Kambrik/blob/master/CHANGELOG.md"
			}
		],
		sidebar: sidebar
	}
}
const { genSideBar, bountifulSidebarCommon } = require("./versions");

const commonSidebar = [
	{
		text: "Getting Started",
		items: [
			{ text: 'Getting Started', link: '/main/Getting-Started.md' },
			{ text: 'Philosophy', link: '/main/Philosophy.md' },
			{ text: 'Built-In Commands', link: '/main/Builtin-Commands.md' }
		]
	},
	{
		text: "DSLs",
		items: [
			{ text: 'Command DSL', link: '/apis/dsl/Command.md' },
			{ text: 'Text DSL', link: '/apis/dsl/Text.md' }
		]
	},
	{
		text: "Features",
		items: [
			{ text: 'Auto-Registration', link: '/apis/feature/Registration.md' },
			{ text: 'Keybinds', link: '/apis/feature/Keybinds.md' },
		]
	},
	{
		text: "Serialization",
		items: [
			{ text: 'Serialization', link: '/apis/serial/Serialization.md' },
			{ text: 'Messages', link: '/apis/serial/Message.md' },
		]
	},
	{
		text: "Experimental APIs",
		items: [
			{ text: 'Serialization', link: '/apis/experimental/Serialization.md' },
			{ text: 'Persistence', link: '/apis/experimental/Persistence.md' },
		]
	}
]



let sidebar = {
	'/apis/': commonSidebar,
	'/main/': commonSidebar,
	//'/dokka': dokkaSidebar,
	'/mods/bountiful': bountifulSidebarCommon
}

for (version in versionedSidebars) {
	console.log("VERSION: " + version);
	sidebar['/mods/bountiful/' + version] = genSideBar(version);
}

console.log("DOOT");

module.exports = {
	title: "Kambrik",
	description: "A Kotlin Library Mod for Fabric",
    cleanUrls: true,
	themeConfig: {
		logo: '/images/android-chrome-192x192.png',
		repo: 'https://github.com/ejektaflex/KambrikDocs/',
		docsDir: '/docs/',
		nav: [
			{
				text: "Getting Started",
				link: "/main/Getting-Started"
			},
			{
				text: "APIs",
				items: [
					{
						text: "DSLs",
						items: [
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
						items: [
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
						items: [
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
						items: [
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
				items: [
					{
						text: "Bountiful",
						link: "/mods/bountiful/latest/CustomizingBounties"
					}
				]
			},
			{
				text: "Discord",
				link: "https://discord.gg/BaH88W9"
			}
		],
		sidebar: sidebar
	},
	markdown: { theme: { light: 'material-theme-lighter', dark: 'material-theme' } }
}
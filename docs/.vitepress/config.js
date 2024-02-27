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

// const dokkaSidebar = [
// 	{
// 		text: "Dokka",
// 		link: '/dokka'
// 	},
// 	{
// 		text: "Kambrik",
// 		link: '/dokka/-kambrik/io.ejekta.kambrik',
// 		items: [
// 			{
// 				text: "Command",
// 				link: '/dokka/-kambrik/io.ejekta.kambrik.command'
// 			},
// 			{
// 				text: "Ext",
// 				link: '/dokka/-kambrik/io.ejekta.kambrik.ext',
// 				items: [
// 					{
// 						text: "Client",
// 						link: '/dokka/-kambrik/io.ejekta.kambrik.ext.client'
// 					},
// 					{
// 						text: "Fapi",
// 						link: '/dokka/-kambrik/io.ejekta.kambrik.ext.fapi'
// 					},
// 					{
// 						text: "Internal",
// 						link: '/dokka/-kambrik/io.ejekta.kambrik.ext.internal'
// 					},
// 				]
// 			}
// 		]
// 	}
// ]

const bountifulSidebar = [
    {
		text: 'General Info',
		items: [
			{
				text: 'Bounty Boards',
				link: '/mods/bountiful/general/bounty-boards'
			},
			{
				text: 'Reputation',
				link: '/mods/bountiful/general/reputation'
			},
			{
				text: 'Decrees',
				link: '/mods/bountiful/general/decrees'
			}
		]
	},
	{
		text: 'Advanced Info',
		items: [
			{
				text: 'Bounty Generation',
				link: '/mods/bountiful/advanced/generation'
			}
		]
	},
    {
        text: 'Customization',
        items: [
			{
                text: 'Preview (Unreleased)',
                items: [
                    {
                        text: 'Data File Structure',
                        link: '/mods/bountiful/preview/FileStructure'
                    },
                    {
                        text: 'Customizing Bounties',
                        link: '/mods/bountiful/preview/CustomizingBounties'
                    }
                ]
            },
            {
                text: 'Latest (1.20.1+)',
                items: [
                    {
                        text: 'Data File Structure',
                        link: '/mods/bountiful/latest/FileStructure'
                    },
                    {
                        text: 'Customizing Bounties',
                        link: '/mods/bountiful/latest/CustomizingBounties'
                    }
                ]
            },
			{
                text: '1.19.4',
                items: [
                    {
                        text: 'Data File Structure',
                        link: '/mods/bountiful/1-19-4/FileStructure'
                    },
                    {
                        text: 'Customizing Bounties',
                        link: '/mods/bountiful/1-19-4/CustomizingBounties'
                    }
                ]
            },
            {
                text: 'Fabric Legacy: 1.17-1.19.3',
                items: [
                    {
                        text: 'Data File Structure',
                        link: '/mods/bountiful/1-19-3/FileStructure'
                    },
                    {
                        text: 'Customizing Bounties',
                        link: '/mods/bountiful/1-19-3/CustomizingBounties'
                    }
                ]
            },
			{
				text: 'Forge Legacy: 1.14',
				items: [
					{
						text: 'Commands',
						link: '/mods/bountiful/1-14/Commands'
					},
					{
						text: 'Customizing Bounties',
						link: '/mods/bountiful/1-14/CustomizingBounties'
					}
				]
			},
			{
				text: 'Forge Legacy: 1.12',
				items: [
					{
						text: 'Commands',
						link: '/mods/bountiful/1-12/Commands'
					},
					{
						text: 'Customizing Bounties',
						link: '/mods/bountiful/1-12/CustomizingBounties'
					}
				]
			}
        ]
    }
    
]


const sidebar = {
	'/apis/': commonSidebar,
	'/main/': commonSidebar,
	//'/dokka': dokkaSidebar,
	'/mods/bountiful': bountifulSidebar
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
						link: "/mods/bountiful/"
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
const bountifulSidebarCommon = [
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
    }
]

const versionedSidebars = {
    "latest": {
        text: 'Latest (1.20.4+)',
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
    "1-20-1": {
        text: '1.20.1',
        items: [
            {
                text: 'Data File Structure',
                link: '/mods/bountiful/1-20-1/FileStructure'
            },
            {
                text: 'Customizing Bounties',
                link: '/mods/bountiful/1-20-1/CustomizingBounties'
            }
        ]
    },
    "1-19-4": {
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
    "1-19-3": {
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
    "1-16": {
        text: 'Forge Legacy: 1.14-1.16',
        items: [
            {
                text: 'Commands',
                link: '/mods/bountiful/1-16/Commands'
            },
            {
                text: 'Customizing Bounties',
                link: '/mods/bountiful/1-16/CustomizingBounties'
            }
        ]
    },
    "1-12": {
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
}

function genVersionName(version) {
    return versionedSidebars[version].text
}

function genVersionPickerItems() {
    let toRet = [];
    for (const [key, value] of Object.entries(versionedSidebars)) {
        toRet.push({ label: value.text, key: key, path: value.items[0].link })
      }
    return toRet
}

function genSideBar(version) {
    return [
        ...bountifulSidebarCommon,
        {
            text: 'Customization',
            items: versionedSidebars[version].items
        }
    ]
}

export {
    bountifulSidebarCommon,
    versionedSidebars,
    genSideBar,
    genVersionPickerItems
}
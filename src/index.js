const request = require('request-promise-native')
const icon = require('../icon.png')

const plugin = async({
	actions,
	term,
	display,
	hide
}) => {
	//https://regex101.com/r/F8lxfU/1
	var match = term.match(/^xkcd\s*(\d*)/i)
	if (match) {
		display({
			icon: icon,
			id: 'xkcd-await',
			title: 'XKCD',
			subtitle: 'Loading...'
		})
		var id = match[1]
		if (id == '') {
			id = Math.floor((Math.random() * 1999) + 1)
		}
		var data = await request({
			baseUrl: 'http://xkcd.com/',
			uri: `${id}/info.0.json`
		})
		data = JSON.parse(data)
		hide('xkcd-await')

		var url = `https://xkcd.com/${id}/`
		display({
			icon: `${data.img}`,
			id: `xkcd-${id}`,
			title: `${data.title} (${id})`,
			subtitle: `${data.alt}`,
			clipboard: `${url}`,
			onSelect() {
				actions.open(url)
			}
		})
	}
}

module.exports = {
	name: 'Search in XKCD...',
	fn: plugin,
	keyword: 'xkcd'
}

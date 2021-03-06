// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
	'main e2e test': function test(browser) {
		// automatically uses dev Server port from /config.index.js
		// default: http://localhost:8080
		// see nightwatch.conf.js
		const devServer = browser.globals.devServerURL;

		browser
			.maximizeWindow()
			.url(devServer)
			.waitForElementVisible('#app', 20000).pause(5000)
			// .click('.dialog.modal footer button').pause(1000)
			.assert.elementPresent('#topPosts .post-previews')

			.click('.navbar .navbar-burger').pause(250)
			.click('.navbar a[href="/search/images"]').pause(1000)
			.click('.navbar .navbar-burger').pause(250)
			.assert.urlContains('/search/images', 'Navigated to search images page')
			.click('.search-wrapper .submit').pause(5000)
			.assert.elementPresent('.post-grid-wrapper', 'Search results shown')
			.click('.post-grid-wrapper .pagination-next').pause(1000)
			.click('.page .card-image img').pause(1000)
			.assert.elementPresent('.modal-image', 'Image expand modal opened')
			.click('.modal-close').pause(1000)
			.assert.elementNotPresent('.modal-image', 'Image expand modal closed')

			.end();
	},
};

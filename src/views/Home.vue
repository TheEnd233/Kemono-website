<template>
<div id="base-home">
	<div class="grid-item left">
		<div class="welcome">
			<p class="header">{{$t('m.welcometitle')}}<b-tag class="beta" type="is-dark">Beta</b-tag></p>
			<p>{{$t('m.welcomemessage')}}</p>
		</div>
		<!-- <div class="attention" v-if="loggedIn && !seenNotice('newDesign')">
			<b-message title="Site Updated" type="is-info" has-icon @close="ackNotice('newDesign')">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt ut eligendi laudantium mollitia, dolorum impedit cum exercitationem! Officiis, explicabo dolores minima asperiores, sequi, sit a eaque fugiat corrupti amet et.</b-message>
		</div> -->
		<div class="search">
			<p class="header">{{$t('m.explore')}}</p>
			<div class="search-bar">
				<b-taginput v-model="searchInput" maxlength="50" :has-counter="false"
					autocomplete allow-new ellipsis
					:data="filteredTags" @typing="getFilteredTags"></b-taginput>
				<button class="button is-success" @click="search"><b-icon icon="magnify" />{{$t('m.searchbtn')}}</button>
			</div>
			<p class="trailer">{{$t('m.searchhint1')}}<router-link to="/search/images">{{$t('m.searchhint2')}}</router-link></p>
		</div>
		<div v-if="loggedIn && user.savedTags && user.savedTags.length > 0" class="container-images" id="recPosts">
			<div class="header">
				<p>{{$t('m.recompost')}}</p>
			</div>
			<div class="post-previews">
				 <img v-for="post of recPosts" :key="post.id" :src="THUMBNAIL_BASE_URL + post.id" :alt="post.id" @click="goToPost(post.id)">
			</div>
		</div>
		<div class="container-images" id="topPosts">
			<div class="header">
				<p>{{$t('m.toppost')}}</p>
			</div>
			<div class="post-previews">
				 <img v-for="post of topPosts" :key="post.id" :src="THUMBNAIL_BASE_URL + post.id" :alt="post.id" @click="goToPost(post.id)">
			</div>
			<div class="trailer">
				<router-link to="/search/images?sort=likes">{{$t('m.viewmore')}}</router-link>
			</div>
		</div>
		<div class="container-images" id="newPosts">
			<div class="header">
				<p>{{$t('m.newpost')}}</p>
			</div>
			<div class="post-previews">
				 <img v-for="post of newPosts" :key="post.id" :src="THUMBNAIL_BASE_URL + post.id" :alt="post.id" @click="goToPost(post.id)">
			</div>
			<div class="trailer">
				<router-link to="/search/images?sort=newest">{{$t('m.viewmore')}}</router-link>
			</div>
		</div>
	</div>
	<div class="grid-item right">
		<div class="container-home" id="savedTags">
			<div class="header">
				<p>{{$t('m.favo')}}</p>
			</div>
			<div class="container-content">
				<ul v-if="loggedIn && user.savedTags && user.savedTags.length > 0" class="tag-list">
					<router-link v-for="tag of user.savedTags" :key="tag" :to="`/search/images?tags=\u0022${tag}\u0022`">{{ tag }}</router-link>
				</ul>
				<p v-else-if="loggedIn">{{$t('m.favomessage1')}} <router-link to="/settings">{{$t('m.favomessage2')}}</router-link></p>
				<p v-else>{{$t('m.favomessage3')}}</p>
			</div>
		</div>
		<div class="container-home" id="randomTags">
			<div class="header">
				<p>{{$t('m.randomtag')}}</p>
			</div>
			<div class="container-content">
				<ul class="tag-list">
					<router-link v-for="tag of tags" :key="tag" :to="`/search/images?tags=\u0022${tag}\u0022`">{{ tag }}</router-link>
				</ul>
			</div>
			<div class="container-footer">
				<router-link to="/search/images">{{$t('m.searchevery')}}</router-link>
			</div>
		</div>
		<div class="container-home" id="discord">
			<div class="header">
				<p>{{$t('m.joingroup')}}</p>
			</div>
			<div class="embed">
				<a href="https://jq.qq.com/?_wv=1027&k=5xQtYZB">
					<img src="https://kemono.gaygay.me/static/img/nuko.gif">
				</a>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	data() {
		return {
			THUMBNAIL_BASE_URL,
			topPosts: [],
			newPosts: [],
			recPosts: [],
			searchInput: [],
			getRecs: true,
			filteredTags: []
		};
	},
	computed: {
		user() {
			return this.$store.state.user;
		},
		loggedIn() {
			return this.$store.state.loggedIn;
		},
		showNsfw() {
			return this.$store.getters.NSFWImages;
		},
		blacklist() {
			return this.$store.state.preferences.blacklist || [];
		},
		allTags() {
			return (this.$store.state.tagCache || []).filter(tag => !this.blacklist.includes(tag));
		},
		tags() {
			return this.randomElements((this.$store.state.tagCache || []).filter(tag => !this.blacklist.includes(tag)), 20);
		}
	},
	methods: {
		seenNotice(name) {
			return localStorage.getItem('lastNotice') === name;
		},
		ackNotice(name) {
			return localStorage.setItem('lastNotice', name);
		},
		goToPost(id) {
			return this.$router.push('/post/' + id);
		},
		randomElements(_array, length) {
			const array = _array.slice();
			const elements = [];

			for (let i = 0; i < length && i < array.length; i++) {
				const index = Math.random() * array.length | 0
				elements.push(array.splice(index, 1)[0]); // Add element after removing it from selection
			}

			return elements;
		},
		getFilteredTags(input) {
			input = input.toLowerCase();

			this.filteredTags = input ? this.allTags.filter(tag => tag.toLowerCase().indexOf(input) > -1) : this.allTags;
			return;
		},
		getTags() {
			return this.$store.dispatch('getTags');
		},
		async getPosts() {
			try {
				const newResponse = await this.$http.post(API_BASE_URL + 'images/search', {
					sort: 'recent',
					limit: 8,
					nsfw: this.showNsfw === true ? undefined : false,
					tags: this.$store.getters.blacklist
				}, { responseType: 'json' });

				const topResponse = await this.$http.post(API_BASE_URL + 'images/search', {
					sort: 'likes',
					limit: 8,
					skip: Math.random() * 20 | 0, // Skip a random amount
					nsfw: this.showNsfw === true ? undefined : false,
					tags: this.$store.getters.blacklist
				}, { responseType: 'json' });

				this.newPosts = newResponse.data.images;
				this.topPosts = topResponse.data.images;
				return;
			} catch (error) {
				console.error(error);
				return this.$dialog.alert({
					type: 'is-danger',
					title: this.$t('m.errgetpost'),
					message: error ? error.response && error.response.data.message || error.message : 'Unknown Error',
					hasIcon: true
				});
			}
		},
		async getRecommendedPosts() {
			try {
				const resp = await this.$http.post(API_BASE_URL + 'images/recommended', {
					sort: 'recent',
					limit: 8,
					nsfw: this.showNsfw === true ? undefined : false,
					tags: this.user.savedTags,
					blacklist: this.$store.getters.blacklistArray
				}, { responseType: 'json' });

				this.recPosts = resp.data.images;
				this.getRecs = false;
				return;
			} catch (error) {
				console.error(error);
				return this.$dialog.alert({
					type: 'is-danger',
					title: this.$t('m.errgetrecompost'),
					message: error ? error.response && error.response.data.message || error.message : 'Unknown Error',
					hasIcon: true
				});
			}
		},
		search() {
			return this.$router.push('/search/images?tags=' + this.searchInput.map(tag => `"${tag}"`).join(', '));
		}
	},
	beforeMount() {
		this.getTags();
		this.getPosts();
		if (this.loggedIn && this.user.savedTags && this.user.savedTags.length > 0)
			this.getRecommendedPosts();
	},
	watch: {
		loggedIn() {
			if (this.user.savedTags && this.user.savedTags.length > 0 && this.getRecs)
				return this.getRecommendedPosts();
		}
	}
}
</script>

<style lang="sass">
#base-home
	.grid-item
		display: inline-block
		vertical-align: top
		&.left
			width: calc((1280px - 4rem) / 4 * 3 - 5px)
		&.right
			width: calc((1280px - 4rem) / 4 - 5px)

	.attention
		margin: 20px auto
		max-width: 720px

	.welcome
		padding: 10px
		p.header
			font-weight: 700
			font-size: 26px
			margin-bottom: 4px
			.beta
				position: relative
				top: -5px

	.container-home
		width: 100%
		padding: 10px
		.header
			border-bottom: 1px solid #ccc
			padding-bottom: 4px
			margin-bottom: 6px
			p
				font-weight: 700
				text-transform: uppercase
		.container-content
			ul
				font-size: 14px
		.container-footer
			margin-top: 6px
			a
				display: block
				text-align: right
				font-size: 14px
		.embed
			a
				display: block

	.container-images
		width: 100%
		margin-top: 20px
		padding: 10px
		.header
			border-bottom: 1px solid #ccc
			padding-bottom: 4px
			margin-bottom: 6px
			p
				font-weight: 700
				font-size: 22px
		.post-previews
			width: 100%
			max-height: calc(300px * 2 + 5px * 4)
			display: flex
			flex-wrap: wrap
			justify-content: center
			overflow: hidden
			img
				margin: 5px
				border-radius: 3px
				max-width: calc((100% - 10px * 3) / 3)
				max-height: 300px
				box-shadow: 0px 0px 5px #bbb
				align-self: center
				&:hover
					cursor: pointer
		.trailer
			border-top: 1px solid #ccc
			padding-top: 4px
			margin-top: 6px
			a
				display: block
				margin-right: 10px
				text-align: right
				font-size: 14px

	.search
		padding: 10px
		max-width: 720px
		.header
			padding-bottom: 4px
			font-weight: 700
			font-size: 26px
		.search-bar
			display: flex
			flex-wrap: nowrap
			.control
				flex-grow: 1
				.counter
					display: none
			.button
				margin-left: 8px
				.icon
					margin: 0 4px 0 -4px
					i:before
						font-size: 22px
		.trailer
			padding-top: 2px
			font-size: 14px

	.tag-list
		list-style: none
		padding-left: 0
		a
			display: block
			color: #4a4a4a
</style>

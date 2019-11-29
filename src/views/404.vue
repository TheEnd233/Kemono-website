<template>
<div id="base-not-found">
	<img :src="require('@/../static/images/404.jpg')" alt="Sad catgirl with 404 text :(">
	<h1 class="title">{{$t('m.notfound')}}</h1>
</div>
</template>

<style lang="sass">
#base-not-found
	text-align: center
	font-family: 'Nunito', sans-serif
	color: #666
</style>

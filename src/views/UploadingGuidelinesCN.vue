<template>
<body>
	<div id="base-how-to-upload">
		<h3>上传须知</h3>
		<h5>关于图片</h5>
		<p>
			<strong>图片质量:</strong> 所有上传的图片必须为原图，任何被压缩过的图片将不会通过审核
			<ul>
				<li><strong>如果图片太大导致无法上传：</strong> 你可以将其重新保存为高质量JPG（~97），并保证不超过我们的最大分辨率2000px。</li>
				<li><strong>如果原图过于模糊：</strong> 你可以尝试使用 <a href="https://bigjpg.com/" target="_blank">Bigjpg</a> 来放大图片</li>
			</ul>
		</p>
		<p>
			<strong>草稿或线稿：</strong> 我们皆在收集高质量图片，请不要上传过于简单或质量过低的图片。
		</p>
		<p>
			<strong>内容须知：</strong> Kemono是一个以二次元兽娘为主题的网站，你不能上传没有动物耳朵/尾巴的图片，否则可能无法通过审核。
		</p>
		<p>
			<strong>真人图片：</strong> 真人图片是不被允许上传的（包括Cosplay），不幸的是，现实里也没有猫猫女孩。
		</p>
		<p>
			<strong>其他图片:</strong> 内容过激；无关的任何图片都不被允许上传，否则您有可能面临账户被删除的风险
		</p>
		<p>
			<strong>色情内容:</strong> 你可以上传 <u>适度</u> 色情的图片.
			这些被称为 "NSFW" (Not Safe for Work).
			如果有任何你不确定是否为NSFW的内容，你应该默认为是色情内容<br><!--
			-->本站严禁儿童色情内容，一旦发现立即封禁。
		</p>

		<h5>关于标签</h5>
		<p>Kemono使用了一套完善的标签系统来帮助用户更快完成检索，所以请仔细阅读以下规范</p>
		<p>
			<strong>标签帮助:</strong> 如果你需要任何关于标签的帮助可以阅读 <a href="https://danbooru.donmai.us/wiki_pages/11292" target="_blank">howto:tag</a> 和 <a href="https://danbooru.donmai.us/wiki_pages/21977" target="_blank">howto:tag checklist</a> （英语）
		</p>
		<p>
			<strong>标签要求:</strong> 所有投稿都被要求含有标签以帮助用户更快检索内容。
		</p>
		<p>
			<strong>标签格式:</strong> 添加一个标签后使用回车键来确认添加，再添加另一个标签直至完成。
		</p>
		<p>
			<strong>关于版权:</strong> 作品中的版权信息也应作为标签来标记在投稿内。
		</p>
		<p>
			<strong>作者:</strong> 所有作品都应该标注其作者，有关作者名的格式请参考 <a href="https://danbooru.donmai.us/wiki_pages/15486" target="_blank">howto:artist</a>（英语）。
		</p>
	</div>
</body>
</template>

<script>
export default {
	data() {
		return { };
	}
}
</script>

<style lang="sass">
#base-how-to-upload
	margin: 40px auto
	width: 80%
	min-width: 300px
	color: #222
	font-family: 'Nunito', sans-serif
	h3
		font-size: 2.5rem
		margin: 2rem
		text-align: center
	h5
		font-size: 1.5rem
		margin-top: 3rem
		margin-bottom: 1rem
		margin-left: 3rem
	p + p
		margin-top: 10px
	ul
		list-style: disc
		padding-left: 20px

</style>

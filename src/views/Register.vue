<template>
<div id="base-register">
	<div class="form">
		<b-field :label="$t('m.reguser')" :message="$t('m.regusermsg')">
			<b-input name='reg-user' required :maxlength="35" has-counter placeholder="username" icon="account"></b-input>
		</b-field>
		<b-field :label="$t('m.regpasswd')" :message="$t('m.regpasswdmsg')">
			<b-input name="reg-pass" type="password" :maxlength="70" has-counter password-reveal required placeholder="password" icon="lock"></b-input>
		</b-field>
		<b-field :label="$t('m.regpasswdcomfirm')">
			<b-input name="reg-confirm" type="password" required placeholder="password" icon="lock"></b-input>
		</b-field>
		<b-field :label="$t('m.regemail')">
			<b-input name="reg-email" type="email" required :maxlength="70" has-counter placeholder="catgirls@gaygay.me" icon="email"></b-input>
		</b-field>
		<div class="field">
			<b-checkbox name="old-enough">{{$t('m.regagecomfirm')}}</b-checkbox>
		</div>
		<button class="button is-primary" :class="{ 'is-loading': pending }" @click="register"><b-icon icon="account-plus"></b-icon>{{$t('m.regbtn')}}</button>
		<b-message v-show="registerError" type="is-danger" id="register-error" has-icon><b>{{$t('m.regerrmsg')}}</b><br>{{ registerError }}</b-message>
	</div>
</div>
</template>

<script>
export default {
	data() {
		return {
			registerError: null,
			pending: false
		};
	},
	methods: {
		async register() {
			if (this.pending)
				return;
			this.pending = true;

			let username = document.getElementsByName('reg-user')[0].value, // We'll keep these universal for auto log in plugins
				password = document.getElementsByName('reg-pass')[0].value,
				confirmPassword = document.getElementsByName('reg-confirm')[0].value,
				email = document.getElementsByName('reg-email')[0].value;

			if (!username || !password || !email) {
				this.pending = false;
				return this.$dialog.alert({
					type: 'is-warning',
					hasIcon: true,
					title: this.$t('m.reghinttitle'),
					message: this.$t('m.reghintmsg')
				});
			}

			if (!document.getElementsByName('old-enough')[0].checked) {
				this.pending = false;
				return this.$dialog.alert({
					type: 'is-warning',
					hasIcon: true,
					title: this.$t('m.agehinttitle'),
					message: this.$t('m.agehintmsg')
				});
			}

			if (password !== confirmPassword) {
				this.pending = false;
				return this.$dialog.alert({
					type: 'is-warning',
					hasIcon: true,
					title: this.$t('m.passwdhinttitle'),
					message: this.$t('m.passwdhintmsg')
				});
			}

			try {
				let response = await this.$http.post(API_BASE_URL + 'register', { username, password, email });

				this.registerError = null;
				this.pending = false;

				return this.$dialog.alert({
					type: 'is-success',
					hasIcon: true,
					title: this.$t('m.regsuccesstitle'),
					message: this.$t('m.regsuccessmsg1') + username + this.$t('m.regsuccessmsg2'),
					confirmText: this.$t('m.regsuccesscomfirm'),
					onConfirm: () => {
						this.$router.push('/');
					}
				});
			} catch(error) {
				this.pending = false;

				if (!error.response) {
					console.error(error.message);
					this.registerError = 'Encountered an error';
				} else if (!error.response.data.message) {
					console.error(error.response);
					this.registerError = 'Encountered an error';
				} else
					this.registerError = error.response.data.message;
			}
		}
	}
}
</script>

<style lang="sass" scoped>
#base-register
	.button .icon:first-child:last-child
		margin-left: 0
		margin-right: 6px

	.form
		margin: auto
		width: 400px
		.button
			width: 100%
			&:first-of-type
				margin: 30px 0 20px
		#register-error
			width: 100%
			margin: 10px 0 30px
</style>

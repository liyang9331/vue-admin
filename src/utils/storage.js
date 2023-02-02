export const Storages = {
	//本地存数据，days 有效时间（天）
	set: function(key, value, days) {
		let Days = days || 7 //有效时间默认7天
		let exp = new Date()
		let expires = exp.getTime() + Days * 24 * 60 * 60 * 1000;
        const data = JSON.stringify({'value':value,'expires':expires})
        localStorage.setItem(key,data)
	},
	get: function(key) {
		try {
			let o = JSON.parse(localStorage.getItem(key));
			if (o !== null && Date.now() < o.expires) {
				return o.value
			} else {
				this.remove(key);
				return null
			}
		} catch (e) {
			return null
		}
	},
	remove: function(key) {
		localStorage.removeItem(key);
	},
	clearAll: function() {
		localStorage.clear();
	}
}

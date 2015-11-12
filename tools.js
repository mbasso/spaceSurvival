module.exports = {

	client: function (id, remote) {

		this.id = id;
		this.remote = remote;
		this.username = null;
		this.room = null;
		this.lastState = null;

	},

	room: function (id, name) {

		this.id = id;
		this.name = name;

	}

}
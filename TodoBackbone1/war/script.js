var app = app || {};
app.myArray = new Array();
app.Todo = Backbone.Model.extend({
	urlRoot : "/addsave",
	defaults : function() {
		return {
			title : "no title...",
			done : false
		};
	},

	toggle : function() {
		this.save({
			done : !this.get("done")
		});
	}
});

// Model Collection

app.TodoList = Backbone.Collection.extend({
	url : "/retriveTodo",
	model : app.Todo,
	done : function() {
		return this.where({
			done : true
		});
	},
	remaining : function() {
		return this.without.apply(this, this.done());
	},
	nextOrder : function() {
		if (!this.length)
			return 1;
		return this.last().get("order") + 1;
	},
	comparator : 'order'

});
app.TodoList = new app.TodoList();

// Model View & event action
app.TodoView = Backbone.View.extend({
	tagName : "li",
	template : _.template($("#item-template").html()),
	events : {
		"click .toggle" : "toggleDone",
		"dblclick .view" : "edit",

		"click a.destroy" : "clear",
		"keypress .edit" : "updateOnEnter",
		"blur .edit" : "close"
	},
	initialize : function() {

		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model, "destroy", this.remove);
		this.bind(this.collection, "add", this.render);
		this.render();
	},

	render : function() {

		console.log("rendering");
		console.log(this.collection);
		var template = _.template($("#item-template").html())
		template = this.template({
			persons : this.collection.toJSON()
		});
		$('#todo-list').html(template);
		this.$el.html(template);

		return this;
	},

	toggleDone : function() {
		this.model.toggle();
	},

});

app.AppView = Backbone.View
		.extend({
			el : $("#todoapp"),
			statsTemplate : _.template($("#stats-template").html()),
			events : {
				"keypress #new-todo" : "createOnEnter",
				"click .clear-completed" : "clearCompleted",
				"click .toggle-all" : "toggle",
				"click .deleteEntry" : "deleteList",
				"dblclick .Myli" : "edit",
				"click .textEdit" : "saveNow",
				"click .delete" : "remove"
			},

			initialize : function() {
				this.render();
				var _this = this;
				this.collection = app.TodoList;
				var todos;
				this.collection.fetch({

					success : function(data) {

						_this.collection = data;
						app.TodoView = new app.TodoView({
							collection : data
						});

						var template = _.template($('#item-template').html(), {
							tempData : _this.collection
						});
						$('#todo-list').html(template);

					}
				});

				this.input = this.$("#new-todo");
				this.allCheckbox = this.$("#toggle-all")[0];

				this.listenTo(app.Todo, "add", this.addOne);
				this.listenTo(app.Todo, "reset", this.addAll);
				this.listenTo(app.Todo, "all", this.render);

				this.footer = this.$("footer");
				this.main = $("#main");

			},

			render : function() {

				this.collection = app.TodoList;
				var todos = app.TodoList;
				console.log(this.collection)
				var done = todos.done().length;
				var remaining = todos.remaining().length;

				if (todos.length) {
					this.main.show();
					this.footer.show();
					this.footer.html(this.statsTemplate({
						done : done,
						remaining : remaining
					}));
				}
			},

			addOne : function(todo) {
				var view = new TodoView({
					model : app.Todo
				});
				this.$("#todo-list").append(view.render().el);
			},

			addAll : function() {
				todos.each(this.addOne, this);
			},

			createOnEnter : function(e) {

				if (e.keyCode != 13)
					return;
				if (!this.input.val())
					return;

				var myModel = new app.Todo();
				myModel
						.save(
								{
									title : this.input.val()
								},
								{
									success : function(model, response) {
										var myKey = model.get("key");
										var myTitle = model.get("title");

										var myHtml = '<input class= "toggle-all"id='
												+ myKey
												+ ' type="checkbox">'
												+ '<li id='
												+ myKey
												+ '><div class="Myli" id='
												+ myKey
												+ '><h5 class="myDataTitle">'
												+ myTitle
												+ '</h5>'
												+

												'<input value='
												+ myTitle
												+ ' class="inputRecord" id="record" type="text" style="display:none">'
												+ '<input type="text" class="textEdit" id='
												+ myKey
												+ ' value='
												+ myTitle
												+ ' style="display:none">'
												+ '<button  id='
												+ myKey
												+ ' value='
												+ myTitle
												+ ' class="deleteEntry"><i class="fa fa-times" aria-hidden="true"></i></button></div></li>'

										$("#todo-list").append(myHtml);
										$('#new-todo').val("");

									},
									error : function(model, response) {
										console.log("error");
									}
								});

				// var htmlelement = this.$el.find("#todo-list ul").append(
				// "<li>" + this.input.val()+"<button id='<%=person.key%>'
				// class='deleteEntry' {console.log(JSON.parse(person.data))><i
				// class='fa fa-times'
				// aria-hidden='true'></i></button></form></div></li>")
				//		
				//				
				// var id = $("#todo-list").attr('id');
				//	
				// this.template = _.template($('#item-template').html());
				// $('.todo-list').html(htmlelement);
				// this.input.val("");
				// this.$el.append(this.template());
				// app.TodoView.render();

			},

			deleteList : function(e) {

				var self = this;
				var id = parseInt($(e.currentTarget).attr('id'));
				var myModel = this.collection.where({
					key : id
				});

				alert(id);
				$.ajax({
					url : "/delete?key=" + id,
					type : "DELETE",
					success : function() {

						self.collection.remove(myModel);
						app.TodoView.render();

					},
					error : function() {
					}
				});

				/*
				 * myModel[0].destroy({
				 * 
				 * success: function(model, response) {
				 * 
				 * console.log("DELETED");
				 *  }, error : function(data) { console.log(data); } });
				 */

				// this.collection.remove(myModel.id);
				// alert(myModel);
				// console.log("before deleting*******"+myModel.length);
				//			 
				// // $(e.currentTarget).parent().parent().remove();
				// //
				// //
				//			 
				//			 
				// myModel.pop(id);
				// console.log("after deleting*******"+myModel.length);
				// myModel[0].destroy();
				//			 
			},

			edit : function(e) {

				//		
				var self = this;
				// var key = $(e.currentTarget).parent().attr('id');
				// console.log(key);
				var key = $(e.currentTarget).attr('id');
				console.log(key);
				//		
				$("#" + key).children(".textEdit").show();
				$("#" + key).children(".myDataTitle").hide();
				var val = $("#" + key).children(".textEdit").val();
				this.saveNow(e, val);
			},
			saveNow : function(e) {
				e.stopPropagation();
				e.preventDefault();

				var oldVal = $(".textEdit").val();
				$(".textEdit").on(
						"blur",
						function(e) {
							var key = $(e.currentTarget).parent().attr('id');
							var updateVal = $("#" + key).children(".textEdit")
									.val();
							console.log("updated value is " + updateVal);
							if (oldVal == updateVal) {
								// alert("Nothing to change");
							} else {
								// if(e.keyCode == 13){
								// var newVal = value;
								// console.log(val);

								var data = {};
								// var key =
								// $(e.currentTarget).parent().attr('id');
								var dataVal = {};
								dataVal.title = $(e.currentTarget).val();
								data.key = key;
								data.dataVal = dataVal;
								var self = this;

								$.ajax({
									url : "/update",
									type : "POST",

									contentType : "application/json",
									data : JSON.stringify(data),

									success : function(data) {

										console.log(JSON.parse(data));
										console.log("i am here");
										var myData = JSON.parse(data);
										$("#" + key).children(".textEdit")
												.hide();
										var val = $("#" + key).children(
												".textEdit").val();
										console.log(val);

										$("#" + key).children(".myDataTitle")
												.html(val);

										$("#" + key).children(".myDataTitle")
												.show();
										// $("#todo-list li").html(val);

										$(".textEdit").off('blur');
									}

								})
								// }

							}
						});

			},

			toggle : function(e) {
				var key = $(e.currentTarget).attr('id');
				alert(key);
				app.myArray.push(key);
				console.log(key);
				// if(key==!!0){
				// clear-completed();
				$(".clear-completed").show();

			},

			clearCompleted : function(e) {
				for (i = 0; i < app.myArray.length; i++) {
					console.log(app.myArray[i]);
					var myModel = app.TodoList.findWhere("key", app.myArray[i]);
					var self = this;
					$.ajax({
						url : "/delete?key=" + app.myArray[i],
						type : "DELETE",
						success : function() {
							console.log(JSON.stringify(myModel));
							$(this).attr('id')
							//									$'#myDataTitle').remove();
							self.collection.remove(myModel);
							app.TodoView.render();
							//									 $('#todo-list '+myModel.key).remove();
						},
						error : function() {
						}
					});
				}
			},

		});

app.Appview = new app.AppView();

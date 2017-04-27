<html>
<header>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.js"></script>

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone.js"></script>

 </header>
 <body>
 -->
<div id="todoapp">

    
 	<input id="new-todo" type="text" placeholder="What needs to be done?????"/>
    <section id="main" style="display: block;">
      <input id="toggle-all" type="checkbox" />
      <label for="toggle-all">Mark all as complete</label>
      <ul id="todo-list"></ul>
      
    </section>

    <footer style="display: block;">
<!--       <div class="todo-count"><b>2</b> items left</div>
 -->    </footer>
    
</div>

<script type="text/template" id="item-template">
	
    <ul><@ _.each(persons, function(person) {console.log(person.data);console.log(person.key); @>

		<li><div id="<@=person.key@>"><@=person.data@></div><div id="<@=person.key@>" class="delete">Delete</div><div id="<@=person.key@>" class="edit">edit</div></li>


        <@});@>
    </ul >
</script>

<script type="text/template" id="list-template">
	
 <ul><@ _.each(persons, function(person) {console.log(person.data); @>
		<li><div><@=person.data@></div></li>

        <@});@>
    </ul >
</script>

<script type="text/template" id="list-item-template">
	
		<li><div><@=data@></div></li>
</script>

<script type="text/template" id="stats-template">
    <@if (done) { @>
      <a id="clear-completed">Clear <@= done @> completed <@= done == 1 ? 'item' : 'items' @></a>
    <@ } @>
    <div class="todo-count"><b><@= remaining @></b> <@= remaining == 1 ? 'item' : 'items' @> left</div>

</script>

<script src="/script.js"></script>

<style>
body {
    font-family: helvetica;
	font-size: 14px;
	background: #eeeeee;
	color: #333333;
	width: 520px;
	margin: 0 auto;
}

#todoapp {
	background: #fff;
	padding: 20px;
	margin-bottom: 40px;
}

#todoapp h1 {
	font-size: 36px;
	text-align: center;
}

#todoapp input[type="text"] {
	width: 466px;
	font-size: 24px;
	line-height: 1.4em;
	padding: 6px;
}

#main {
	display: none;
}

#todo-list {
	margin: 10px 0;
	padding: 0;
	list-style: none;
}

#todo-list li {
	padding: 18px 20px 18px 0;
	position: relative;
	font-size: 24px;
	border-bottom: 1px solid #cccccc;
		display: table;
	position: relative;
    font-size: 20px;
	border-bottom: 1px solid #ededed;
	width: 100%;
	height: 60px;
}

#todo-list li:last-child {
	border-bottom: none;
}
#todo-list li.done label {
    color: #777777;
    text-decoration: line-through;
}

#todo-list li .edit {
    display: none;
}
#todo-list li.editing {
	border-bottom: 1px solid #778899;
}

#todo-list li.editing .view {
	display: none;
}
#todo-list li.editing .edit {
	display: block;
	width: 444px;
	padding: 13px 15px 14px 20px;
	margin: 0;
}

#todo-list li.done label {
	color: #777777;
	text-decoration: line-through;
}

#todo-list .destroy {
	position: absolute;
	right: 5px;
	top: 20px;
	display: none;
	cursor: pointer;
	width: 20px;
	height: 20px;
}

#todoapp footer {
	display: none;
	margin: 0 -20px -20px -20px;
	overflow: hidden;
	color: #555555;
	background: #f4fce8;
	border-top: 1px solid #ededed;
	padding: 0 20px;
	line-height: 37px;
}

#clear-completed {
	float: right;
	line-height: 20px;
	text-decoration: none;
	background: rgba(0, 0, 0, 0.1);
	color: #555555;
	font-size: 11px;
	margin-top: 8px;
	margin-bottom: 8px;
	padding: 0 10px 1px;
	cursor: pointer;
}

div.delete {
    padding: 0px 0px 0px 365px;
}



	<script type="text/javascript">
	_.templateSettings = { 
			interpolate: /\<\@\=(.+?)\@\>/gim,
			evaluate: /\<\@([\s\S]+?)\@\>/gim,
			escape: /\<\@\-(.+?)\@\>/gim
			};
			
</style>
</body>

</html>

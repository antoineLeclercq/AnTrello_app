this["JST"] = this["JST"] || {};

Handlebars.registerPartial("card_positions", this["JST"]["card_positions"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.current : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<option value=\""
    + alias4(((helper = (helper = helpers.current || (depth0 != null ? depth0.current : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current","hash":{},"data":data}) : helper)))
    + "\" selected>"
    + alias4(((helper = (helper = helpers.current || (depth0 != null ? depth0.current : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current","hash":{},"data":data}) : helper)))
    + " (current)</option>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<option value=\""
    + alias4(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"position","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"position","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.positions : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true}));

this["JST"]["card"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<section class=\"labels\">\n<h3>Labels</h3>\n<ul class=\"labels\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.labels : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n</section>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"label\" style=\"background: "
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data}) : helper)))
    + ";\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "<section class=\"date\">\n<h3>Due Date</h3>\n<p><a class=\"due-date\" href=\"#\">"
    + container.escapeExpression((helpers.format_date || (depth0 && depth0.format_date) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.due_date : depth0),{"name":"format_date","hash":{},"data":data}))
    + "</a></p>\n</section>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<h3>Description</h3>\n<a href=\"#\"><span>Edit</span>\n<p>"
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "<p></a>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "<a href=\"#\"><i class=\"material-icons md-16\">subject</i><span>Edit the description...</span></a>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "<li></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"overlay\"></div>\n<div class=\"container\">\n<i class=\"material-icons md-30 close\">close</i>\n<div class=\"details\">\n<section class=\"name\">\n<header>\n<i class=\"material-icons\">web_asset</i>\n<textarea class=\"title formated\" rows=\"1\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</textarea>\n</header>\n<p>in list <a href=\"#\">"
    + alias4(((helper = (helper = helpers.listName || (depth0 != null ? depth0.listName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"listName","hash":{},"data":data}) : helper)))
    + "</a></p>\n</section>\n<div class=\"attributes\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.labels : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.due_date : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<section class=\"description\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "<form>\n<textarea>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</textarea>\n<div class=\"form-controls\">\n<input type=\"submit\" value=\"Save\">\n<a class=\"close\" href=\"#\"><i class=\"material-icons md-30\">close</i></a>\n</div>\n</form>\n</section>\n</div>\n<section class=\"add-comment\">\n<header>\n<i class=\"material-icons\">comment</i>\n<h1>Add Comment</h1>\n</header>\n<form action=\"/comments\" method=\"post\">\n<textarea class=\"comment-input\" placeholder=\"Write a comment...\"></textarea>\n<input type=\"submit\" value=\"Send\">\n</form>\n</section>\n<section class=\"activity\">\n<header>\n<i class=\"material-icons\">list</i>\n<h1>Activity</h1>\n</header>\n<ul class=\"activities\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.activities : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n</section>\n</div>\n<aside>\n<section class=\"add\">\n<h1>Add</h1>\n<ul class=\"actions\">\n<li class=\"action labels\">Labels</li>\n<li class=\"action due-date\">Due Date</li>\n</ul>\n</section>\n<section class=\"card-actions\">\n<h1>Actions</h1>\n<ul class=\"actions\">\n<li class=\"action move-card\">Move</li>\n<li class=\"action copy-card\">Copy</li>\n<li class=\"action subscribe\">Subscribe</li>\n<li class=\"action archive\">Archive</li>\n</ul>\n</section>\n</aside>\n</div>\n";
},"useData":true});

this["JST"]["cards"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"card\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-position=\""
    + alias4(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"position","hash":{},"data":data}) : helper)))
    + "\">\n<span class=\"edit\"><i class=\"material-icons md-14\">edit</i></span>\n<ul class=\"labels\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.labels : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n<p>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</p>\n<ul class=\"icons\">\n<li class=\"comment-icon\"></li>\n<li class=\"subscribe-icon\"></li>\n</ul>\n</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<li class=\"label\" style=\"background:"
    + container.escapeExpression(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"color","hash":{},"data":data}) : helper)))
    + ";\"></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.cards : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["JST"]["copy_list_form"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<h3>\n<span class=\"prev\"><i class=\"material-icons md-16\">arrow_back</i></span>\nCopy List\n<span class=\"close\"><i class=\"material-icons md-16\">close</i></span>\n</h3>\n<hr/>\n<form>\n<dl>\n<dt>\n<label>\n<h2>Name</h2>\n</label>\n</dt>\n<dd>\n<textarea>"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"name","hash":{},"data":data}) : helper)))
    + "</textarea>\n</dd>\n</dl>\n<input type=\"submit\" value=\"Create List\">\n</form>\n";
},"useData":true});

this["JST"]["due_date_form"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h3>\nChange Due Date\n<span class=\"close\"><i class=\"material-icons md-16\">close</i></span>\n</h3>\n<hr/>\n<form>\n<fieldset>\n<label>\n<h2>Date</h2>\n<input type=\"text\" name=\"date\">\n</label><!--\n--><label>\n<h2>Time</h2>\n<input type=\"time\" name=\"time\" value=\"12:00\">\n</label>\n</fieldset>\n<div class=\"datepicker\"></div>\n<div class=\"form-controls\">\n<input type=\"submit\" value=\"Save\">\n<input class=\"remove\" type=\"submit\" value=\"Remove\">\n</div>\n</form>\n<div class=\"overlay\"></div>\n";
},"useData":true});

this["JST"]["edit_label_form"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<h3>\nChange Label\n<span class=\"close\"><i class=\"material-icons md-16\">close</i></span>\n</h3>\n<hr/>\n<form>\n<label>\n<h2>Name</h2>\n<input type=\"text\" value=\""
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"name","hash":{},"data":data}) : helper)))
    + "\" name=\"name\">\n</label>\n<input type=\"submit\" value=\"Save\">\n</form>\n<div class=\"overlay\"></div>\n";
},"useData":true});

this["JST"]["labels"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"label\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" style=\"background:"
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data}) : helper)))
    + ";\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.checked : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</li><!--\n--><span class=\"edit\"><i class=\"material-icons md-14\">edit</i></span>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "<i class=\"material-icons md-18 check\">check</i>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h3>\nLabels\n<span class=\"close\"><i class=\"material-icons md-16\">close</i></span>\n</h3>\n<hr/>\n<form>\n<ul>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.labels : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n</form>\n<div class=\"overlay\"></div>\n";
},"useData":true});

this["JST"]["list_actions"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h3>List Actions\n<span class=\"close\"><i class=\"material-icons md-16\">close</i></span>\n</h3>\n<hr/>\n<ul class=\"actions\">\n<li class=\"action copy-list\">Copy List...</li>\n<li class=\"action move-list\">Move List...</li>\n<li class=\"action\">Subscribe...</li>\n</ul>\n<hr/>\n<ul class=\"actions\">\n<li class=\"action move-cards\">Move All cards in This List...</li>\n<li class=\"action archive-cards\">Archive All Cards in This List...</li>\n</ul>\n<hr/>\n<ul class=\"actions\">\n<li class=\"action archive-list\">Archive This List</li>\n</ul>\n";
},"useData":true});

this["JST"]["lists"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"list\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-position=\""
    + alias4(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"position","hash":{},"data":data}) : helper)))
    + "\">\n<header>\n<div class=\"overlay-header\"></div>\n<textarea class=\"title formated\" rows=\"1\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</textarea>\n<section class=\"list-icons\">\n<span class=\"subscribed\"><i class=\"material-icons md-16\">remove_red_eye</i></span>\n<span class=\"more\"><i class=\"material-icons md-16\">more_horiz</i></span>\n</section>\n</header>\n<section class=\"modal\">\n</section>\n<div class=\"overlay\"></div>\n<ul class=\"cards\">\n</ul>\n<div class=\"add-card\">\n<a href=\"#\">Add a card...</a>\n<form action=\"/cards\" method=\"post\">\n<textarea rows=\"4\" name=\"card_name\"></textarea>\n<div class=\"form-controls\">\n<input type=\"submit\" value=\"Save\">\n<a class=\"close\" href=\"#\">\n<i class=\"material-icons md-30\">close</i>\n</a>\n</div>\n</form>\n</div>\n</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.lists : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["JST"]["move_card_form"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.current : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<option data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = helpers.current || (depth0 != null ? depth0.current : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current","hash":{},"data":data}) : helper)))
    + "\" selected>"
    + alias4(((helper = (helper = helpers.current || (depth0 != null ? depth0.current : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current","hash":{},"data":data}) : helper)))
    + " (current)</option>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<option data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<h3>\nMove Card\n<span class=\"close\"><i class=\"material-icons md-16\">close</i></span>\n</h3>\n<hr/>\n<form>\n<dl class=\"list-name\">\n<dt>\n<label>\n<h5>List</h5>\n<p>"
    + alias4(((helper = (helper = helpers.currentList || (depth0 != null ? depth0.currentList : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currentList","hash":{},"data":data}) : helper)))
    + "</p>\n</label>\n</dt>\n<dd>\n<select>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.lists : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</select>\n</dd>\n</dl>\n<dl class=\"card-position\">\n<dt>\n<label>\n<h5>Position</h5>\n<p>"
    + alias4(((helper = (helper = helpers.currentPosition || (depth0 != null ? depth0.currentPosition : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currentPosition","hash":{},"data":data}) : helper)))
    + "</p>\n</label>\n</dt>\n<dd>\n<select>\n"
    + ((stack1 = container.invokePartial(partials.card_positions,depth0,{"name":"card_positions","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</select>\n</dd>\n</dl>\n<input type=\"submit\" value=\"Move\">\n</form>\n<div class=\"overlay\"></div>\n";
},"usePartial":true,"useData":true});

this["JST"]["move_cards_form"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"action\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<h3>\n<span class=\"prev\"><i class=\"material-icons md-16\">arrow_back</i></span>\nMove All Cards in List\n<span class=\"close\"><i class=\"material-icons md-16\">close</i></span>\n</h3>\n<hr/>\n<form>\n<ul class=\"actions\">\n<li class=\"action\">"
    + container.escapeExpression(((helper = (helper = helpers.current || (depth0 != null ? depth0.current : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"current","hash":{},"data":data}) : helper)))
    + " (current)</li>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.lists : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n</form>\n";
},"useData":true});

this["JST"]["move_list_form"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.current : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<option value=\""
    + alias4(((helper = (helper = helpers.current || (depth0 != null ? depth0.current : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current","hash":{},"data":data}) : helper)))
    + "\" selected>"
    + alias4(((helper = (helper = helpers.current || (depth0 != null ? depth0.current : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current","hash":{},"data":data}) : helper)))
    + " (current)</option>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<option value=\""
    + alias4(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"position","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"position","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<h3>\n<span class=\"prev\"><i class=\"material-icons md-16\">arrow_back</i></span>\nMove List\n<span class=\"close\"><i class=\"material-icons md-16\">close</i></span>\n</h3>\n<hr/>\n<form>\n<dl>\n<dt>\n<label>\n<h5>Position</h5>\n<p>"
    + container.escapeExpression(((helper = (helper = helpers.currentPosition || (depth0 != null ? depth0.currentPosition : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"currentPosition","hash":{},"data":data}) : helper)))
    + "</p>\n</label>\n</dt>\n<dd>\n<select>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.positions : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</select>\n</dd>\n</dl>\n<input type=\"submit\" value=\"Move\">\n</form>\n";
},"useData":true});
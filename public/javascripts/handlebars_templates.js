this["JST"] = this["JST"] || {};

this["JST"]["list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<li class=\"card\">\n<ul class=\"labels\">\n<li class=\"label\"></li>\n</ul>\n<p>"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"name","hash":{},"data":data}) : helper)))
    + "</p>\n<ul class=\"icons\">\n<li class=\"comment-icon\"></li>\n<li class=\"subscribe-icon\"></li>\n</ul>\n</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"list\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n<header>\n<textarea class=\"title\" rows=\"1\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</textarea>\n<div class=\"list-icons\">\n<span class=\"subscribed\"><i class=\"material-icons md-16\">remove_red_eye</i></span>\n<span class=\"more\"><i class=\"material-icons md-16\">more_horiz</i></span>\n</div>\n</header>\n<section class=\"modal\">\n<h3>List Actions\n<span class=\"close\"><i class=\"material-icons md-16\">close</i></span>\n</h3>\n<hr/>\n<ul class=\"actions\">\n<li class=\"action\">Add Card...</li>\n<li class=\"action\">Copy List...</li>\n<li class=\"action\">Move List...</li>\n<li class=\"action\">Subscribe...</li>\n</ul>\n<hr/>\n<ul class=\"actions\">\n<li class=\"action\">Move All cards in This List...</li>\n<li class=\"action\">Archive All Cards in This List...</li>\n</ul>\n<hr/>\n<ul class=\"actions\">\n<li class=\"action\">Archive This List</li>\n</ul>\n</section>\n<div class=\"overlay\"></div>\n<ul class=\"cards\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.cards : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n</li>\n";
},"useData":true});
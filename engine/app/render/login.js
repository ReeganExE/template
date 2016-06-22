(function(){function login(it
/**/) {
var out='<html> <body><div>Signin</div> <form action="/login" method="post"> <div> <label>Username:</label> <input type="text" name="username" /> <br/> </div> <div> <label>Password:</label> <input type="password" name="password" /> </div> <div> <input type="submit" value="Sign in" /> </div> </form><div>Signup</div> <form action="/signup" method="post"> <div> <label>Username:</label> <input type="text" name="username" /> <br/> </div> <div> <label>Password:</label> <input type="password" name="password" /> </div> <div> <input type="submit" value="Sign up" /> </div> </form> </body></html>';return out;
}var itself=login, _encodeHTML=(function (doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());if(typeof module!=='undefined' && module.exports) module.exports=itself;else if(typeof define==='function')define(function(){return itself;});else {_page.render=_page.render||{};_page.render['login']=itself;}}());
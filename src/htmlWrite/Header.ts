export class Header {
	public get htmlHead() {
		let ret = "";
		ret += `<head>`;
		ret += `<title>Materials Schema Web</title>`;
		ret += `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">`;
		ret += `<script src="https://code.jquery.com/jquery-3.6.0.slim.min.js" integrity="sha256-u7e5khyithlIdTpu22PHhENmPcRdFiHRjhAuHcs05RI=" crossorigin="anonymous"></script>`;
		// ret += `<link rel="stylesheet" href="/css/tree.css">`;
		// ret += `<script src="/js/jquery.min.js"></script><script src="/js/bootstrap.min.js">`;
		// ret += `</script><script src="/js/tree.js"></script><script src="/js/index.js"></script>`;
		ret += `</head>`;
		return ret;
	}

	public get navBar() {
		let ret = "";
		ret += `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">`;
		ret += `<a class="navbar-brand" href="/">${"Materials Schema Web"}</a>`;
		ret +=
			`<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">` +
			`<span class="navbar-toggler-icon"></span>` +
			`</button>`;

		// Navbar Left Side
		ret += `<div class="collapse navbar-collapse" id="navbarText">`;
		ret += `<ul class="navbar-nav mr-auto">`;
		ret += `<li class="nav-item"><a class="nav-link" href="/types">${"Types"}</a></li>`;
		ret += `<li class="nav-item"><a class="nav-link" href="/properties">${"Properties"}</a></li>`;
		ret += `</ul>`;

		// Navbar Right Side
		ret += `<ul class="navbar-nav ml-auto">`;
		ret +=
			`<li class="nav-item" style="color: yellow;">` +
			`Last Deployed Date: ${new Date().toLocaleDateString("en-ZA")}` +
			`</li>`;
		ret += `</ul>`;
		ret += `</div>`;
		ret += `</nav>`;
		return ret;
	}

	public writeHead() {
		return this.htmlHead;
	}
	public writeNavbar() {
		return this.navBar;
	}

	public writeAll() {
		return `<html>` + this.htmlHead + `<body>` + this.navBar;
	}
}

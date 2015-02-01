## SendGrid-Node-ejs

This Repository uses the [SendGrid](https://sendgrid.com/) cloud E-mail delivery service, Nodejs and [ejs](https://github.com/tj/ejs) server side templating.



## Inspiration and Credits


- [SendGrid NodeJS Example](https://github.com/sendgrid/sendgrid-nodejs-example)
- LearnCode Academy You Tube video [1](https://www.youtube.com/watch?v=zrXOjWICmGw) 
- LearnCode Academy You Tube video [2](https://www.youtube.com/watch?v=FrB8mxdWR7o)
- Background image downloaded from [http://freeseamlesstextures.com/](http://freeseamlesstextures.com/)
- The [Angular Material](https://material.angularjs.org/#/) form styling based on a [scotch.io](https://scotch.io/) tutorial


## Usage

- Open an account with [SendGrid](https://sendgrid.com/)
- clone the repository
- Copy _.env.example_ to _.env_
- Open _.env_ and enter your SendGrid account credentials and save
- _npm install_
- _node server.js_
- Browse to _http://localhost:8080/_
- Enter Email details into the [Angular Material](https://material.angularjs.org/#/) form presented
- Preview button will connect to Node server and return the output of the ejs template and render it as HTML in a Modal window 
- The Submit button - sends Email to the _To_ Email address
- Wait a while
- You will get confirmation when the promise resolves



## Screen Shots


<div align="center">
	<img width="45%" src="screen-shots/sc1.png" alt="Email Form" title="Email Form"</img>
	<img width="5px" height="0px" </img>
	<img width="45%" src="screen-shots/sc2.png" alt="Create Email" title="Create Email"</img>
</div>
<div align="center">
	<img width="45%" src="screen-shots/sc3.png" alt="Email Form" title="Email Form"</img>
	<img width="5px" height="0px" </img>
	<img width="45%" src="screen-shots/preview.png" alt="Create Email" title="Create Email"</img>
</div>

<hr>

Michael Cullen
2014



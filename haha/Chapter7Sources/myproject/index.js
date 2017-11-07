var express = require('express')
,   routes  = require("./routes")
,   path    = require('path')
,   app     = express()
;


var argv    = require('optimist')
.usage("Usage: $0")
.options("port",{alias:"P",default:3000})
.argv
;


app
.set("port",argv.port)
.set("views",path.join(__dirname,"views"))
.set("view engine","jade")
.use(express.favicon())
.use(express.logger('dev'))
.use(express.json())
.use(express.urlencoded())
.use(express.methodOverride())
.use(app.router) //MVC routing
.use(require('less-middleware')({ src: path.join(__dirname, 'public') }))
.use(express.static(path.join(__dirname, 'public')));


app.get('/', routes.index);

app
.listen(argv.port);


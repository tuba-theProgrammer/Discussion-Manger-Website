var createError = require('http-errors');
var cors = require('cors')
var cookieParser = require('cookie-parser')
var express = require('express');
var path = require('path');
var logger = require('morgan');



var app = express();



//These are the service which will be use by our discussion manager app
const {inforAuthentication,loginRouter} = require('./routes/authentication')

const {
      postRouterInfo,
      addPostRouter,
      loadPostsRouter,
      loadCommentsRouter,
      addCommentRouter
} = require('./routes/posts')

var statisticsService = require('./routes/statistics')

const {serverStatusRouter} = require('./routes/serverStatus')


const {
      chatInfo,
      addInContactListrouter,
      loadAllContactsRouter,
      sendMessageRouter,
      loadChatRouter,
      loadAllUsersListRouter,
      loadAllNewFrndsListRouter,
      acceptFrndRequestRouter
      } = require('./routes/chat')

const {
      infoProfile,
      uploadProfileImageRouter,
      loadProfileWithUidRouter,
      setStatusRouter,
      UpdateStatusRouter,
      } = require('./routes/profile')

const {
      infoAccounts,
      createAccountWithEmailRouter,
      restMyPasswordWithEmailLinkRouter,
      getTheFireBaseConfugrationRotuer,
      deleteAccountRouter,
      } = require('./routes/accounts');

const { send } = require('process');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json()); //this is to enable the passing of json in body of request
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())//NOTE------------------------------------------------------------

//Using services ... From cleint side we will use these prefixe before we use any service.

app.use('/statisticsService',statisticsService)
 
app.use('/serverStatusService',serverStatusRouter)

app.use('/authenticationService',inforAuthentication)
app.use('/authenticationService',loginRouter)


app.use('/chatService',chatInfo)
app.use('/chatService',addInContactListrouter)
app.use('/chatService',loadAllContactsRouter)
app.use('/chatService',sendMessageRouter)
app.use('/chatService',loadChatRouter)
app.use('/chatService',loadAllUsersListRouter)
app.use('/chatService',loadAllNewFrndsListRouter)
app.use('/chatService',acceptFrndRequestRouter)


app.use('/profileService',infoProfile)
app.use('/profileService',uploadProfileImageRouter)
app.use('/profileService',loadProfileWithUidRouter)
app.use('/profileService',setStatusRouter)
app.use('/profileService',UpdateStatusRouter)



app.use('/accountsService',infoAccounts)
app.use('/accountsService',createAccountWithEmailRouter)
app.use('/accountsService',restMyPasswordWithEmailLinkRouter)
app.use('/accountsService',getTheFireBaseConfugrationRotuer)
app.use('/accountsService',UpdateStatusRouter)
app.use('/accountsService',deleteAccountRouter)

app.use('/postsServices',postRouterInfo)
app.use('/postsServices',addPostRouter)
app.use('/postsServices',loadPostsRouter)
app.use('/postsServices',loadCommentsRouter)
app.use('/postsServices',addCommentRouter)



app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

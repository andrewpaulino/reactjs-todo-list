var User = require('./models/model')
var Email = require('./models/email')
var Msg = require('./models/msg')
var Product = require('./models/products')
var msgSender = []
var amountMessage = msgSender.length
var cond;


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','Hey! You must be logged in to view that!' );
		res.redirect('/login');
	}
}

 app.get('/',function(req, res, html) {
   if(!req.user){
        res.render('index')
    }else{
    res.render('index',{currentUser: req.user.username})
    }
})

//Renders Feature Page
app.get('/features', ensureAuthenticated, function(req,res,html){
var currentUser = req.user.username
         res.render('features',{currentUser: req.user.username}) 

        })
   
//Renders Template for New User Registration.
app.get('/newuser', function(req, res, html){
    res.render('register')
})
//Sends Browser JS Files
app.get('/app.js', function(req,res,js){
    res.sendFile(path.join(__dirname + "/app.js"));

})
//Sends Browser JS Files
app.get('/index.js', function(req,res,js){
    res.sendFile(path.join(__dirname+'/index.js'));
    
})

//Renders Confirm Screen
app.get('/confirm', function(req,res){
 res.render('confirm')
 });

//Renders To DashBoard
app.get('/dashboard/newmessage', ensureAuthenticated,function(req,res){
    res.render('newmsg',{currentUser: req.user.username,'amountMessage':msgSender.length,'currentUser':req.user.username}) 


})
app.get('/dashboard/messages/',ensureAuthenticated,function(req,res){
var msgSender = []

    Msg.find({ username: req.user.username }, 'username message sender timeSent', function (err, msg) {
if (err) {
      console.log('notfound')
      return handleError(err);

}else{
var currentMessages = 
    msg.forEach(function(msg){
    var Obj = {
        'sender': msg.sender,
        'message':msg.message,
        'timeSent':msg.timeSent
    }
    msgSender.push(Obj)
    });
    console.log(msgSender)
    
        res.render('messages',{'msgSender':msgSender, 'amountMessage':amountMessage,'currentUser':req.user.username})
}
    })
})
app.post('/dashboard/newmessage',ensureAuthenticated ,function (req,res){
    var time = new Date(Date.now(Date.UTC()));
    var isoTime = time.toISOString();
    var reciever = req.body.newMessage;
    var msg1 = req.body.msg;
    if(!msg1 || !reciever){
        res.render('newmsg',req.flash('error_msg','You need to fill out the Entire form'))

    }else{
        let msg = new Msg();
        msg.username = reciever;
        msg.message = msg1;
        msg.sender = req.user.username
        msg.timeSent = isoTime
        msg.save(function(err){
                  if(err){
                    console.log(err);
                    return;
                   } else{
                       res.redirect('/dashboard')
                   }
                })
    }



})
app.post('/charge', ensureAuthenticated,function(req,res){
    var basic = req.body.basic
    var advanced = req.body.advanced
    var extreme = req.body.extreme
Product.find({
      $and: [
          { $or: [{value: basic},{value: advanced},{value:extreme}] }
      ]
  },'price', function(err, products){
    if(err){
        console.log(err)
    }else{
    console.log(products)
     var token = req.body.stripeToken
     var chargeAmount = products[0].price
     var charge = stripe.charges.create({
         amount: chargeAmount,
         currency: "usd",
         source: token
 },function(err, charge){
     if(err  === "StripeCardError"){
         req.flash('error_msg','Sorry your card was declined')
        res.redirect('/products');     
     }
 })
req.flash('success_msg','payment Successful')    
res.redirect('/paysuccess');






}

})
})
app.get('/paysuccess',ensureAuthenticated,function(req,res){
    
    res.render('paysuccess',{messages: req.flash('Payment Successful'),currentUser:req.user.username } )


})
app.get('/dashboard',ensureAuthenticated,function(req,res){
    var currentUser = req.user.username

         res.render('dashboard', {
            currentUser: req.user.username,
            "currentEmail": req.user.email,
            "currentPhone": req.user.PhoneNumber,
            
         })
        });

 app.post('/dashboard', ensureAuthenticated, function(req,res){
    var presentUser = req.user

    var newUsername = req.body.newUsername;
    var newEmail = req.body.newEmail;
    var newPhoneNumber = req.body.newPhoneNumber;
   

   
    if(!newUsername){
       presentUser.username = req.user.username;
    }else{
    presentUser.username = newUsername 
    }
     if(!newEmail){
        presentUser.email = req.user.email
        
    } else{
         presentUser.email = newEmail 
    }
    if(!newPhoneNumber){
        presentUser.PhoneNumber = req.user.PhoneNumber
    }else{
        presentUser.PhoneNumber = newPhoneNumber 
    }
            
            presentUser.save(function(err){
                if(err) {
                    console.log(err)
                    return;
                }else{
                    req.flash('success_msg','Edits Saved' )
                    res.redirect('/dashboard')
                }
            })
        }) 

 //Shows Options for posting in /resetPass
 app.post('/resetpass', ensureAuthenticated,function(req,res){
    var newPass = req.body.password1; console.log(newPass);
    var pass2 = req.body.password2;   console.log(pass2);
    if(newPass !== pass2){
        res.render('resetpass')
        req.failureFlash
    }else{
        var selectedUser = req.user;
         selectedUser.password = newPass;
              
            User.updatePass(selectedUser, function(err,user){
                if (err) throw err;
                console.log(user)
            })
        req.flash('Succesful in change Password')
        res.redirect('/dashboard')
    }
});

app.get('/contactus',function(req,res){
    if(!req.user){
        res.render('ContactUs')
    }else{
    res.render('ContactUs',{currentUser: req.user.username})
    }
})
app.post('/contactus',function(req,res){

    var guestEmail = req.body.guestEmail
    var guestPhone = req.body.guestPhone
    var reason = req.body.reason
    var inquiry = req.body.inquiry
    var contactEmail = req.body.contactEmail
    var contactPhoneNumber = req.body.contactPhoneNumber
                 let email = new Email();
                 email.email = guestEmail;
                 email.PhoneNumber = guestPhone;
                 email.Reason = reason;
                 email.Inquiry = inquiry;
                 email.Contact = contactEmail;

                email.save(function(err){
                  if(err){
                    console.log(err);
                    return;
                   } else{
                       res.redirect('/success')
                   }
                })
           // }



})
app.get('/terms',function(req,res){
     if(!req.user){
        res.render('terms')
    }else{
    res.render('terms',{currentUser: req.user.username})
    }
})
app.get('/privacy',function(req,res){
     if(!req.user){
        res.render('privacy')
    }else{
    res.render('privacy',{currentUser: req.user.username})
    }
})
app.post("/newuser", function(req, res,){
    var avalibilty = req.body.username
    var avalibilty2 = req.body.email
    User.find({
      $and: [
          { $or: [{email: avalibilty2},{username: avalibilty}] }
      ]
  }, 'username email', function (err, users) {
if (err) {
   console.log('ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRR')

}else{
   
   console.log(users)
    if (users.length === 0){
        console.log('Brand new user')
         var username = req.body.username;
         var email = req.body.email;
         var pwd = req.body.pwd;
         var pwd2 = req.body.pwd2;
         var PhoneNumber = req.body.PhoneNumber;
         
         //Validation
          req.checkBody('username', 'Enter Username Please').notEmpty();
          req.checkBody('email', 'Valid Email Required').isEmail();
          req.checkBody('pwd', 'Enter password').notEmpty();
          req.checkBody('pwd2', 'Does not match first password').equals(req.body.pwd);
          req.checkBody('PhoneNumber', 'Enter Valid (8-digit) phoneNumber').notEmpty();
      
          var errors = req.validationErrors();
         
          if(errors){
          res.render('register',{
            errors:errors
            });
          }else{
               var newUser = new User({
                   username: username,
                   email: email,
                   password: pwd,
                   PhoneNumber: PhoneNumber
               })
                User.createUser(newUser, function(err,user){
                    if (err) throw err;
                    // console.log(user)
                })
                req.flash('success_msg', 'You are registered and can now login');
                res.redirect('/')
          }
    }else{
            req.flash('error_msg','username or email is in use already!');
            res.redirect('/newuser')

        }
}
})
})        

app.get('/products', ensureAuthenticated, function(req,res){
    res.render('products', {currentUser: req.user.username})

})

app.get('/bio', ensureAuthenticated, function(req,res,html){
        var currentUser = req.user.username
         res.render('bio', {currentUser: req.user.username})

        
    
})

app.get('/success',ensureAuthenticated, function(req,res,html){
    res.render('success',{currentUser: req.user.username,message:'Registered!'})
})
app.get('/resetpass',ensureAuthenticated, function(req,res){
    res.render('resetpass')
})

app.get('/login', function(req,res,html){
   res.render('login')
})


passport.use(new LocalStrategy(
   function(username, password, done) {
         User.getUserByUsername(username, function(err,user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message:'Unkown User'});
            }
            User.comparePassword(password, user.password, function( err, isMatch){
               if (err) throw err;
                 if(isMatch){
                     return done (null, user);
                 }else{
                     return done(null,false, {message:'HACKER'})
  		}
  	});
  });
   }));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

app.post('/login',
  passport.authenticate('local', {successRedirect:'/dashboard',successFlash:true,failureRedirect:'/login', failureFlash:true}),
  function(req, res) {
    req.flash('success_msg', 'You are logged out'); 
  });

app.get('/logout', function(req,res){
    req.logout();
  req.flash('success_msg', 'You are logged out');
    res.redirect('/login')
})



app.post('/confirm',
  passport.authenticate('local', {successRedirect:'/resetpass',successFlash:true,failureRedirect:'/login', failureFlash:true}),
  function(req, res) {
    req.flash('success_msg', 'You are logged out'); 
  });

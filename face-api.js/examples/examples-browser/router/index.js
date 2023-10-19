const mobile=require('./mobileDevice')
const desktop=require('./desktopDevice')
const userAPI=require('./userDataAPI')
function route(app) {

    app.use('/api',userAPI)
    app.use('/mobile', mobile);
    app.use('/desktop', desktop);
   
    app.use('/', (req, res) => {
      const userAgent = req.headers['user-agent'];
    if(userAgent.includes('Android')||userAgent.includes('iPhone')){
      return res.redirect('/mobile')
    }return res.redirect('/desktop')});

}
module.exports=route;
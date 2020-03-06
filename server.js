import express from 'express';
import logger from 'morgan';
import path from 'path';

const app = express();

app.set('port', 8000);
app.set('view engine', 'ejs');
const viewPath = path.join(__dirname, '/views');
app.set('views', viewPath);
app.use(logger('dev'));
app.use('/public', express.static(path.join(__dirname, '/public')));

app.use((req, res) => {
    console.log('res', req.originalUrl);
    const redirectUrl = req.originalUrl;

    res.render('index', { redirectUrl });
})

app.listen(app.get('port'), () => {
    console.log('Server is listening on port', app.get('port'));
})

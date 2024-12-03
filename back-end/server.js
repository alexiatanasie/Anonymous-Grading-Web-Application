app.get('/test', (req, res) => {
    res.json({ message: 'Server and DB are working!' });
});
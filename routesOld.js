const fs = require('fs')
const filePath = './message.txt';
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html>')
        res.write('<head><title>First</title></head>')
        res.write('<body><h1>Hello, this is my first app \n list of users written to file</h1>')
        res.write('<body><h1>Hello</h1><form action="/users" method="POST"><button type="submit">Go to users</button>')
        res.write('</body></html>')
        return res.end();
    }
    if(url === '/users'){
        res.write('<html>')
        res.write('<head><title>Title</title></head>')
        res.write('<body><h1>Hello</h1><form action="/second" method="POST"><input type="text" name="message"><button type="submit">Post</button>')
        res.write('</body></html>')
        return res.end();
    }
    if (url === '/second' && method === "POST"){
        const body = [];
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.appendFile('message.txt', "\n" + message, function (err) {
                if (err) {
                    fs.writeFile('message.txt', message, err => {
                    })
                }   
            });
        })
        console.log("udałoi się");
        res.statusCode = 302;
        res.setHeader('Location', '/')
        res.end();
    }
    else
    {
        res.write('<html>')
        res.write('<head><title>Page Head and Title</title></head>')
        res.write('<body><h1>Default</h1></body>')
        res.write('</html>')
        res.end()
    }

}

module.exports = requestHandler;
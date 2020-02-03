const express = require('express');

const app = express();

const port = 8090;

app.use(express.json());


class CompetitiveCompanion {

    constructor(){

        this.port = 8080;
        
        app.post('/', (req, res) => {

            console.log(req.body);
        
            res.sendStatus(200);
        
        });
        
        app.listen(port, (err) => {
        
            if (err) {
                console.log(err);
                process.exit(1);
            }
        
            console.log(`Listening on port ${port}`);
        
        });

    }
}

export default new CompetitiveCompanion();

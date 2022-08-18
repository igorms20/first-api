import express from "express";
import {StatusCodes} from "http-status-codes";

const app = express();
const PORT = process.env.PORT || 3000;
let users = [
    {id: 1, name: 'André Igor', age: 20},
    {id: 2, name: 'Douglas Silva', age: 24}
];

app.use(express.json());


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.send('<h1>Hello World</h1>');
});
  
app.get('/users', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.send(users);
});

app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId
    const user = users.find(user => {
        return user.id === Number(userId);
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.send(user);
});

app.post('/users', (req, res) => {
    const newUser = req.body;

    users.push(newUser);

    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(StatusCodes.CREATED).send(newUser);
})

app.put('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const updatedUser = req.body;

    users = users.map(user => {
        if (Number(userId) === user.id) {
            return updatedUser;
        }

        return user;
    })
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.send(updatedUser);
});
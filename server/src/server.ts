import express from 'express';
import cors from 'cors';

import connection from './db/config/connection';
import routes from './routes';

export const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(routes);

connection
    .then(() => {
        console.log('Successfully connected to the database');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error(err);
    });
import express from 'express';
import connection from './db/config/connection';

export const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

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
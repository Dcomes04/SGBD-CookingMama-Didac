const mongoose = require('mongoose');
const { Recipe } = require('./src/models/recipe.js');

mongoose.connect('mongodb://127.0.0.1:27017/appdb?replicaSet=rs0&directConnection=true')
    .then(async () => {
        console.log('Connected');
        const res = await Recipe.updateOne(
            { slug: 'ensalada-verde-caprese' },
            { $set: { instructions: ['Test instruction 1', 'Test instruction 2'] } }
        );
        console.log('Updated:', res);
        await mongoose.disconnect();
    })
    .catch(err => console.error(err));

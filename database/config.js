const mongoose = require('mongoose');


const dbConecction = async() => {

    try {
       await mongoose.connect( process.env.MONGODB_CNN, {
        useUnifiedTopology: true,
        useNewUrlParser: true
       })

       console.log('Base de datos online');

        
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de inicializar la base de datos');
        
    }

}

module.exports = {
    dbConecction
}
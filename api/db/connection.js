import { connect } from 'mongoose';
import { get } from 'config';
const db = get('mongoURI');

const connectDB = async () => {
    try {
        await connect(db, {
            useNewUrlParser: true
        });

        console.log("DB Connected");
    }   catch(err) {
        console.error(err.message);

        process.exit(1);
    }
}

//finally exporting connection
export default connectDB;

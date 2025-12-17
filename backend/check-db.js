const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://marsad04:RLQUelYFGsJm7EO2@cluster0.tvqvj1l.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB Atlas - Database: <dbname>\n');
    
    const Book = mongoose.model('Book', new mongoose.Schema({
      title: String,
      author: String,
      description: String
    }));
    
    const books = await Book.find();
    console.log(`� Found ${books.length} books in <dbname> database:\n`);
    
    books.forEach((book, index) => {
      console.log(`${index + 1}. ${book.title || 'Untitled'} by ${book.author || 'Unknown'}`);
    });
    
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });

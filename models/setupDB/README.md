
## How to import book data into your MongoDB
Make sure you installed MongoDB and that it is running.

Consider to use [MongoDB Compass](https://www.mongodb.com/try/download/compass?msockid=34c32c90874c6c2806b93f4386206d32) as GUI for easy MongoDB access and quering local and remote mongo db database servers.

Open MongoDB Compass, connect to your local or remote MongoDB and "Open MongoDB Shell" which is a command line interface (terminal) where you can execute commandes. When connected to the MongoDB , and terminal is open enter:

```sh
use bookAPI
```

then insert the records. Copy the booksJson.json content and paste in the terminal and hit <b>enter</b>. 

This will result in something like this:

```sh
db.books.insertMany([
{
	title: 'War and Peace',
	genre: 'Historical Fiction',
	author: 'Lev Nikolayevich Tolstoy',
	read: false
},

# many more lines here..

{
	title: 'Childhood',
	genre: 'Biography',
	author: 'Lev Nikolayevich Tolstoy',
	read: false
}
])

# terminal will answer with the guids of the 8 inserted records, something like this:

{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('678ba9e021382ad4a0e05e3e'),
    '1': ObjectId('678ba9e021382ad4a0e05e3f'),
    '2': ObjectId('678ba9e021382ad4a0e05e40'),
    '3': ObjectId('678ba9e021382ad4a0e05e41'),
    '4': ObjectId('678ba9e021382ad4a0e05e42'),
    '5': ObjectId('678ba9e021382ad4a0e05e43'),
    '6': ObjectId('678ba9e021382ad4a0e05e44'),
    '7': ObjectId('678ba9e021382ad4a0e05e45')
  }
}
```

Note: You might not see the collection with its content in Compass. You need to refresh the connection then. Select the connection in Compass, select the 3 dots (...), right click and "Refresh Databases".

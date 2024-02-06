const querys = {}

// Querys de users

querys.getUsers = 'select * from users'
querys.getUser = 'select * from users where username=?'
querys.addUser = 'INSERT INTO users VALUES (null,?, ?)'
querys.login = 'select * from users where username= ? && password=?'

// Querys de notes

querys.getNotes = 'select * from notes where userID=?'
querys.addNotes = 'INSERT INTO notes VALUES (null,?, ?)'
querys.deleteNote = 'DELETE from notes where notesID=?'
querys.updateNote = 'UPDATE notes set description=? where notesID=?'

export default querys

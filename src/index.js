const express = require('express');

require('./db/mongoose');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send("GET requests are Disable")
//     } else {
//         next()
//     }
// })

// app.use((req,res,next) => {
//     res.status(501).send("Site is currently down. Check back soon")
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log("Server is up on port " + port);
})

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('61a7b46b36d04218ea83bb32')
//     // await task.populate('author').execPopulate()
//     // console.log(task.author);
//     const user = await User.findById('61a7b2d6861b6b3defa02b5d')
//     await user.populate('tasks')
//     console.log(user.tasks);
// }
// main()
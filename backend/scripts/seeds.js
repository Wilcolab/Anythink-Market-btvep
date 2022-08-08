//TODO: seeds script should come here, so we'll be able to put some data in our local env
const util = require('util')
mongoose = require("mongoose");
require("../models/User");
require("../models/Item");
require("../models/Comment");
const User = mongoose.model("User");
const Item = mongoose.model("Item");
const Comment = mongoose.model("Comment");
mongoose.connect(process.env.MONGODB_URI);
mongoose.set("debug", true);

async function seed() {
    // clear db 
    await deleteAllUsers();
    await deleteAllItems();

    // create 100 users
    for (let i = 0; i < 100; i++) {
        const user = await createNewUser(i);
        // console.log('user', user);
        // for each user an item
        const item = await createNewItem(user, i);
        // for each item a comment
        const comment = await createNewComment(user, item, `Some comment ${i}`);
    }
    // await printAllUsers();
    process.exit(0);
}

async function deleteAllUsers() {
    return User.deleteMany({}).then((res, err) => {
        if (err) {
            console.error('Failed to delete all users', err);
        } else {
            console.log(res);
        }
    });
}

async function deleteAllItems() {
    return Item.deleteMany({}).then((res, err) => {
        if (err) {
            console.error('Failed to delete all items', err);
        } else {
            console.log(res);
        }
    });
}

async function printAllUsers() {
    return User.find().then((users, err) => {
        if (err) {
            console.error('Failed to get all users', err);
        } else {
            console.log(users);
        }
    });
}

function createNewUser(serial) {
    const user = new User();

    user.username = `happyUser${serial}`;
    user.email = `address${serial}@example.com`;
    user.setPassword('123456');

    return user.save().then((user, err) => {
        if (err) {
            console.error('Failed to save a new user', err);
            throw err;
        }
        return user;
    })

}

function createNewItem(user, serial) {
    const itemPayload = {
        title: `Item_${serial}`,
        description: '',
        image: '',
        tagList: [],
    };
    const item = new Item(itemPayload);
    item.seller = user.id;
    return item.save().then((item, err) => {
        if (err) {
            console.error('Failed to save a new item', err);
            throw err;
        }
        return item;
    });
}

function createNewComment(user, item, body) {
    const commentPayload = {
        body: body
    };
    const comment = new Comment(commentPayload);
    comment.item = item.id;
    comment.seller = user.id;

    return comment.save().then((res, err) => {
        if (err) {
            console.error('Failed to save a new comment', err);
            throw err;
        }
        item.comments = item.comments.concat([comment]);
        return item.save().then((item, err) => {
            if (err) {
                console.error('Failed to save a new comment', err);
                throw err;
            }
            return comment;
        })
    });
}

seed();
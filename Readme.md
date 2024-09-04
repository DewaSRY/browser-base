# Browser base

BrowserBase tool to work with ofline data on browser.it allow you store your data on browser indexdb database. it also build on top of typescrip with simple interface

Browser base build on top [LocalForage](https://github.com/localForage/localForage).

and browser base inspire by [localbase](https://github.com/samuk190/localbase).

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

## Getting Started

```bash
// run for instalation
npm i @sdewa/browser-base
```

create database and the collection

```typescript
// create database instance
let browserBase new BrowserBase("first-db");

// create an interface of data
interface user {
  name: string;
  age: number;
}
// create the collection
browserBase.collection<user>("user-collection");

//the broser base will store data on 'user collection',
//if you don't pass a key on the key param its will generate uuid
browserBase.collection<user>("user-collection").ad({
    name: "some name",
    age:10
}, "some key")

// {name: "somename", age:10, _id: "some key"}

//recomended to not pass anything on the key param
//so the data guaranted to be unique
browserBase.collection<user>("user-collection").ad({
    name: "some name",
    age:10
})

// {name: "somename", age:10, _id: "<uuid>"}
```

query the data

```typescript
//use get will query all data on the collection
browserBase.collection<user>("user-collection").get()
//[
//  {name: "somename", age:10, _id: "<uuid>"}
//  {name: "somename", age:10, _id: "<uuid>"}
//  {name: "somename", age:10, _id: "<uuid>"}
//]

//it's can alos use by specify the key will query
browserBase.collection<user>("user-collection".).byId('<uuid>').get()
//for simplifie the interface it will return an array with one match value
//[{name: "somename", age:10, _id: "<uuid>"}]

//browserbase also have limit and skip interface
browserBase.collection<user>("user-collection".).limit(5).skip(5).get();
//[
//  {name: "somename", age:10, _id: "<uuid>"}
//  {name: "somename", age:10, _id: "<uuid>"}
//  {name: "somename", age:10, _id: "<uuid>"}
//]

//browser base alos have interface ot order the data
browserBase.collection<user>("user-collection".)
            .orderBy("age", "desc").get();
//[
//  {name: "somename", age:3, _id: "<uuid>"}
//  {name: "somename", age:2, _id: "<uuid>"}
//  {name: "somename", age:1, _id: "<uuid>"}
//]
```

update the data

```typescript
//use set to update the data
browserBase.collection<user>("user-collection").byId("<uuid>").set({
  name: "new name",
  age: 11,
});
//  {name: "new name", age:11, _id: "<uuid>"}
```

delete data

```typescript
//it will delete data match the id
browserBase.collection<user>("user-collection").byId("<uuid>").delete();
//  {name: "new name", age:11, _id: "<uuid>"}

//it will delete the collection
browserBase.collection<user>("user-collection").delete();
//  {name: "new name", age:11, _id: "<uuid>"}

//it will delete the database
browserBase.delete();
//  {name: "new name", age:11, _id: "<uuid>"}
```

## Authors

- [@DewaSRY](https://github.com/DewaSRY)

## License

[MIT](https://choosealicense.com/licenses/mit/)

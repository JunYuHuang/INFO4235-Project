import * as SQLite from "expo-sqlite";
const DB_NAME = "aniflexdb.db";

// create new database or loading an existing database
export function openDatabase() {
  return SQLite.openDatabase(DB_NAME);
}

export default function useDB() {
  const db = openDatabase();

  // define user list table
  function createUserListTable() {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists userlist (id integer primary key not null, title text not null, imgurl text not null, note text);",
        [],
        () => {
          console.log("Created userlist table in database!");
        }
      );
    });
  }

  // get an existing anime title from the user's list
  function getUserList() {
    db.transaction((tx) => {
      tx.executeSql("select * from userlist", [], (_, { rows: { _array } }) => {
        console.log("Get userlist from database!");
        // console.log(JSON.stringify(rows));
        console.log(_array);
        return _array;
      });
    });
  }

  // add an (unique) anime title to the user's list
  function addAnimeToUserList(animeObject) {
    const { id, title, imgURL, notes } = animeObject;
    db.transaction((tx) => {
      tx.executeSql(
        "insert into userlist (id, title, imgurl, notes) values (?, ?, ?, ?)",
        [Number(id), title, imgURL, notes],
        () => {
          console.log("Added anime to userlist in database!");
          console.log(animeObject);
        }
      );
    });
  }

  // update the "notes" property of an existing anime title in the user's list
  function updateAnimeFromUserList(animeID, notes) {
    db.transaction((tx) => {
      tx.executeSql(
        "update userlist set notes = ? where id = ?",
        [notes, Number(animeID)],
        () => {
          console.log(
            `Updated notes property of anime with id ${animeID} from userlist to "${notes}" in database!`
          );
        }
      );
    });
  }

  // delete an existing anime title from the user's list
  function deleteAnimeFromUserList(animeID) {
    db.transaction((tx) => {
      tx.executeSql(
        "delete from userlist where id = ?",
        [Number(animeID)],
        () => {
          console.log(
            `Deleted anime with id ${animeID} from userlist in database!`
          );
        }
      );
    });
  }

  // delete ALL anime titles from the user's list
  function deleteAllAnimeFromUserList() {
    db.transaction((tx) => {
      tx.executeSql("delete from userlist", [], () => {
        console.log("Deleted all anime from userlist in database!");
      });
    });
  }

  return {
    createUserListTable,
    getUserList,
    addAnimeToUserList,
    updateAnimeFromUserList,
    deleteAnimeFromUserList,
    deleteAllAnimeFromUserList,
  };
}

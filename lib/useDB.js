import * as SQLite from "expo-sqlite";
import { useDispatch } from "react-redux";
import {
  setUserData,
  clearUserData,
  addUserDataListItem,
  deleteUserDataListItem,
  editUserDataListItemNotes,
} from "../redux/userDataSlice";

const DB_NAME = "aniflex.db";

// create new database or loading an existing database
function openDatabase() {
  if (Platform.OS === "web") {
    console.log("Web platform detected.");
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase(DB_NAME);
  return db;
}

const db = openDatabase();

export default function useDB() {
  const dispatch = useDispatch();

  // setups the app to its initial state
  function initializeDb() {
    console.log("useDB: Initializing database.");
    createUserListTable();
    refreshUserList();
  }

  // define user list table
  function createUserListTable() {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists userlist (id integer primary key not null, title text not null, imgURL text not null, notes text);",
        [],
        () => {
          console.log("Created userlist table in database!");
        }
      );
    });
  }

  // gets the current user's list and reinitializes the redux store with it
  function refreshUserList() {
    db.transaction((tx) => {
      tx.executeSql("select * from userlist", [], (_, { rows: { _array } }) => {
        console.log("useDB: Getting userlist from database!");
        dispatch(setUserData({ list: _array }));
        console.log(_array);
      });
    });
  }

  // add an (unique) anime title to the user's list
  function addAnimeToUserList(animeObject) {
    const { id, title, imgURL, notes } = animeObject;
    db.transaction((tx) => {
      tx.executeSql(
        "insert into userlist (id, title, imgURL, notes) values (?, ?, ?, ?)",
        [Number(id), title, imgURL, notes],
        () => {
          console.log("useDB: Added anime to userlist in database!");
          console.log(animeObject);
        }
      );
    });
    dispatch(addUserDataListItem(animeObject));
  }

  // update the "notes" property of an existing anime title in the user's list
  function updateAnimeFromUserList(animeID, notes) {
    db.transaction((tx) => {
      tx.executeSql(
        "update userlist set notes = ? where id = ?",
        [notes, Number(animeID)],
        () => {
          console.log(
            `useDB: Updated note property of anime with id ${animeID} from userlist to "${notes}" in database!`
          );
          dispatch(editUserDataListItemNotes({ id: animeID, notes }));
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
            `useDB: Deleted anime with id ${animeID} from userlist in database!`
          );
          dispatch(deleteUserDataListItem({ id: animeID }));
        }
      );
    });
  }

  // delete ALL anime titles from the user's list
  function deleteAllAnimeFromUserList() {
    db.transaction((tx) => {
      tx.executeSql("delete from userlist", [], () => {
        console.log("useDB: Deleted all anime from userlist in database!");
      });
    });
    dispatch(clearUserData());
  }

  return {
    initializeDb,
    createUserListTable,
    refreshUserList,
    addAnimeToUserList,
    updateAnimeFromUserList,
    deleteAnimeFromUserList,
    deleteAllAnimeFromUserList,
  };
}

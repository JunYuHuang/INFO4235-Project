import {
  selectUserDataList,
  setUserData,
  clearUserData,
  addUserDataListItem,
  deleteUserDataListItem,
  editUserDataListItemNotes,
} from "../redux/userDataSlice";
import { store } from "../redux/store";
const { getState, dispatch } = store;
import useDB from "./useDB";

const db = useDB();

export function loadAppData() {
  try {
    console.log("Inside loadAppData()!");
    db.createUserListTable();
    const dbRows = db.getUserList();
    console.log(dbRows);
    if (dbRows === [] || dbRows === undefined) {
      console.log("Empty userlist table in database!");
      console.log(dbRows);
    } else {
      console.log("userlist table rows in database:");
      console.log(dbRows);
      console.log("Loading database records into Redux state!");
      dispatch(setUserData({ list: dbRows }));
      const userList = selectUserDataList(getState());
      console.log("Updated user list in Redux:");
      console.log(userList);
    }
  } catch (err) {
    console.log(err);
  }
}

export function addAppData({ id, title, imgURL, notes }) {
  try {
    console.log("Inside addAppData()!");
    db.addAnimeToUserList({ id, title, imgURL, notes });
    dispatch(
      addUserDataListItem({
        id: id,
        title: title,
        imgURL: imgURL,
        notes: notes,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export function updateAppData({ id, notes }) {
  try {
    console.log("Inside updateAppData()!");
    db.updateAnimeFromUserList(id, notes);
    dispatch(editUserDataListItemNotes({ id, notes }));
  } catch (err) {
    console.log(err);
  }
}

export function deleteAppData({ id }) {
  try {
    console.log("Inside deleteAppData()!");
    db.deleteAnimeFromUserList(id);
    dispatch(deleteUserDataListItem({ id: id }));
  } catch (err) {
    console.log(err);
  }
}

export function deleteAllAppData() {
  try {
    console.log("Inside deleteAllAppData()!");
    db.deleteAllAnimeFromUserList();
    dispatch(clearUserData());
  } catch (err) {
    console.log(err);
  }
}

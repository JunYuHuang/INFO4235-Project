import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

function isListItemUnique(array, id) {
  let unique = true;
  if (Array.isArray(array)) {
    array.forEach((item) => {
      if (Number(item.id) === Number(id)) {
        unique = false;
      }
    });
  }
  return unique;
}

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    list: [],
  },
  reducers: {
    setUserData: (state, action) => {
      return action.payload;
    },
    clearUserData: (state) => {
      return {
        ...state,
        list: [],
      };
    },
    addUserDataListItem: (state, action) => {
      const { id, title, imgURL, notes } = action.payload;
      // if (isListItemUnique(state.list, id)) {
      //   state.list.push({
      //     id: id,
      //     title: title,
      //     imgURL: imgURL,
      //     notes: notes,
      //   });
      // }
      return isListItemUnique(state.list, id)
        ? {
            ...state,
            list: [
              ...state.list,
              {
                id: id,
                title: title,
                imgURL: imgURL,
                notes: notes,
              },
            ],
          }
        : state;
    },
    deleteUserDataListItem: (state, action) => {
      const { id } = action.payload;
      const newList = state.list.filter((item) => item.id !== id);
      return {
        list: newList,
      };
    },
    editUserDataListItemNotes: (state, action) => {
      const { id, notes } = action.payload;
      const newList = state.list.map((item) => {
        item.id === id
          ? {
              ...item,
              notes: notes,
            }
          : item;
      });
      return {
        list: newList,
      };
    },
  },
});

export const {
  setUserData,
  clearUserData,
  addUserDataListItem,
  deleteUserDataListItem,
  editUserDataListItemNotes,
} = userDataSlice.actions;

export const selectUserData = (state) => state.userData;

export const selectUserDataList = (state) => state.userData.list;

export default userDataSlice.reducer;

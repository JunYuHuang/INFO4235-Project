import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

function isListItemUnique(array, id) {
  let unique = true;
  array.forEach((item) => {
    if (item.id === id) {
      return false;
    }
  });
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
        : {
            ...state,
            list: [...state.list],
          };
    },
    deleteUserDataListItem: (state, action) => {
      const { id } = action.payload;
      return state.list.filter((item) => item.id !== id);
    },
    editUserDataListItemNotes: (state, action) => {
      const { id, notes } = action.payload;
      return state.list.map((item) => {
        item.id === id
          ? {
              ...item,
              notes: notes,
            }
          : item;
      });
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

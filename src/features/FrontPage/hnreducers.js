import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  top: [],
  listpending: true,
  storyloading: true,
  currstory: false ,
};

export const getTopIDs = createAsyncThunk(
  'getstorylist/getTopIDs',
  async (view) => {
    const topstories = "https://hacker-news.firebaseio.com/v0/topstories.json"
    const newstories = "https://hacker-news.firebaseio.com/v0/newstories.json"
    const ask = "https://hacker-news.firebaseio.com/v0/askstories.json"
    const show = "https://hacker-news.firebaseio.com/v0/showstories.json"
    const jobs = "https://hacker-news.firebaseio.com/v0/jobstories.json"
    let url;
    switch(view){
      case "top":
        url = topstories
        break
      case "new":
        url  = newstories
        break
      case "ask":
        url  = ask
        break
      case "show":
        url  = show
        break
      case "jobs":
        url  = jobs
        break
      default:
        url = topstories
    }

    const response = await fetch(url);
    const topids =  await response.json();
    return topids

})

export const getCurrStoryDetails = createAsyncThunk(
  'getstorylist/getCurrStoryDetails',
  async (id) => {
    let url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    const response = await fetch(url)
    return response.json()
  }
)

export const counterSlice = createSlice({
  name: 'getstorylist',
  initialState,
  reducers: {
    setCurrStoryv: (state, action) => {
      state.currstory = action.payload;
    },
    settop: (state, action) => {
      state.top = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTopIDs.pending, (state) => {
        state.listpending = true;
      })
      .addCase(getTopIDs.fulfilled, (state, action) => {
        state.listpending = false;
        state.top  = action.payload
      })
    .addCase(getCurrStoryDetails.pending, (state)=> {
      state.storyloading = true;
    })
    .addCase(getCurrStoryDetails.fulfilled, (state, action)=> {
      state.storyloading = false;
      state.details = action.payload
    })
  }
})

export const { setCurrStoryv, settop } = counterSlice.actions;

export const selectCount = (state) => state.counter.value;
export const selectTop100 = (state) => state.counter.top;
export const getcurrstory = (state) => state.counter.currstory;
export const getdetails = (state) => state.counter.details;
export const listpending = (state) => state.counter.listpending;
export const storyloading = (state) => state.counter.storyloading;

export const setCurrStory = (cat) => async (dispatch, getState) => {
  await dispatch(getTopIDs(cat))
  const first = getState().counter.top[0]
  dispatch(setCurrStoryv(first))
  await dispatch(getCurrStoryDetails(first))
};

export const setCurrentDetails = (storyid) => async (dispatch) => {
  dispatch(setCurrStoryv(storyid))
  await dispatch(getCurrStoryDetails(storyid))
}

export default counterSlice.reducer;
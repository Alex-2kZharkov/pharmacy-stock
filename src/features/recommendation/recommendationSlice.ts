import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";

export interface RecommendationState {
  isRecommendationModalOpen: boolean;
  currentRecommendationText?: string;
}

const initialState: RecommendationState = {
  isRecommendationModalOpen: false,
  currentRecommendationText: undefined,
};

export const recommendationSlice = createSlice({
  name: "recommendation",
  initialState,
  reducers: {
    setIsRecommendationModalOpen: (state, { payload }) => {
      state.isRecommendationModalOpen = payload;
    },
    setCurrentRecommendationText: (state, { payload }) => {
      state.currentRecommendationText = payload;
    },
  },
});

export const { setIsRecommendationModalOpen, setCurrentRecommendationText } =
  recommendationSlice.actions;

export const selectIsRecommendationModalOpen = (state: RootState) =>
  state.recommendation.isRecommendationModalOpen;

export const selectCurrentRecommendationText = (state: RootState) =>
  state.recommendation.currentRecommendationText;

export const recommendationReducer = recommendationSlice.reducer;

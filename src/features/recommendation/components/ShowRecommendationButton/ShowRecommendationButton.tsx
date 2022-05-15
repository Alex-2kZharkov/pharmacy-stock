import { FC } from "react";

import { VisibilityOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import clsx from "clsx";

import { useAppDispatch } from "../../../../store/hooks";
import {
  setCurrentRecommendationText,
  setIsRecommendationModalOpen,
} from "../../recommendationSlice";

import { useStyles } from "./ShowRecommendationButton.styles";

interface Props {
  recommendationText?: string;
}

export const ShowRecommendationButton: FC<Props> = ({ recommendationText }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleIconClick = () => {
    dispatch(setCurrentRecommendationText(recommendationText));
    dispatch(setIsRecommendationModalOpen(true));
  };

  return (
    <Tooltip title="Посмотреть полную рекомендацию">
      <IconButton onClick={handleIconClick}>
        <VisibilityOutlined
          className={clsx(classes.showRecommendationButton)}
        />
      </IconButton>
    </Tooltip>
  );
};

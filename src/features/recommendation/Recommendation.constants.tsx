import { Stack } from "@mui/material";
import {
  GridRenderCellParams,
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import russianLocale from "date-fns/locale/ru";

import { RecommendationDto } from "../../types/dto/Recommendation.dto";

import { ShowRecommendationButton } from "./components/ShowRecommendationButton";

export const RECOMMENDATION_TABLE_COLUMNS = [
  {
    field: "createdAt",
    headerName: "Дата создания",
    width: 170,
    editable: true,
    valueFormatter: (params: GridValueFormatterParams) => {
      return format(new Date(params.value as string), "dd MMMM yyyy HH:mm", {
        locale: russianLocale,
      });
    },
  },
  {
    field: "medicine.name",
    headerName: "Наименование товара",
    width: 250,
    editable: true,
    valueGetter: ({ row }: GridValueGetterParams) => {
      return row.medicine.name;
    },
  },
  {
    field: "description",
    headerName: "Описание рекомендации",
    width: 600,
    editable: true,
  },
  {
    field: "showIcon",
    headerName: "",
    width: 50,
    editable: true,
    renderCell: ({ row }: GridRenderCellParams<RecommendationDto>) => (
      <Stack direction="row" alignItems="center">
        <ShowRecommendationButton recommendationText={row.description} />
      </Stack>
    ),
  },
];

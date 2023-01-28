import { Typography } from "@mui/material";
import { formatInTimeZone } from "date-fns-tz";
import dayjs from "dayjs";

export const LimitDate = (date: Date) => {
  const now = dayjs();
  const ActualDate = now.format();
  const BorrowDate = dayjs(date).format();
  const ReturnDate = dayjs(BorrowDate).add(2, "w").format();
  const DateDiff = dayjs(ReturnDate).diff(dayjs(ActualDate), "day");
  return (
    <>
      <div>
        {DateDiff >= 2 && (
          <Typography variant="body2" color="text.secondary">
            {formatInTimeZone(new Date(ReturnDate), "JST", "yyyy年MM月dd日")}
          </Typography>
        )}
        {DateDiff <= 1 && DateDiff >= 0 && (
          <Typography variant="body2" color="red">
            {formatInTimeZone(new Date(ReturnDate), "JST", "yyyy年MM月dd日")}
          </Typography>
        )}
        {DateDiff < 0 && (
          <Typography variant="body2" color="red" sx={{ fontWeight: "bold" }}>
            {formatInTimeZone(new Date(ReturnDate), "JST", "yyyy年MM月dd日")}
          </Typography>
        )}
      </div>
    </>
  );
};

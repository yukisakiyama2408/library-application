import { useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { BorrowedBook } from "../../components/borrowedBook";
import BorrowedBookHitory from "../../components/borrowedBookHistory";
import GlobalHeader from "../../components/globalHeader";
import { Typography, Divider, Container } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import { GET_USER } from "../../query/user/userGet";

const MyPage = () => {
  const { user } = useAuth0();
  const { data } = useQuery(GET_USER, {
    variables: { authId: user && user.sub },
  });

  const user_info = !data ? [] : data.users_table[0];
  const borrowedBook_info = user_info.borrowed_books;
  const borrowedBookHistory_info = user_info.borrowed_book_history;

  return (
    <>
      <div>
        <GlobalHeader />
      </div>
      <div className="myPage">
        <Container>
          <div>
            <div>
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                className="profileInfo"
              >
                {user_info.name}さんのホーム
              </Typography>
            </div>
            <div>
              <Link href="/user/profileEdit" className="profileInfo">
                <EditIcon />
              </Link>
            </div>
          </div>
          <div className="myPageBooks">
            <div>
              <div>
                <Typography gutterBottom variant="h5" component="div">
                  現在借りている本
                </Typography>
              </div>
              <div>
                <Divider />
              </div>
              <div>
                <BorrowedBook bookId={borrowedBook_info} />
              </div>
            </div>
            <div className="myPageBooksHistory">
              <div>
                <Typography gutterBottom variant="h5" component="div">
                  過去に読んだ本
                </Typography>
              </div>
              <Divider />
              <div>
                <BorrowedBookHitory bookId={borrowedBookHistory_info} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default MyPage;

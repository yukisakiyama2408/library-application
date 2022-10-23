import { gql, useQuery} from '@apollo/client';
import {client} from '../api/apollo-client';

const BookEdit =()=>{
    return( <div>Hello World</div>)
   

    // return (
    //     <form onSubmit={e => handleAddBook(e)}>
    //       <input
    //       type="text"
    //       name="title"
    //       placeholder="本のタイトル"
    //       value={title}
    //       onChange={e => (setTitle(e.target.value))}
    //       />
    //        <input
    //        type="text"
    //        placeholder="著者"
    //        value={author}
    //        onChange={e => (setAuthor(e.target.value))}
    //       />
    //        <input
    //        type="text"
    //        name="image_url"
    //        placeholder="画像URL"
    //        value={image_url}
    //        onChange={e => (setImage_url(e.target.value))}
    //       />
    //       <button type="submit">登録</button>
    //     </form>
    //   );
}

export default BookEdit
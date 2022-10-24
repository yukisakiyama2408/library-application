import { gql, useQuery} from '@apollo/client';
import {client} from '../api/apollo-client';
import { useRouter } from 'next/router';


const BookEdit =()=>{
    const router = useRouter();
    console.log(router.query)
    return( <div> {router.query.itle}の著者は{router.query.author}です</div>)
}

export default BookEdit
import { fetchData } from "../../components/FetchData";
import { OpportunityUrl } from "../../services/ApiUrls";

export const submitForm = (data:any, id:string) => {
    const Header = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Token'),
        org: localStorage.getItem('org')
    }
    return fetchData(`${OpportunityUrl}/${id}/`, 'PUT', JSON.stringify(data), Header)
};